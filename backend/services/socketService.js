import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Store active users and their socket connections
const activeUsers = new Map();
const projectRooms = new Map();

class SocketService {
  constructor() {
    this.io = null;
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
    console.log('Socket.io server initialized');
  }

  setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

        if (!token) {
          return next(new Error('Authentication token required'));
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        });

        if (!user) {
          return next(new Error('User not found'));
        }

        socket.user = user;
        next();
      } catch (error) {
        console.error('Socket authentication error:', error);
        next(new Error('Authentication failed'));
      }
    });
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`User ${socket.user.name} connected with socket ${socket.id}`);

      // Store user connection
      activeUsers.set(socket.user.id, {
        socketId: socket.id,
        user: socket.user,
        connectedAt: new Date()
      });

      // Handle user joining a project room
      socket.on('join-project', async (projectId) => {
        try {
          // Verify user has access to project
          const project = await prisma.project.findFirst({
            where: {
              id: projectId,
              userId: socket.user.id
            }
          });

          if (!project) {
            socket.emit('error', { message: 'Access denied to project' });
            return;
          }

          socket.join(`project-${projectId}`);

          // Track users in project room
          if (!projectRooms.has(projectId)) {
            projectRooms.set(projectId, new Set());
          }
          projectRooms.get(projectId).add(socket.user.id);

          // Notify others in the project
          socket.to(`project-${projectId}`).emit('user-joined', {
            user: socket.user,
            message: `${socket.user.name} joined the project`
          });

          // Send current online users in project
          const onlineUsers = Array.from(projectRooms.get(projectId))
            .map(userId => activeUsers.get(userId)?.user)
            .filter(Boolean);

          socket.emit('project-users', onlineUsers);

        } catch (error) {
          console.error('Join project error:', error);
          socket.emit('error', { message: 'Failed to join project' });
        }
      });

      // Handle user leaving a project room
      socket.on('leave-project', (projectId) => {
        socket.leave(`project-${projectId}`);

        if (projectRooms.has(projectId)) {
          projectRooms.get(projectId).delete(socket.user.id);

          // Notify others
          socket.to(`project-${projectId}`).emit('user-left', {
            user: socket.user,
            message: `${socket.user.name} left the project`
          });
        }
      });

      // Handle collaborative editing
      socket.on('document-edit', (data) => {
        const { projectId, documentId, changes, cursor } = data;

        // Broadcast changes to other users in the project
        socket.to(`project-${projectId}`).emit('document-changes', {
          documentId,
          changes,
          user: socket.user,
          timestamp: new Date()
        });

        // Broadcast cursor position
        if (cursor) {
          socket.to(`project-${projectId}`).emit('cursor-update', {
            documentId,
            cursor,
            user: socket.user
          });
        }
      });

      // Handle task updates
      socket.on('task-update', async (data) => {
        try {
          const { projectId, taskId, updates } = data;

          // Verify user has access to project
          const project = await prisma.project.findFirst({
            where: {
              id: projectId,
              userId: socket.user.id
            }
          });

          if (!project) {
            socket.emit('error', { message: 'Access denied' });
            return;
          }

          // Broadcast task update to project members
          socket.to(`project-${projectId}`).emit('task-updated', {
            taskId,
            updates,
            updatedBy: socket.user,
            timestamp: new Date()
          });

        } catch (error) {
          console.error('Task update error:', error);
          socket.emit('error', { message: 'Failed to update task' });
        }
      });

      // Handle project comments/messages
      socket.on('project-message', async (data) => {
        try {
          const { projectId, message, type = 'comment' } = data;

          // Verify user has access to project
          const project = await prisma.project.findFirst({
            where: {
              id: projectId,
              userId: socket.user.id
            }
          });

          if (!project) {
            socket.emit('error', { message: 'Access denied' });
            return;
          }

          // Save message to database if needed
          // For now, just broadcast
          const messageData = {
            id: Date.now().toString(),
            projectId,
            message,
            type,
            sender: socket.user,
            timestamp: new Date()
          };

          // Broadcast to all project members
          this.io.to(`project-${projectId}`).emit('new-message', messageData);

        } catch (error) {
          console.error('Project message error:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // Handle typing indicators
      socket.on('typing-start', (data) => {
        const { projectId, documentId } = data;
        socket.to(`project-${projectId}`).emit('user-typing', {
          user: socket.user,
          documentId
        });
      });

      socket.on('typing-stop', (data) => {
        const { projectId, documentId } = data;
        socket.to(`project-${projectId}`).emit('user-stopped-typing', {
          user: socket.user,
          documentId
        });
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${encodeURIComponent(socket.user.name)} disconnected`);

        // Remove from active users
        activeUsers.delete(socket.user.id);

        // Remove from all project rooms
        for (const [projectId, users] of projectRooms.entries()) {
          if (users.has(socket.user.id)) {
            users.delete(socket.user.id);

            // Notify others in the project
            socket.to(`project-${projectId}`).emit('user-left', {
              user: socket.user,
              message: `${socket.user.name} left the project`
            });
          }
        }
      });
    });
  }

  // Send notification to specific user
  sendNotification(userId, notification) {
    const userConnection = activeUsers.get(userId);
    if (userConnection) {
      this.io.to(userConnection.socketId).emit('notification', notification);
    }
  }

  // Send notification to all users in a project
  sendProjectNotification(projectId, notification) {
    this.io.to(`project-${projectId}`).emit('notification', notification);
  }

  // Get active users in a project
  getProjectUsers(projectId) {
    if (!projectRooms.has(projectId)) {
      return [];
    }

    return Array.from(projectRooms.get(projectId))
      .map(userId => activeUsers.get(userId)?.user)
      .filter(Boolean);
  }

  // Get all active users
  getActiveUsers() {
    return Array.from(activeUsers.values()).map(conn => conn.user);
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;

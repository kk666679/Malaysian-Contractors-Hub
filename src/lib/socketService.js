import { io } from 'socket.io-client';

// Socket.io service for real-time features
class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventListeners = new Map();
  }

  // Initialize socket connection
  connect() {
    if (this.socket?.connected) {
      return;
    }

    const token = localStorage.getItem('authToken');
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    this.socket = io(API_BASE_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.setupEventHandlers();
  }

  // Setup default event handlers
  setupEventHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    // Handle real-time events
    this.socket.on('notification', (notification) => {
      this.emit('notification', notification);
    });

    this.socket.on('user-joined', (data) => {
      this.emit('user-joined', data);
    });

    this.socket.on('user-left', (data) => {
      this.emit('user-left', data);
    });

    this.socket.on('project-users', (users) => {
      this.emit('project-users', users);
    });

    this.socket.on('document-changes', (data) => {
      this.emit('document-changes', data);
    });

    this.socket.on('cursor-update', (data) => {
      this.emit('cursor-update', data);
    });

    this.socket.on('task-updated', (data) => {
      this.emit('task-updated', data);
    });

    this.socket.on('new-message', (data) => {
      this.emit('new-message', data);
    });

    this.socket.on('user-typing', (data) => {
      this.emit('user-typing', data);
    });

    this.socket.on('user-stopped-typing', (data) => {
      this.emit('user-stopped-typing', data);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      this.emit('error', error);
    });
  }

  // Join a project room
  joinProject(projectId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-project', projectId);
    }
  }

  // Leave a project room
  leaveProject(projectId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave-project', projectId);
    }
  }

  // Send document edit changes
  sendDocumentEdit(projectId, documentId, changes, cursor = null) {
    if (this.socket && this.isConnected) {
      this.socket.emit('document-edit', {
        projectId,
        documentId,
        changes,
        cursor
      });
    }
  }

  // Send task update
  sendTaskUpdate(projectId, taskId, updates) {
    if (this.socket && this.isConnected) {
      this.socket.emit('task-update', {
        projectId,
        taskId,
        updates
      });
    }
  }

  // Send project message
  sendProjectMessage(projectId, message, type = 'comment') {
    if (this.socket && this.isConnected) {
      this.socket.emit('project-message', {
        projectId,
        message,
        type
      });
    }
  }

  // Send typing indicator
  sendTypingStart(projectId, documentId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-start', {
        projectId,
        documentId
      });
    }
  }

  // Send typing stop indicator
  sendTypingStop(projectId, documentId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-stop', {
        projectId,
        documentId
      });
    }
  }

  // Add event listener
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Emit event to listeners
  emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.eventListeners.clear();
    }
  }

  // Get connection status
  get isConnected() {
    return this.socket?.connected || false;
  }

  // Reconnect socket (useful after token refresh)
  reconnect() {
    this.disconnect();
    this.connect();
  }
}

// Export singleton instance
const socketService = new SocketService();
export default socketService;

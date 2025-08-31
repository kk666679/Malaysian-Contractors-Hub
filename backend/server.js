import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import redisService from './services/redisService.js';
import socketService from './services/socketService.js';

// Import route modules
import authRoutes from './routes/auth.js';
import marketplaceRoutes from './routes/marketplace.js';
import complianceRoutes from './routes/compliance.js';
import userRoutes from './routes/user.js';
import weatherRoutes from './routes/weather.js';

import civilEngineeringRoutes from './routes/civilEngineering.js';
import electricalSystemsRoutes from './routes/electricalSystems.js';
import redisRoutes from './routes/redis.js';
import projectRoutes from './routes/project.js';
import notificationRoutes from './routes/notification.js';

// Create Express app
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/civil-engineering', civilEngineeringRoutes);
app.use('/api/electrical-systems', electricalSystemsRoutes);
app.use('/api/redis', redisRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize Redis connection and start server
async function startServer() {
  try {
    // Initialize Redis connection
    await redisService.connect();

    // Initialize Socket.io
    socketService.initialize(server);

    // Start server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Redis service initialized');
      console.log('Socket.io service initialized');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await redisService.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await redisService.disconnect();
  process.exit(0);
});

startServer();

export default app;

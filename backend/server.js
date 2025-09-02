import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import redisService from './services/redisService.js';
import socketService from './services/socketService.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { securityHeaders, sanitizeInput, requestLogger } from './middleware/security.js';
import { apiLimiter } from './middleware/rateLimiter.js';

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
import teamRoutes from './routes/team.js';
import documentRoutes from './routes/document.js';
import taskRoutes from './routes/task.js';
import hvacRoutes from './routes/hvac.js';
import sewerageRoutes from './routes/sewerage.js';
import elvRoutes from './routes/elv.js';
import adminRoutes from './routes/admin.js';
import bidRoutes from './routes/bid.js';
import healthRoutes from './routes/health.js';

// Create Express app
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(securityHeaders);
app.use(sanitizeInput);
app.use(requestLogger);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('dev'));

// Rate limiting
app.use('/api/', apiLimiter);

// Health check routes (no rate limiting)
app.use('/health', healthRoutes);

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
app.use('/api/team', teamRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/hvac', hvacRoutes);
app.use('/api/sewerage', sewerageRoutes);
app.use('/api/elv', elvRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bid', bidRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

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

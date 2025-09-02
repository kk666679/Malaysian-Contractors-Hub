import express from 'express';
import pkg from '@prisma/client';
import redisService from '../services/redisService.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// Basic health check
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Detailed health check with dependencies
router.get('/detailed', async (req, res) => {
  const healthCheck = {
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {}
  };

  // Check database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    healthCheck.services.database = {
      status: 'healthy',
      message: 'Database connection successful'
    };
  } catch (error) {
    healthCheck.success = false;
    healthCheck.services.database = {
      status: 'unhealthy',
      message: 'Database connection failed',
      error: error.message
    };
  }

  // Check Redis connection
  try {
    await redisService.ping();
    healthCheck.services.redis = {
      status: 'healthy',
      message: 'Redis connection successful'
    };
  } catch (error) {
    healthCheck.success = false;
    healthCheck.services.redis = {
      status: 'unhealthy',
      message: 'Redis connection failed',
      error: error.message
    };
  }

  // Memory usage
  const memUsage = process.memoryUsage();
  healthCheck.memory = {
    rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024)} MB`
  };

  const statusCode = healthCheck.success ? 200 : 503;
  res.status(statusCode).json(healthCheck);
});

// Readiness probe (for Kubernetes)
router.get('/ready', async (req, res) => {
  try {
    // Check if all critical services are ready
    await prisma.$queryRaw`SELECT 1`;
    await redisService.ping();
    
    res.json({
      success: true,
      message: 'Service is ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Service is not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Liveness probe (for Kubernetes)
router.get('/live', (req, res) => {
  res.json({
    success: true,
    message: 'Service is alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
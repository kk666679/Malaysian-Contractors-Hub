import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import pkg from '@prisma/client';
import redisService from '../services/redisService.js';

const { PrismaClient } = pkg;

// Test database instance
export const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL
    }
  }
});

// Test setup
beforeAll(async () => {
  // Connect to test database
  await testPrisma.$connect();
  
  // Connect to Redis (use test Redis instance if available)
  if (process.env.TEST_REDIS_URL) {
    await redisService.connect(process.env.TEST_REDIS_URL);
  }
  
  console.log('Test environment setup complete');
});

// Cleanup after all tests
afterAll(async () => {
  // Clean up test data
  await cleanupTestData();
  
  // Disconnect from database
  await testPrisma.$disconnect();
  
  // Disconnect from Redis
  await redisService.disconnect();
  
  console.log('Test environment cleanup complete');
});

// Clean up before each test
beforeEach(async () => {
  // Clear Redis cache
  if (redisService.isConnected()) {
    await redisService.flushall();
  }
});

// Clean up after each test
afterEach(async () => {
  // Optional: Clean up specific test data
});

// Helper function to clean up test data
async function cleanupTestData() {
  const tablenames = await testPrisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await testPrisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log(`Could not truncate ${tablename}, probably doesn't exist.`);
      }
    }
  }
}

// Test utilities
export const testUtils = {
  // Create test user
  createTestUser: async (userData = {}) => {
    const defaultUser = {
      email: `test-${Date.now()}@example.com`,
      name: 'Test User',
      password: 'hashedpassword123',
      role: 'CONTRACTOR'
    };

    return await testPrisma.user.create({
      data: { ...defaultUser, ...userData }
    });
  },

  // Create test project
  createTestProject: async (userId, projectData = {}) => {
    const defaultProject = {
      name: `Test Project ${Date.now()}`,
      description: 'Test project description',
      location: 'Kuala Lumpur',
      client: 'Test Client',
      budget: 100000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'PLANNING'
    };

    return await testPrisma.project.create({
      data: {
        ...defaultProject,
        ...projectData,
        userId
      }
    });
  },

  // Create test calculation
  createTestCalculation: async (userId, calculationData = {}) => {
    const defaultCalculation = {
      type: 'STRUCTURAL',
      inputs: {
        concreteGrade: 'C30',
        steelGrade: 'B500',
        beamWidth: 300,
        beamDepth: 600
      },
      outputs: {
        capacity: 150.5,
        utilization: 0.75
      }
    };

    return await testPrisma.calculation.create({
      data: {
        ...defaultCalculation,
        ...calculationData,
        userId
      }
    });
  },

  // Generate JWT token for testing
  generateTestToken: (userId) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  },

  // Clean specific table
  cleanTable: async (tableName) => {
    await testPrisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tableName}" CASCADE;`);
  }
};

export default testUtils;
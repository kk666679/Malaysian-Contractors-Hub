import pkg from '@prisma/client';

const { PrismaClient } = pkg;

// Database configuration
const config = {
  development: {
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty'
  },
  production: {
    log: ['warn', 'error'],
    errorFormat: 'minimal'
  },
  test: {
    log: [],
    errorFormat: 'minimal'
  }
};

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Create Prisma client instance
export const prisma = new PrismaClient(dbConfig);

// Database connection helper
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database query test successful');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Database disconnection helper
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
    throw error;
  }
};

// Database health check
export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', message: 'Database is responsive' };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      message: 'Database is not responsive',
      error: error.message 
    };
  }
};

export default prisma;
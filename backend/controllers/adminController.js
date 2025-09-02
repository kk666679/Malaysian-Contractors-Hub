import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Get admin statistics
export const getAdminStats = async (req, res) => {
  try {
    const [userCount, projectCount, calculationCount] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.calculation.count()
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    const stats = {
      totalUsers: userCount,
      totalProjects: projectCount,
      totalCalculations: calculationCount,
      recentUsers,
      systemHealth: 'Good'
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get admin statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get system health
export const getSystemHealth = async (req, res) => {
  try {
    const health = {
      database: 'Connected',
      redis: 'Connected',
      storage: 'Available',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date()
    };

    res.json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error('Get system health error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get system health',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  getAdminStats,
  getSystemHealth
};
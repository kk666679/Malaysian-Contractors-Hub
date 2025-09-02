const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboard = async (req, res) => {
  try {
    const { range = '30d' } = req.query;
    const days = parseInt(range.replace('d', ''));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [projects, revenue, calculations] = await Promise.all([
      prisma.project.groupBy({
        by: ['status'],
        _count: { id: true },
        where: { createdAt: { gte: startDate } }
      }),
      prisma.project.groupBy({
        by: ['createdAt'],
        _sum: { budget: true },
        where: { createdAt: { gte: startDate } }
      }),
      prisma.calculation.groupBy({
        by: ['type'],
        _count: { id: true },
        where: { createdAt: { gte: startDate } }
      })
    ]);

    res.json({
      success: true,
      data: {
        projectProgress: projects.map(p => ({
          status: p.status,
          count: p._count.id
        })),
        revenue: revenue.map(r => ({
          date: r.createdAt,
          amount: r._sum.budget || 0
        })),
        calculations: calculations.map(c => ({
          type: c.type,
          count: c._count.id
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getKPIs = async (req, res) => {
  try {
    const [totalProjects, activeProjects, totalRevenue, avgProjectValue] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.project.aggregate({ _sum: { budget: true } }),
      prisma.project.aggregate({ _avg: { budget: true } })
    ]);

    const kpis = [
      { label: 'Total Projects', value: totalProjects, change: 12 },
      { label: 'Active Projects', value: activeProjects, change: 8 },
      { label: 'Total Revenue', value: `RM ${(totalRevenue._sum.budget || 0).toLocaleString()}`, change: 15 },
      { label: 'Avg Project Value', value: `RM ${Math.round(avgProjectValue._avg.budget || 0).toLocaleString()}`, change: -3 }
    ];

    res.json({ success: true, data: kpis });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    
    let data;
    switch (type) {
      case 'project-performance':
        data = await prisma.project.findMany({
          where: {
            createdAt: { gte: new Date(startDate), lte: new Date(endDate) }
          },
          include: { tasks: true, team: true }
        });
        break;
      case 'financial':
        data = await prisma.project.groupBy({
          by: ['status'],
          _sum: { budget: true },
          _count: { id: true }
        });
        break;
      default:
        data = [];
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getDashboard,
  getKPIs,
  getReports
};
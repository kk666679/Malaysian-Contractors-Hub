// Project Management Controller - GCMS
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Project
const createProject = async (req, res) => {
  try {
    const {
      name, description, code, type, budget, startDate, endDate,
      address, city, state, priority = 'MEDIUM'
    } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        code,
        type,
        budget: parseFloat(budget),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        address,
        city,
        state,
        priority,
        companyId: req.user.companyId,
        managerId: req.user.id
      },
      include: {
        manager: { select: { id: true, name: true, email: true } },
        company: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Get Projects with Filtering
const getProjects = async (req, res) => {
  try {
    const { status, type, priority, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const where = { companyId: req.user.companyId };
    if (status) where.status = status;
    if (type) where.type = type;
    if (priority) where.priority = priority;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          manager: { select: { id: true, name: true, email: true } },
          tasks: { select: { id: true, status: true } },
          _count: {
            select: {
              tasks: true,
              expenses: true,
              documents: true
            }
          }
        },
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.project.count({ where })
    ]);

    // Calculate project statistics
    const projectsWithStats = projects.map(project => ({
      ...project,
      stats: {
        totalTasks: project._count.tasks,
        completedTasks: project.tasks.filter(t => t.status === 'COMPLETED').length,
        totalExpenses: project._count.expenses,
        totalDocuments: project._count.documents,
        progressPercent: project.progressPercent
      }
    }));

    res.json({
      success: true,
      data: projectsWithStats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

// Create Task
const createTask = async (req, res) => {
  try {
    const {
      name, description, projectId, assigneeId, startDate, endDate,
      duration, priority = 'MEDIUM', parentTaskId
    } = req.body;

    const task = await prisma.task.create({
      data: {
        name,
        description,
        projectId,
        assigneeId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        duration: parseInt(duration),
        priority,
        parentTaskId
      },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, name: true } }
      }
    });

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

// Get Project Dashboard Data
const getProjectDashboard = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const [
      totalProjects,
      activeProjects,
      completedProjects,
      recentTasks,
      upcomingMilestones
    ] = await Promise.all([
      prisma.project.count({ where: { companyId } }),
      prisma.project.count({ where: { companyId, status: 'CONSTRUCTION' } }),
      prisma.project.count({ where: { companyId, status: 'COMPLETED' } }),
      prisma.task.findMany({
        where: {
          project: { companyId },
          status: { in: ['IN_PROGRESS', 'NOT_STARTED'] }
        },
        include: {
          assignee: { select: { name: true } },
          project: { select: { name: true } }
        },
        orderBy: { endDate: 'asc' },
        take: 10
      }),
      prisma.milestone.findMany({
        where: {
          project: { companyId },
          status: 'PENDING',
          dueDate: { gte: new Date() }
        },
        include: {
          project: { select: { name: true } }
        },
        orderBy: { dueDate: 'asc' },
        take: 5
      })
    ]);

    const dashboardData = {
      summary: {
        totalProjects,
        activeProjects,
        completedProjects,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects * 100).toFixed(1) : 0
      },
      recentTasks,
      upcomingMilestones
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  createTask,
  getProjectDashboard
};
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, location, client, startDate, endDate, budget } = req.body;
    const userId = req.user.id;

    // Validation
    if (!name || !location || !client) {
      return res.status(400).json({
        success: false,
        message: 'Name, location, and client are required'
      });
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        description: description?.trim(),
        location: location.trim(),
        client: client.trim(),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        budget: budget ? parseFloat(budget) : null,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            calculations: true,
            complianceChecks: true,
            documents: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all projects for the authenticated user
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      userId,
      ...(status && { status })
    };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              calculations: true,
              complianceChecks: true,
              documents: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        },
        skip,
        take: parseInt(limit)
      }),
      prisma.project.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get a specific project by ID
export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        calculations: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        complianceChecks: {
          orderBy: {
            checkedAt: 'desc'
          },
          take: 5
        },
        documents: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        projectModules: true,
        _count: {
          select: {
            calculations: true,
            complianceChecks: true,
            documents: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: {
        project
      }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const { name, description, location, client, status, startDate, endDate, budget } = req.body;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Update project
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        ...(name && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() }),
        ...(location && { location: location.trim() }),
        ...(client && { client: client.trim() }),
        ...(status && { status }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(budget !== undefined && { budget: budget ? parseFloat(budget) : null })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            calculations: true,
            complianceChecks: true,
            documents: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project: updatedProject
      }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId
      }
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete project (cascade will handle related records)
    await prisma.project.delete({
      where: {
        id: projectId
      }
    });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get project statistics
export const getProjectStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await prisma.project.groupBy({
      by: ['status'],
      where: {
        userId
      },
      _count: {
        id: true
      }
    });

    const totalProjects = await prisma.project.count({
      where: {
        userId
      }
    });

    const recentProjects = await prisma.project.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5,
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: {
        totalProjects,
        statusBreakdown: stats,
        recentProjects
      }
    });
  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  createProject,
  getUserProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats
};

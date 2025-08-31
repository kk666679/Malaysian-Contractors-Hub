import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        projects: {
          select: {
            id: true,
            name: true,
            status: true,
            createdAt: true
          }
        },
        bids: {
          select: {
            id: true,
            amount: true,
            status: true,
            project: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    // Validate input
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user projects
export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        budget: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        bids: {
          select: {
            id: true,
            amount: true,
            status: true,
            bidder: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        materials: {
          select: {
            id: true,
            name: true,
            quantity: true,
            unit: true,
            unitPrice: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: {
        projects,
        total: projects.length
      }
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user specialists (bidders who have won projects)
export const getUserSpecialists = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get approved bids for user's projects
    const approvedBids = await prisma.bid.findMany({
      where: {
        project: {
          ownerId: userId
        },
        status: 'APPROVED'
      },
      include: {
        bidder: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        project: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Extract unique specialists
    const specialistsMap = new Map();
    approvedBids.forEach(bid => {
      if (!specialistsMap.has(bid.bidder.id)) {
        specialistsMap.set(bid.bidder.id, {
          ...bid.bidder,
          projects: []
        });
      }
      specialistsMap.get(bid.bidder.id).projects.push({
        id: bid.project.id,
        name: bid.project.name
      });
    });

    const specialists = Array.from(specialistsMap.values());

    res.json({
      success: true,
      data: {
        specialists,
        total: specialists.length
      }
    });
  } catch (error) {
    console.error('Get user specialists error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default {
  getProfile,
  updateProfile,
  getUserProjects,
  getUserSpecialists
};

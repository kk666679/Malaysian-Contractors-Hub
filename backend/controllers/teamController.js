import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Add team member to project
export const addTeamMember = async (req, res) => {
  try {
    const { projectId, userId, role = 'MEMBER' } = req.body;
    const currentUserId = req.user.id;

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: currentUserId
      }
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to manage this project team'
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is already a team member
    const existingMember = await prisma.projectTeam.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      }
    });

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'User is already a team member'
      });
    }

    // Add team member
    const teamMember = await prisma.projectTeam.create({
      data: {
        projectId,
        userId,
        role
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: { teamMember }
    });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get project team members
export const getProjectTeam = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Verify access to project
    const hasAccess = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { userId },
          {
            projectTeams: {
              some: { userId }
            }
          }
        ]
      }
    });

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this project'
      });
    }

    const teamMembers = await prisma.projectTeam.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: { joinedAt: 'asc' }
    });

    res.json({
      success: true,
      data: { teamMembers }
    });
  } catch (error) {
    console.error('Get project team error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get project team',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update team member role
export const updateTeamMemberRole = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    const { role } = req.body;
    const currentUserId = req.user.id;

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: currentUserId
      }
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to manage this project team'
      });
    }

    const updatedMember = await prisma.projectTeam.update({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      },
      data: { role },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Team member role updated successfully',
      data: { teamMember: updatedMember }
    });
  } catch (error) {
    console.error('Update team member role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update team member role',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Remove team member
export const removeTeamMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    const currentUserId = req.user.id;

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: currentUserId
      }
    });

    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to manage this project team'
      });
    }

    await prisma.projectTeam.delete({
      where: {
        projectId_userId: {
          projectId,
          userId
        }
      }
    });

    res.json({
      success: true,
      message: 'Team member removed successfully'
    });
  } catch (error) {
    console.error('Remove team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  addTeamMember,
  getProjectTeam,
  updateTeamMemberRole,
  removeTeamMember
};
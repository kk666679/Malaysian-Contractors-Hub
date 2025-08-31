import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, assignedToId, status, dueDate } = req.body;
    const userId = req.user.id;

    if (!projectId || !title) {
      return res.status(400).json({
        success: false,
        message: 'Project ID and title are required'
      });
    }

    // Verify project ownership or membership
    const project = await prisma.project.findFirst({
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

    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this project'
      });
    }

    const task = await prisma.task.create({
      data: {
        projectId,
        title: title.trim(),
        description: description?.trim(),
        assignedToId,
        status: status || 'PENDING',
        dueDate: dueDate ? new Date(dueDate) : null,
        createdById: userId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: { task }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get tasks for a project
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Verify project ownership or membership
    const project = await prisma.project.findFirst({
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

    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this project'
      });
    }

    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { dueDate: 'asc' }
    });

    res.json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, assignedToId, status, dueDate } = req.body;

    // Verify task exists and user has access
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        project: true
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const hasAccess = task.project.userId === userId || (await prisma.projectTeam.findFirst({
      where: { projectId: task.projectId, userId }
    }));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to update this task'
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(description !== undefined && { description: description?.trim() }),
        ...(assignedToId !== undefined && { assignedToId }),
        ...(status && { status }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
      }
    });

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: { task: updatedTask }
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await prisma.task.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const hasAccess = task.project.userId === userId || (await prisma.projectTeam.findFirst({
      where: { projectId: task.projectId, userId }
    }));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to delete this task'
      });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
};

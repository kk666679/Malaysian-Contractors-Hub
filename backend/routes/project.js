import express from 'express';
import {
  createProject,
  getUserProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats
} from '../controllers/projectController.js';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import {
  getProjectTeam,
  addTeamMember,
  updateTeamMember,
  removeTeamMember
} from '../controllers/teamController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes for project management
router.post('/', authenticateToken, createProject);
router.get('/', authenticateToken, getUserProjects);
router.get('/:projectId', authenticateToken, getProject);
router.put('/:projectId', authenticateToken, updateProject);
router.delete('/:projectId', authenticateToken, deleteProject);
router.get('/stats/summary', authenticateToken, getProjectStats);

// Task routes
router.post('/:projectId/tasks', authenticateToken, createTask);
router.get('/:projectId/tasks', authenticateToken, getTasksByProject);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);

// Team routes
router.get('/:projectId/team', authenticateToken, getProjectTeam);
router.post('/:projectId/team', authenticateToken, addTeamMember);
router.put('/:projectId/team/:userId', authenticateToken, updateTeamMember);
router.delete('/:projectId/team/:userId', authenticateToken, removeTeamMember);

export default router;

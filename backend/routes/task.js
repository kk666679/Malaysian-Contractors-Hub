import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Create new task
router.post('/', createTask);

// Get tasks by project
router.get('/project/:projectId', getTasksByProject);

// Update task
router.put('/:id', updateTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;
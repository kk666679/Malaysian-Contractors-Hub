import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

// Get user profile (protected)
router.get('/profile', authenticateToken, userController.getProfile);

// Update user profile (protected)
router.put('/profile', authenticateToken, userController.updateProfile);

// Get user projects (protected)
router.get('/projects', authenticateToken, userController.getUserProjects);

// Get user specialists (protected)
router.get('/specialists', authenticateToken, userController.getUserSpecialists);

export default router;

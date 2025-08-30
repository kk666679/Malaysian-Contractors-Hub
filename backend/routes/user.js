import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Get user projects
router.get('/projects', userController.getUserProjects);

// Get user specialists
router.get('/specialists', userController.getUserSpecialists);

export default router;

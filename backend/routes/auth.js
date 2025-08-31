import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user profile (protected)
router.get('/profile', authenticateToken, authController.getProfile);

// Logout user
router.post('/logout', authenticateToken, authController.logout);

export default router;

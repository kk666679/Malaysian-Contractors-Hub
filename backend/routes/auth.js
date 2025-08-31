import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  refreshToken,
  logout,
  getAllUsers,
  deleteUser
} from '../controllers/authController.js';
import {
  authenticateToken,
  authorizeRoles
} from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// Admin only routes
router.get('/users', authenticateToken, authorizeRoles('ADMIN'), getAllUsers);
router.delete('/users/:userId', authenticateToken, authorizeRoles('ADMIN'), deleteUser);

export default router;

import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import {
  getAdminStats,
  getSystemHealth
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole('ADMIN'));

router.get('/stats', getAdminStats);
router.get('/health', getSystemHealth);

export default router;
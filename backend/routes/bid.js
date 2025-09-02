import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { generateBid } from '../controllers/bidController.js';

const router = express.Router();

router.use(authenticateToken);
router.post('/generate', generateBid);

export default router;
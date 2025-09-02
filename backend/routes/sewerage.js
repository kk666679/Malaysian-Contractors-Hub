import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  calculatePipeSizing,
  designStormwater
} from '../controllers/sewerageController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/pipe-sizing', calculatePipeSizing);
router.post('/stormwater-design', designStormwater);

export default router;
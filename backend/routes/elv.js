import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  designELVSystem,
  designBuildingAutomation
} from '../controllers/elvController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/system-design', designELVSystem);
router.post('/building-automation', designBuildingAutomation);

export default router;
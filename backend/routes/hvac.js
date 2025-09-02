import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  calculateHVACLoad,
  designDuctwork,
  assessAirQuality
} from '../controllers/hvacController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// HVAC load calculation
router.post('/load-calculation', calculateHVACLoad);

// Ductwork design
router.post('/ductwork-design', designDuctwork);

// Indoor air quality assessment
router.post('/air-quality-assessment', assessAirQuality);

export default router;
import express from 'express';
const router = express.Router();
import civilEngineeringController from '../controllers/civilEngineeringController.js';

// Calculate structural capacity
router.post('/calculate-capacity', civilEngineeringController.calculateCapacity);

// Get all Malaysian standards
router.get('/standards', civilEngineeringController.getStandards);

// Get specific standard requirements
router.get('/standards/:standardCode', civilEngineeringController.getStandardRequirements);

// Check design compliance
router.post('/check-compliance', civilEngineeringController.checkCompliance);

// Generate design report
router.post('/generate-report', civilEngineeringController.generateReport);

export default router;

import express from 'express';
const router = express.Router();
import civilEngineeringController from '../controllers/civilEngineeringController.js';
import engineeringIntegration from '../services/engineering/api/integration.js';

// Calculate structural capacity (enhanced with new engineering services)
router.post('/calculate-capacity', engineeringIntegration.adaptCivilCalculation);

// Get all Malaysian standards (enhanced)
router.get('/standards', engineeringIntegration.getStandards);

// Get specific standard requirements
router.get('/standards/:standardCode', civilEngineeringController.getStandardRequirements);

// Check design compliance (enhanced)
router.post('/check-compliance', engineeringIntegration.checkCompliance);

// Generate design report (enhanced)
router.post('/generate-report', engineeringIntegration.generateReport);

export default router;

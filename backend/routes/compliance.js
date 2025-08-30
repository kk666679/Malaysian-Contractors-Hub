import express from 'express';
const router = express.Router();
import complianceController from '../controllers/complianceController.js';

// Get all compliance data
router.get('/', complianceController.getAllCompliance);

// Get building codes
router.get('/building-codes', complianceController.getBuildingCodes);

// Get CIDB requirements
router.get('/cidb-requirements', complianceController.getCIDBRequirements);

// Get local regulations
router.get('/local-regulations', complianceController.getLocalRegulations);

export default router;

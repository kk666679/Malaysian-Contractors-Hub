import express from 'express';
const router = express.Router();
import electricalSystemsController from '../controllers/electricalSystemsController.js';

// Calculate voltage drop
router.post('/voltage-drop', electricalSystemsController.calculateVoltageDrop);

// Calculate cable sizing
router.post('/cable-sizing', electricalSystemsController.calculateCableSizing);

// Calculate transformer sizing
router.post('/transformer-sizing', electricalSystemsController.calculateTransformerSizing);

// Check electrical compliance
router.post('/check-compliance', electricalSystemsController.checkCompliance);

// Get TNB standards
router.get('/standards', electricalSystemsController.getStandards);

// Get specific standard requirements
router.get('/standards/:standardCode', electricalSystemsController.getStandardRequirements);

export default router;

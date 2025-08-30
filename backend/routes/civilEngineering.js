const express = require('express');
const router = express.Router();
const civilEngineeringController = require('../controllers/civilEngineeringController');

// Calculate structural capacity
router.post('/calculate-capacity', civilEngineeringController.calculateStructuralCapacity);

// Get all Malaysian standards
router.get('/standards', civilEngineeringController.getMalaysianStandards);

// Get specific standard requirements
router.get('/standards/:standardCode', civilEngineeringController.getStandardRequirements);

// Check design compliance
router.post('/check-compliance', civilEngineeringController.checkDesignCompliance);

// Generate design report
router.post('/generate-report', civilEngineeringController.generateDesignReport);

module.exports = router;

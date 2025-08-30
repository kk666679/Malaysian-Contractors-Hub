const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/complianceController');

// Get all compliance data
router.get('/', complianceController.getAllCompliance);

// Get building codes
router.get('/building-codes', complianceController.getBuildingCodes);

// Get CIDB requirements
router.get('/cidb-requirements', complianceController.getCIDBRequirements);

// Get local regulations
router.get('/local-regulations', complianceController.getLocalRegulations);

module.exports = router;

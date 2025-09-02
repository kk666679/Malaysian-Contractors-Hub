// Compliance & Safety Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createSafetyChecklist,
  getSafetyChecklists,
  conductSafetyInspection,
  reportIncident,
  getIncidents,
  updateIncidentStatus,
  getComplianceDashboard,
  getComplianceStandards,
  generateComplianceReport,
  checkRegulatoryCompliance
} = require('../../controllers/gcms/complianceController');

// Safety checklist routes
router.post('/checklists', auth, createSafetyChecklist);
router.get('/checklists', auth, getSafetyChecklists);

// Inspection routes
router.post('/inspections', auth, conductSafetyInspection);

// Incident routes
router.post('/incidents', auth, reportIncident);
router.get('/incidents', auth, getIncidents);
router.put('/incidents/:id/status', auth, updateIncidentStatus);

// Dashboard and reporting routes
router.get('/dashboard', auth, getComplianceDashboard);
router.get('/standards', auth, getComplianceStandards);
router.get('/reports', auth, generateComplianceReport);
router.post('/check-compliance', auth, checkRegulatoryCompliance);

module.exports = router;
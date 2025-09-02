// Subcontractor & Vendor Management Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createSubcontractor,
  getSubcontractors,
  assignSubcontractor,
  evaluateSubcontractor,
  createVendor,
  getVendors,
  getSubcontractorPerformanceReport,
  getVendorAnalytics,
  updateSubcontractorStatus
} = require('../../controllers/gcms/subcontractorController');

// Subcontractor routes
router.post('/', auth, createSubcontractor);
router.get('/', auth, getSubcontractors);
router.post('/assign', auth, assignSubcontractor);
router.post('/:subcontractorId/evaluate', auth, evaluateSubcontractor);
router.put('/:id/status', auth, updateSubcontractorStatus);
router.get('/:subcontractorId/performance', auth, getSubcontractorPerformanceReport);

// Vendor routes
router.post('/vendors', auth, createVendor);
router.get('/vendors', auth, getVendors);
router.get('/vendors/analytics', auth, getVendorAnalytics);

module.exports = router;
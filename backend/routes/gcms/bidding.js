// Bidding & Estimation Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createBid,
  getBids,
  updateBidStatus,
  calculateCostEstimation,
  compareBids,
  getBidAnalytics,
  generateBidReport
} = require('../../controllers/gcms/biddingController');

// Bid routes
router.post('/', auth, createBid);
router.get('/', auth, getBids);
router.put('/:id/status', auth, updateBidStatus);

// Estimation routes
router.post('/estimate', auth, calculateCostEstimation);
router.post('/compare', auth, compareBids);

// Analytics routes
router.get('/analytics', auth, getBidAnalytics);
router.get('/:id/report', auth, generateBidReport);

module.exports = router;
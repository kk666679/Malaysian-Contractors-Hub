const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const { cache } = require('../middleware/cache');

router.get('/dashboard', auth, cache(300), analyticsController.getDashboard);
router.get('/kpis', auth, cache(600), analyticsController.getKPIs);
router.get('/reports', auth, analyticsController.getReports);

module.exports = router;
const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');
const auth = require('../middleware/auth');
const { cache } = require('../middleware/cache');

router.get('/sites/:siteId/data', auth, iotController.getSiteData);
router.get('/sites/:siteId/analytics', auth, cache(300), iotController.getAnalytics);
router.get('/sites/:siteId/alerts', auth, iotController.getAlerts);

module.exports = router;
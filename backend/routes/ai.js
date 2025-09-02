const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth');
const { cache } = require('../middleware/cache');

router.post('/estimate-cost', auth, aiController.estimateCost);
router.post('/predict-risks', auth, aiController.predictRisks);
router.post('/optimize-design', auth, aiController.optimizeDesign);
router.post('/check-compliance', auth, cache(1800), aiController.checkCompliance);

module.exports = router;
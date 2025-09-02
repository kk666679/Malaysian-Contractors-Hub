const express = require('express');
const router = express.Router();
const v4Controller = require('../controllers/v4Controller');
const auth = require('../middleware/auth');
const { cache } = require('../middleware/cache');

// ML Routes
router.post('/ml/train', auth, v4Controller.trainModel);
router.post('/ml/predict-cost', auth, v4Controller.predictCost);
router.post('/ml/assess-risks', auth, v4Controller.assessRisks);
router.get('/ml/predict-maintenance/:deviceId', auth, cache(300), v4Controller.predictMaintenance);

// Edge Computing Routes
router.post('/edge/initialize', auth, v4Controller.initializeEdge);
router.post('/edge/process/:siteId', auth, v4Controller.processEdgeData);
router.get('/edge/3d-site/:siteId', auth, cache(60), v4Controller.get3DSiteData);

// Blockchain Routes
router.post('/blockchain/contracts', auth, v4Controller.createContract);
router.post('/blockchain/contracts/:contractId/milestones/:milestoneId/complete', auth, v4Controller.completeMilestone);
router.post('/blockchain/compliance/:projectId', auth, v4Controller.recordCompliance);
router.get('/blockchain/stats', auth, cache(300), v4Controller.getBlockchainStats);

// AR/VR Routes
router.post('/ar/sessions', auth, v4Controller.createARSession);
router.post('/ar/sessions/:sessionId/measurements', auth, v4Controller.addARMeasurement);
router.post('/vr/walkthroughs', auth, v4Controller.createVRWalkthrough);
router.post('/vr/walkthroughs/:walkthroughId/sessions', auth, v4Controller.startVRSession);
router.get('/ar/sessions/:sessionId/iot-overlay/:siteId', auth, v4Controller.overlayIoTAR);

module.exports = router;
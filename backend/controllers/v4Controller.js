const mlService = require('../services/mlService');
const edgeComputingService = require('../services/edgeComputingService');
const blockchainService = require('../services/blockchainService');
const arvrService = require('../services/arvrService');

// ML Controllers
const trainModel = async (req, res) => {
  try {
    const result = await mlService.trainCostModel();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const predictCost = async (req, res) => {
  try {
    const prediction = mlService.predictProjectCost(req.body);
    res.json({ success: true, data: prediction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const assessRisks = async (req, res) => {
  try {
    const risks = await mlService.assessProjectRisks(req.body);
    res.json({ success: true, data: risks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const predictMaintenance = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const prediction = await mlService.predictMaintenance(deviceId);
    res.json({ success: true, data: prediction });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Edge Computing Controllers
const initializeEdge = async (req, res) => {
  try {
    const result = await edgeComputingService.initializeEdgeNodes();
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const processEdgeData = async (req, res) => {
  try {
    const { siteId } = req.params;
    const processed = edgeComputingService.processAtEdge(siteId, req.body);
    res.json({ success: true, data: processed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get3DSiteData = async (req, res) => {
  try {
    const { siteId } = req.params;
    const data = edgeComputingService.generate3DSiteData(siteId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Blockchain Controllers
const createContract = async (req, res) => {
  try {
    const { projectId, milestones } = req.body;
    const contract = await blockchainService.createMilestoneContract(projectId, milestones);
    res.json({ success: true, data: contract });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const completeMilestone = async (req, res) => {
  try {
    const { contractId, milestoneId } = req.params;
    const result = await blockchainService.completeMilestone(contractId, milestoneId, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const recordCompliance = async (req, res) => {
  try {
    const { projectId } = req.params;
    const record = await blockchainService.recordCompliance(projectId, req.body);
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getBlockchainStats = async (req, res) => {
  try {
    const stats = blockchainService.getBlockchainStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// AR/VR Controllers
const createARSession = async (req, res) => {
  try {
    const { projectId } = req.body;
    const session = await arvrService.createARSession(projectId, req.user.id);
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addARMeasurement = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const measurement = await arvrService.placeARMeasurement(sessionId, req.body);
    res.json({ success: true, data: measurement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createVRWalkthrough = async (req, res) => {
  try {
    const { projectId, modelUrl } = req.body;
    const walkthrough = await arvrService.createVRWalkthrough(projectId, modelUrl);
    res.json({ success: true, data: walkthrough });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const startVRSession = async (req, res) => {
  try {
    const { walkthroughId } = req.params;
    const session = await arvrService.startVRSession(walkthroughId, req.user.id);
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const overlayIoTAR = async (req, res) => {
  try {
    const { sessionId, siteId } = req.params;
    const overlay = await arvrService.overlayIoTDataAR(sessionId, siteId);
    res.json({ success: true, data: overlay });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  // ML endpoints
  trainModel,
  predictCost,
  assessRisks,
  predictMaintenance,
  
  // Edge computing endpoints
  initializeEdge,
  processEdgeData,
  get3DSiteData,
  
  // Blockchain endpoints
  createContract,
  completeMilestone,
  recordCompliance,
  getBlockchainStats,
  
  // AR/VR endpoints
  createARSession,
  addARMeasurement,
  createVRWalkthrough,
  startVRSession,
  overlayIoTAR
};
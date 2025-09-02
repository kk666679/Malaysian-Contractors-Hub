const aiService = require('../services/aiService');

const estimateCost = async (req, res) => {
  try {
    const estimation = aiService.estimateCost(req.body);
    res.json({ success: true, data: estimation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const predictRisks = async (req, res) => {
  try {
    const risks = aiService.predictRisks(req.body);
    res.json({ success: true, data: risks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const optimizeDesign = async (req, res) => {
  try {
    const suggestions = aiService.optimizeDesign(req.body);
    res.json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const checkCompliance = async (req, res) => {
  try {
    const compliance = aiService.checkCompliance(req.body);
    res.json({ success: true, data: compliance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  estimateCost,
  predictRisks,
  optimizeDesign,
  checkCompliance
};
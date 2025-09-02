const iotService = require('../services/iotService');

const getSiteData = async (req, res) => {
  try {
    const { siteId } = req.params;
    const data = await iotService.getSiteData(siteId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const { siteId } = req.params;
    const { timeRange = '24h' } = req.query;
    const analytics = await iotService.getAnalytics(siteId, timeRange);
    res.json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAlerts = async (req, res) => {
  try {
    const { siteId } = req.params;
    const alerts = await iotService.getAlerts(siteId, new Date(Date.now() - 24 * 60 * 60 * 1000));
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getSiteData,
  getAnalytics,
  getAlerts
};
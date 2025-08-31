import electricalSystemsService from '../services/electricalSystemsService.js';

// Calculate voltage drop
export const calculateVoltageDrop = async (req, res) => {
  try {
    const params = req.body;
    const result = electricalSystemsService.calculateVoltageDrop(params);

    res.json({
      success: true,
      message: 'Voltage drop calculated successfully',
      data: result
    });
  } catch (error) {
    console.error('Calculate voltage drop error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Calculate cable sizing
export const calculateCableSizing = async (req, res) => {
  try {
    const params = req.body;
    const result = electricalSystemsService.calculateCableSizing(params);

    res.json({
      success: true,
      message: 'Cable sizing calculated successfully',
      data: result
    });
  } catch (error) {
    console.error('Calculate cable sizing error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Calculate transformer sizing
export const calculateTransformerSizing = async (req, res) => {
  try {
    const params = req.body;
    const result = electricalSystemsService.calculateTransformerSizing(params);

    res.json({
      success: true,
      message: 'Transformer sizing calculated successfully',
      data: result
    });
  } catch (error) {
    console.error('Calculate transformer sizing error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Check electrical compliance
export const checkCompliance = async (req, res) => {
  try {
    const design = req.body;
    const result = electricalSystemsService.checkElectricalCompliance(design);

    res.json({
      success: true,
      message: 'Electrical compliance check completed',
      data: result
    });
  } catch (error) {
    console.error('Check electrical compliance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Get TNB standards
export const getStandards = async (req, res) => {
  try {
    const standards = electricalSystemsService.getTNBStandards();

    res.json({
      success: true,
      message: 'TNB standards retrieved successfully',
      data: standards
    });
  } catch (error) {
    console.error('Get TNB standards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get specific standard requirements
export const getStandardRequirements = async (req, res) => {
  try {
    const { standardCode } = req.params;

    if (!standardCode) {
      return res.status(400).json({
        success: false,
        message: 'Standard code is required'
      });
    }

    const requirements = electricalSystemsService.getStandardRequirements(standardCode);

    if (!requirements) {
      return res.status(404).json({
        success: false,
        message: 'Standard not found'
      });
    }

    res.json({
      success: true,
      message: 'Standard requirements retrieved successfully',
      data: requirements
    });
  } catch (error) {
    console.error('Get standard requirements error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default {
  calculateVoltageDrop,
  calculateCableSizing,
  calculateTransformerSizing,
  checkCompliance,
  getStandards,
  getStandardRequirements
};

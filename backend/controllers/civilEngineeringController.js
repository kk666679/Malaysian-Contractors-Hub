import civilEngineeringService from '../services/civilEngineeringService.js';

// Calculate structural capacity
export const calculateCapacity = async (req, res) => {
  try {
    const { structureType, material, dimensions, loads } = req.body;

    // Validate required fields
    if (!structureType || !material || !dimensions || !loads) {
      return res.status(400).json({
        success: false,
        message: 'structureType, material, dimensions, and loads are required'
      });
    }

    const result = civilEngineeringService.calculateStructuralCapacity(
      structureType,
      material,
      dimensions,
      loads
    );

    res.json({
      success: true,
      message: 'Structural capacity calculated successfully',
      data: result
    });
  } catch (error) {
    console.error('Calculate capacity error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Get all Malaysian standards
export const getStandards = async (req, res) => {
  try {
    const standards = civilEngineeringService.getMalaysianStandards();

    res.json({
      success: true,
      message: 'Malaysian standards retrieved successfully',
      data: standards
    });
  } catch (error) {
    console.error('Get standards error:', error);
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

    const requirements = civilEngineeringService.getStandardRequirements(standardCode);

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

// Check design compliance
export const checkCompliance = async (req, res) => {
  try {
    const { structureType, material, dimensions, loads } = req.body;

    if (!structureType || !material || !dimensions) {
      return res.status(400).json({
        success: false,
        message: 'structureType, material, and dimensions are required'
      });
    }

    // Calculate capacity first
    const capacity = civilEngineeringService.calculateStructuralCapacity(
      structureType,
      material,
      dimensions,
      loads || {}
    );

    res.json({
      success: true,
      message: 'Compliance check completed',
      data: capacity.compliance
    });
  } catch (error) {
    console.error('Check compliance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

// Generate design report
export const generateReport = async (req, res) => {
  try {
    const { structureType, material, dimensions, loads, projectName } = req.body;

    if (!structureType || !material || !dimensions || !loads) {
      return res.status(400).json({
        success: false,
        message: 'structureType, material, dimensions, and loads are required'
      });
    }

    const capacity = civilEngineeringService.calculateStructuralCapacity(
      structureType,
      material,
      dimensions,
      loads
    );

    const report = {
      projectName: projectName || 'Unnamed Project',
      structureType,
      material,
      dimensions,
      loads,
      capacity,
      generatedAt: new Date().toISOString(),
      standards: civilEngineeringService.getMalaysianStandards()
    };

    res.json({
      success: true,
      message: 'Design report generated successfully',
      data: report
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

export default {
  calculateCapacity,
  getStandards,
  getStandardRequirements,
  checkCompliance,
  generateReport
};

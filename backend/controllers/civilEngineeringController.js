const civilEngineeringService = require('../services/civilEngineeringService');

const civilEngineeringController = {
  // Calculate structural capacity
  calculateStructuralCapacity: (req, res) => {
    try {
      const { structureType, material, dimensions, loads } = req.body;

      if (!structureType || !material || !dimensions || !loads) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: structureType, material, dimensions, loads'
        });
      }

      const capacity = civilEngineeringService.calculateStructuralCapacity(
        structureType,
        material,
        dimensions,
        loads
      );

      res.json({
        success: true,
        data: capacity
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get all Malaysian standards
  getMalaysianStandards: (req, res) => {
    try {
      const standards = civilEngineeringService.getMalaysianStandards();
      
      res.json({
        success: true,
        data: standards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get specific standard requirements
  getStandardRequirements: (req, res) => {
    try {
      const { standardCode } = req.params;
      const requirements = civilEngineeringService.getStandardRequirements(standardCode);

      if (!requirements) {
        return res.status(404).json({
          success: false,
          message: 'Standard not found'
        });
      }

      res.json({
        success: true,
        data: requirements
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Check design compliance
  checkDesignCompliance: (req, res) => {
    try {
      const { structureType, material, designData } = req.body;

      if (!structureType || !material || !designData) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: structureType, material, designData'
        });
      }

      // This would be more comprehensive in a real implementation
      const compliance = civilEngineeringService.checkCompliance(
        structureType,
        material,
        designData.capacity,
        designData.dimensions
      );

      res.json({
        success: true,
        data: compliance
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Generate structural design report
  generateDesignReport: (req, res) => {
    try {
      const { projectData, designData, complianceResults } = req.body;

      if (!projectData || !designData) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: projectData, designData'
        });
      }

      const report = {
        project: projectData,
        design: designData,
        compliance: complianceResults,
        generatedAt: new Date().toISOString(),
        reportId: `STR-${Date.now()}`,
        summary: civilEngineeringController.generateReportSummary(designData, complianceResults)
      };

      res.json({
        success: true,
        data: report
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Helper method to generate report summary
  generateReportSummary: (designData, complianceResults) => {
    const summary = {
      status: complianceResults.compliant ? 'COMPLIANT' : 'NON-COMPLIANT',
      keyFindings: [],
      recommendations: []
    };

    if (designData.capacity) {
      summary.keyFindings.push(`Structural capacity: ${designData.capacity.momentCapacity} moment, ${designData.capacity.shearCapacity} shear`);
    }

    if (complianceResults.issues && complianceResults.issues.length > 0) {
      summary.keyFindings.push(...complianceResults.issues);
    }

    if (complianceResults.recommendations && complianceResults.recommendations.length > 0) {
      summary.recommendations.push(...complianceResults.recommendations);
    }

    return summary;
  }
};

module.exports = civilEngineeringController;

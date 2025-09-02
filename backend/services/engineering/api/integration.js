/**
 * Integration layer for existing MC-Hub architecture
 * Bridges new engineering services with existing controllers and routes
 */

import EngineeringServices from '../index.js';
import { authenticateToken } from '../../middleware/auth.js';

const engineeringServices = new EngineeringServices();

/**
 * Adapter to convert new engineering service calls to existing API format
 */
class EngineeringIntegrationAdapter {
  /**
   * Convert new engineering calculation to existing civil engineering format
   */
  async adaptCivilCalculation(req, res) {
    try {
      const { 
        structureType = 'beam', 
        material = 'concrete', 
        dimensions = {}, 
        loads = {} 
      } = req.body;

      // Map existing request format to new service format
      const inputs = this.mapToNewFormat(structureType, material, dimensions, loads, req.body);
      
      let calculationType;
      switch (structureType) {
        case 'beam':
          calculationType = 'beam-analysis';
          break;
        case 'column':
          calculationType = 'column-design';
          break;
        case 'foundation':
          calculationType = 'foundation-bearing';
          break;
        default:
          calculationType = 'beam-analysis';
      }

      // Call new engineering service
      const result = await engineeringServices.performCalculation(
        'civil',
        calculationType,
        inputs,
        { checkCompliance: true, userId: req.user?.id }
      );

      // Convert back to existing API format
      const adaptedResult = this.adaptToExistingFormat(result, structureType);

      res.json({
        success: true,
        message: 'Structural capacity calculated successfully',
        data: adaptedResult
      });

    } catch (error) {
      console.error('Engineering calculation error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  /**
   * Map existing request format to new service input format
   */
  mapToNewFormat(structureType, material, dimensions, loads, body) {
    const inputs = {};

    // Handle beam calculations
    if (structureType === 'beam') {
      inputs.length = (body.beamLength || dimensions.length || 5000) / 1000; // Convert mm to m
      inputs.load = body.loadValue || loads.deadLoad || 25; // kN/m
      inputs.width = body.beamWidth || dimensions.width || 300; // mm
      inputs.height = body.beamDepth || dimensions.height || 600; // mm
      inputs.material = material;
    }

    // Handle column calculations
    if (structureType === 'column') {
      inputs.height = (body.beamLength || dimensions.length || 3000) / 1000; // Convert mm to m
      inputs.axialLoad = body.loadValue || loads.deadLoad + loads.liveLoad || 500; // kN
      inputs.width = body.beamWidth || dimensions.width || 300; // mm
      inputs.depth = body.beamDepth || dimensions.height || 300; // mm
      inputs.concreteGrade = body.concreteGrade || 'C30';
    }

    // Handle foundation calculations
    if (structureType === 'foundation') {
      inputs.width = (body.beamWidth || dimensions.width || 2000) / 1000; // Convert mm to m
      inputs.length = (body.beamLength || dimensions.length || 3000) / 1000; // Convert mm to m
      inputs.depth = (body.beamDepth || dimensions.height || 1500) / 1000; // Convert mm to m
      inputs.appliedLoad = body.loadValue || loads.deadLoad + loads.liveLoad || 1000; // kN
      inputs.soilType = body.soilType || 'clay-stiff';
    }

    return inputs;
  }

  /**
   * Adapt new service result to existing API format
   */
  adaptToExistingFormat(result, structureType) {
    const adapted = {
      compliance: {
        compliant: result.compliance?.overall || true,
        issues: [],
        recommendations: result.recommendations || [],
        standards: result.standards || []
      }
    };

    // Extract results based on structure type
    if (result.results) {
      if (structureType === 'beam') {
        adapted.momentCapacity = this.extractNumericValue(result.results.maxBendingMoment?.value);
        adapted.shearCapacity = this.extractNumericValue(result.results.maxShearForce?.value);
        adapted.deflection = this.extractNumericValue(result.results.maxDeflection?.value);
        adapted.utilizationRatio = result.compliance?.stressCheck?.ratio || 0.5;
      }

      if (structureType === 'column') {
        adapted.axialCapacity = this.extractNumericValue(result.results.designLoad?.value);
        adapted.bucklingCapacity = this.extractNumericValue(result.results.bucklingFactor);
        adapted.slendernessRatio = this.extractNumericValue(result.results.slendernessRatio?.value);
      }

      if (structureType === 'foundation') {
        adapted.bearingCapacity = this.extractNumericValue(result.results.allowableBearingCapacity?.value);
        adapted.safetyFactor = result.compliance?.bearingCapacityCheck?.ratio ? 
          (1 / result.compliance.bearingCapacityCheck.ratio).toFixed(2) : '3.0';
        adapted.area = `${result.inputs.width * result.inputs.length} m²`;
      }
    }

    // Add compliance issues
    if (result.compliance) {
      if (result.compliance.malaysian && !result.compliance.malaysian.passed) {
        adapted.compliance.issues.push('Malaysian standards compliance issues detected');
      }
      if (result.compliance.safety && !result.compliance.safety.passed) {
        adapted.compliance.issues.push('Safety compliance issues detected');
      }
    }

    return adapted;
  }

  /**
   * Extract numeric value from various result formats
   */
  extractNumericValue(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const match = value.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    }
    return 0;
  }

  /**
   * Get standards information in existing format
   */
  async getStandards(req, res) {
    try {
      const standards = {
        'MS 76:2005': {
          title: 'Code of practice for structural use of concrete',
          requirements: {
            structural: {
              loadFactors: { deadLoad: 1.35, liveLoad: 1.5, windLoad: 1.5 },
              deflectionLimits: { beams: 'L/250', slabs: 'L/250' }
            }
          }
        },
        'MS 1462:2009': {
          title: 'Code of practice for structural use of steel',
          requirements: {
            structural: {
              loadFactors: { deadLoad: 1.35, liveLoad: 1.5, windLoad: 1.5 },
              safetyFactors: { yield: 1.15, ultimate: 1.25 }
            }
          }
        },
        'UBBL 1984': {
          title: 'Uniform Building By-Laws',
          requirements: {
            structural: {
              loadFactors: { deadLoad: 1.4, liveLoad: 1.6, windLoad: 1.2 },
              deflectionLimits: { beams: 'L/360', slabs: 'L/480' }
            }
          }
        }
      };

      res.json({
        success: true,
        message: 'Malaysian standards retrieved successfully',
        data: standards
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  /**
   * Check compliance in existing format
   */
  async checkCompliance(req, res) {
    try {
      const { structureType, material, dimensions } = req.body;
      
      // Use the calculation method to get compliance info
      await this.adaptCivilCalculation(req, res);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  /**
   * Generate report in existing format
   */
  async generateReport(req, res) {
    try {
      const { structureType, material, dimensions, loads, projectName } = req.body;
      
      // Get calculation results
      const inputs = this.mapToNewFormat(structureType, material, dimensions, loads, req.body);
      
      let calculationType;
      switch (structureType) {
        case 'beam':
          calculationType = 'beam-analysis';
          break;
        case 'column':
          calculationType = 'column-design';
          break;
        case 'foundation':
          calculationType = 'foundation-bearing';
          break;
        default:
          calculationType = 'beam-analysis';
      }

      const result = await engineeringServices.performCalculation(
        'civil',
        calculationType,
        inputs,
        { checkCompliance: true, userId: req.user?.id }
      );

      const capacity = this.adaptToExistingFormat(result, structureType);

      const report = {
        projectName: projectName || 'Unnamed Project',
        structureType,
        material,
        dimensions,
        loads,
        capacity,
        generatedAt: new Date().toISOString(),
        standards: result.standards || []
      };

      res.json({
        success: true,
        message: 'Design report generated successfully',
        data: report
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }
}

export default new EngineeringIntegrationAdapter();
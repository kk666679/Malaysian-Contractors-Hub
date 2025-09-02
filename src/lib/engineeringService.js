/**
 * Engineering Service Client
 * Frontend service for engineering calculations
 */

import { apiClient } from './apiClient.js';

class EngineeringService {
  constructor() {
    this.baseUrl = '/engineering';
  }

  /**
   * Get available engineering modules
   */
  async getModules() {
    return apiClient.get(`${this.baseUrl}/modules`);
  }

  /**
   * Get available calculations for a module
   */
  async getCalculations(module) {
    return apiClient.get(`${this.baseUrl}/${module}/calculations`);
  }

  /**
   * Perform engineering calculation
   */
  async calculate(module, calculationType, inputs, options = {}) {
    return apiClient.post(`${this.baseUrl}/${module}/calculate/${calculationType}`, {
      inputs,
      options
    });
  }

  /**
   * Civil Engineering Calculations
   */
  async calculateBeamAnalysis(inputs) {
    return this.calculate('civil', 'beam-analysis', inputs);
  }

  async calculateColumnDesign(inputs) {
    return this.calculate('civil', 'column-design', inputs);
  }

  async calculateFoundationBearing(inputs) {
    return this.calculate('civil', 'foundation-bearing', inputs);
  }

  async calculateConcreteMix(inputs) {
    return this.calculate('civil', 'concrete-mix', inputs);
  }

  async calculateSteelConnection(inputs) {
    return this.calculate('civil', 'steel-connection', inputs);
  }

  async calculateLoadCombination(inputs) {
    return this.calculate('civil', 'load-combination', inputs);
  }

  /**
   * Electrical Engineering Calculations
   */
  async calculateVoltageDrop(inputs) {
    return this.calculate('electrical', 'voltage-drop', inputs);
  }

  async calculateCableSizing(inputs) {
    return this.calculate('electrical', 'cable-sizing', inputs);
  }

  async calculateElectricalLoad(inputs) {
    return this.calculate('electrical', 'load-calculation', inputs);
  }

  /**
   * HVAC Engineering Calculations
   */
  async calculateCoolingLoad(inputs) {
    return this.calculate('hvac', 'cooling-load', inputs);
  }

  async calculateDuctSizing(inputs) {
    return this.calculate('hvac', 'duct-sizing', inputs);
  }

  async calculateVentilationRate(inputs) {
    return this.calculate('hvac', 'ventilation-rate', inputs);
  }

  /**
   * Sewerage Engineering Calculations
   */
  async calculatePipeSizing(inputs) {
    return this.calculate('sewerage', 'pipe-sizing', inputs);
  }

  async calculateFlow(inputs) {
    return this.calculate('sewerage', 'flow-calculation', inputs);
  }

  async calculateRainfall(inputs) {
    return this.calculate('sewerage', 'rainfall-analysis', inputs);
  }

  /**
   * ELV Systems Calculations
   */
  async calculateELVCableSizing(inputs) {
    return this.calculate('elv', 'cable-sizing', inputs);
  }

  async calculatePowerBudget(inputs) {
    return this.calculate('elv', 'power-budget', inputs);
  }

  async calculateCoverage(inputs) {
    return this.calculate('elv', 'coverage-analysis', inputs);
  }

  /**
   * Get standards for a country
   */
  async getStandards(country = 'malaysia') {
    return apiClient.get(`${this.baseUrl}/standards/${country}`);
  }

  /**
   * Get API information
   */
  async getInfo() {
    return apiClient.get(`${this.baseUrl}/info`);
  }

  /**
   * Legacy compatibility - map to existing civil engineering API
   */
  async calculateStructuralCapacity(data) {
    // Map new format to legacy format for backward compatibility
    const inputs = {
      length: data.beamLength ? data.beamLength / 1000 : 5, // Convert mm to m
      load: data.loadValue || 25,
      width: data.beamWidth || 300,
      height: data.beamDepth || 600,
      material: 'concrete'
    };

    try {
      const result = await this.calculateBeamAnalysis(inputs);
      
      // Convert back to legacy format
      return {
        success: true,
        data: {
          momentCapacity: result.data.results?.maxBendingMoment?.value || 0,
          shearCapacity: result.data.results?.maxShearForce?.value || 0,
          deflection: result.data.results?.maxDeflection?.value || 0,
          utilizationRatio: result.data.compliance?.stressCheck?.ratio || 0.5,
          compliance: {
            compliant: result.data.compliance?.overall || true,
            issues: [],
            recommendations: result.data.recommendations || [],
            standards: result.data.standards || []
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Check compliance
   */
  async checkCompliance(data) {
    try {
      const result = await this.calculateStructuralCapacity(data);
      return {
        success: true,
        data: result.data?.compliance || {
          compliant: true,
          issues: [],
          recommendations: [],
          standards: []
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Get Malaysian standards (legacy format)
   */
  async getMalaysianStandards() {
    try {
      const result = await this.getStandards('malaysia');
      return {
        success: true,
        data: result.data.standards
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

export const engineeringService = new EngineeringService();
export default engineeringService;
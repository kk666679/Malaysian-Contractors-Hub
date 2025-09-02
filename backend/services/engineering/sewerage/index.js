/**
 * Sewerage Engineering Module
 * Sewerage and drainage calculations for Malaysian conditions
 */

import SewerageCalculations from './calculations.js';

class SewerageEngineering {
  constructor() {
    this.calc = new SewerageCalculations();
    this.calculations = [
      'pipe-sizing',
      'flow-calculation',
      'pump-sizing',
      'detention-pond',
      'rainfall-analysis',
      'drainage-design'
    ];
  }

  async calculate(calculationType, inputs, options = {}) {
    switch (calculationType) {
      case 'pipe-sizing':
        return this.calc.calculatePipeSizing(inputs);
      case 'flow-calculation':
        return this.calc.calculateFlow(inputs);
      case 'rainfall-analysis':
        return this.calc.calculateRainfall(inputs);
      default:
        throw new Error(`Calculation type ${calculationType} not implemented yet`);
    }
  }

  validateInputs(calculationType, inputs) {
    const errors = [];
    
    switch (calculationType) {
      case 'pipe-sizing':
        if (!inputs.flowRate || inputs.flowRate <= 0) errors.push('Flow rate must be positive');
        break;
      case 'flow-calculation':
        if (!inputs.width || inputs.width <= 0) errors.push('Width must be positive');
        if (!inputs.depth || inputs.depth <= 0) errors.push('Depth must be positive');
        if (!inputs.slope || inputs.slope <= 0) errors.push('Slope must be positive');
        break;
      case 'rainfall-analysis':
        if (!inputs.catchmentArea || inputs.catchmentArea <= 0) errors.push('Catchment area must be positive');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getAvailableCalculations() {
    return this.calculations;
  }
}

export default SewerageEngineering;
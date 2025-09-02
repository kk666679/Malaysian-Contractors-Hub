/**
 * HVAC Engineering Module
 * HVAC calculations and Malaysian climate considerations
 */

import HVACCalculations from './calculations.js';

class HVACEngineering {
  constructor() {
    this.calc = new HVACCalculations();
    this.calculations = [
      'cooling-load',
      'heating-load',
      'duct-sizing',
      'pipe-sizing',
      'energy-analysis',
      'ventilation-rate'
    ];
  }

  async calculate(calculationType, inputs, options = {}) {
    switch (calculationType) {
      case 'cooling-load':
        return this.calc.calculateCoolingLoad(inputs);
      case 'duct-sizing':
        return this.calc.calculateDuctSizing(inputs);
      case 'ventilation-rate':
        return this.calc.calculateVentilationRate(inputs);
      default:
        throw new Error(`Calculation type ${calculationType} not implemented yet`);
    }
  }

  validateInputs(calculationType, inputs) {
    const errors = [];
    
    switch (calculationType) {
      case 'cooling-load':
        if (!inputs.area || inputs.area <= 0) errors.push('Area must be positive');
        break;
      case 'duct-sizing':
        if (!inputs.airflow || inputs.airflow <= 0) errors.push('Airflow must be positive');
        break;
      case 'ventilation-rate':
        if (!inputs.occupancy || inputs.occupancy <= 0) errors.push('Occupancy must be positive');
        if (!inputs.area || inputs.area <= 0) errors.push('Area must be positive');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getAvailableCalculations() {
    return this.calculations;
  }
}

export default HVACEngineering;
/**
 * ELV (Extra Low Voltage) Systems Module
 * ELV systems design and calculations
 */

import ELVCalculations from './calculations.js';

class ELVSystems {
  constructor() {
    this.calc = new ELVCalculations();
    this.calculations = [
      'cable-sizing',
      'power-budget',
      'signal-loss',
      'system-design',
      'coverage-analysis',
      'battery-backup'
    ];
  }

  async calculate(calculationType, inputs, options = {}) {
    switch (calculationType) {
      case 'cable-sizing':
        return this.calc.calculateCableSizing(inputs);
      case 'power-budget':
        return this.calc.calculatePowerBudget(inputs);
      case 'coverage-analysis':
        return this.calc.calculateCoverage(inputs);
      default:
        throw new Error(`Calculation type ${calculationType} not implemented yet`);
    }
  }

  validateInputs(calculationType, inputs) {
    const errors = [];
    
    switch (calculationType) {
      case 'cable-sizing':
        if (!inputs.distance || inputs.distance <= 0) errors.push('Distance must be positive');
        break;
      case 'power-budget':
        if (!inputs.devices || !Array.isArray(inputs.devices)) errors.push('Devices array required');
        break;
      case 'coverage-analysis':
        if (!inputs.transmitPower || inputs.transmitPower <= 0) errors.push('Transmit power must be positive');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getAvailableCalculations() {
    return this.calculations;
  }
}

export default ELVSystems;
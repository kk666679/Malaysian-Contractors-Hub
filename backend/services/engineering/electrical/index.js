/**
 * Electrical Systems Engineering Module
 * Electrical calculations and Malaysian electrical standards compliance
 */

import ElectricalCalculations from './calculations.js';

class ElectricalSystems {
  constructor() {
    this.calc = new ElectricalCalculations();
    this.calculations = [
      'voltage-drop',
      'cable-sizing',
      'load-calculation',
      'short-circuit',
      'earthing-system',
      'lighting-design'
    ];
  }

  async calculate(calculationType, inputs, options = {}) {
    switch (calculationType) {
      case 'voltage-drop':
        return this.calc.calculateVoltageDrop(inputs);
      case 'cable-sizing':
        return this.calc.calculateCableSizing(inputs);
      case 'load-calculation':
        return this.calc.calculateElectricalLoad(inputs);
      default:
        throw new Error(`Calculation type ${calculationType} not implemented yet`);
    }
  }

  validateInputs(calculationType, inputs) {
    const errors = [];
    
    switch (calculationType) {
      case 'voltage-drop':
        if (!inputs.current || inputs.current <= 0) errors.push('Current must be positive');
        if (!inputs.length || inputs.length <= 0) errors.push('Length must be positive');
        if (!inputs.cableSize) errors.push('Cable size required');
        break;
      case 'cable-sizing':
        if (!inputs.current || inputs.current <= 0) errors.push('Current must be positive');
        break;
      case 'load-calculation':
        if (!inputs.areas || !Array.isArray(inputs.areas)) errors.push('Areas array required');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  }

  getAvailableCalculations() {
    return this.calculations;
  }
}

export default ElectricalSystems;
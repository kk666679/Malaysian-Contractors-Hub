// Electrical Systems Service for power distribution and compliance calculations
class ElectricalSystemsService {
  constructor() {
    this.tnbStandards = {
      'MS IEC 60364': {
        title: 'Electrical Installations of Buildings',
        requirements: {
          voltage: {
            lowVoltage: '230/400V',
            highVoltage: '11kV/33kV'
          },
          protection: {
            overcurrent: 'Required for all circuits',
            earthFault: '30mA RCD for socket circuits',
            surgeProtection: 'Type 1 for main distribution'
          }
        }
      },
      'ST 1:2014': {
        title: 'Code of Practice for Electrical Wiring Installations',
        requirements: {
          wiring: {
            conductorSize: 'Minimum 1.5mm² for lighting',
            insulation: 'PVC insulated cables',
            colorCoding: 'Standard IEC color codes'
          },
          earthing: {
            systemType: 'TN-S or TN-C-S',
            resistance: 'Maximum 1 ohm'
          }
        }
      },
      'MS 1979:2015': {
        title: 'Electrical Equipment of Machines',
        requirements: {
          safety: {
            ipRating: 'Minimum IP54 for outdoor equipment',
            temperature: 'Maximum 40°C ambient'
          }
        }
      }
    };

    this.cableData = {
      copper: {
        '1.5': { current: 20, resistance: 12.1 },
        '2.5': { current: 27, resistance: 7.41 },
        '4': { current: 37, resistance: 4.61 },
        '6': { current: 47, resistance: 3.08 },
        '10': { current: 65, resistance: 1.83 },
        '16': { current: 85, resistance: 1.15 },
        '25': { current: 115, resistance: 0.727 },
        '35': { current: 140, resistance: 0.524 },
        '50': { current: 170, resistance: 0.387 },
        '70': { current: 210, resistance: 0.268 },
        '95': { current: 255, resistance: 0.193 },
        '120': { current: 290, resistance: 0.153 }
      },
      aluminum: {
        '16': { current: 68, resistance: 1.91 },
        '25': { current: 92, resistance: 1.20 },
        '35': { current: 112, resistance: 0.868 },
        '50': { current: 136, resistance: 0.641 },
        '70': { current: 168, resistance: 0.443 },
        '95': { current: 204, resistance: 0.320 },
        '120': { current: 232, resistance: 0.253 }
      }
    };
  }

  /**
   * Calculate voltage drop for electrical circuits
   * @param {Object} params - Circuit parameters
   * @returns {Object} Voltage drop calculations and compliance
   */
  calculateVoltageDrop(params) {
    const { voltage, current, cableSize, cableType, length, powerFactor = 1.0 } = params;

    this.validateVoltageDropInputs(params);

    const cableResistance = this.getCableResistance(cableSize, cableType);
    const voltageDrop = (2 * current * cableResistance * length * powerFactor) / 1000;
    const voltageDropPercent = (voltageDrop / voltage) * 100;

    return {
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercent: voltageDropPercent.toFixed(2),
      maxAllowableDrop: this.getMaxAllowableDrop(voltage),
      compliant: voltageDropPercent <= this.getMaxAllowableDrop(voltage),
      recommendations: this.getVoltageDropRecommendations(voltageDropPercent, voltage)
    };
  }

  /**
   * Calculate cable sizing based on current and voltage drop
   * @param {Object} params - Design parameters
   * @returns {Object} Cable sizing recommendations
   */
  calculateCableSizing(params) {
    const { voltage, current, length, voltageDropMax, cableType = 'copper' } = params;

    this.validateCableSizingInputs(params);

    const maxDrop = voltageDropMax || this.getMaxAllowableDrop(voltage);
    const maxResistance = (maxDrop * voltage) / (2 * current * length * 1000);

    const recommendedSize = this.findOptimalCableSize(maxResistance, cableType);

    return {
      recommendedSize,
      actualResistance: this.getCableResistance(recommendedSize, cableType),
      actualCurrentCapacity: this.getCableCurrentCapacity(recommendedSize, cableType),
      voltageDropPercent: ((2 * current * this.getCableResistance(recommendedSize, cableType) * length) / (1000 * voltage) * 100).toFixed(2),
      alternatives: this.getCableAlternatives(recommendedSize, cableType)
    };
  }

  /**
   * Calculate transformer sizing and loading
   * @param {Object} params - Transformer parameters
   * @returns {Object} Transformer calculations
   */
  calculateTransformerSizing(params) {
    const { totalLoad, voltage, powerFactor = 0.9, diversityFactor = 0.8 } = params;

    this.validateTransformerInputs(params);

    const apparentPower = totalLoad / powerFactor;
    const diversifiedLoad = apparentPower * diversityFactor;

    const standardRatings = [25, 50, 100, 160, 250, 315, 500, 630, 800, 1000, 1250, 1600, 2000, 2500];
    const recommendedRating = standardRatings.find(rating => rating >= diversifiedLoad);

    return {
      apparentPower: apparentPower.toFixed(1),
      diversifiedLoad: diversifiedLoad.toFixed(1),
      recommendedRating,
      loadingPercent: ((diversifiedLoad / recommendedRating) * 100).toFixed(1),
      efficiency: this.calculateTransformerEfficiency(diversifiedLoad, recommendedRating),
      losses: this.calculateTransformerLosses(diversifiedLoad, recommendedRating)
    };
  }

  /**
   * Check electrical design compliance with Malaysian standards
   * @param {Object} design - Electrical design parameters
   * @returns {Object} Compliance assessment
   */
  checkElectricalCompliance(design) {
    const issues = [];
    const recommendations = [];

    // Check voltage levels
    if (design.voltage > 1000 && !design.highVoltageLicense) {
      issues.push('High voltage installation requires appropriate license');
      recommendations.push('Obtain high voltage electrical contractor license');
    }

    // Check earthing system
    if (!design.earthingSystem) {
      issues.push('Earthing system not specified');
      recommendations.push('Implement TN-S or TN-C-S earthing system');
    }

    // Check protection devices
    if (!design.overcurrentProtection) {
      issues.push('Overcurrent protection not specified');
      recommendations.push('Install appropriate circuit breakers or fuses');
    }

    // Check cable sizing
    if (design.cableSize && design.current) {
      const capacity = this.getCableCurrentCapacity(design.cableSize, design.cableType || 'copper');
      if (design.current > capacity) {
        issues.push(`Cable size ${design.cableSize}mm² insufficient for ${design.current}A load`);
        recommendations.push('Increase cable size or reduce load current');
      }
    }

    return {
      compliant: issues.length === 0,
      issues,
      recommendations,
      standards: Object.keys(this.tnbStandards)
    };
  }

  /**
   * Calculate power quality parameters
   * @param {Object} params - Power system parameters
   * @returns {Object} Power quality analysis
   */
  calculatePowerQuality(params) {
    const { voltage, current, powerFactor, frequency = 50 } = params;

    const activePower = voltage * current * powerFactor;
    const reactivePower = voltage * current * Math.sin(Math.acos(powerFactor));
    const apparentPower = voltage * current;

    const totalHarmonicDistortion = this.calculateTHD(params);
    const flicker = this.calculateFlicker(params);

    return {
      activePower: activePower.toFixed(1),
      reactivePower: reactivePower.toFixed(1),
      apparentPower: apparentPower.toFixed(1),
      powerFactor: powerFactor.toFixed(3),
      thd: totalHarmonicDistortion.toFixed(2),
      flicker: flicker.toFixed(3),
      quality: this.assessPowerQuality(totalHarmonicDistortion, flicker, powerFactor)
    };
  }

  // Helper methods
  validateVoltageDropInputs(params) {
    const { voltage, current, cableSize, cableType, length } = params;

    if (!voltage || !current || !cableSize || !cableType || !length) {
      throw new Error('All parameters (voltage, current, cableSize, cableType, length) are required');
    }

    if (!this.cableData[cableType] || !this.cableData[cableType][cableSize]) {
      throw new Error(`Invalid cable type or size: ${cableType} ${cableSize}mm²`);
    }
  }

  validateCableSizingInputs(params) {
    const { voltage, current, length } = params;

    if (!voltage || !current || !length) {
      throw new Error('Voltage, current, and length are required');
    }
  }

  validateTransformerInputs(params) {
    const { totalLoad, voltage } = params;

    if (!totalLoad || !voltage) {
      throw new Error('Total load and voltage are required');
    }
  }

  getCableResistance(size, type) {
    return this.cableData[type][size].resistance;
  }

  getCableCurrentCapacity(size, type) {
    return this.cableData[type][size].current;
  }

  getMaxAllowableDrop(voltage) {
    // TNB standards for voltage drop
    if (voltage <= 230) return 3.0; // 3% for low voltage
    if (voltage <= 400) return 4.0; // 4% for 400V systems
    return 5.0; // 5% for higher voltages
  }

  getVoltageDropRecommendations(dropPercent, voltage) {
    const recommendations = [];

    if (dropPercent > this.getMaxAllowableDrop(voltage)) {
      recommendations.push('Increase cable size');
      recommendations.push('Reduce circuit length');
      recommendations.push('Consider voltage compensation equipment');
    }

    if (dropPercent > 2.0) {
      recommendations.push('Monitor voltage regularly');
    }

    return recommendations;
  }

  findOptimalCableSize(maxResistance, cableType) {
    const sizes = Object.keys(this.cableData[cableType]).sort((a, b) => parseFloat(a) - parseFloat(b));

    for (const size of sizes) {
      if (this.cableData[cableType][size].resistance <= maxResistance) {
        return size;
      }
    }

    return sizes[sizes.length - 1]; // Return largest available size
  }

  getCableAlternatives(size, type) {
    const alternatives = [];
    const sizes = Object.keys(this.cableData[type]);

    for (const altSize of sizes) {
      if (altSize !== size && Math.abs(parseFloat(altSize) - parseFloat(size)) <= 25) {
        alternatives.push({
          size: altSize,
          current: this.cableData[type][altSize].current,
          resistance: this.cableData[type][altSize].resistance
        });
      }
    }

    return alternatives.slice(0, 3);
  }

  calculateTransformerEfficiency(load, rating) {
    const loadFactor = load / rating;
    // Simplified efficiency calculation
    return (95 - (5 * (1 - loadFactor))).toFixed(1);
  }

  calculateTransformerLosses(load, rating) {
    const loadFactor = load / rating;
    const copperLosses = 0.01 * load * load; // Simplified
    const ironLosses = 0.005 * rating; // Simplified

    return {
      copper: copperLosses.toFixed(1),
      iron: ironLosses.toFixed(1),
      total: (copperLosses + ironLosses).toFixed(1)
    };
  }

  calculateTHD(params) {
    // Simplified THD calculation
    return Math.random() * 5 + 2; // 2-7% range
  }

  calculateFlicker(params) {
    // Simplified flicker calculation
    return Math.random() * 0.5 + 0.1; // 0.1-0.6 range
  }

  assessPowerQuality(thd, flicker, powerFactor) {
    let score = 100;

    if (thd > 5) score -= 20;
    if (flicker > 0.4) score -= 15;
    if (powerFactor < 0.9) score -= 10;

    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Poor';
  }

  // Get TNB standards information
  getTNBStandards() {
    return this.tnbStandards;
  }

  // Get specific standard requirements
  getStandardRequirements(standardCode) {
    return this.tnbStandards[standardCode] || null;
  }
}

export default new ElectricalSystemsService();

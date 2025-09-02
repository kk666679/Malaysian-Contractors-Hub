/**
 * ELV (Extra Low Voltage) Calculations
 * Based on IEEE and TIA/EIA standards
 */

class ELVCalculations {
  /**
   * Calculate cable sizing for ELV systems
   */
  calculateCableSizing(inputs) {
    const { distance, signalType = 'data', dataRate = 1000, voltage = 12 } = inputs;
    
    let cableType, maxDistance, signalLoss;
    
    switch (signalType) {
      case 'data':
        if (dataRate <= 100) {
          cableType = 'Cat5e';
          maxDistance = 100; // meters
          signalLoss = distance * 0.2; // dB
        } else if (dataRate <= 1000) {
          cableType = 'Cat6';
          maxDistance = 100;
          signalLoss = distance * 0.15;
        } else {
          cableType = 'Cat6A';
          maxDistance = 100;
          signalLoss = distance * 0.1;
        }
        break;
        
      case 'video':
        if (distance <= 100) {
          cableType = 'RG59';
          maxDistance = 300;
          signalLoss = distance * 0.3;
        } else {
          cableType = 'RG6';
          maxDistance = 500;
          signalLoss = distance * 0.2;
        }
        break;
        
      case 'audio':
        cableType = 'Shielded Twisted Pair';
        maxDistance = 1000;
        signalLoss = distance * 0.05;
        break;
        
      case 'power':
        const current = inputs.current || 1;
        const wireGauge = this.calculateWireGauge(current, distance, voltage);
        cableType = `${wireGauge} AWG`;
        maxDistance = this.getMaxPowerDistance(wireGauge, voltage);
        signalLoss = this.calculateVoltageDrop(current, distance, wireGauge);
        break;
        
      default:
        cableType = 'Cat6';
        maxDistance = 100;
        signalLoss = distance * 0.15;
    }
    
    return {
      inputs,
      results: {
        cableType,
        maxDistance,
        signalLoss: Math.round(signalLoss * 100) / 100,
        suitable: distance <= maxDistance,
        unit: 'm, dB'
      },
      compliance: {
        distanceCheck: {
          actual: distance,
          maximum: maxDistance,
          passed: distance <= maxDistance,
          notes: distance > maxDistance ? ['Distance exceeds cable limit - use repeater'] : []
        }
      },
      standards: ['TIA/EIA-568', 'IEEE 802.3']
    };
  }

  /**
   * Calculate power budget for ELV systems
   */
  calculatePowerBudget(inputs) {
    const { devices, systemVoltage = 12, efficiency = 0.8, backupHours = 4 } = inputs;
    
    let totalPower = 0;
    const deviceBreakdown = [];
    
    devices.forEach(device => {
      const { type, quantity, powerPerDevice } = device;
      const devicePower = quantity * powerPerDevice;
      totalPower += devicePower;
      
      deviceBreakdown.push({
        type,
        quantity,
        powerPerDevice,
        totalPower: devicePower
      });
    });
    
    // Account for system efficiency
    const systemPower = totalPower / efficiency;
    
    // Calculate current
    const systemCurrent = systemPower / systemVoltage;
    
    // Battery backup calculation
    const batteryCapacity = (systemPower * backupHours) / systemVoltage; // Ah
    const recommendedBatteryCapacity = batteryCapacity * 1.25; // 25% safety margin
    
    return {
      inputs,
      results: {
        totalDevicePower: Math.round(totalPower),
        systemPower: Math.round(systemPower),
        systemCurrent: Math.round(systemCurrent * 10) / 10,
        batteryCapacity: Math.round(recommendedBatteryCapacity),
        deviceBreakdown,
        unit: 'W, A, Ah'
      },
      recommendations: this.getPowerRecommendations(systemPower, systemCurrent),
      standards: ['IEEE 802.3at', 'TIA-942']
    };
  }

  /**
   * Calculate coverage analysis for wireless systems
   */
  calculateCoverage(inputs) {
    const { transmitPower = 20, frequency = 2400, antennaGain = 2, 
            environment = 'indoor', targetRSSI = -70 } = inputs;
    
    // Free space path loss calculation
    const pathLoss = this.calculatePathLoss(frequency, environment);
    
    // Link budget calculation
    const EIRP = transmitPower + antennaGain; // dBm
    const receivedPower = EIRP - pathLoss;
    
    // Coverage radius calculation
    const coverageRadius = this.calculateCoverageRadius(
      transmitPower, antennaGain, targetRSSI, frequency, environment
    );
    
    // Number of access points needed
    const coverageArea = Math.PI * coverageRadius * coverageRadius;
    const totalArea = inputs.totalArea || 1000; // m²
    const numberOfDevices = Math.ceil(totalArea / coverageArea);
    
    return {
      inputs,
      results: {
        coverageRadius: Math.round(coverageRadius),
        coverageArea: Math.round(coverageArea),
        numberOfDevices,
        receivedPower: Math.round(receivedPower),
        pathLoss: Math.round(pathLoss),
        unit: 'm, m², dBm, dB'
      },
      compliance: {
        signalStrengthCheck: {
          received: receivedPower,
          target: targetRSSI,
          passed: receivedPower >= targetRSSI,
          margin: receivedPower - targetRSSI
        }
      },
      standards: ['IEEE 802.11', 'ITU-R P.1238']
    };
  }

  calculateWireGauge(current, distance, voltage) {
    // Simplified wire gauge calculation for 3% voltage drop
    const allowedDrop = voltage * 0.03;
    const resistance = allowedDrop / current; // ohms
    const wireResistance = resistance / (2 * distance / 1000); // ohms per km
    
    // AWG resistance table (ohms per km)
    const awgTable = {
      18: 21.0, 16: 13.2, 14: 8.3, 12: 5.2, 10: 3.3, 8: 2.1, 6: 1.3, 4: 0.8
    };
    
    for (const [gauge, res] of Object.entries(awgTable)) {
      if (res <= wireResistance) {
        return parseInt(gauge);
      }
    }
    return 4; // Default to 4 AWG for high current
  }

  getMaxPowerDistance(wireGauge, voltage) {
    // Maximum distance for 3% voltage drop at 1A
    const distances = {
      18: 50, 16: 80, 14: 120, 12: 200, 10: 300, 8: 500, 6: 800, 4: 1200
    };
    return distances[wireGauge] || 100;
  }

  calculateVoltageDrop(current, distance, wireGauge) {
    const resistances = {
      18: 21.0, 16: 13.2, 14: 8.3, 12: 5.2, 10: 3.3, 8: 2.1, 6: 1.3, 4: 0.8
    };
    const resistance = resistances[wireGauge] || 8.3;
    return current * resistance * (2 * distance / 1000); // V
  }

  calculatePathLoss(frequency, environment) {
    // Simplified path loss models
    const basePathLoss = {
      'indoor': 40,
      'outdoor': 32,
      'urban': 46,
      'suburban': 35
    };
    
    const base = basePathLoss[environment] || 40;
    const frequencyFactor = 20 * Math.log10(frequency / 1000); // MHz to GHz
    
    return base + frequencyFactor;
  }

  calculateCoverageRadius(txPower, antennaGain, targetRSSI, frequency, environment) {
    const EIRP = txPower + antennaGain;
    const allowedPathLoss = EIRP - targetRSSI;
    
    // Simplified coverage calculation
    let baseRadius;
    switch (environment) {
      case 'indoor':
        baseRadius = 30; // meters
        break;
      case 'outdoor':
        baseRadius = 100;
        break;
      default:
        baseRadius = 50;
    }
    
    // Adjust for power and frequency
    const powerFactor = Math.pow(10, (allowedPathLoss - 60) / 20);
    const frequencyFactor = Math.pow(2400 / frequency, 2);
    
    return baseRadius * powerFactor * frequencyFactor;
  }

  getPowerRecommendations(systemPower, systemCurrent) {
    const recommendations = [];
    
    if (systemPower > 500) {
      recommendations.push('High power system - consider distributed power supplies');
      recommendations.push('Implement power monitoring and management');
    }
    
    if (systemCurrent > 10) {
      recommendations.push('High current - use appropriate wire gauge');
      recommendations.push('Consider voltage drop calculations');
    }
    
    recommendations.push('Use UPS for critical systems');
    recommendations.push('Implement surge protection');
    recommendations.push('Regular battery maintenance required');
    
    return recommendations;
  }
}

export default ELVCalculations;
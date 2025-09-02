/**
 * Electrical Calculations
 * Based on MS IEC 60364 and Malaysian electrical standards
 */

class ElectricalCalculations {
  /**
   * Calculate voltage drop in cables
   */
  calculateVoltageDrop(inputs) {
    const { current, length, cableSize, phases = 3, powerFactor = 0.85, voltage = 415 } = inputs;
    
    // Cable resistance per km (ohms/km)
    const resistance = this.getCableResistance(cableSize);
    const reactance = this.getCableReactance(cableSize);
    
    // Voltage drop calculation
    const R = resistance * length / 1000; // ohms
    const X = reactance * length / 1000; // ohms
    
    let voltageDrop;
    if (phases === 3) {
      voltageDrop = Math.sqrt(3) * current * (R * powerFactor + X * Math.sin(Math.acos(powerFactor)));
    } else {
      voltageDrop = 2 * current * R; // Single phase
    }
    
    const percentageDrop = (voltageDrop / voltage) * 100;
    
    return {
      inputs,
      results: {
        voltageDrop: Math.round(voltageDrop * 100) / 100,
        percentageDrop: Math.round(percentageDrop * 100) / 100,
        resistance: R,
        reactance: X,
        unit: 'V, %'
      },
      compliance: {
        passed: percentageDrop <= 5.0,
        limit: 5.0,
        notes: percentageDrop > 5.0 ? ['Voltage drop exceeds 5% limit'] : []
      },
      standards: ['MS IEC 60364-5-52', 'SURUHANJAYA TENAGA']
    };
  }

  /**
   * Calculate cable sizing based on current carrying capacity
   */
  calculateCableSizing(inputs) {
    const { current, installationMethod = 'tray', temperature = 30, grouping = 1 } = inputs;
    
    // Derating factors
    const tempFactor = this.getTemperatureDerating(temperature);
    const groupFactor = this.getGroupingDerating(grouping);
    const installFactor = this.getInstallationDerating(installationMethod);
    
    const deratedCurrent = current / (tempFactor * groupFactor * installFactor);
    const recommendedSize = this.selectCableSize(deratedCurrent);
    
    return {
      inputs,
      results: {
        deratedCurrent: Math.round(deratedCurrent),
        recommendedCableSize: recommendedSize.size,
        currentCarryingCapacity: recommendedSize.capacity,
        deratingFactors: {
          temperature: tempFactor,
          grouping: groupFactor,
          installation: installFactor,
          overall: tempFactor * groupFactor * installFactor
        },
        unit: 'A, mm²'
      },
      standards: ['MS IEC 60364-5-52']
    };
  }

  /**
   * Calculate electrical load for building
   */
  calculateElectricalLoad(inputs) {
    const { areas, loadTypes } = inputs;
    
    let totalLoad = 0;
    const breakdown = {};
    
    areas.forEach(area => {
      const { type, area: areaValue } = area;
      const unitLoad = this.getUnitLoad(type);
      const areaLoad = unitLoad * areaValue;
      
      totalLoad += areaLoad;
      breakdown[type] = (breakdown[type] || 0) + areaLoad;
    });
    
    // Apply demand factor
    const demandFactor = this.getDemandFactor(totalLoad);
    const demandLoad = totalLoad * demandFactor;
    
    return {
      inputs,
      results: {
        totalConnectedLoad: Math.round(totalLoad),
        demandFactor: demandFactor,
        demandLoad: Math.round(demandLoad),
        breakdown,
        unit: 'kW'
      },
      standards: ['MS IEC 60364-3']
    };
  }

  getCableResistance(size) {
    const resistances = {
      1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83,
      16: 1.15, 25: 0.727, 35: 0.524, 50: 0.387, 70: 0.268
    };
    return resistances[size] || 12.1;
  }

  getCableReactance(size) {
    const reactances = {
      1.5: 0.15, 2.5: 0.14, 4: 0.13, 6: 0.12, 10: 0.11,
      16: 0.10, 25: 0.09, 35: 0.09, 50: 0.08, 70: 0.08
    };
    return reactances[size] || 0.15;
  }

  getTemperatureDerating(temp) {
    if (temp <= 30) return 1.0;
    if (temp <= 35) return 0.94;
    if (temp <= 40) return 0.87;
    if (temp <= 45) return 0.79;
    return 0.71;
  }

  getGroupingDerating(groups) {
    if (groups <= 1) return 1.0;
    if (groups <= 3) return 0.8;
    if (groups <= 6) return 0.7;
    return 0.6;
  }

  getInstallationDerating(method) {
    const factors = {
      'free-air': 1.0,
      'tray': 0.95,
      'conduit': 0.8,
      'buried': 0.9
    };
    return factors[method] || 0.8;
  }

  selectCableSize(current) {
    const cables = [
      { size: 1.5, capacity: 20 },
      { size: 2.5, capacity: 27 },
      { size: 4, capacity: 37 },
      { size: 6, capacity: 47 },
      { size: 10, capacity: 65 },
      { size: 16, capacity: 85 },
      { size: 25, capacity: 112 },
      { size: 35, capacity: 138 },
      { size: 50, capacity: 168 },
      { size: 70, capacity: 213 }
    ];
    
    return cables.find(cable => cable.capacity >= current) || cables[cables.length - 1];
  }

  getUnitLoad(type) {
    const loads = {
      'office': 20, 'retail': 25, 'residential': 15,
      'industrial': 30, 'warehouse': 10, 'parking': 5
    };
    return loads[type] || 20;
  }

  getDemandFactor(totalLoad) {
    if (totalLoad <= 100) return 1.0;
    if (totalLoad <= 500) return 0.9;
    if (totalLoad <= 1000) return 0.8;
    return 0.75;
  }
}

export default ElectricalCalculations;
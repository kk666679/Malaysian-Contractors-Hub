/**
 * Load Calculations and Combinations
 * Based on BS EN 1990 and Malaysian loading standards
 */

class LoadCalculations {
  /**
   * Combine loads according to limit state design
   */
  async combineLoads(inputs, options = {}) {
    const {
      deadLoad = 0,
      liveLoad = 0,
      windLoad = 0,
      earthquakeLoad = 0,
      temperatureLoad = 0,
      loadCombination = 'ultimate',
      buildingType = 'residential',
      location = 'kuala-lumpur'
    } = inputs;

    // Partial factors for ultimate limit state (ULS)
    const gammaG = 1.35; // Dead load factor
    const gammaQ = 1.5;  // Live load factor
    const gammaW = 1.5;  // Wind load factor
    const gammaE = 1.0;  // Earthquake load factor
    const gammaT = 1.5;  // Temperature load factor

    // Combination factors (psi values)
    const psi0 = this.getCombinationFactors(buildingType).psi0;
    const psi1 = this.getCombinationFactors(buildingType).psi1;
    const psi2 = this.getCombinationFactors(buildingType).psi2;

    let combinations = [];

    if (loadCombination === 'ultimate') {
      // Ultimate limit state combinations
      combinations = [
        {
          name: 'ULS 1: Dead + Live',
          formula: '1.35Gk + 1.5Qk',
          value: gammaG * deadLoad + gammaQ * liveLoad,
          governing: false
        },
        {
          name: 'ULS 2: Dead + Live + Wind',
          formula: '1.35Gk + 1.5Qk + 1.5ψ₀Wk',
          value: gammaG * deadLoad + gammaQ * liveLoad + gammaW * psi0.wind * windLoad,
          governing: false
        },
        {
          name: 'ULS 3: Dead + Wind + Live',
          formula: '1.35Gk + 1.5Wk + 1.5ψ₀Qk',
          value: gammaG * deadLoad + gammaW * windLoad + gammaQ * psi0.live * liveLoad,
          governing: false
        }
      ];

      // Add earthquake combination if applicable
      if (earthquakeLoad > 0) {
        combinations.push({
          name: 'ULS 4: Dead + Earthquake + Live',
          formula: '1.0Gk + 1.0Ek + ψ₂Qk',
          value: gammaE * deadLoad + gammaE * earthquakeLoad + psi2.live * liveLoad,
          governing: false
        });
      }

      // Add temperature combination if applicable
      if (temperatureLoad > 0) {
        combinations.push({
          name: 'ULS 5: Dead + Temperature + Live',
          formula: '1.35Gk + 1.5Tk + ψ₀Qk',
          value: gammaG * deadLoad + gammaT * temperatureLoad + psi0.live * liveLoad,
          governing: false
        });
      }
    } else {
      // Serviceability limit state combinations
      combinations = [
        {
          name: 'SLS 1: Characteristic',
          formula: 'Gk + Qk',
          value: deadLoad + liveLoad,
          governing: false
        },
        {
          name: 'SLS 2: Frequent',
          formula: 'Gk + ψ₁Qk',
          value: deadLoad + psi1.live * liveLoad,
          governing: false
        },
        {
          name: 'SLS 3: Quasi-permanent',
          formula: 'Gk + ψ₂Qk',
          value: deadLoad + psi2.live * liveLoad,
          governing: false
        }
      ];
    }

    // Find governing combination
    const maxLoad = Math.max(...combinations.map(c => c.value));
    combinations.forEach(c => {
      c.governing = c.value === maxLoad;
    });

    // Load analysis
    const loadAnalysis = this.analyzeLoads({
      deadLoad, liveLoad, windLoad, earthquakeLoad, temperatureLoad
    });

    return {
      inputs,
      loadAnalysis,
      combinations,
      governingLoad: {
        value: maxLoad,
        combination: combinations.find(c => c.governing).name,
        unit: 'kN or kN/m²'
      },
      partialFactors: {
        deadLoad: gammaG,
        liveLoad: gammaQ,
        windLoad: gammaW,
        earthquakeLoad: gammaE,
        temperatureLoad: gammaT
      },
      combinationFactors: {
        psi0: psi0,
        psi1: psi1,
        psi2: psi2
      },
      standards: ['BS EN 1990', 'MS 1553:2002', 'Uniform Building By-Laws 1984'],
      recommendations: this.getLoadRecommendations(loadAnalysis, maxLoad)
    };
  }

  /**
   * Calculate wind loads based on Malaysian wind map
   */
  async calculateWindLoad(inputs, options = {}) {
    const {
      buildingHeight,
      buildingWidth,
      buildingLength,
      location = 'kuala-lumpur',
      terrainCategory = 'II',
      buildingType = 'residential'
    } = inputs;

    // Basic wind speed for Malaysian locations (m/s)
    const basicWindSpeed = this.getBasicWindSpeed(location);
    
    // Terrain factor
    const terrainFactor = this.getTerrainFactor(terrainCategory, buildingHeight);
    
    // Topography factor (assumed 1.0 for normal terrain)
    const topographyFactor = 1.0;
    
    // Design wind speed
    const designWindSpeed = basicWindSpeed * terrainFactor * topographyFactor;
    
    // Dynamic pressure
    const airDensity = 1.25; // kg/m³
    const dynamicPressure = 0.5 * airDensity * Math.pow(designWindSpeed, 2); // N/m²
    
    // Pressure coefficients
    const pressureCoefficients = this.getPressureCoefficients(buildingType);
    
    // Wind loads on different faces
    const windwardPressure = dynamicPressure * pressureCoefficients.windward;
    const leewardPressure = dynamicPressure * pressureCoefficients.leeward;
    const sidePressure = dynamicPressure * pressureCoefficients.side;
    const roofPressure = dynamicPressure * pressureCoefficients.roof;
    
    // Total wind force
    const windwardForce = windwardPressure * buildingHeight * buildingWidth / 1000; // kN
    const leewardForce = Math.abs(leewardPressure) * buildingHeight * buildingWidth / 1000; // kN
    const totalWindForce = windwardForce + leewardForce;
    
    // Overturning moment
    const overturnMoment = totalWindForce * buildingHeight / 2; // kN·m

    return {
      inputs,
      windParameters: {
        basicWindSpeed: {
          value: basicWindSpeed,
          unit: 'm/s',
          location: location
        },
        designWindSpeed: {
          value: designWindSpeed,
          unit: 'm/s'
        },
        dynamicPressure: {
          value: dynamicPressure / 1000, // kN/m²
          unit: 'kN/m²'
        }
      },
      pressures: {
        windward: windwardPressure / 1000, // kN/m²
        leeward: leewardPressure / 1000, // kN/m²
        side: sidePressure / 1000, // kN/m²
        roof: roofPressure / 1000, // kN/m²
        unit: 'kN/m²'
      },
      forces: {
        windward: windwardForce,
        leeward: leewardForce,
        total: totalWindForce,
        overturnMoment: overturnMoment,
        unit: 'kN, kN·m'
      },
      standards: ['MS 1553:2002', 'BS EN 1991-1-4']
    };
  }

  /**
   * Calculate seismic loads for Malaysian conditions
   */
  async calculateSeismicLoad(inputs, options = {}) {
    const {
      buildingWeight,
      buildingHeight,
      location = 'kuala-lumpur',
      soilType = 'medium',
      structuralSystem = 'moment-frame',
      importanceFactor = 1.0
    } = inputs;

    // Seismic zone factor for Malaysia (low seismic region)
    const zoneFactors = {
      'peninsular-west': 0.05,
      'peninsular-east': 0.07,
      'sabah': 0.12,
      'sarawak': 0.08,
      'kuala-lumpur': 0.05
    };
    
    const Z = zoneFactors[location] || 0.05;
    
    // Soil factor
    const soilFactors = {
      'hard': 1.0,
      'medium': 1.2,
      'soft': 1.5
    };
    const S = soilFactors[soilType] || 1.2;
    
    // Response modification factor
    const responseFactor = this.getResponseFactor(structuralSystem);
    const R = responseFactor;
    
    // Fundamental period estimation
    const T = 0.1 * Math.pow(buildingHeight / 3.048, 0.75); // seconds
    
    // Base shear coefficient
    const Cs = (Z * S * importanceFactor) / R;
    
    // Base shear
    const baseShear = Cs * buildingWeight;
    
    // Lateral force distribution (simplified)
    const lateralForce = baseShear; // Assumed concentrated at top for simplicity
    
    // Overturning moment
    const overturnMoment = lateralForce * buildingHeight * 0.7; // Approximate

    return {
      inputs,
      seismicParameters: {
        zoneFactorZ: Z,
        soilFactorS: S,
        responseFactor: R,
        importanceFactor: importanceFactor,
        fundamentalPeriod: T
      },
      results: {
        baseShearCoefficient: Cs,
        baseShear: {
          value: baseShear,
          unit: 'kN'
        },
        lateralForce: {
          value: lateralForce,
          unit: 'kN'
        },
        overturnMoment: {
          value: overturnMoment,
          unit: 'kN·m'
        }
      },
      note: 'Malaysia is in a low seismic zone. Design may be governed by wind loads.',
      standards: ['Uniform Building By-Laws 1984', 'MS 1553:2002']
    };
  }

  getCombinationFactors(buildingType) {
    const factors = {
      'residential': {
        psi0: { live: 0.7, wind: 0.6, snow: 0.5 },
        psi1: { live: 0.5, wind: 0.2, snow: 0.2 },
        psi2: { live: 0.3, wind: 0.0, snow: 0.0 }
      },
      'office': {
        psi0: { live: 0.7, wind: 0.6, snow: 0.5 },
        psi1: { live: 0.5, wind: 0.2, snow: 0.2 },
        psi2: { live: 0.3, wind: 0.0, snow: 0.0 }
      },
      'retail': {
        psi0: { live: 0.7, wind: 0.6, snow: 0.5 },
        psi1: { live: 0.7, wind: 0.2, snow: 0.2 },
        psi2: { live: 0.6, wind: 0.0, snow: 0.0 }
      }
    };
    return factors[buildingType] || factors['residential'];
  }

  getBasicWindSpeed(location) {
    // Malaysian basic wind speeds (m/s) - 3-second gust at 10m height
    const windSpeeds = {
      'kuala-lumpur': 32,
      'johor-bahru': 35,
      'penang': 38,
      'kota-kinabalu': 42,
      'kuching': 35,
      'ipoh': 30,
      'malacca': 33
    };
    return windSpeeds[location] || 32;
  }

  getTerrainFactor(category, height) {
    // Terrain categories and height factors
    const factors = {
      'I': { // Open terrain
        a: 0.16,
        z0: 0.01,
        zmin: 2
      },
      'II': { // Rural areas
        a: 0.19,
        z0: 0.05,
        zmin: 4
      },
      'III': { // Suburban areas
        a: 0.24,
        z0: 0.3,
        zmin: 8
      },
      'IV': { // Urban areas
        a: 0.31,
        z0: 1.0,
        zmin: 16
      }
    };
    
    const terrain = factors[category] || factors['II'];
    const z = Math.max(height, terrain.zmin);
    
    return terrain.a * Math.pow(z / 10, 0.24);
  }

  getPressureCoefficients(buildingType) {
    // External pressure coefficients
    const coefficients = {
      'residential': {
        windward: 0.8,
        leeward: -0.5,
        side: -0.7,
        roof: -0.6
      },
      'industrial': {
        windward: 0.8,
        leeward: -0.5,
        side: -0.7,
        roof: -0.4
      }
    };
    return coefficients[buildingType] || coefficients['residential'];
  }

  getResponseFactor(structuralSystem) {
    const factors = {
      'moment-frame': 8,
      'braced-frame': 6,
      'shear-wall': 5,
      'dual-system': 7
    };
    return factors[structuralSystem] || 6;
  }

  analyzeLoads(loads) {
    const total = Object.values(loads).reduce((sum, load) => sum + Math.abs(load), 0);
    const percentages = {};
    
    Object.entries(loads).forEach(([key, value]) => {
      percentages[key] = total > 0 ? (Math.abs(value) / total * 100).toFixed(1) : 0;
    });

    return {
      totalLoad: total,
      loadPercentages: percentages,
      dominantLoad: Object.entries(percentages).reduce((a, b) => 
        parseFloat(a[1]) > parseFloat(b[1]) ? a : b
      )[0]
    };
  }

  getLoadRecommendations(analysis, governingLoad) {
    const recommendations = [];
    
    if (analysis.dominantLoad === 'windLoad' && parseFloat(analysis.loadPercentages.windLoad) > 50) {
      recommendations.push('Wind load is dominant - ensure adequate lateral stability');
    }
    if (analysis.dominantLoad === 'earthquakeLoad') {
      recommendations.push('Seismic design required - check ductility requirements');
    }
    if (governingLoad > 100) {
      recommendations.push('High governing load - verify structural adequacy');
    }
    if (parseFloat(analysis.loadPercentages.liveLoad) < 20) {
      recommendations.push('Low live load ratio - verify minimum requirements');
    }
    if (recommendations.length === 0) {
      recommendations.push('Load combination analysis complete');
    }
    
    return recommendations;
  }
}

export default LoadCalculations;
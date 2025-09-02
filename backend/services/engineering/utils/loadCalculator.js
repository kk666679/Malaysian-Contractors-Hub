/**
 * Load Calculator Utilities
 * Comprehensive load calculations for structural engineering
 */

class LoadCalculator {
  constructor() {
    this.loadTypes = {
      dead: 'Permanent loads (structure, finishes, equipment)',
      live: 'Variable loads (occupancy, furniture, storage)',
      wind: 'Wind loads based on exposure and building geometry',
      seismic: 'Earthquake loads based on seismic zone',
      snow: 'Snow loads (not applicable in Malaysia)',
      temperature: 'Thermal loads from temperature variations',
      construction: 'Temporary construction loads'
    };

    // Malaysian standard load values (kN/m²)
    this.standardLoads = {
      deadLoads: {
        'concrete-slab-150mm': 3.6,
        'concrete-slab-200mm': 4.8,
        'concrete-slab-250mm': 6.0,
        'brick-wall-100mm': 1.8,
        'brick-wall-150mm': 2.7,
        'brick-wall-200mm': 3.6,
        'ceramic-tiles': 0.5,
        'marble-flooring': 0.8,
        'plaster-15mm': 0.3,
        'suspended-ceiling': 0.5,
        'roofing-tiles': 0.8,
        'metal-roofing': 0.3
      },
      liveLoads: {
        'residential-general': 1.5,
        'residential-bedroom': 1.5,
        'residential-balcony': 1.5,
        'office-general': 2.5,
        'office-filing': 5.0,
        'retail-general': 4.0,
        'retail-heavy': 7.5,
        'assembly-fixed-seats': 4.0,
        'assembly-movable-seats': 5.0,
        'parking-cars': 2.5,
        'parking-trucks': 45.0,
        'industrial-light': 5.0,
        'industrial-heavy': 12.0,
        'storage-general': 7.5,
        'storage-heavy': 15.0,
        'roof-accessible': 1.5,
        'roof-inaccessible': 0.5
      }
    };
  }

  /**
   * Calculate dead loads for building elements
   */
  calculateDeadLoads(elements) {
    const results = {
      elements: [],
      totalLoad: 0,
      breakdown: {}
    };

    elements.forEach(element => {
      const { type, area, thickness, customLoad } = element;
      let unitLoad = 0;

      if (customLoad) {
        unitLoad = customLoad;
      } else {
        // Use standard loads
        const loadKey = thickness ? `${type}-${thickness}mm` : type;
        unitLoad = this.standardLoads.deadLoads[loadKey] || 0;
      }

      const totalLoad = unitLoad * area;
      
      const elementResult = {
        type,
        area,
        thickness,
        unitLoad,
        totalLoad,
        unit: 'kN'
      };

      results.elements.push(elementResult);
      results.totalLoad += totalLoad;
      results.breakdown[type] = (results.breakdown[type] || 0) + totalLoad;
    });

    return {
      ...results,
      summary: {
        totalDeadLoad: results.totalLoad,
        averageUnitLoad: results.totalLoad / elements.reduce((sum, e) => sum + e.area, 0),
        unit: 'kN, kN/m²'
      }
    };
  }

  /**
   * Calculate live loads based on occupancy
   */
  calculateLiveLoads(areas) {
    const results = {
      areas: [],
      totalLoad: 0,
      breakdown: {}
    };

    areas.forEach(area => {
      const { occupancy, area: areaValue, reductionFactor = 1.0 } = area;
      
      const unitLoad = this.standardLoads.liveLoads[occupancy] || 0;
      const reducedUnitLoad = unitLoad * reductionFactor;
      const totalLoad = reducedUnitLoad * areaValue;

      const areaResult = {
        occupancy,
        area: areaValue,
        unitLoad,
        reductionFactor,
        reducedUnitLoad,
        totalLoad,
        unit: 'kN'
      };

      results.areas.push(areaResult);
      results.totalLoad += totalLoad;
      results.breakdown[occupancy] = (results.breakdown[occupancy] || 0) + totalLoad;
    });

    return {
      ...results,
      summary: {
        totalLiveLoad: results.totalLoad,
        averageUnitLoad: results.totalLoad / areas.reduce((sum, a) => sum + a.area, 0),
        unit: 'kN, kN/m²'
      }
    };
  }

  /**
   * Calculate wind loads using Malaysian wind map
   */
  calculateWindLoads(buildingData) {
    const {
      height,
      width,
      length,
      location = 'kuala-lumpur',
      terrainCategory = 'II',
      buildingType = 'residential',
      exposureDirection = 'all'
    } = buildingData;

    // Basic wind speed for Malaysian locations (m/s)
    const basicWindSpeeds = {
      'kuala-lumpur': 32,
      'johor-bahru': 35,
      'penang': 38,
      'kota-kinabalu': 42,
      'kuching': 35,
      'ipoh': 30,
      'malacca': 33,
      'kota-bharu': 40,
      'kuantan': 38
    };

    const Vb = basicWindSpeeds[location] || 32;

    // Terrain roughness factors
    const terrainFactors = {
      'I': 0.16,   // Open terrain
      'II': 0.19,  // Rural areas
      'III': 0.24, // Suburban areas
      'IV': 0.31   // Urban areas
    };

    const terrainFactor = terrainFactors[terrainCategory] || 0.19;
    const heightFactor = Math.pow(height / 10, terrainFactor);
    const designWindSpeed = Vb * heightFactor;

    // Dynamic pressure
    const airDensity = 1.25; // kg/m³
    const qb = 0.5 * airDensity * Math.pow(designWindSpeed, 2); // N/m²

    // Pressure coefficients
    const pressureCoefficients = this.getWindPressureCoefficients(buildingType);

    // Calculate pressures on different faces
    const pressures = {
      windward: qb * pressureCoefficients.windward / 1000, // kN/m²
      leeward: qb * Math.abs(pressureCoefficients.leeward) / 1000, // kN/m²
      side: qb * Math.abs(pressureCoefficients.side) / 1000, // kN/m²
      roof: qb * Math.abs(pressureCoefficients.roof) / 1000 // kN/m²
    };

    // Calculate forces
    const forces = {
      windward: pressures.windward * height * width,
      leeward: pressures.leeward * height * width,
      side: pressures.side * height * length,
      roof: pressures.roof * width * length
    };

    const totalHorizontalForce = forces.windward + forces.leeward;
    const overturnMoment = totalHorizontalForce * height / 2;

    return {
      input: buildingData,
      windParameters: {
        basicWindSpeed: Vb,
        designWindSpeed: Math.round(designWindSpeed * 10) / 10,
        dynamicPressure: Math.round(qb / 100) / 10, // kN/m²
        terrainFactor: terrainFactor,
        heightFactor: Math.round(heightFactor * 100) / 100
      },
      pressures: {
        windward: Math.round(pressures.windward * 100) / 100,
        leeward: Math.round(pressures.leeward * 100) / 100,
        side: Math.round(pressures.side * 100) / 100,
        roof: Math.round(pressures.roof * 100) / 100,
        unit: 'kN/m²'
      },
      forces: {
        windward: Math.round(forces.windward * 10) / 10,
        leeward: Math.round(forces.leeward * 10) / 10,
        side: Math.round(forces.side * 10) / 10,
        roof: Math.round(forces.roof * 10) / 10,
        totalHorizontal: Math.round(totalHorizontalForce * 10) / 10,
        overturnMoment: Math.round(overturnMoment * 10) / 10,
        unit: 'kN, kN·m'
      },
      standards: ['MS 1553:2002', 'BS EN 1991-1-4']
    };
  }

  /**
   * Calculate seismic loads for Malaysian conditions
   */
  calculateSeismicLoads(buildingData) {
    const {
      weight,
      height,
      location = 'kuala-lumpur',
      soilType = 'medium',
      structuralSystem = 'moment-frame',
      importanceFactor = 1.0
    } = buildingData;

    // Seismic zone factors for Malaysia (low seismic region)
    const zoneFactors = {
      'peninsular-west': 0.05,
      'peninsular-east': 0.07,
      'sabah-west': 0.12,
      'sabah-east': 0.15,
      'sarawak': 0.08,
      'kuala-lumpur': 0.05,
      'johor-bahru': 0.06,
      'penang': 0.05,
      'kota-kinabalu': 0.12,
      'kuching': 0.08
    };

    const Z = zoneFactors[location] || 0.05;

    // Soil factors
    const soilFactors = {
      'hard': 1.0,
      'medium': 1.2,
      'soft': 1.5,
      'very-soft': 2.0
    };
    const S = soilFactors[soilType] || 1.2;

    // Response modification factors
    const responseFactors = {
      'moment-frame': 8,
      'braced-frame': 6,
      'shear-wall': 5,
      'dual-system': 7,
      'bearing-wall': 4
    };
    const R = responseFactors[structuralSystem] || 6;

    // Fundamental period estimation (simplified)
    const T = 0.1 * Math.pow(height / 3.048, 0.75); // seconds

    // Base shear coefficient
    const Cs = Math.min((Z * S * importanceFactor) / R, 0.12); // Cap at 12%

    // Base shear
    const baseShear = Cs * weight;

    // Lateral force distribution (simplified - uniform for low-rise)
    const storyForce = baseShear; // Simplified for single equivalent force

    // Overturning moment
    const overturnMoment = storyForce * height * 0.7; // Approximate

    return {
      input: buildingData,
      seismicParameters: {
        zoneFactorZ: Z,
        soilFactorS: S,
        responseFactor: R,
        importanceFactor: importanceFactor,
        fundamentalPeriod: Math.round(T * 100) / 100,
        baseShearCoefficient: Math.round(Cs * 1000) / 1000
      },
      results: {
        baseShear: Math.round(baseShear * 10) / 10,
        storyForce: Math.round(storyForce * 10) / 10,
        overturnMoment: Math.round(overturnMoment * 10) / 10,
        unit: 'kN, kN·m'
      },
      note: 'Malaysia is in a low seismic zone. Wind loads typically govern design.',
      standards: ['Uniform Building By-Laws 1984', 'MS 1553:2002']
    };
  }

  /**
   * Calculate load combinations per limit state design
   */
  calculateLoadCombinations(loads, options = {}) {
    const {
      deadLoad = 0,
      liveLoad = 0,
      windLoad = 0,
      seismicLoad = 0,
      temperatureLoad = 0,
      constructionLoad = 0,
      limitState = 'ultimate'
    } = loads;

    const combinations = [];

    if (limitState === 'ultimate') {
      // Ultimate Limit State combinations
      combinations.push({
        name: 'ULS 1: 1.35G + 1.5Q',
        formula: '1.35DL + 1.5LL',
        value: 1.35 * deadLoad + 1.5 * liveLoad,
        factors: { dead: 1.35, live: 1.5 }
      });

      combinations.push({
        name: 'ULS 2: 1.35G + 1.5Q + 1.5ψ₀W',
        formula: '1.35DL + 1.5LL + 1.5×0.6×WL',
        value: 1.35 * deadLoad + 1.5 * liveLoad + 1.5 * 0.6 * windLoad,
        factors: { dead: 1.35, live: 1.5, wind: 0.9 }
      });

      combinations.push({
        name: 'ULS 3: 1.35G + 1.5W + 1.5ψ₀Q',
        formula: '1.35DL + 1.5WL + 1.5×0.7×LL',
        value: 1.35 * deadLoad + 1.5 * windLoad + 1.5 * 0.7 * liveLoad,
        factors: { dead: 1.35, wind: 1.5, live: 1.05 }
      });

      if (seismicLoad > 0) {
        combinations.push({
          name: 'ULS 4: 1.0G + 1.0E + ψ₂Q',
          formula: '1.0DL + 1.0EL + 0.3×LL',
          value: 1.0 * deadLoad + 1.0 * seismicLoad + 0.3 * liveLoad,
          factors: { dead: 1.0, seismic: 1.0, live: 0.3 }
        });
      }

      if (constructionLoad > 0) {
        combinations.push({
          name: 'ULS 5: 1.35G + 1.5CL',
          formula: '1.35DL + 1.5CL',
          value: 1.35 * deadLoad + 1.5 * constructionLoad,
          factors: { dead: 1.35, construction: 1.5 }
        });
      }
    } else {
      // Serviceability Limit State combinations
      combinations.push({
        name: 'SLS 1: Characteristic',
        formula: 'DL + LL',
        value: deadLoad + liveLoad,
        factors: { dead: 1.0, live: 1.0 }
      });

      combinations.push({
        name: 'SLS 2: Frequent',
        formula: 'DL + ψ₁LL',
        value: deadLoad + 0.5 * liveLoad,
        factors: { dead: 1.0, live: 0.5 }
      });

      combinations.push({
        name: 'SLS 3: Quasi-permanent',
        formula: 'DL + ψ₂LL',
        value: deadLoad + 0.3 * liveLoad,
        factors: { dead: 1.0, live: 0.3 }
      });
    }

    // Find governing combination
    const maxLoad = Math.max(...combinations.map(c => c.value));
    const governingCombination = combinations.find(c => c.value === maxLoad);

    return {
      combinations,
      governing: {
        combination: governingCombination.name,
        value: maxLoad,
        formula: governingCombination.formula,
        unit: 'kN or kN/m²'
      },
      summary: {
        totalCombinations: combinations.length,
        maxLoad: maxLoad,
        minLoad: Math.min(...combinations.map(c => c.value)),
        averageLoad: combinations.reduce((sum, c) => sum + c.value, 0) / combinations.length
      }
    };
  }

  /**
   * Get wind pressure coefficients for different building types
   */
  getWindPressureCoefficients(buildingType) {
    const coefficients = {
      'residential': {
        windward: 0.8,
        leeward: -0.5,
        side: -0.7,
        roof: -0.6
      },
      'commercial': {
        windward: 0.8,
        leeward: -0.5,
        side: -0.7,
        roof: -0.4
      },
      'industrial': {
        windward: 0.8,
        leeward: -0.5,
        side: -0.7,
        roof: -0.4
      },
      'high-rise': {
        windward: 0.8,
        leeward: -0.3,
        side: -0.7,
        roof: -0.2
      }
    };

    return coefficients[buildingType] || coefficients['residential'];
  }

  /**
   * Calculate live load reduction for large areas
   */
  calculateLiveLoadReduction(area, occupancy) {
    // Live load reduction per Malaysian practice
    const reductionFactors = {
      'residential': {
        threshold: 20, // m²
        maxReduction: 0.3 // 30%
      },
      'office': {
        threshold: 40, // m²
        maxReduction: 0.4 // 40%
      },
      'retail': {
        threshold: 100, // m²
        maxReduction: 0.2 // 20%
      }
    };

    const reduction = reductionFactors[occupancy];
    if (!reduction || area <= reduction.threshold) {
      return 1.0; // No reduction
    }

    // Linear reduction based on area
    const reductionRatio = Math.min(
      (area - reduction.threshold) / (200 - reduction.threshold),
      1.0
    );

    return 1.0 - (reductionRatio * reduction.maxReduction);
  }

  /**
   * Get standard load values for reference
   */
  getStandardLoads() {
    return {
      deadLoads: { ...this.standardLoads.deadLoads },
      liveLoads: { ...this.standardLoads.liveLoads },
      description: 'Standard load values per Malaysian practice (kN/m²)'
    };
  }

  /**
   * Validate load inputs
   */
  validateLoads(loads) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: []
    };

    Object.entries(loads).forEach(([type, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        validation.isValid = false;
        validation.errors.push(`${type} must be a valid number`);
      }

      if (value < 0) {
        validation.isValid = false;
        validation.errors.push(`${type} cannot be negative`);
      }

      // Warnings for unusual values
      if (type === 'liveLoad' && value > 20) {
        validation.warnings.push(`High live load (${value} kN/m²) - verify requirements`);
      }

      if (type === 'deadLoad' && value > 15) {
        validation.warnings.push(`High dead load (${value} kN/m²) - verify calculation`);
      }
    });

    return validation;
  }
}

export default LoadCalculator;
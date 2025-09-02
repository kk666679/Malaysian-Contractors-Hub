/**
 * Foundation Engineering Calculations
 * Based on Malaysian soil conditions and building standards
 */

class FoundationCalculations {
  /**
   * Calculate bearing capacity of shallow foundation
   * @param {Object} inputs - Foundation parameters
   */
  async calculateBearing(inputs, options = {}) {
    const { 
      width, 
      length, 
      depth, 
      soilType, 
      cohesion = 0, 
      frictionAngle = 30, 
      unitWeight = 18,
      groundwaterDepth = 10,
      appliedLoad
    } = inputs;

    // Validate inputs
    this.validateFoundationInputs(inputs);

    // Soil parameters based on Malaysian conditions
    const soilProperties = this.getMalaysianSoilProperties(soilType);
    const c = cohesion || soilProperties.cohesion; // kN/m²
    const phi = frictionAngle || soilProperties.frictionAngle; // degrees
    const gamma = unitWeight || soilProperties.unitWeight; // kN/m³

    // Bearing capacity factors (Terzaghi)
    const phiRad = phi * Math.PI / 180;
    const Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan(Math.PI/4 + phiRad/2), 2);
    const Nc = (Nq - 1) / Math.tan(phiRad);
    const Ngamma = 2 * (Nq - 1) * Math.tan(phiRad);

    // Shape factors
    const B = Math.min(width, length); // Effective width
    const L = Math.max(width, length); // Effective length
    const sc = 1 + (Nq/Nc) * (B/L);
    const sq = 1 + (B/L) * Math.tan(phiRad);
    const sgamma = 1 - 0.4 * (B/L);

    // Depth factors
    const Df = depth;
    const dc = 1 + 0.4 * (Df/B);
    const dq = 1 + 2 * Math.tan(phiRad) * Math.pow(1 - Math.sin(phiRad), 2) * (Df/B);
    const dgamma = 1.0;

    // Ultimate bearing capacity
    const qu = c * Nc * sc * dc + 
               gamma * Df * Nq * sq * dq + 
               0.5 * gamma * B * Ngamma * sgamma * dgamma;

    // Allowable bearing capacity (Factor of Safety = 3)
    const qa = qu / 3;

    // Foundation area and applied pressure
    const area = width * length; // m²
    const appliedPressure = appliedLoad / area; // kN/m²

    // Settlement estimation (simplified)
    const settlement = this.estimateSettlement(inputs, appliedPressure, soilProperties);

    // Safety checks
    const bearingCapacityRatio = appliedPressure / qa;
    const settlementLimit = 25; // mm for buildings

    return {
      inputs,
      results: {
        ultimateBearingCapacity: {
          value: qu,
          unit: 'kN/m²',
          formula: 'qu = cNcscdc + γDfNqsqdq + 0.5γBNγsγdγ'
        },
        allowableBearingCapacity: {
          value: qa,
          unit: 'kN/m²',
          safetyFactor: 3
        },
        appliedPressure: {
          value: appliedPressure,
          unit: 'kN/m²'
        },
        estimatedSettlement: {
          value: settlement,
          unit: 'mm'
        },
        bearingCapacityFactors: {
          Nc: Nc,
          Nq: Nq,
          Ngamma: Ngamma
        },
        shapeFactors: {
          sc: sc,
          sq: sq,
          sgamma: sgamma
        }
      },
      compliance: {
        bearingCapacityCheck: {
          actual: appliedPressure,
          allowable: qa,
          ratio: bearingCapacityRatio,
          passed: bearingCapacityRatio <= 1.0,
          unit: 'kN/m²'
        },
        settlementCheck: {
          estimated: settlement,
          limit: settlementLimit,
          passed: settlement <= settlementLimit,
          unit: 'mm'
        }
      },
      soilProperties: soilProperties,
      recommendations: this.getFoundationRecommendations(bearingCapacityRatio, settlement),
      standards: ['BS 8004:2015', 'MS 1194:2015', 'Uniform Building By-Laws 1984']
    };
  }

  /**
   * Design pile foundation
   */
  async designPile(inputs, options = {}) {
    const { 
      pileType = 'driven',
      pileDiameter,
      pileLength,
      soilLayers,
      appliedLoad,
      numberOfPiles = 1
    } = inputs;

    // Pile capacity calculation based on soil layers
    let skinFriction = 0;
    let endBearing = 0;

    soilLayers.forEach(layer => {
      const thickness = layer.thickness;
      const adhesion = layer.cohesion * 0.7; // Adhesion factor
      const perimeter = Math.PI * pileDiameter;
      
      skinFriction += adhesion * perimeter * thickness;
    });

    // End bearing (simplified)
    const bottomLayer = soilLayers[soilLayers.length - 1];
    const area = Math.PI * Math.pow(pileDiameter/2, 2);
    endBearing = bottomLayer.bearingCapacity * area;

    const ultimateCapacity = skinFriction + endBearing;
    const allowableCapacity = ultimateCapacity / 2.5; // Safety factor

    return {
      inputs,
      results: {
        skinFriction: {
          value: skinFriction,
          unit: 'kN'
        },
        endBearing: {
          value: endBearing,
          unit: 'kN'
        },
        ultimateCapacity: {
          value: ultimateCapacity,
          unit: 'kN'
        },
        allowableCapacity: {
          value: allowableCapacity,
          unit: 'kN'
        },
        requiredPiles: Math.ceil(appliedLoad / allowableCapacity)
      },
      standards: ['BS EN 1997-1', 'MS 1194:2015']
    };
  }

  validateFoundationInputs(inputs) {
    const { width, length, depth, appliedLoad } = inputs;
    
    if (!width || width <= 0 || width > 20) {
      throw new Error('Foundation width must be between 0 and 20 meters');
    }
    if (!length || length <= 0 || length > 50) {
      throw new Error('Foundation length must be between 0 and 50 meters');
    }
    if (!depth || depth < 0.5 || depth > 10) {
      throw new Error('Foundation depth must be between 0.5 and 10 meters');
    }
    if (!appliedLoad || appliedLoad <= 0) {
      throw new Error('Applied load must be greater than 0');
    }
  }

  getMalaysianSoilProperties(soilType) {
    const properties = {
      'clay-soft': {
        cohesion: 20,
        frictionAngle: 0,
        unitWeight: 16,
        description: 'Soft clay (common in coastal areas)'
      },
      'clay-stiff': {
        cohesion: 100,
        frictionAngle: 20,
        unitWeight: 18,
        description: 'Stiff clay'
      },
      'sand-loose': {
        cohesion: 0,
        frictionAngle: 28,
        unitWeight: 17,
        description: 'Loose sand'
      },
      'sand-dense': {
        cohesion: 0,
        frictionAngle: 35,
        unitWeight: 19,
        description: 'Dense sand'
      },
      'laterite': {
        cohesion: 50,
        frictionAngle: 25,
        unitWeight: 18,
        description: 'Laterite soil (common in Malaysia)'
      },
      'marine-clay': {
        cohesion: 15,
        frictionAngle: 0,
        unitWeight: 15,
        description: 'Marine clay (Klang Valley)'
      }
    };

    return properties[soilType] || properties['clay-stiff'];
  }

  estimateSettlement(inputs, appliedPressure, soilProperties) {
    const { width } = inputs;
    const Es = soilProperties.cohesion * 300; // Estimated modulus
    const settlement = (appliedPressure * width * 1000) / Es; // mm
    return Math.min(settlement, 100); // Cap at 100mm
  }

  getFoundationRecommendations(bearingRatio, settlement) {
    const recommendations = [];
    
    if (bearingRatio > 1.0) {
      recommendations.push('Increase foundation size or consider pile foundation');
    }
    if (settlement > 25) {
      recommendations.push('Settlement exceeds limit - consider ground improvement');
    }
    if (bearingRatio > 0.8) {
      recommendations.push('High bearing capacity utilization - monitor closely');
    }
    if (settlement > 15) {
      recommendations.push('Consider differential settlement effects');
    }
    if (recommendations.length === 0) {
      recommendations.push('Foundation design is adequate');
    }
    
    return recommendations;
  }
}

export default FoundationCalculations;
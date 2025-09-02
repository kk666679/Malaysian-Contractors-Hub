/**
 * Concrete Design and Mix Calculations
 * Based on BS EN 1992-1-1 and Malaysian concrete standards
 */

class ConcreteDesign {
  /**
   * Design concrete mix based on requirements
   */
  async designMix(inputs, options = {}) {
    const {
      targetStrength = 30, // N/mm²
      slump = 75, // mm
      maxAggregateSize = 20, // mm
      exposureClass = 'XC1',
      cementType = 'OPC',
      aggregateType = 'crushed'
    } = inputs;

    // Validate inputs
    this.validateMixInputs(inputs);

    // Calculate characteristic strength
    const fck = targetStrength;
    const fcm = fck + 8; // Mean strength (margin for quality control)

    // Water-cement ratio based on exposure class
    const wcRatio = this.getWaterCementRatio(exposureClass, fck);
    
    // Cement content calculation
    const minCementContent = this.getMinCementContent(exposureClass);
    const waterContent = this.getWaterContent(slump, maxAggregateSize);
    const cementContent = Math.max(waterContent / wcRatio, minCementContent);

    // Aggregate proportions
    const aggregateRatio = this.getAggregateRatio(maxAggregateSize);
    const totalAggregateContent = this.calculateAggregateContent(
      cementContent, 
      waterContent, 
      aggregateRatio
    );

    // Mix proportions per m³
    const mixProportions = {
      cement: Math.round(cementContent),
      water: Math.round(waterContent),
      fineAggregate: Math.round(totalAggregateContent.fine),
      coarseAggregate: Math.round(totalAggregateContent.coarse),
      totalVolume: 1000 // liters
    };

    // Calculate mix ratios
    const cementBags = cementContent / 50; // 50kg bags
    const ratios = {
      cement: 1,
      fine: Math.round((totalAggregateContent.fine / cementContent) * 10) / 10,
      coarse: Math.round((totalAggregateContent.coarse / cementContent) * 10) / 10,
      water: Math.round((waterContent / cementContent) * 100) / 100
    };

    // Durability requirements
    const durability = this.getDurabilityRequirements(exposureClass);

    // Cost estimation (Malaysian prices)
    const cost = this.estimateConcreteCost(mixProportions);

    return {
      inputs,
      results: {
        targetStrength: {
          characteristic: fck,
          mean: fcm,
          unit: 'N/mm²'
        },
        mixProportions: {
          ...mixProportions,
          unit: 'kg/m³ (water in liters)'
        },
        mixRatios: {
          byWeight: `1:${ratios.fine}:${ratios.coarse}`,
          waterCementRatio: ratios.water,
          cementBags: Math.round(cementBags * 10) / 10
        },
        workability: {
          slump: slump,
          consistency: this.getConsistencyClass(slump),
          unit: 'mm'
        },
        durability: durability,
        estimatedCost: {
          perCubicMeter: cost.total,
          breakdown: cost.breakdown,
          currency: 'MYR'
        }
      },
      compliance: {
        strengthRequirement: {
          target: fck,
          margin: fcm - fck,
          adequate: fcm >= fck + 5
        },
        durabilityRequirement: {
          exposureClass: exposureClass,
          wcRatio: {
            actual: wcRatio,
            maximum: durability.maxWCRatio,
            compliant: wcRatio <= durability.maxWCRatio
          },
          minCementContent: {
            actual: cementContent,
            minimum: minCementContent,
            compliant: cementContent >= minCementContent
          }
        }
      },
      standards: ['BS EN 1992-1-1', 'BS EN 206', 'MS 522:2007', 'MS 1194:2015'],
      recommendations: this.getMixRecommendations(inputs, mixProportions)
    };
  }

  /**
   * Calculate reinforcement requirements
   */
  async calculateReinforcement(inputs, options = {}) {
    const {
      elementType = 'beam',
      width,
      height,
      effectiveDepth,
      bendingMoment,
      shearForce,
      concreteGrade = 'C30',
      steelGrade = 'B500B'
    } = inputs;

    const fck = parseInt(concreteGrade.substring(1)); // N/mm²
    const fyk = parseInt(steelGrade.substring(1)); // N/mm²
    const fcd = fck / 1.5; // Design concrete strength
    const fyd = fyk / 1.15; // Design steel strength

    // Flexural reinforcement
    const M = bendingMoment * 1000000; // Convert kN·m to N·mm
    const d = effectiveDepth;
    const b = width;

    // Check if compression reinforcement is needed
    const muLim = 0.167 * fcd * b * d * d; // Limiting moment
    const compressionReinfNeeded = M > muLim;

    // Calculate tension reinforcement
    let As1 = 0; // Tension reinforcement
    let As2 = 0; // Compression reinforcement

    if (!compressionReinfNeeded) {
      // Single reinforcement
      const k = M / (fcd * b * d * d);
      const z = d * (0.5 + Math.sqrt(0.25 - k/1.134));
      As1 = M / (fyd * z);
    } else {
      // Double reinforcement required
      As1 = muLim / (fyd * 0.95 * d);
      As2 = (M - muLim) / (fyd * 0.95 * d);
    }

    // Minimum reinforcement
    const AsMin = Math.max(0.26 * (2.9/fyk) * b * d, 0.0013 * b * d);
    As1 = Math.max(As1, AsMin);

    // Shear reinforcement
    const V = shearForce * 1000; // Convert kN to N
    const vRdMax = 0.5 * 0.6 * (1 - fck/250) * fcd * b * d;
    const shearReinfNeeded = V > vRdMax;

    let stirrupSpacing = 0;
    if (shearReinfNeeded) {
      const Asw = 157; // mm² (2 legs of 10mm stirrups)
      stirrupSpacing = (Asw * fyd * d) / V;
      stirrupSpacing = Math.min(stirrupSpacing, 0.75 * d, 400); // Maximum spacing
    }

    return {
      inputs,
      results: {
        flexuralReinforcement: {
          tensionSteel: {
            area: As1,
            unit: 'mm²'
          },
          compressionSteel: {
            area: As2,
            required: compressionReinfNeeded,
            unit: 'mm²'
          },
          minimumReinforcement: AsMin
        },
        shearReinforcement: {
          required: shearReinfNeeded,
          stirrupSpacing: stirrupSpacing,
          unit: 'mm'
        },
        materialProperties: {
          concrete: {
            grade: concreteGrade,
            designStrength: fcd,
            unit: 'N/mm²'
          },
          steel: {
            grade: steelGrade,
            designStrength: fyd,
            unit: 'N/mm²'
          }
        }
      },
      standards: ['BS EN 1992-1-1', 'MS 76:2005']
    };
  }

  validateMixInputs(inputs) {
    const { targetStrength, slump, maxAggregateSize } = inputs;
    
    if (targetStrength < 15 || targetStrength > 80) {
      throw new Error('Target strength must be between 15 and 80 N/mm²');
    }
    if (slump < 25 || slump > 200) {
      throw new Error('Slump must be between 25 and 200 mm');
    }
    if (maxAggregateSize < 10 || maxAggregateSize > 40) {
      throw new Error('Maximum aggregate size must be between 10 and 40 mm');
    }
  }

  getWaterCementRatio(exposureClass, fck) {
    const ratios = {
      'XC1': Math.min(0.65, 0.4 + 0.25 * (50 - fck) / 50), // Dry environment
      'XC2': Math.min(0.60, 0.4 + 0.20 * (50 - fck) / 50), // Wet, rarely dry
      'XC3': Math.min(0.55, 0.4 + 0.15 * (50 - fck) / 50), // Moderate humidity
      'XC4': Math.min(0.50, 0.4 + 0.10 * (50 - fck) / 50), // Cyclic wet/dry
      'XS1': 0.50, // Exposed to airborne salt
      'XS2': 0.45, // Permanently submerged in seawater
      'XS3': 0.45  // Tidal, splash and spray zones
    };
    return ratios[exposureClass] || 0.55;
  }

  getMinCementContent(exposureClass) {
    const contents = {
      'XC1': 260, 'XC2': 280, 'XC3': 280, 'XC4': 300,
      'XS1': 300, 'XS2': 320, 'XS3': 340
    };
    return contents[exposureClass] || 280;
  }

  getWaterContent(slump, maxAggregateSize) {
    // Base water content for 20mm aggregate and 75mm slump
    let baseWater = 180;
    
    // Adjust for slump
    const slumpAdjustment = (slump - 75) * 0.5;
    
    // Adjust for aggregate size
    const sizeAdjustment = (20 - maxAggregateSize) * 2;
    
    return baseWater + slumpAdjustment + sizeAdjustment;
  }

  getAggregateRatio(maxAggregateSize) {
    // Fine to coarse aggregate ratio
    const ratios = {
      10: 0.45, 14: 0.42, 20: 0.40, 25: 0.38, 40: 0.35
    };
    return ratios[maxAggregateSize] || 0.40;
  }

  calculateAggregateContent(cementContent, waterContent, fineRatio) {
    // Assume concrete density of 2400 kg/m³
    const totalWeight = 2400;
    const aggregateWeight = totalWeight - cementContent - waterContent;
    
    return {
      fine: aggregateWeight * fineRatio,
      coarse: aggregateWeight * (1 - fineRatio)
    };
  }

  getDurabilityRequirements(exposureClass) {
    const requirements = {
      'XC1': { maxWCRatio: 0.65, minCementContent: 260, coverDepth: 15 },
      'XC2': { maxWCRatio: 0.60, minCementContent: 280, coverDepth: 20 },
      'XC3': { maxWCRatio: 0.55, minCementContent: 280, coverDepth: 20 },
      'XC4': { maxWCRatio: 0.50, minCementContent: 300, coverDepth: 25 },
      'XS1': { maxWCRatio: 0.50, minCementContent: 300, coverDepth: 35 },
      'XS2': { maxWCRatio: 0.45, minCementContent: 320, coverDepth: 40 },
      'XS3': { maxWCRatio: 0.45, minCementContent: 340, coverDepth: 45 }
    };
    return requirements[exposureClass] || requirements['XC2'];
  }

  getConsistencyClass(slump) {
    if (slump <= 40) return 'S1 (Low)';
    if (slump <= 90) return 'S2 (Medium)';
    if (slump <= 150) return 'S3 (High)';
    return 'S4 (Very High)';
  }

  estimateConcreteCost(proportions) {
    // Malaysian material prices (MYR per unit)
    const prices = {
      cement: 0.45, // per kg
      fineAggregate: 0.08, // per kg
      coarseAggregate: 0.09, // per kg
      water: 0.003 // per liter
    };

    const breakdown = {
      cement: proportions.cement * prices.cement,
      fineAggregate: proportions.fineAggregate * prices.fineAggregate,
      coarseAggregate: proportions.coarseAggregate * prices.coarseAggregate,
      water: proportions.water * prices.water
    };

    const total = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

    return {
      breakdown,
      total: Math.round(total * 100) / 100
    };
  }

  getMixRecommendations(inputs, proportions) {
    const recommendations = [];
    const { targetStrength, exposureClass } = inputs;
    
    if (targetStrength > 50) {
      recommendations.push('High strength concrete - consider using superplasticizer');
    }
    if (exposureClass.startsWith('XS')) {
      recommendations.push('Marine environment - use corrosion inhibitors');
    }
    if (proportions.cement > 400) {
      recommendations.push('High cement content - monitor heat of hydration');
    }
    if (recommendations.length === 0) {
      recommendations.push('Mix design is suitable for the specified requirements');
    }
    
    return recommendations;
  }
}

export default ConcreteDesign;
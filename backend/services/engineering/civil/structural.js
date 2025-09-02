/**
 * Structural Engineering Calculations
 * Based on BS EN 1992-1-1 (Eurocode 2) and Malaysian Standards
 */

class StructuralCalculations {
  /**
   * Analyze simply supported beam
   * @param {Object} inputs - Beam parameters
   * @param {number} inputs.length - Beam length (m)
   * @param {number} inputs.load - Uniformly distributed load (kN/m)
   * @param {number} inputs.width - Beam width (mm)
   * @param {number} inputs.height - Beam height (mm)
   * @param {string} inputs.material - Material type (concrete/steel)
   * @param {Object} options - Calculation options
   */
  async analyzeBeam(inputs, options = {}) {
    const { length, load, width, height, material = 'concrete' } = inputs;
    
    // Validate inputs
    this.validateBeamInputs(inputs);
    
    // Convert units
    const L = length * 1000; // mm
    const w = load; // kN/m
    const b = width; // mm
    const h = height; // mm
    
    // Calculate section properties
    const I = (b * Math.pow(h, 3)) / 12; // Second moment of area (mm⁴)
    const Z = (b * Math.pow(h, 2)) / 6; // Section modulus (mm³)
    
    // Calculate maximum bending moment (kN·m)
    const M_max = (w * Math.pow(length, 2)) / 8;
    
    // Calculate maximum shear force (kN)
    const V_max = (w * length) / 2;
    
    // Calculate maximum deflection
    const E = material === 'concrete' ? 30000 : 200000; // N/mm² (concrete/steel)
    const delta_max = (5 * w * Math.pow(L, 4)) / (384 * E * I); // mm
    
    // Calculate bending stress
    const sigma_max = (M_max * 1000000) / Z; // N/mm² (convert kN·m to N·mm)
    
    // Allowable limits (Malaysian standards)
    const allowableStress = material === 'concrete' ? 25 : 250; // N/mm²
    const allowableDeflection = L / 250; // mm (L/250 limit)
    
    // Safety checks
    const stressRatio = sigma_max / allowableStress;
    const deflectionRatio = delta_max / allowableDeflection;
    
    return {
      inputs,
      results: {
        maxBendingMoment: {
          value: M_max,
          unit: 'kN·m',
          formula: 'M = wL²/8'
        },
        maxShearForce: {
          value: V_max,
          unit: 'kN',
          formula: 'V = wL/2'
        },
        maxDeflection: {
          value: delta_max,
          unit: 'mm',
          formula: 'δ = 5wL⁴/(384EI)'
        },
        maxBendingStress: {
          value: sigma_max,
          unit: 'N/mm²',
          formula: 'σ = M/Z'
        },
        sectionProperties: {
          momentOfInertia: I,
          sectionModulus: Z,
          units: 'mm⁴, mm³'
        }
      },
      compliance: {
        stressCheck: {
          actual: sigma_max,
          allowable: allowableStress,
          ratio: stressRatio,
          passed: stressRatio <= 1.0,
          unit: 'N/mm²'
        },
        deflectionCheck: {
          actual: delta_max,
          allowable: allowableDeflection,
          ratio: deflectionRatio,
          passed: deflectionRatio <= 1.0,
          unit: 'mm'
        }
      },
      recommendations: this.getBeamRecommendations(stressRatio, deflectionRatio),
      standards: ['BS EN 1992-1-1', 'MS 76:2005', 'Uniform Building By-Laws 1984']
    };
  }

  /**
   * Design reinforced concrete column
   */
  async designColumn(inputs, options = {}) {
    const { height, axialLoad, momentX, momentY, width, depth, concreteGrade = 'C30' } = inputs;
    
    // Material properties
    const fck = this.getConcreteStrength(concreteGrade); // N/mm²
    const fcd = fck / 1.5; // Design strength
    const Es = 200000; // Steel modulus (N/mm²)
    
    // Slenderness check
    const effectiveLength = height * 1000; // mm
    const radiusOfGyration = Math.min(width, depth) / Math.sqrt(12);
    const slendernessRatio = effectiveLength / radiusOfGyration;
    
    // Buckling check
    const criticalSlenderness = 25; // For braced columns
    const bucklingFactor = slendernessRatio > criticalSlenderness ? 
      1 + (slendernessRatio - criticalSlenderness) * 0.02 : 1;
    
    // Design axial load capacity
    const Ac = width * depth; // mm²
    const designLoad = axialLoad * bucklingFactor; // kN
    
    // Required reinforcement
    const minReinforcement = 0.01 * Ac; // 1% minimum
    const maxReinforcement = 0.04 * Ac; // 4% maximum
    
    return {
      inputs,
      results: {
        slendernessRatio: {
          value: slendernessRatio,
          limit: criticalSlenderness,
          passed: slendernessRatio <= 100
        },
        bucklingFactor: bucklingFactor,
        designLoad: {
          value: designLoad,
          unit: 'kN'
        },
        reinforcement: {
          minimum: minReinforcement,
          maximum: maxReinforcement,
          unit: 'mm²'
        }
      },
      standards: ['BS EN 1992-1-1', 'MS 76:2005']
    };
  }

  validateBeamInputs(inputs) {
    const { length, load, width, height } = inputs;
    
    if (!length || length <= 0 || length > 50) {
      throw new Error('Beam length must be between 0 and 50 meters');
    }
    if (!load || load <= 0 || load > 1000) {
      throw new Error('Load must be between 0 and 1000 kN/m');
    }
    if (!width || width < 100 || width > 2000) {
      throw new Error('Beam width must be between 100 and 2000 mm');
    }
    if (!height || height < 150 || height > 3000) {
      throw new Error('Beam height must be between 150 and 3000 mm');
    }
  }

  getConcreteStrength(grade) {
    const strengths = {
      'C20': 20, 'C25': 25, 'C30': 30, 'C35': 35, 'C40': 40, 'C45': 45, 'C50': 50
    };
    return strengths[grade] || 30;
  }

  getBeamRecommendations(stressRatio, deflectionRatio) {
    const recommendations = [];
    
    if (stressRatio > 1.0) {
      recommendations.push('Increase beam section or use higher grade material');
    }
    if (deflectionRatio > 1.0) {
      recommendations.push('Increase beam depth or add intermediate supports');
    }
    if (stressRatio > 0.8) {
      recommendations.push('Consider optimization - stress utilization is high');
    }
    if (deflectionRatio > 0.8) {
      recommendations.push('Consider deflection control measures');
    }
    if (recommendations.length === 0) {
      recommendations.push('Design is adequate for the given loads');
    }
    
    return recommendations;
  }
}

export default StructuralCalculations;
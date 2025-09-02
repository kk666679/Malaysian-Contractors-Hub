/**
 * Steel Design Calculations
 * Based on BS EN 1993-1-1 (Eurocode 3) and Malaysian steel standards
 */

class SteelDesign {
  /**
   * Design steel beam
   */
  async designBeam(inputs, options = {}) {
    const {
      span,
      appliedMoment,
      appliedShear,
      sectionType = 'UB',
      steelGrade = 'S275',
      lateralSupport = 'full'
    } = inputs;

    // Material properties
    const fy = this.getSteelStrength(steelGrade);
    const E = 210000; // N/mm²
    const gammaM0 = 1.0; // Partial factor for resistance
    const gammaM1 = 1.0; // Partial factor for buckling

    // Design values
    const MEd = appliedMoment * 1000000; // Convert kN·m to N·mm
    const VEd = appliedShear * 1000; // Convert kN to N

    // Select trial section
    const section = this.selectSteelSection(sectionType, MEd, fy);
    
    // Section properties
    const { 
      depth, width, webThickness, flangeThickness, 
      Ix, Iy, Zx, Zy, rx, ry, area 
    } = section;

    // Moment resistance
    const MRd = this.calculateMomentResistance(section, fy, lateralSupport, span);
    
    // Shear resistance
    const VRd = this.calculateShearResistance(section, fy);

    // Deflection check
    const deflection = this.calculateDeflection(span, appliedMoment, E, Ix);
    const allowableDeflection = span * 1000 / 250; // L/250 in mm

    // Utilization ratios
    const momentUtilization = MEd / MRd;
    const shearUtilization = VEd / VRd;
    const deflectionRatio = deflection / allowableDeflection;

    return {
      inputs,
      selectedSection: {
        designation: section.designation,
        properties: {
          depth: depth,
          width: width,
          webThickness: webThickness,
          flangeThickness: flangeThickness,
          area: area,
          Ix: Ix,
          Zx: Zx,
          units: 'mm, mm², mm⁴, mm³'
        }
      },
      results: {
        momentResistance: {
          value: MRd / 1000000, // Convert back to kN·m
          unit: 'kN·m',
          utilization: momentUtilization
        },
        shearResistance: {
          value: VRd / 1000, // Convert back to kN
          unit: 'kN',
          utilization: shearUtilization
        },
        deflection: {
          calculated: deflection,
          allowable: allowableDeflection,
          ratio: deflectionRatio,
          unit: 'mm'
        }
      },
      compliance: {
        momentCheck: {
          passed: momentUtilization <= 1.0,
          utilization: momentUtilization,
          margin: (1.0 - momentUtilization) * 100
        },
        shearCheck: {
          passed: shearUtilization <= 1.0,
          utilization: shearUtilization,
          margin: (1.0 - shearUtilization) * 100
        },
        deflectionCheck: {
          passed: deflectionRatio <= 1.0,
          ratio: deflectionRatio,
          margin: (1.0 - deflectionRatio) * 100
        }
      },
      standards: ['BS EN 1993-1-1', 'MS 1462:2009'],
      recommendations: this.getSteelBeamRecommendations(momentUtilization, shearUtilization, deflectionRatio)
    };
  }

  /**
   * Design steel connection
   */
  async designConnection(inputs, options = {}) {
    const {
      connectionType = 'bolted',
      appliedForce,
      boltGrade = '8.8',
      boltDiameter = 20,
      numberOfBolts,
      plateThickness,
      steelGrade = 'S275'
    } = inputs;

    // Material properties
    const fy = this.getSteelStrength(steelGrade);
    const fu = this.getUltimateStrength(steelGrade);
    const fub = this.getBoltStrength(boltGrade);

    // Bolt properties
    const As = Math.PI * Math.pow(boltDiameter, 2) / 4; // Tensile stress area
    const A = Math.PI * Math.pow(boltDiameter, 2) / 4; // Gross area

    // Bolt resistances
    const FvRd = this.calculateBoltShearResistance(boltGrade, boltDiameter);
    const FtRd = this.calculateBoltTensileResistance(boltGrade, boltDiameter);
    const FbRd = this.calculateBoltBearingResistance(boltDiameter, plateThickness, fu);

    // Connection capacity
    const connectionCapacity = Math.min(
      numberOfBolts * FvRd,
      numberOfBolts * FbRd
    );

    // Utilization
    const utilization = appliedForce * 1000 / connectionCapacity; // Convert kN to N

    return {
      inputs,
      boltProperties: {
        grade: boltGrade,
        diameter: boltDiameter,
        tensileArea: As,
        shearResistance: FvRd / 1000, // kN
        tensileResistance: FtRd / 1000, // kN
        bearingResistance: FbRd / 1000 // kN
      },
      results: {
        connectionCapacity: {
          value: connectionCapacity / 1000, // kN
          governingMode: this.getGoverningMode(FvRd, FbRd),
          unit: 'kN'
        },
        utilization: {
          ratio: utilization,
          percentage: utilization * 100,
          passed: utilization <= 1.0
        }
      },
      standards: ['BS EN 1993-1-8', 'MS 1462:2009']
    };
  }

  /**
   * Design steel column
   */
  async designColumn(inputs, options = {}) {
    const {
      height,
      axialLoad,
      momentTop = 0,
      momentBottom = 0,
      sectionType = 'UC',
      steelGrade = 'S275',
      bucklingLength = height
    } = inputs;

    const fy = this.getSteelStrength(steelGrade);
    const E = 210000; // N/mm²

    // Select trial section
    const NEd = axialLoad * 1000; // Convert kN to N
    const section = this.selectColumnSection(sectionType, NEd, fy);

    // Buckling resistance
    const NbRd = this.calculateBucklingResistance(section, fy, bucklingLength);

    // Combined bending and compression
    const MEdTop = momentTop * 1000000; // N·mm
    const MEdBottom = momentBottom * 1000000; // N·mm
    const MRd = this.calculateMomentResistance(section, fy, 'full', 0);

    // Interaction check
    const interactionRatio = this.calculateInteractionRatio(NEd, NbRd, MEdTop, MRd);

    return {
      inputs,
      selectedSection: {
        designation: section.designation,
        area: section.area,
        Ix: section.Ix,
        Iy: section.Iy
      },
      results: {
        bucklingResistance: {
          value: NbRd / 1000, // kN
          unit: 'kN'
        },
        momentResistance: {
          value: MRd / 1000000, // kN·m
          unit: 'kN·m'
        },
        interactionCheck: {
          ratio: interactionRatio,
          passed: interactionRatio <= 1.0,
          formula: 'NEd/NbRd + MEd/MRd ≤ 1.0'
        }
      },
      standards: ['BS EN 1993-1-1', 'MS 1462:2009']
    };
  }

  getSteelStrength(grade) {
    const strengths = {
      'S235': 235, 'S275': 275, 'S355': 355, 'S420': 420, 'S460': 460
    };
    return strengths[grade] || 275;
  }

  getUltimateStrength(grade) {
    const strengths = {
      'S235': 360, 'S275': 430, 'S355': 510, 'S420': 520, 'S460': 540
    };
    return strengths[grade] || 430;
  }

  getBoltStrength(grade) {
    const strengths = {
      '4.6': 400, '4.8': 400, '5.6': 500, '5.8': 500, 
      '6.8': 600, '8.8': 800, '10.9': 1000, '12.9': 1200
    };
    return strengths[grade] || 800;
  }

  selectSteelSection(type, moment, fy) {
    // Simplified section database - in practice, use complete section tables
    const sections = {
      'UB': [
        { designation: '457x191x67 UB', depth: 457.0, width: 190.4, webThickness: 8.5, 
          flangeThickness: 12.7, area: 8540, Ix: 289e6, Zx: 1265e3, rx: 184, ry: 41.3 },
        { designation: '533x210x82 UB', depth: 533.1, width: 208.7, webThickness: 9.6, 
          flangeThickness: 13.2, area: 10500, Ix: 413e6, Zx: 1549e3, rx: 198, ry: 45.7 }
      ]
    };

    // Select based on required section modulus
    const requiredZx = moment / fy * 1000; // mm³
    const availableSections = sections[type] || sections['UB'];
    
    return availableSections.find(section => section.Zx >= requiredZx) || availableSections[0];
  }

  selectColumnSection(type, axialLoad, fy) {
    // Simplified column section selection
    const sections = {
      'UC': [
        { designation: '203x203x46 UC', area: 5860, Ix: 52.8e6, Iy: 17.8e6, rx: 94.0, ry: 55.0 },
        { designation: '254x254x73 UC', area: 9300, Ix: 106e6, Iy: 35.5e6, rx: 107, ry: 61.8 }
      ]
    };

    const requiredArea = axialLoad / fy * 1000; // mm²
    const availableSections = sections[type] || sections['UC'];
    
    return availableSections.find(section => section.area >= requiredArea) || availableSections[0];
  }

  calculateMomentResistance(section, fy, lateralSupport, span) {
    const Zx = section.Zx;
    const gammaM0 = 1.0;
    
    if (lateralSupport === 'full') {
      return Zx * fy / gammaM0;
    } else {
      // Lateral torsional buckling check required
      const bucklingFactor = 0.8; // Simplified
      return Zx * fy * bucklingFactor / gammaM0;
    }
  }

  calculateShearResistance(section, fy) {
    const Av = section.area * 0.6; // Simplified shear area
    const gammaM0 = 1.0;
    return Av * fy / (Math.sqrt(3) * gammaM0);
  }

  calculateDeflection(span, moment, E, Ix) {
    // Simply supported beam with point load at center
    const L = span * 1000; // mm
    const M = moment * 1000000; // N·mm
    return (M * L * L) / (8 * E * Ix);
  }

  calculateBoltShearResistance(grade, diameter) {
    const fub = this.getBoltStrength(grade);
    const A = Math.PI * Math.pow(diameter, 2) / 4;
    const gammaM2 = 1.25;
    return 0.6 * fub * A / gammaM2;
  }

  calculateBoltTensileResistance(grade, diameter) {
    const fub = this.getBoltStrength(grade);
    const As = 0.78 * Math.PI * Math.pow(diameter, 2) / 4; // Tensile stress area
    const gammaM2 = 1.25;
    return 0.9 * fub * As / gammaM2;
  }

  calculateBoltBearingResistance(diameter, thickness, fu) {
    const d = diameter;
    const t = thickness;
    const gammaM2 = 1.25;
    return 2.5 * fu * d * t / gammaM2;
  }

  calculateBucklingResistance(section, fy, bucklingLength) {
    const A = section.area;
    const ry = section.ry; // Minor axis radius of gyration
    const E = 210000;
    const gammaM1 = 1.0;
    
    const slenderness = bucklingLength * 1000 / ry;
    const lambda1 = Math.PI * Math.sqrt(E / fy);
    const lambdaBar = slenderness / lambda1;
    
    // Buckling curve - simplified
    const alpha = 0.34; // Curve b for rolled sections
    const phi = 0.5 * (1 + alpha * (lambdaBar - 0.2) + lambdaBar * lambdaBar);
    const chi = 1 / (phi + Math.sqrt(phi * phi - lambdaBar * lambdaBar));
    
    return chi * A * fy / gammaM1;
  }

  calculateInteractionRatio(NEd, NbRd, MEd, MRd) {
    return NEd / NbRd + MEd / MRd;
  }

  getGoverningMode(shearResistance, bearingResistance) {
    return shearResistance < bearingResistance ? 'Shear' : 'Bearing';
  }

  getSteelBeamRecommendations(momentUtil, shearUtil, deflectionRatio) {
    const recommendations = [];
    
    if (momentUtil > 1.0) {
      recommendations.push('Increase beam section - moment capacity exceeded');
    }
    if (shearUtil > 1.0) {
      recommendations.push('Increase beam section - shear capacity exceeded');
    }
    if (deflectionRatio > 1.0) {
      recommendations.push('Increase beam depth - deflection limit exceeded');
    }
    if (momentUtil > 0.9) {
      recommendations.push('High moment utilization - consider larger section');
    }
    if (recommendations.length === 0) {
      recommendations.push('Steel beam design is adequate');
    }
    
    return recommendations;
  }
}

export default SteelDesign;
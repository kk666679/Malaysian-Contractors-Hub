// Civil Engineering Service for structural calculations and compliance checking
class CivilEngineeringService {
  constructor() {
    this.malaysianStandards = {
      'MS 1183:2015': {
        title: 'Fire precautions in the design and construction of buildings',
        requirements: {
          structural: {
            fireResistance: {
              residential: '2 hours',
              commercial: '3 hours',
              industrial: '4 hours'
            },
            compartmentation: 'Required for buildings over 18m height'
          }
        }
      },
      'UBBL 1984': {
        title: 'Uniform Building By-Laws',
        requirements: {
          structural: {
            loadFactors: {
              deadLoad: 1.4,
              liveLoad: 1.6,
              windLoad: 1.2
            },
            deflectionLimits: {
              beams: 'L/360',
              slabs: 'L/480'
            }
          }
        }
      },
      'MS 1553:2018': {
        title: 'Structural use of concrete',
        requirements: {
          materials: {
            concreteGrade: 'Minimum Grade 25 for structural elements',
            reinforcement: 'Comply with MS 146'
          },
          design: {
            minimumCover: {
              beams: 25,
              columns: 40,
              slabs: 20
            }
          }
        }
      }
    };
  }

  // Calculate structural capacity based on Malaysian standards
  calculateStructuralCapacity(structureType, material, dimensions, loads) {
    // Validate material
    const validMaterials = ['concrete', 'steel', 'timber'];
    if (!validMaterials.includes(material)) {
      throw new Error(`Unsupported material: ${material}`);
    }
    
    let capacity = {};
    
    switch (structureType) {
      case 'beam':
        capacity = this.calculateBeamCapacity(material, dimensions, loads);
        break;
      case 'column':
        capacity = this.calculateColumnCapacity(material, dimensions, loads);
        break;
      case 'slab':
        capacity = this.calculateSlabCapacity(material, dimensions, loads);
        break;
      case 'foundation':
        capacity = this.calculateFoundationCapacity(material, dimensions, loads);
        break;
      default:
        throw new Error(`Unsupported structure type: ${structureType}`);
    }

    return {
      ...capacity,
      compliance: this.checkCompliance(structureType, material, capacity, dimensions)
    };
  }

  calculateBeamCapacity(material, dimensions, loads) {
    // Simplified beam capacity calculation
    const { width, height, length } = dimensions;
    const { deadLoad, liveLoad, windLoad } = loads;

    const totalLoad = (deadLoad * 1.4) + (liveLoad * 1.6) + (windLoad * 1.2);
    const momentCapacity = this.calculateMomentCapacity(material, width, height);
    const shearCapacity = this.calculateShearCapacity(material, width, height);
    const deflection = this.calculateDeflection(material, width, height, length, totalLoad);

    return {
      momentCapacity: `${Math.round(momentCapacity)} kNm`,
      shearCapacity: `${Math.round(shearCapacity)} kN`,
      deflection: `${deflection.toFixed(3)} m (L/${Math.round(length / deflection)})`,
      safetyFactor: 1.5
    };
  }

  calculateColumnCapacity(material, dimensions, loads) {
    // Simplified column capacity calculation
    const { width, height, length } = dimensions;
    const axialLoad = loads.deadLoad + loads.liveLoad;

    const area = width * height;
    const axialCapacity = this.calculateAxialCapacity(material, area);
    const bucklingCapacity = this.calculateBucklingCapacity(material, dimensions, length);

    return {
      axialCapacity: `${Math.round(axialCapacity)} kN`,
      bucklingCapacity: `${Math.round(bucklingCapacity)} kN`,
      slendernessRatio: (length / Math.min(width, height)).toFixed(1),
      safetyFactor: 1.5
    };
  }

  calculateAxialCapacity(material, area) {
    // Simplified axial capacity calculation
    const materialStrengths = {
      concrete: 25, // MPa
      steel: 460,   // MPa
      timber: 24    // MPa
    };
    const strength = materialStrengths[material] || materialStrengths.concrete;
    return strength * area / 1000; // Convert to kN
  }

  calculateBucklingCapacity(material, dimensions, length) {
    // Simplified buckling capacity calculation
    const slendernessRatio = length / Math.min(dimensions.width, dimensions.height);
    const criticalSlenderness = 50; // Example threshold
    if (slendernessRatio > criticalSlenderness) {
      return 0.6 * this.calculateAxialCapacity(material, dimensions.width * dimensions.height);
    }
    return this.calculateAxialCapacity(material, dimensions.width * dimensions.height);
  }
  
  checkCompliance(structureType, material, capacity, dimensions) {
    const complianceIssues = [];
    const recommendations = [];

    // Check material requirements
    if (material === 'concrete') {
      // Map singular to plural keys for minimumCover
      const pluralMap = {
        beam: 'beams',
        column: 'columns',
        slab: 'slabs'
      };
      const key = pluralMap[structureType] || structureType;
      const minCover = this.malaysianStandards['MS 1553:2018'].requirements.design.minimumCover[key];
      if (dimensions.cover !== undefined) {
        const coverValue = typeof dimensions.cover === 'string' ? parseFloat(dimensions.cover) : dimensions.cover;
        if (coverValue < minCover) {
          complianceIssues.push(`Concrete cover less than minimum required (${minCover}mm)`);
          recommendations.push(`Increase concrete cover to at least ${minCover}mm`);
        }
      }
    }

    // Check deflection limits
    if (structureType === 'beam' || structureType === 'slab') {
      const deflectionLimit = this.malaysianStandards['UBBL 1984'].requirements.structural.deflectionLimits[structureType + 's'];
      
      if (capacity.deflection) {
        // Extract the actual deflection value from the string format "0.022 m (L/363)"
        const deflectionMatch = capacity.deflection.match(/(\d+\.\d+)/);
        if (deflectionMatch) {
          const actualDeflection = parseFloat(deflectionMatch[1]);
          const maxDeflectionRatio = 1 / parseInt(deflectionLimit.split('/')[1], 10);
          
          // Check if deflection is actually excessive
          const isExcessive = actualDeflection > maxDeflectionRatio;
          if (isExcessive) {
            complianceIssues.push(`Deflection exceeds ${deflectionLimit} limit`);
            recommendations.push('Consider increasing section depth or using higher grade material');
          }
        }
      } else {
        complianceIssues.push('Deflection data not provided');
        recommendations.push('Deflection calculation is required for compliance checking');
      }
    }

    return {
      compliant: complianceIssues.length === 0,
      issues: complianceIssues,
      recommendations: recommendations,
      standards: Object.keys(this.malaysianStandards)
    };
  }

  isDeflectionExcessive(actualDeflection, limit) {
    // Parse limit string like "L/360" - actualDeflection should be a ratio (deflection/span)
    const divisor = parseInt(limit.split('/')[1], 10);
    const maxDeflectionRatio = 1 / divisor;
    return actualDeflection > maxDeflectionRatio;
  }

  calculateMomentCapacity(material, width, height) {
    // Simplified moment capacity calculation
    const materialFactors = {
      concrete: 0.138 * 25 * width * height * height / 1e6, // fcu * b * d²
      steel: 0.95 * 460 * 0.9 * width * height / 1e6, // fy * As
      timber: 0.9 * 24 * width * height * height / 6 / 1e6 // fm * Z
    };
    return materialFactors[material] || materialFactors.concrete;
  }

  calculateShearCapacity(material, width, height) {
    // Simplified shear capacity calculation
    const materialFactors = {
      concrete: 0.79 * Math.pow(100 * 0.02, 1/3) * width * height * 0.8 / 1e3,
      steel: 0.6 * 275 * width * height / 1e3,
      timber: 0.9 * 3.5 * width * height * 0.8 / 1e3
    };
    return materialFactors[material] || materialFactors.concrete;
  }

  calculateDeflection(material, width, height, length, load) {
    // Simplified deflection calculation
    const materialFactors = {
      concrete: (5 * load * Math.pow(length, 4)) / (384 * 28e9 * width * Math.pow(height, 3) / 12),
      steel: (5 * load * Math.pow(length, 4)) / (384 * 200e9 * width * Math.pow(height, 3) / 12),
      timber: (5 * load * Math.pow(length, 4)) / (384 * 11e9 * width * Math.pow(height, 3) / 12)
    };
    return materialFactors[material] || materialFactors.concrete;
  }

  calculateSlabCapacity(material, dimensions, loads) {
    // Simplified slab capacity calculation
    const { width, height, length } = dimensions;
    const { deadLoad, liveLoad } = loads;

    const totalLoad = (deadLoad * 1.4) + (liveLoad * 1.6);
    const momentCapacity = this.calculateMomentCapacity(material, width, height);
    const deflection = this.calculateDeflection(material, width, height, length, totalLoad);

    return {
      momentCapacity: `${Math.round(momentCapacity)} kNm/m`,
      deflection: `${deflection.toFixed(3)} m (L/${Math.round(length / deflection)})`,
      safetyFactor: 1.5
    };
  }

  calculateFoundationCapacity(material, dimensions, loads) {
    // Simplified foundation capacity calculation
    const { width, length } = dimensions;
    const { deadLoad, liveLoad } = loads;

    const area = width * length;
    const bearingCapacity = this.calculateBearingCapacity(material, area);
    const totalLoad = deadLoad + liveLoad;

    return {
      bearingCapacity: `${Math.round(bearingCapacity)} kN`,
      safetyFactor: (bearingCapacity / totalLoad).toFixed(2),
      area: `${area} m²`
    };
  }

  calculateBearingCapacity(material, area) {
    // Simplified bearing capacity calculation
    const materialFactors = {
      concrete: 200 * area, // 200 kPa
      steel: 300 * area,    // 300 kPa
      timber: 100 * area    // 100 kPa
    };
    return materialFactors[material] || materialFactors.concrete;
  }

  // Get Malaysian standards information
  getMalaysianStandards() {
    return this.malaysianStandards;
  }

  // Get specific standard requirements
  getStandardRequirements(standardCode) {
    return this.malaysianStandards[standardCode] || null;
  }
}

module.exports = new CivilEngineeringService();

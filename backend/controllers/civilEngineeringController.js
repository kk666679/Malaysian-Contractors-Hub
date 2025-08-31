// Civil Engineering Service for structural calculations and compliance checking
class CivilEngineeringService {
  constructor() {
    this.materialProperties = {
      concrete: {
        compressiveStrength: 25, // MPa
        modulusOfElasticity: 28e9, // Pa
        shearModulus: 11.2e9, // Pa
        density: 2400 // kg/m³
      },
      steel: {
        yieldStrength: 460, // MPa
        modulusOfElasticity: 200e9, // Pa
        shearModulus: 79.3e9, // Pa
        density: 7850 // kg/m³
      },
      timber: {
        bendingStrength: 24, // MPa
        modulusOfElasticity: 11e9, // Pa
        shearModulus: 0.69e9, // Pa
        density: 600 // kg/m³
      }
    };

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

  /**
   * Calculate structural capacity based on Malaysian standards
   * @param {string} structureType - Type of structure (beam, column, slab, foundation)
   * @param {string} material - Construction material (concrete, steel, timber)
   * @param {Object} dimensions - Structure dimensions
   * @param {Object} loads - Applied loads
   * @returns {Object} Capacity results and compliance information
   */
  calculateStructuralCapacity(structureType, material, dimensions, loads) {
    this.validateInputs(structureType, material, dimensions, loads);
    
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
    }

    return {
      ...capacity,
      compliance: this.checkCompliance(structureType, material, capacity, dimensions, loads)
    };
  }

  /**
   * Validate input parameters
   */
  validateInputs(structureType, material, dimensions, loads) {
    const validMaterials = ['concrete', 'steel', 'timber'];
    const validStructures = ['beam', 'column', 'slab', 'foundation'];
    
    if (!validMaterials.includes(material)) {
      throw new Error(`Unsupported material: ${material}. Supported materials: ${validMaterials.join(', ')}`);
    }
    
    if (!validStructures.includes(structureType)) {
      throw new Error(`Unsupported structure type: ${structureType}. Supported types: ${validStructures.join(', ')}`);
    }
    
    // Validate dimensions based on structure type
    const requiredDimensions = {
      beam: ['width', 'height', 'length'],
      column: ['width', 'height', 'length'],
      slab: ['width', 'height', 'length'],
      foundation: ['width', 'length']
    };
    
    const missingDimensions = requiredDimensions[structureType].filter(
      dim => dimensions[dim] === undefined || dimensions[dim] <= 0
    );
    
    if (missingDimensions.length > 0) {
      throw new Error(`Missing or invalid dimensions for ${structureType}: ${missingDimensions.join(', ')}`);
    }
    
    // Validate loads
    if (!loads || Object.keys(loads).length === 0) {
      throw new Error('Loads must be provided');
    }
  }

  /**
   * Calculate beam capacity
   */
  calculateBeamCapacity(material, dimensions, loads) {
    const { width, height, length } = dimensions;
    const { deadLoad, liveLoad, windLoad = 0 } = loads;

    const totalLoad = (deadLoad * 1.4) + (liveLoad * 1.6) + (windLoad * 1.2);
    const momentCapacity = this.calculateMomentCapacity(material, width, height);
    const shearCapacity = this.calculateShearCapacity(material, width, height);
    const deflection = this.calculateDeflection(material, width, height, length, totalLoad);
    const deflectionRatio = length / deflection;

    return {
      momentCapacity: `${Math.round(momentCapacity)} kNm`,
      shearCapacity: `${Math.round(shearCapacity)} kN`,
      deflection: `${deflection.toFixed(3)} m (L/${Math.round(deflectionRatio)})`,
      safetyFactor: 1.5,
      appliedLoad: `${totalLoad.toFixed(2)} kN/m`
    };
  }

  /**
   * Calculate column capacity
   */
  calculateColumnCapacity(material, dimensions, loads) {
    const { width, height, length } = dimensions;
    const axialLoad = (loads.deadLoad || 0) + (loads.liveLoad || 0);

    const area = width * height;
    const axialCapacity = this.calculateAxialCapacity(material, area);
    const bucklingCapacity = this.calculateBucklingCapacity(material, dimensions, length);

    return {
      axialCapacity: `${Math.round(axialCapacity)} kN`,
      bucklingCapacity: `${Math.round(bucklingCapacity)} kN`,
      slendernessRatio: (length / Math.min(width, height)).toFixed(1),
      safetyFactor: (axialCapacity / axialLoad).toFixed(2),
      appliedLoad: `${axialLoad.toFixed(2)} kN`
    };
  }

  /**
   * Calculate axial capacity
   */
  calculateAxialCapacity(material, area) {
    const strength = this.materialProperties[material].compressiveStrength || 
                    this.materialProperties[material].yieldStrength ||
                    this.materialProperties[material].bendingStrength;
    return strength * area / 1000; // Convert to kN
  }

  /**
   * Calculate buckling capacity
   */
  calculateBucklingCapacity(material, dimensions, length) {
    const slendernessRatio = length / Math.min(dimensions.width, dimensions.height);
    const criticalSlenderness = 50; // Example threshold
    
    if (slendernessRatio > criticalSlenderness) {
      return 0.6 * this.calculateAxialCapacity(material, dimensions.width * dimensions.height);
    }
    
    return this.calculateAxialCapacity(material, dimensions.width * dimensions.height);
  }

  /**
   * Check compliance with Malaysian standards
   */
  checkCompliance(structureType, material, capacity, dimensions, loads) {
    const complianceIssues = [];
    const recommendations = [];

    // Check material requirements
    if (material === 'concrete') {
      const pluralMap = { beam: 'beams', column: 'columns', slab: 'slabs' };
      const key = pluralMap[structureType];
      
      if (key) {
        const minCover = this.malaysianStandards['MS 1553:2018'].requirements.design.minimumCover[key];
        if (dimensions.cover !== undefined) {
          const coverValue = typeof dimensions.cover === 'string' ? 
                            parseFloat(dimensions.cover) : dimensions.cover;
          
          if (coverValue < minCover) {
            complianceIssues.push(`Concrete cover (${coverValue}mm) less than minimum required (${minCover}mm)`);
            recommendations.push(`Increase concrete cover to at least ${minCover}mm`);
          }
        } else {
          complianceIssues.push(`Concrete cover not specified for ${structureType}`);
          recommendations.push(`Provide concrete cover of at least ${minCover}mm`);
        }
      }
    }

    // Check deflection limits
    if (structureType === 'beam' || structureType === 'slab') {
      const deflectionLimit = this.malaysianStandards['UBBL 1984'].requirements.structural.deflectionLimits[structureType + 's'];
      
      if (capacity.deflection) {
        const deflectionMatch = capacity.deflection.match(/(\d+\.\d+)/);
        if (deflectionMatch) {
          const actualDeflection = parseFloat(deflectionMatch[1]);
          const maxDeflectionRatio = 1 / parseInt(deflectionLimit.split('/')[1], 10);
          
          if (actualDeflection > maxDeflectionRatio) {
            complianceIssues.push(`Deflection (${actualDeflection.toFixed(4)}m) exceeds ${deflectionLimit} limit`);
            recommendations.push('Consider increasing section depth or using higher grade material');
          }
        }
      }
    }

    // Check load factors
    const loadFactors = this.malaysianStandards['UBBL 1984'].requirements.structural.loadFactors;
    if (loads) {
      if (loads.deadLoad === undefined || loads.liveLoad === undefined) {
        complianceIssues.push('Dead load and live load must be specified');
      }
    }

    return {
      compliant: complianceIssues.length === 0,
      issues: complianceIssues,
      recommendations: recommendations,
      standards: Object.keys(this.malaysianStandards)
    };
  }

  // Additional methods (calculateMomentCapacity, calculateShearCapacity, etc.)
  // would follow the same pattern as the original code but with improvements
  
  // Get Malaysian standards information
  getMalaysianStandards() {
    return this.malaysianStandards;
  }

  // Get specific standard requirements
  getStandardRequirements(standardCode) {
    return this.malaysianStandards[standardCode] || null;
  }
}

export default new CivilEngineeringService();
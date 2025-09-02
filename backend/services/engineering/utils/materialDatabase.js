/**
 * Material Database Utility
 * Comprehensive database of construction materials and properties
 */

class MaterialDatabase {
  constructor() {
    this.materials = {
      concrete: this.initializeConcreteDatabase(),
      steel: this.initializeSteelDatabase(),
      timber: this.initializeTimberDatabase(),
      masonry: this.initializeMasonryDatabase(),
      aggregates: this.initializeAggregatesDatabase()
    };
  }

  initializeConcreteDatabase() {
    return {
      grades: {
        'C15': { fck: 15, fcm: 23, Ecm: 27000, density: 2400, description: 'Plain concrete' },
        'C20': { fck: 20, fcm: 28, Ecm: 29000, density: 2400, description: 'Structural concrete' },
        'C25': { fck: 25, fcm: 33, Ecm: 31000, density: 2400, description: 'Standard structural' },
        'C30': { fck: 30, fcm: 38, Ecm: 33000, density: 2400, description: 'High strength' },
        'C35': { fck: 35, fcm: 43, Ecm: 34000, density: 2400, description: 'High strength' },
        'C40': { fck: 40, fcm: 48, Ecm: 35000, density: 2400, description: 'Very high strength' },
        'C45': { fck: 45, fcm: 53, Ecm: 36000, density: 2400, description: 'Very high strength' },
        'C50': { fck: 50, fcm: 58, Ecm: 37000, density: 2400, description: 'Ultra high strength' }
      },
      additives: {
        'superplasticizer': { dosage: '0.5-2.0%', effect: 'High workability, reduced w/c ratio' },
        'retarder': { dosage: '0.2-0.5%', effect: 'Delayed setting time' },
        'accelerator': { dosage: '1-3%', effect: 'Faster setting and hardening' },
        'air-entraining': { dosage: '0.05-0.2%', effect: 'Improved freeze-thaw resistance' }
      },
      cementTypes: {
        'OPC': { description: 'Ordinary Portland Cement', standard: 'MS 522:2007' },
        'PPC': { description: 'Portland Pozzolan Cement', standard: 'MS 1064:2003' },
        'PBFC': { description: 'Portland Blast Furnace Cement', standard: 'MS 1064:2003' },
        'SRC': { description: 'Sulphate Resisting Cement', standard: 'MS 522:2007' }
      }
    };
  }

  initializeSteelDatabase() {
    return {
      structuralSteel: {
        'S275': { fy: 275, fu: 430, E: 210000, density: 7850, description: 'Standard structural steel' },
        'S355': { fy: 355, fu: 510, E: 210000, density: 7850, description: 'High strength steel' },
        'S420': { fy: 420, fu: 520, E: 210000, density: 7850, description: 'High strength steel' },
        'S460': { fy: 460, fu: 540, E: 210000, density: 7850, description: 'Very high strength steel' }
      },
      reinforcement: {
        'B500A': { fy: 500, fu: 550, E: 200000, description: 'Ribbed bars, normal ductility' },
        'B500B': { fy: 500, fu: 550, E: 200000, description: 'Ribbed bars, high ductility' },
        'B500C': { fy: 500, fu: 575, E: 200000, description: 'Ribbed bars, high ductility' }
      },
      bolts: {
        '4.6': { fyb: 240, fub: 400, description: 'Low strength bolts' },
        '5.6': { fyb: 300, fub: 500, description: 'Medium strength bolts' },
        '8.8': { fyb: 640, fub: 800, description: 'High strength bolts' },
        '10.9': { fyb: 900, fub: 1000, description: 'Very high strength bolts' }
      }
    };
  }

  initializeTimberDatabase() {
    return {
      malaysianTimber: {
        'balau': { density: 950, fc: 65, ft: 85, E: 19000, description: 'Heavy hardwood, very durable' },
        'chengal': { density: 915, fc: 62, ft: 82, E: 18500, description: 'Heavy hardwood, durable' },
        'merbau': { density: 830, fc: 55, ft: 75, E: 16000, description: 'Heavy hardwood' },
        'keruing': { density: 740, fc: 45, ft: 65, E: 14000, description: 'Medium hardwood' },
        'kapur': { density: 730, fc: 43, ft: 63, E: 13500, description: 'Medium hardwood' }
      },
      engineeredTimber: {
        'glulam': { density: 500, fc: 24, ft: 16.5, E: 11600, description: 'Glued laminated timber' },
        'lvl': { density: 550, fc: 35, ft: 32, E: 13800, description: 'Laminated veneer lumber' },
        'plywood': { density: 600, fc: 30, ft: 25, E: 9000, description: 'Structural plywood' }
      }
    };
  }

  initializeMasonryDatabase() {
    return {
      bricks: {
        'clay-common': { density: 1800, fc: 20, description: 'Common clay bricks' },
        'clay-engineering': { density: 2000, fc: 50, description: 'Engineering clay bricks' },
        'concrete-hollow': { density: 1400, fc: 15, description: 'Hollow concrete blocks' },
        'concrete-solid': { density: 2000, fc: 25, description: 'Solid concrete blocks' }
      },
      mortar: {
        'M1': { ratio: '1:0.25:3', fc: 16, description: 'Strong mortar' },
        'M2': { ratio: '1:0.5:4', fc: 11, description: 'Medium strength mortar' },
        'M3': { ratio: '1:1:5', fc: 6, description: 'General purpose mortar' },
        'M4': { ratio: '1:2:8', fc: 2.5, description: 'Weak mortar' }
      }
    };
  }

  initializeAggregatesDatabase() {
    return {
      coarseAggregates: {
        'granite-10mm': { density: 2650, absorption: 0.5, description: '10mm granite chips' },
        'granite-20mm': { density: 2650, absorption: 0.5, description: '20mm granite chips' },
        'limestone-20mm': { density: 2400, absorption: 1.0, description: '20mm limestone' },
        'recycled-concrete': { density: 2300, absorption: 3.0, description: 'Recycled concrete aggregate' }
      },
      fineAggregates: {
        'river-sand': { density: 2600, fineness: 2.8, description: 'Natural river sand' },
        'quarry-dust': { density: 2650, fineness: 3.2, description: 'Manufactured sand' },
        'sea-sand': { density: 2600, fineness: 2.5, description: 'Sea sand (washed)' }
      }
    };
  }

  /**
   * Get material properties
   */
  getMaterialProperties(category, type) {
    if (!this.materials[category]) {
      throw new Error(`Material category '${category}' not found`);
    }

    const categoryData = this.materials[category];
    
    // Handle nested categories
    for (const [subCategory, materials] of Object.entries(categoryData)) {
      if (materials[type]) {
        return {
          category,
          subCategory,
          type,
          properties: materials[type],
          standard: this.getApplicableStandard(category, type)
        };
      }
    }

    throw new Error(`Material type '${type}' not found in category '${category}'`);
  }

  /**
   * Search materials by properties
   */
  searchMaterials(criteria) {
    const results = [];

    for (const [category, categoryData] of Object.entries(this.materials)) {
      for (const [subCategory, materials] of Object.entries(categoryData)) {
        for (const [type, properties] of Object.entries(materials)) {
          if (this.matchesCriteria(properties, criteria)) {
            results.push({
              category,
              subCategory,
              type,
              properties,
              score: this.calculateMatchScore(properties, criteria)
            });
          }
        }
      }
    }

    // Sort by match score
    return results.sort((a, b) => b.score - a.score);
  }

  /**
   * Get material recommendations
   */
  getRecommendations(application, requirements = {}) {
    const recommendations = [];

    switch (application) {
      case 'structural-concrete':
        recommendations.push({
          material: 'concrete',
          grade: requirements.strength > 35 ? 'C40' : 'C30',
          cement: 'OPC',
          additives: requirements.workability === 'high' ? ['superplasticizer'] : [],
          reasoning: 'Standard structural application'
        });
        break;

      case 'marine-structure':
        recommendations.push({
          material: 'concrete',
          grade: 'C40',
          cement: 'SRC',
          additives: ['superplasticizer', 'corrosion-inhibitor'],
          reasoning: 'Marine environment requires sulphate resistance'
        });
        break;

      case 'high-rise-structure':
        recommendations.push({
          material: 'steel',
          grade: 'S355',
          connections: '8.8',
          reasoning: 'High strength required for tall buildings'
        });
        break;

      case 'residential-construction':
        recommendations.push({
          material: 'concrete',
          grade: 'C25',
          cement: 'OPC',
          reasoning: 'Cost-effective for residential use'
        });
        break;
    }

    return recommendations;
  }

  /**
   * Calculate material costs (Malaysian market)
   */
  calculateMaterialCost(materials, quantities) {
    const costs = {
      concrete: {
        'C25': 280, // MYR per m³
        'C30': 320,
        'C35': 360,
        'C40': 400
      },
      steel: {
        'reinforcement': 3200, // MYR per tonne
        'structural': 3800
      },
      cement: 450, // MYR per tonne
      aggregates: {
        'coarse': 45, // MYR per m³
        'fine': 40
      }
    };

    const totalCost = materials.reduce((total, material) => {
      const { category, type, quantity, unit } = material;
      const unitCost = this.getUnitCost(costs, category, type);
      return total + (unitCost * quantity);
    }, 0);

    return {
      breakdown: materials.map(material => ({
        ...material,
        unitCost: this.getUnitCost(costs, material.category, material.type),
        totalCost: this.getUnitCost(costs, material.category, material.type) * material.quantity
      })),
      totalCost,
      currency: 'MYR'
    };
  }

  /**
   * Get sustainable material alternatives
   */
  getSustainableAlternatives(material) {
    const alternatives = {
      'concrete': [
        {
          alternative: 'Recycled aggregate concrete',
          benefits: ['Reduced environmental impact', 'Lower cost'],
          considerations: ['Slightly reduced strength', 'Quality control needed']
        },
        {
          alternative: 'Fly ash concrete',
          benefits: ['Improved durability', 'Reduced cement content'],
          considerations: ['Slower early strength gain']
        }
      ],
      'steel': [
        {
          alternative: 'Recycled steel',
          benefits: ['Lower carbon footprint', 'Cost savings'],
          considerations: ['Quality verification required']
        }
      ],
      'timber': [
        {
          alternative: 'Certified sustainable timber',
          benefits: ['Environmental certification', 'Renewable resource'],
          considerations: ['Higher initial cost', 'Limited availability']
        }
      ]
    };

    return alternatives[material] || [];
  }

  /**
   * Check material compatibility
   */
  checkCompatibility(materials) {
    const compatibility = {
      compatible: true,
      warnings: [],
      recommendations: []
    };

    // Check concrete-steel compatibility
    const concrete = materials.find(m => m.category === 'concrete');
    const steel = materials.find(m => m.category === 'steel');

    if (concrete && steel) {
      if (concrete.grade === 'C15' && steel.grade === 'B500B') {
        compatibility.warnings.push('Low concrete grade with high steel grade - check bond');
      }
    }

    // Check environmental compatibility
    const marine = materials.some(m => m.environment === 'marine');
    if (marine) {
      compatibility.recommendations.push('Use corrosion-resistant materials');
      compatibility.recommendations.push('Increase concrete cover');
    }

    return compatibility;
  }

  // Helper methods
  matchesCriteria(properties, criteria) {
    for (const [key, value] of Object.entries(criteria)) {
      if (properties[key] === undefined) continue;
      
      if (typeof value === 'object' && value.min !== undefined) {
        if (properties[key] < value.min) return false;
      } else if (typeof value === 'object' && value.max !== undefined) {
        if (properties[key] > value.max) return false;
      } else if (properties[key] !== value) {
        return false;
      }
    }
    return true;
  }

  calculateMatchScore(properties, criteria) {
    let score = 0;
    let totalCriteria = 0;

    for (const [key, value] of Object.entries(criteria)) {
      totalCriteria++;
      if (properties[key] !== undefined) {
        if (typeof value === 'object') {
          // Range matching
          if (value.min !== undefined && properties[key] >= value.min) score++;
          if (value.max !== undefined && properties[key] <= value.max) score++;
        } else if (properties[key] === value) {
          score++;
        }
      }
    }

    return totalCriteria > 0 ? score / totalCriteria : 0;
  }

  getUnitCost(costs, category, type) {
    if (costs[category]) {
      if (typeof costs[category] === 'object') {
        return costs[category][type] || 0;
      }
      return costs[category];
    }
    return 0;
  }

  getApplicableStandard(category, type) {
    const standards = {
      concrete: 'MS 522:2007, BS EN 206',
      steel: 'MS 1462:2009, BS EN 10025',
      timber: 'MS 758:2001',
      masonry: 'MS 76:2005'
    };
    return standards[category] || 'Various standards apply';
  }

  /**
   * Get all available materials
   */
  getAllMaterials() {
    return this.materials;
  }

  /**
   * Get material categories
   */
  getCategories() {
    return Object.keys(this.materials);
  }
}

export default MaterialDatabase;
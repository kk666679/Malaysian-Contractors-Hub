/**
 * Malaysian Standards Compliance Module
 * Ensures compliance with Malaysian building codes and standards
 */

class MalaysianStandards {
  constructor() {
    this.standards = {
      'MS 76:2005': 'Code of practice for structural use of concrete',
      'MS 1462:2009': 'Code of practice for structural use of steel',
      'MS 1553:2002': 'Code of practice for wind loading',
      'MS 1194:2015': 'Code of practice for soil investigation',
      'MS 522:2007': 'Specification for Portland cement',
      'UBBL 1984': 'Uniform Building By-Laws 1984'
    };
  }

  /**
   * Check compliance with Malaysian standards
   */
  async check(moduleName, calculationType, inputs, result) {
    switch (moduleName) {
      case 'civil':
        return this.checkCivilCompliance(calculationType, inputs, result);
      case 'electrical':
        return this.checkElectricalCompliance(calculationType, inputs, result);
      case 'hvac':
        return this.checkHVACCompliance(calculationType, inputs, result);
      default:
        return { passed: true, notes: [], applicableStandards: [] };
    }
  }

  /**
   * Check civil engineering compliance
   */
  checkCivilCompliance(calculationType, inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: [],
      requirements: []
    };

    switch (calculationType) {
      case 'beam-analysis':
        return this.checkBeamCompliance(inputs, result);
      case 'foundation-bearing':
        return this.checkFoundationCompliance(inputs, result);
      case 'concrete-mix':
        return this.checkConcreteCompliance(inputs, result);
      case 'steel-connection':
        return this.checkSteelCompliance(inputs, result);
      default:
        return compliance;
    }
  }

  /**
   * Check beam design compliance with MS 76:2005
   */
  checkBeamCompliance(inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: ['MS 76:2005', 'UBBL 1984'],
      requirements: []
    };

    // Check deflection limits (MS 76:2005 Clause 7.4)
    if (result.compliance && result.compliance.deflectionCheck) {
      const deflectionRatio = result.compliance.deflectionCheck.ratio;
      if (deflectionRatio > 1.0) {
        compliance.passed = false;
        compliance.notes.push('Deflection exceeds L/250 limit per MS 76:2005 Clause 7.4');
      } else if (deflectionRatio > 0.8) {
        compliance.notes.push('Deflection approaching limit - monitor in service');
      }
    }

    // Check stress limits
    if (result.compliance && result.compliance.stressCheck) {
      const stressRatio = result.compliance.stressCheck.ratio;
      if (stressRatio > 1.0) {
        compliance.passed = false;
        compliance.notes.push('Bending stress exceeds allowable limit per MS 76:2005');
      }
    }

    // Minimum beam dimensions (UBBL 1984)
    if (inputs.width < 150) {
      compliance.notes.push('Beam width below recommended minimum of 150mm');
    }
    if (inputs.height < 200) {
      compliance.notes.push('Beam depth below recommended minimum of 200mm');
    }

    // Span-to-depth ratio check
    const spanToDepthRatio = (inputs.length * 1000) / inputs.height;
    if (spanToDepthRatio > 20) {
      compliance.notes.push('High span-to-depth ratio - check serviceability');
    }

    compliance.requirements = [
      'Deflection ≤ L/250 for normal conditions',
      'Minimum beam width: 150mm',
      'Minimum beam depth: 200mm',
      'Span-to-depth ratio ≤ 20 (typical)'
    ];

    return compliance;
  }

  /**
   * Check foundation compliance with MS 1194:2015
   */
  checkFoundationCompliance(inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: ['MS 1194:2015', 'UBBL 1984'],
      requirements: []
    };

    // Minimum foundation depth (UBBL 1984)
    if (inputs.depth < 0.6) {
      compliance.notes.push('Foundation depth below minimum 600mm per UBBL 1984');
    }

    // Bearing capacity safety factor
    if (result.compliance && result.compliance.bearingCapacityCheck) {
      const ratio = result.compliance.bearingCapacityCheck.ratio;
      if (ratio > 1.0) {
        compliance.passed = false;
        compliance.notes.push('Bearing capacity exceeded - increase foundation size');
      } else if (ratio > 0.8) {
        compliance.notes.push('High bearing capacity utilization - monitor settlement');
      }
    }

    // Settlement limits
    if (result.compliance && result.compliance.settlementCheck) {
      if (!result.compliance.settlementCheck.passed) {
        compliance.passed = false;
        compliance.notes.push('Estimated settlement exceeds 25mm limit');
      }
    }

    // Foundation width requirements
    if (inputs.width < 0.6) {
      compliance.notes.push('Foundation width below recommended minimum of 600mm');
    }

    // Soil investigation requirements
    if (inputs.appliedLoad > 1000) {
      compliance.notes.push('High load - detailed soil investigation required per MS 1194:2015');
    }

    compliance.requirements = [
      'Minimum foundation depth: 600mm',
      'Settlement limit: 25mm for buildings',
      'Safety factor ≥ 3.0 for bearing capacity',
      'Soil investigation required for loads > 1000kN'
    ];

    return compliance;
  }

  /**
   * Check concrete mix compliance with MS 522:2007
   */
  checkConcreteCompliance(inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: ['MS 522:2007', 'MS 76:2005'],
      requirements: []
    };

    // Cement content limits
    if (result.results && result.results.mixProportions) {
      const cementContent = result.results.mixProportions.cement;
      
      if (cementContent < 280) {
        compliance.notes.push('Cement content below recommended minimum for durability');
      }
      if (cementContent > 500) {
        compliance.notes.push('High cement content - monitor heat of hydration');
      }
    }

    // Water-cement ratio limits
    if (result.results && result.results.mixRatios) {
      const wcRatio = result.results.mixRatios.waterCementRatio;
      
      if (wcRatio > 0.65) {
        compliance.notes.push('High w/c ratio - may affect durability per MS 76:2005');
      }
      if (wcRatio < 0.35) {
        compliance.notes.push('Low w/c ratio - ensure adequate workability');
      }
    }

    // Strength requirements
    if (inputs.targetStrength < 20) {
      compliance.notes.push('Low strength concrete - verify structural adequacy');
    }

    // Exposure class compliance
    if (inputs.exposureClass && inputs.exposureClass.startsWith('XS')) {
      compliance.notes.push('Marine exposure - use corrosion-resistant measures');
    }

    compliance.requirements = [
      'Minimum cement content: 280 kg/m³',
      'Maximum w/c ratio: 0.65 (normal exposure)',
      'Minimum strength: C20/25 for structural use',
      'Special requirements for marine exposure'
    ];

    return compliance;
  }

  /**
   * Check steel design compliance with MS 1462:2009
   */
  checkSteelCompliance(inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: ['MS 1462:2009'],
      requirements: []
    };

    // Connection capacity
    if (result.results && result.results.connectionCapacity) {
      const utilization = result.results.utilization;
      
      if (utilization && utilization.ratio > 1.0) {
        compliance.passed = false;
        compliance.notes.push('Connection capacity exceeded per MS 1462:2009');
      }
    }

    // Bolt specifications
    if (inputs.boltGrade) {
      const validGrades = ['4.6', '5.6', '8.8', '10.9'];
      if (!validGrades.includes(inputs.boltGrade)) {
        compliance.notes.push('Non-standard bolt grade - verify availability in Malaysia');
      }
    }

    // Minimum bolt diameter
    if (inputs.boltDiameter && inputs.boltDiameter < 12) {
      compliance.notes.push('Small bolt diameter - check minimum requirements');
    }

    compliance.requirements = [
      'Use standard bolt grades: 4.6, 5.6, 8.8, 10.9',
      'Minimum bolt diameter: 12mm (typical)',
      'Connection utilization ≤ 1.0',
      'Corrosion protection for external exposure'
    ];

    return compliance;
  }

  /**
   * Get Malaysian building height limits
   */
  getBuildingHeightLimits(location, buildingType) {
    const limits = {
      'kuala-lumpur': {
        'residential': { max: 200, note: 'Subject to DBKL approval above 60m' },
        'commercial': { max: 300, note: 'Subject to aviation clearance' },
        'industrial': { max: 100, note: 'Standard industrial limit' }
      },
      'johor-bahru': {
        'residential': { max: 150, note: 'Subject to local authority approval' },
        'commercial': { max: 200, note: 'Subject to aviation clearance' },
        'industrial': { max: 80, note: 'Standard industrial limit' }
      }
    };

    return limits[location] || limits['kuala-lumpur'];
  }

  /**
   * Get fire safety requirements
   */
  getFireSafetyRequirements(buildingHeight, occupancy) {
    const requirements = [];

    if (buildingHeight > 18) {
      requirements.push('Sprinkler system required per UBBL 1984');
      requirements.push('Fire lift required');
      requirements.push('Pressurized staircase required');
    }

    if (buildingHeight > 45) {
      requirements.push('Refuge floor required every 20 floors');
      requirements.push('Fire command center required');
    }

    if (occupancy === 'assembly' && buildingHeight > 12) {
      requirements.push('Enhanced fire safety measures for assembly occupancy');
    }

    return requirements;
  }

  /**
   * Get accessibility requirements
   */
  getAccessibilityRequirements(buildingType, floors) {
    const requirements = [];

    if (floors > 1) {
      requirements.push('Accessible route to all floors required');
      requirements.push('Lift required for buildings > 3 floors');
    }

    if (buildingType === 'public') {
      requirements.push('5% of parking spaces must be accessible');
      requirements.push('Accessible toilet facilities required');
      requirements.push('Tactile indicators for visually impaired');
    }

    return requirements;
  }

  /**
   * Validate against Malaysian climate conditions
   */
  validateClimateConsiderations(inputs) {
    const considerations = [];

    // High humidity considerations
    considerations.push('Design for high humidity (80-90% RH)');
    considerations.push('Adequate ventilation required');
    considerations.push('Corrosion protection for metal elements');

    // Heavy rainfall considerations
    considerations.push('Design for 100-year rainfall intensity');
    considerations.push('Adequate drainage systems required');
    considerations.push('Waterproofing critical for basements');

    // Temperature considerations
    considerations.push('Design for temperature range 24-35°C');
    considerations.push('Thermal expansion joints required');
    considerations.push('Solar heat gain mitigation');

    return considerations;
  }

  /**
   * Get applicable standards for calculation type
   */
  getApplicableStandards(calculationType) {
    const standardsMap = {
      'beam-analysis': ['MS 76:2005', 'UBBL 1984'],
      'column-design': ['MS 76:2005', 'UBBL 1984'],
      'foundation-bearing': ['MS 1194:2015', 'UBBL 1984'],
      'concrete-mix': ['MS 522:2007', 'MS 76:2005'],
      'steel-connection': ['MS 1462:2009'],
      'wind-load': ['MS 1553:2002'],
      'seismic-load': ['UBBL 1984']
    };

    return standardsMap[calculationType] || [];
  }
}

export default MalaysianStandards;
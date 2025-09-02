/**
 * Safety Checker Utility
 * Comprehensive safety validation for engineering calculations
 */

class SafetyChecker {
  constructor() {
    this.safetyFactors = {
      concrete: {
        compression: 1.5,
        tension: 1.15,
        shear: 1.25
      },
      steel: {
        yield: 1.15,
        ultimate: 1.25,
        buckling: 1.1
      },
      foundation: {
        bearing: 3.0,
        sliding: 1.5,
        overturning: 2.0
      }
    };
  }

  /**
   * Check structural safety factors
   */
  checkStructuralSafety(calculationType, inputs, results) {
    const checks = {
      passed: true,
      warnings: [],
      errors: [],
      recommendations: [],
      safetyRating: 100
    };

    switch (calculationType) {
      case 'beam-analysis':
        return this.checkBeamSafety(inputs, results, checks);
      case 'foundation-bearing':
        return this.checkFoundationSafety(inputs, results, checks);
      case 'concrete-mix':
        return this.checkConcreteSafety(inputs, results, checks);
      default:
        return this.checkGeneralSafety(inputs, results, checks);
    }
  }

  checkBeamSafety(inputs, results, checks) {
    // Check deflection limits
    if (results.compliance?.deflectionCheck) {
      const ratio = results.compliance.deflectionCheck.ratio;
      if (ratio > 1.0) {
        checks.passed = false;
        checks.errors.push('Deflection exceeds allowable limits - structural failure risk');
        checks.safetyRating -= 50;
      } else if (ratio > 0.9) {
        checks.warnings.push('High deflection ratio - monitor serviceability');
        checks.safetyRating -= 20;
      }
    }

    // Check stress limits
    if (results.compliance?.stressCheck) {
      const ratio = results.compliance.stressCheck.ratio;
      if (ratio > 1.0) {
        checks.passed = false;
        checks.errors.push('Stress exceeds material capacity - immediate failure risk');
        checks.safetyRating -= 60;
      } else if (ratio > 0.8) {
        checks.warnings.push('High stress utilization - consider larger section');
        checks.safetyRating -= 15;
      }
    }

    // Check minimum dimensions
    if (inputs.width < 150 || inputs.height < 200) {
      checks.warnings.push('Small beam dimensions - verify adequacy');
      checks.safetyRating -= 10;
    }

    return checks;
  }

  checkFoundationSafety(inputs, results, checks) {
    // Check bearing capacity
    if (results.compliance?.bearingCapacityCheck) {
      const ratio = results.compliance.bearingCapacityCheck.ratio;
      if (ratio > 1.0) {
        checks.passed = false;
        checks.errors.push('Bearing capacity exceeded - foundation failure risk');
        checks.safetyRating -= 70;
      } else if (ratio > 0.8) {
        checks.warnings.push('High bearing capacity utilization');
        checks.safetyRating -= 20;
      }
    }

    // Check settlement
    if (results.compliance?.settlementCheck && !results.compliance.settlementCheck.passed) {
      checks.warnings.push('Excessive settlement predicted - serviceability issues');
      checks.safetyRating -= 25;
    }

    // Check minimum depth
    if (inputs.depth < 0.6) {
      checks.warnings.push('Shallow foundation - verify frost protection and stability');
      checks.safetyRating -= 15;
    }

    return checks;
  }

  checkConcreteSafety(inputs, results, checks) {
    // Check strength adequacy
    if (inputs.targetStrength < 20) {
      checks.warnings.push('Low concrete strength - verify structural adequacy');
      checks.safetyRating -= 20;
    }

    // Check durability
    if (results.results?.mixRatios?.waterCementRatio > 0.6) {
      checks.warnings.push('High w/c ratio may affect durability');
      checks.safetyRating -= 15;
    }

    // Check workability
    if (inputs.slump > 150) {
      checks.warnings.push('High slump may affect concrete quality');
      checks.safetyRating -= 10;
    }

    return checks;
  }

  checkGeneralSafety(inputs, results, checks) {
    // General safety checks
    checks.recommendations.push('Conduct independent design review');
    checks.recommendations.push('Verify all assumptions and inputs');
    checks.recommendations.push('Consider construction safety measures');
    
    return checks;
  }

  /**
   * Validate safety factors
   */
  validateSafetyFactors(material, stressType, appliedStress, allowableStress) {
    const requiredFactor = this.safetyFactors[material]?.[stressType] || 1.5;
    const actualFactor = allowableStress / appliedStress;
    
    return {
      required: requiredFactor,
      actual: actualFactor,
      adequate: actualFactor >= requiredFactor,
      margin: ((actualFactor - requiredFactor) / requiredFactor * 100).toFixed(1)
    };
  }

  /**
   * Check construction safety requirements
   */
  checkConstructionSafety(calculationType, inputs) {
    const requirements = {
      ppe: [],
      procedures: [],
      equipment: [],
      training: [],
      monitoring: []
    };

    // PPE requirements
    requirements.ppe.push('Hard hat', 'Safety boots', 'High-visibility vest');

    if (calculationType.includes('concrete')) {
      requirements.ppe.push('Gloves for concrete handling', 'Eye protection');
      requirements.procedures.push('Concrete handling safety', 'Formwork inspection');
      requirements.equipment.push('Concrete vibrator safety', 'Crane operation');
    }

    if (calculationType.includes('steel')) {
      requirements.ppe.push('Welding helmet', 'Cut-resistant gloves');
      requirements.procedures.push('Hot work permit', 'Lifting procedures');
      requirements.equipment.push('Welding equipment inspection', 'Lifting gear certification');
    }

    if (calculationType.includes('foundation')) {
      requirements.procedures.push('Excavation safety', 'Shoring requirements');
      requirements.equipment.push('Excavation support', 'Dewatering equipment');
      requirements.monitoring.push('Soil stability monitoring', 'Groundwater level');
    }

    // Training requirements
    requirements.training.push('General construction safety', 'Hazard identification');
    requirements.training.push('Emergency procedures', 'First aid');

    return requirements;
  }

  /**
   * Assess environmental safety
   */
  assessEnvironmentalSafety(inputs, location = 'malaysia') {
    const assessment = {
      climateFactors: [],
      environmentalRisks: [],
      mitigationMeasures: [],
      monitoring: []
    };

    // Malaysian climate considerations
    if (location.toLowerCase().includes('malaysia')) {
      assessment.climateFactors.push('High humidity (80-90%)', 'Heavy rainfall', 'High temperatures');
      assessment.environmentalRisks.push('Corrosion risk', 'Flooding potential', 'Heat stress');
      assessment.mitigationMeasures.push('Corrosion protection', 'Adequate drainage', 'Heat stress prevention');
    }

    // Construction environmental risks
    assessment.environmentalRisks.push('Dust generation', 'Noise pollution', 'Soil contamination');
    assessment.mitigationMeasures.push('Dust control measures', 'Noise barriers', 'Soil protection');
    assessment.monitoring.push('Air quality monitoring', 'Noise level monitoring', 'Water quality testing');

    return assessment;
  }

  /**
   * Generate safety report
   */
  generateSafetyReport(calculationType, inputs, results, checks) {
    return {
      summary: {
        overallSafety: checks.passed,
        safetyRating: checks.safetyRating,
        criticalIssues: checks.errors.length,
        warnings: checks.warnings.length
      },
      structuralSafety: checks,
      constructionSafety: this.checkConstructionSafety(calculationType, inputs),
      environmentalSafety: this.assessEnvironmentalSafety(inputs),
      recommendations: [
        ...checks.recommendations,
        'Implement comprehensive safety management plan',
        'Conduct regular safety inspections',
        'Ensure all personnel are properly trained'
      ],
      compliance: {
        osha: 'Review required',
        cidb: 'Compliance verification needed',
        dosh: 'Safety plan submission required'
      },
      nextSteps: this.getNextSteps(checks)
    };
  }

  getNextSteps(checks) {
    const steps = [];
    
    if (!checks.passed) {
      steps.push('Address critical safety issues immediately');
      steps.push('Conduct safety risk assessment');
    }
    
    if (checks.safetyRating < 70) {
      steps.push('Implement additional safety measures');
      steps.push('Engage safety consultant');
    }
    
    steps.push('Develop construction safety plan');
    steps.push('Schedule safety training');
    steps.push('Establish safety monitoring procedures');
    
    return steps;
  }

  /**
   * Check emergency preparedness
   */
  checkEmergencyPreparedness(calculationType, inputs) {
    return {
      emergencyProcedures: [
        'Structural collapse response',
        'Fire emergency procedures',
        'Medical emergency response',
        'Evacuation procedures'
      ],
      emergencyEquipment: [
        'First aid kits',
        'Fire extinguishers',
        'Emergency communication',
        'Rescue equipment'
      ],
      emergencyContacts: [
        'Emergency services (999)',
        'Site safety officer',
        'Project manager',
        'Medical facilities'
      ],
      training: [
        'Emergency response training',
        'First aid certification',
        'Fire safety training',
        'Evacuation drills'
      ]
    };
  }
}

export default SafetyChecker;
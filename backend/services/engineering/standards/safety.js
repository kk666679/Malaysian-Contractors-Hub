/**
 * Safety Compliance Module
 * OSHA, NIOSH, CIDB, and Malaysian safety regulations compliance
 */

class SafetyCompliance {
  constructor() {
    this.regulations = {
      'OSHA 1994': 'Occupational Safety and Health Act 1994 (Malaysia)',
      'CIDB': 'Construction Industry Development Board regulations',
      'NIOSH': 'National Institute of Occupational Safety and Health guidelines',
      'FMA 1967': 'Factories and Machinery Act 1967',
      'DOSH': 'Department of Occupational Safety and Health requirements'
    };
  }

  /**
   * Check safety compliance across all regulations
   */
  async check(moduleName, calculationType, inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableRegulations: [],
      safetyRating: 0,
      hazardAssessment: {},
      requiredMeasures: []
    };

    // OSHA compliance check
    const oshaCheck = this.checkOSHACompliance(moduleName, calculationType, inputs, result);
    
    // CIDB compliance check
    const cidbCheck = this.checkCIDBCompliance(moduleName, calculationType, inputs, result);
    
    // NIOSH guidelines check
    const nioshCheck = this.checkNIOSHCompliance(moduleName, calculationType, inputs, result);
    
    // Structural safety check
    const structuralCheck = this.checkStructuralSafety(calculationType, inputs, result);

    // Combine all checks
    compliance.passed = oshaCheck.passed && cidbCheck.passed && 
                       nioshCheck.passed && structuralCheck.passed;
    
    compliance.notes = [
      ...oshaCheck.notes,
      ...cidbCheck.notes,
      ...nioshCheck.notes,
      ...structuralCheck.notes
    ];
    
    compliance.applicableRegulations = [
      ...oshaCheck.regulations,
      ...cidbCheck.regulations,
      ...nioshCheck.regulations,
      ...structuralCheck.regulations
    ];

    compliance.safetyRating = this.calculateSafetyRating(inputs, result);
    compliance.hazardAssessment = this.performHazardAssessment(moduleName, calculationType, inputs);
    compliance.requiredMeasures = this.getRequiredSafetyMeasures(moduleName, calculationType, inputs);

    return compliance;
  }

  /**
   * Check OSHA 1994 compliance
   */
  checkOSHACompliance(moduleName, calculationType, inputs, result) {
    const check = {
      passed: true,
      notes: [],
      regulations: ['OSHA 1994', 'DOSH']
    };

    // General safety requirements
    check.notes.push('Ensure compliance with OSHA 1994 general safety requirements');

    // Structural safety factors
    if (result.compliance) {
      Object.entries(result.compliance).forEach(([key, value]) => {
        if (value.ratio && value.ratio > 0.95) {
          check.notes.push(`High utilization in ${key} - additional safety review required`);
        }
      });
    }

    // Construction safety
    if (calculationType.includes('beam') || calculationType.includes('column')) {
      check.notes.push('Temporary works safety plan required during construction');
      check.notes.push('Fall protection measures required for elevated work');
    }

    // Excavation safety
    if (calculationType.includes('foundation')) {
      check.notes.push('Excavation safety measures required per OSHA 1994 Section 15');
      check.notes.push('Soil stability assessment required for excavations > 1.5m');
    }

    // Personal protective equipment
    check.notes.push('Appropriate PPE requirements must be specified and enforced');

    // Training requirements
    check.notes.push('Safety training required for all personnel per OSHA 1994');

    return check;
  }

  /**
   * Check CIDB compliance
   */
  checkCIDBCompliance(moduleName, calculationType, inputs, result) {
    const check = {
      passed: true,
      notes: [],
      regulations: ['CIDB']
    };

    // Professional competency
    check.notes.push('Design must be certified by CIDB-registered professional');

    // Quality assurance
    if (!inputs.qualityPlan) {
      check.notes.push('Quality assurance plan required per CIDB guidelines');
    }

    // Material standards
    if (inputs.material === 'concrete') {
      check.notes.push('Concrete materials must comply with CIDB approved standards');
    }

    if (inputs.material === 'steel') {
      check.notes.push('Steel materials must be CIDB certified');
    }

    // Construction methodology
    check.notes.push('Construction methodology must comply with CIDB best practices');

    // Safety management system
    check.notes.push('Safety management system required per CIDB regulations');

    // Environmental compliance
    check.notes.push('Environmental impact assessment may be required');

    return check;
  }

  /**
   * Check NIOSH guidelines compliance
   */
  checkNIOSHCompliance(moduleName, calculationType, inputs, result) {
    const check = {
      passed: true,
      notes: [],
      regulations: ['NIOSH']
    };

    // Occupational health assessment
    check.notes.push('Occupational health risk assessment recommended per NIOSH');

    // Ergonomic considerations
    if (calculationType.includes('manual')) {
      check.notes.push('Ergonomic assessment required for manual handling operations');
    }

    // Chemical exposure
    if (inputs.material === 'concrete') {
      check.notes.push('Silica exposure controls required during concrete work');
      check.notes.push('Respiratory protection may be required');
    }

    // Noise exposure
    if (calculationType.includes('construction')) {
      check.notes.push('Noise exposure assessment required per NIOSH guidelines');
    }

    // Heat stress
    check.notes.push('Heat stress prevention measures required for Malaysian climate');

    // Biological hazards
    check.notes.push('Consider biological hazards in tropical construction environment');

    return check;
  }

  /**
   * Check structural safety requirements
   */
  checkStructuralSafety(calculationType, inputs, result) {
    const check = {
      passed: true,
      notes: [],
      regulations: ['FMA 1967', 'UBBL 1984']
    };

    // Safety factors
    if (result.compliance) {
      Object.entries(result.compliance).forEach(([key, value]) => {
        if (value.ratio && value.ratio > 1.0) {
          check.passed = false;
          check.notes.push(`Structural safety compromised in ${key} - immediate action required`);
        } else if (value.ratio && value.ratio > 0.9) {
          check.notes.push(`Low safety margin in ${key} - monitor closely`);
        }
      });
    }

    // Progressive collapse resistance
    if (calculationType.includes('beam') || calculationType.includes('column')) {
      check.notes.push('Consider progressive collapse resistance in design');
    }

    // Robustness requirements
    if (inputs.buildingHeight && inputs.buildingHeight > 30) {
      check.notes.push('Enhanced robustness requirements for tall buildings');
    }

    // Fire safety
    if (inputs.buildingType) {
      check.notes.push('Fire resistance requirements must be verified');
      check.notes.push('Means of escape provisions required');
    }

    // Seismic considerations
    if (inputs.location && (inputs.location.includes('sabah') || inputs.location.includes('sarawak'))) {
      check.notes.push('Enhanced seismic design considerations for East Malaysia');
    }

    return check;
  }

  /**
   * Calculate overall safety rating (0-100)
   */
  calculateSafetyRating(inputs, result) {
    let rating = 70; // Base rating

    // Structural safety margins
    if (result.compliance) {
      const ratios = Object.values(result.compliance)
        .filter(c => c.ratio !== undefined)
        .map(c => c.ratio);
      
      if (ratios.length > 0) {
        const maxRatio = Math.max(...ratios);
        if (maxRatio < 0.7) rating += 20;
        else if (maxRatio < 0.8) rating += 15;
        else if (maxRatio < 0.9) rating += 10;
        else if (maxRatio < 1.0) rating += 5;
        else rating -= 30; // Unsafe
      }
    }

    // Design documentation
    if (inputs.designBasis) rating += 5;
    if (inputs.qualityPlan) rating += 5;
    if (inputs.safetyPlan) rating += 5;

    // Professional oversight
    if (inputs.professionalEngineer) rating += 5;

    return Math.max(0, Math.min(100, rating));
  }

  /**
   * Perform hazard assessment
   */
  performHazardAssessment(moduleName, calculationType, inputs) {
    const hazards = {
      structural: [],
      construction: [],
      occupational: [],
      environmental: []
    };

    // Structural hazards
    if (calculationType.includes('beam') || calculationType.includes('column')) {
      hazards.structural.push('Structural collapse risk');
      hazards.structural.push('Progressive collapse potential');
    }

    if (calculationType.includes('foundation')) {
      hazards.structural.push('Foundation settlement');
      hazards.structural.push('Bearing capacity failure');
    }

    // Construction hazards
    hazards.construction.push('Falls from height');
    hazards.construction.push('Struck by objects');
    hazards.construction.push('Caught in/between equipment');

    if (calculationType.includes('foundation')) {
      hazards.construction.push('Excavation collapse');
      hazards.construction.push('Groundwater ingress');
    }

    if (inputs.material === 'concrete') {
      hazards.construction.push('Chemical burns from concrete');
      hazards.construction.push('Silica dust exposure');
    }

    // Occupational hazards
    hazards.occupational.push('Heat stress (tropical climate)');
    hazards.occupational.push('Noise exposure');
    hazards.occupational.push('Manual handling injuries');

    // Environmental hazards
    hazards.environmental.push('Heavy rainfall/flooding');
    hazards.environmental.push('High humidity effects');
    hazards.environmental.push('Lightning strikes');

    return hazards;
  }

  /**
   * Get required safety measures
   */
  getRequiredSafetyMeasures(moduleName, calculationType, inputs) {
    const measures = {
      immediate: [],
      construction: [],
      operational: [],
      emergency: []
    };

    // Immediate measures
    measures.immediate.push('Verify structural adequacy before construction');
    measures.immediate.push('Obtain necessary permits and approvals');
    measures.immediate.push('Engage qualified professionals');

    // Construction measures
    measures.construction.push('Implement comprehensive safety plan');
    measures.construction.push('Provide appropriate PPE');
    measures.construction.push('Conduct safety training');
    measures.construction.push('Regular safety inspections');

    if (calculationType.includes('foundation')) {
      measures.construction.push('Implement excavation safety procedures');
      measures.construction.push('Install temporary shoring if required');
    }

    if (inputs.buildingHeight && inputs.buildingHeight > 10) {
      measures.construction.push('Fall protection systems required');
      measures.construction.push('Safety nets and guardrails');
    }

    // Operational measures
    measures.operational.push('Regular structural inspections');
    measures.operational.push('Maintenance schedule implementation');
    measures.operational.push('Load monitoring if required');

    // Emergency measures
    measures.emergency.push('Emergency response plan');
    measures.emergency.push('Evacuation procedures');
    measures.emergency.push('Emergency contact information');

    if (inputs.buildingType === 'public') {
      measures.emergency.push('Public address system');
      measures.emergency.push('Emergency lighting');
    }

    return measures;
  }

  /**
   * Generate safety compliance report
   */
  generateSafetyReport(moduleName, calculationType, inputs, result, compliance) {
    return {
      summary: {
        overallCompliance: compliance.passed,
        safetyRating: compliance.safetyRating,
        criticalIssues: compliance.notes.filter(note => 
          note.includes('required') || note.includes('compromised')
        ).length
      },
      regulations: {
        applicable: compliance.applicableRegulations,
        references: this.getRegulationReferences(compliance.applicableRegulations)
      },
      hazardAssessment: compliance.hazardAssessment,
      requiredMeasures: compliance.requiredMeasures,
      recommendations: {
        immediate: this.getImmediateActions(compliance),
        shortTerm: this.getShortTermActions(compliance),
        longTerm: this.getLongTermActions(compliance)
      },
      monitoring: this.getMonitoringRequirements(calculationType, inputs),
      training: this.getTrainingRequirements(moduleName, calculationType)
    };
  }

  getRegulationReferences(regulations) {
    const references = {};
    regulations.forEach(reg => {
      if (this.regulations[reg]) {
        references[reg] = this.regulations[reg];
      }
    });
    return references;
  }

  getImmediateActions(compliance) {
    const actions = [];
    
    if (!compliance.passed) {
      actions.push('Stop work until safety issues are resolved');
      actions.push('Conduct immediate safety assessment');
    }
    
    if (compliance.safetyRating < 50) {
      actions.push('Implement emergency safety measures');
      actions.push('Engage safety consultant');
    }
    
    return actions;
  }

  getShortTermActions(compliance) {
    return [
      'Develop comprehensive safety management plan',
      'Conduct safety training for all personnel',
      'Implement regular safety inspections',
      'Establish safety reporting system'
    ];
  }

  getLongTermActions(compliance) {
    return [
      'Establish safety culture and continuous improvement',
      'Regular review and update of safety procedures',
      'Benchmark against industry best practices',
      'Implement safety performance monitoring'
    ];
  }

  getMonitoringRequirements(calculationType, inputs) {
    const requirements = [];
    
    if (calculationType.includes('structural')) {
      requirements.push('Regular structural health monitoring');
      requirements.push('Load testing if required');
    }
    
    if (calculationType.includes('foundation')) {
      requirements.push('Settlement monitoring');
      requirements.push('Groundwater level monitoring');
    }
    
    requirements.push('Safety performance indicators tracking');
    requirements.push('Incident reporting and investigation');
    
    return requirements;
  }

  getTrainingRequirements(moduleName, calculationType) {
    const training = [];
    
    training.push('General construction safety awareness');
    training.push('Hazard identification and risk assessment');
    training.push('Emergency response procedures');
    
    if (moduleName === 'civil') {
      training.push('Structural safety principles');
      training.push('Temporary works safety');
    }
    
    if (calculationType.includes('foundation')) {
      training.push('Excavation safety');
      training.push('Confined space entry');
    }
    
    training.push('Personal protective equipment use');
    training.push('First aid and emergency response');
    
    return training;
  }
}

export default SafetyCompliance;
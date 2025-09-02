/**
 * ISO Standards Compliance Module
 * International Organization for Standardization compliance checks
 */

class ISOStandards {
  constructor() {
    this.standards = {
      'ISO 9001:2015': 'Quality management systems',
      'ISO 14001:2015': 'Environmental management systems',
      'ISO 45001:2018': 'Occupational health and safety management',
      'ISO 19650:2018': 'Information management using BIM',
      'ISO 15686:2011': 'Service life planning',
      'ISO 6707:2017': 'Buildings and civil engineering works vocabulary',
      'ISO 15392:2019': 'Sustainability in buildings and civil engineering works'
    };
  }

  /**
   * Check compliance with ISO standards
   */
  async check(moduleName, calculationType, inputs, result) {
    const compliance = {
      passed: true,
      notes: [],
      applicableStandards: [],
      sustainabilityScore: 0,
      qualityMetrics: {}
    };

    // Quality management compliance (ISO 9001)
    const qualityCheck = this.checkQualityCompliance(inputs, result);
    
    // Environmental compliance (ISO 14001)
    const environmentalCheck = this.checkEnvironmentalCompliance(inputs, result);
    
    // Safety compliance (ISO 45001)
    const safetyCheck = this.checkSafetyCompliance(inputs, result);
    
    // BIM compliance (ISO 19650)
    const bimCheck = this.checkBIMCompliance(inputs, result);

    // Combine all checks
    compliance.passed = qualityCheck.passed && environmentalCheck.passed && 
                       safetyCheck.passed && bimCheck.passed;
    
    compliance.notes = [
      ...qualityCheck.notes,
      ...environmentalCheck.notes,
      ...safetyCheck.notes,
      ...bimCheck.notes
    ];
    
    compliance.applicableStandards = [
      ...qualityCheck.standards,
      ...environmentalCheck.standards,
      ...safetyCheck.standards,
      ...bimCheck.standards
    ];

    compliance.sustainabilityScore = this.calculateSustainabilityScore(inputs, result);
    compliance.qualityMetrics = this.calculateQualityMetrics(inputs, result);

    return compliance;
  }

  /**
   * Check quality management compliance (ISO 9001:2015)
   */
  checkQualityCompliance(inputs, result) {
    const check = {
      passed: true,
      notes: [],
      standards: ['ISO 9001:2015']
    };

    // Documentation requirements
    if (!inputs.designBasis) {
      check.notes.push('Design basis documentation recommended per ISO 9001');
    }

    // Traceability requirements
    if (!inputs.calculationReference) {
      check.notes.push('Calculation reference tracking recommended for quality assurance');
    }

    // Verification requirements
    if (result.compliance) {
      const hasVerification = Object.values(result.compliance).some(c => c.passed !== undefined);
      if (!hasVerification) {
        check.notes.push('Independent verification recommended per ISO 9001');
      }
    }

    // Risk assessment
    if (!inputs.riskCategory) {
      check.notes.push('Risk category assessment recommended for quality planning');
    }

    return check;
  }

  /**
   * Check environmental compliance (ISO 14001:2015)
   */
  checkEnvironmentalCompliance(inputs, result) {
    const check = {
      passed: true,
      notes: [],
      standards: ['ISO 14001:2015', 'ISO 15392:2019']
    };

    // Material sustainability
    if (inputs.material === 'concrete' && !inputs.recycledContent) {
      check.notes.push('Consider recycled aggregate for environmental benefits');
    }

    // Energy efficiency
    if (inputs.buildingType && !inputs.energyEfficiencyRating) {
      check.notes.push('Energy efficiency assessment recommended per ISO 15392');
    }

    // Carbon footprint
    if (result.results && result.results.mixProportions) {
      const cementContent = result.results.mixProportions.cement;
      if (cementContent > 400) {
        check.notes.push('High cement content increases carbon footprint - consider alternatives');
      }
    }

    // Waste management
    check.notes.push('Implement construction waste management plan per ISO 14001');

    // Life cycle assessment
    if (!inputs.serviceLife) {
      check.notes.push('Service life planning recommended per ISO 15686');
    }

    return check;
  }

  /**
   * Check safety compliance (ISO 45001:2018)
   */
  checkSafetyCompliance(inputs, result) {
    const check = {
      passed: true,
      notes: [],
      standards: ['ISO 45001:2018']
    };

    // Hazard identification
    if (!inputs.hazardAssessment) {
      check.notes.push('Hazard identification and risk assessment required per ISO 45001');
    }

    // Safety factors
    if (result.compliance) {
      Object.entries(result.compliance).forEach(([key, value]) => {
        if (value.ratio && value.ratio > 0.9) {
          check.notes.push(`High utilization in ${key} - monitor safety margins`);
        }
      });
    }

    // Personal protective equipment
    if (inputs.constructionMethod) {
      check.notes.push('Ensure appropriate PPE requirements are specified');
    }

    // Emergency procedures
    check.notes.push('Emergency response procedures required per ISO 45001');

    // Training requirements
    check.notes.push('Competency requirements for personnel per ISO 45001');

    return check;
  }

  /**
   * Check BIM compliance (ISO 19650:2018)
   */
  checkBIMCompliance(inputs, result) {
    const check = {
      passed: true,
      notes: [],
      standards: ['ISO 19650:2018']
    };

    // Information requirements
    if (!inputs.informationRequirements) {
      check.notes.push('Organizational Information Requirements (OIR) should be defined');
    }

    // Data structure
    if (!inputs.dataStructure) {
      check.notes.push('Common Data Environment (CDE) structure recommended per ISO 19650');
    }

    // Model validation
    if (!inputs.modelValidation) {
      check.notes.push('Model validation procedures recommended for BIM compliance');
    }

    // Information delivery
    check.notes.push('Information delivery milestones should align with project stages');

    return check;
  }

  /**
   * Calculate sustainability score (0-100)
   */
  calculateSustainabilityScore(inputs, result) {
    let score = 50; // Base score

    // Material efficiency
    if (inputs.recycledContent) {
      score += 10;
    }

    // Energy efficiency
    if (inputs.energyEfficiencyRating) {
      const ratings = { 'A': 20, 'B': 15, 'C': 10, 'D': 5 };
      score += ratings[inputs.energyEfficiencyRating] || 0;
    }

    // Durability
    if (inputs.serviceLife && inputs.serviceLife > 50) {
      score += 10;
    }

    // Local materials
    if (inputs.localMaterials) {
      score += 5;
    }

    // Waste reduction
    if (inputs.wasteReductionPlan) {
      score += 5;
    }

    // Water efficiency
    if (inputs.waterEfficiencyMeasures) {
      score += 5;
    }

    return Math.min(score, 100);
  }

  /**
   * Calculate quality metrics
   */
  calculateQualityMetrics(inputs, result) {
    const metrics = {
      designCompliance: 0,
      documentationQuality: 0,
      verificationLevel: 0,
      riskManagement: 0
    };

    // Design compliance
    if (result.compliance) {
      const passedChecks = Object.values(result.compliance).filter(c => c.passed).length;
      const totalChecks = Object.keys(result.compliance).length;
      metrics.designCompliance = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;
    }

    // Documentation quality
    let docScore = 0;
    if (inputs.designBasis) docScore += 25;
    if (inputs.calculationReference) docScore += 25;
    if (inputs.standards) docScore += 25;
    if (result.standards) docScore += 25;
    metrics.documentationQuality = docScore;

    // Verification level
    let verificationScore = 0;
    if (result.compliance) verificationScore += 40;
    if (result.recommendations) verificationScore += 30;
    if (result.standards) verificationScore += 30;
    metrics.verificationLevel = verificationScore;

    // Risk management
    let riskScore = 50; // Base score
    if (inputs.riskCategory) riskScore += 25;
    if (inputs.hazardAssessment) riskScore += 25;
    metrics.riskManagement = riskScore;

    return metrics;
  }

  /**
   * Get sustainability recommendations
   */
  getSustainabilityRecommendations(inputs, score) {
    const recommendations = [];

    if (score < 60) {
      recommendations.push('Consider implementing green building practices');
      recommendations.push('Evaluate material alternatives for better sustainability');
    }

    if (score < 40) {
      recommendations.push('Sustainability assessment required per ISO 15392');
      recommendations.push('Life cycle assessment recommended');
    }

    if (!inputs.recycledContent) {
      recommendations.push('Consider using recycled materials where possible');
    }

    if (!inputs.energyEfficiencyRating) {
      recommendations.push('Conduct energy efficiency assessment');
    }

    if (!inputs.serviceLife || inputs.serviceLife < 50) {
      recommendations.push('Design for extended service life (50+ years)');
    }

    return recommendations;
  }

  /**
   * Get quality assurance checklist
   */
  getQualityAssuranceChecklist(calculationType) {
    const baseChecklist = [
      'Design basis clearly documented',
      'Calculation methodology verified',
      'Input parameters validated',
      'Results checked against standards',
      'Assumptions clearly stated',
      'Limitations identified',
      'Recommendations provided'
    ];

    const specificChecklists = {
      'beam-analysis': [
        'Load combinations verified',
        'Section properties confirmed',
        'Deflection limits checked',
        'Shear capacity verified'
      ],
      'foundation-bearing': [
        'Soil parameters validated',
        'Bearing capacity factors confirmed',
        'Settlement analysis performed',
        'Groundwater effects considered'
      ],
      'concrete-mix': [
        'Material specifications verified',
        'Durability requirements met',
        'Workability requirements satisfied',
        'Quality control measures defined'
      ]
    };

    return [
      ...baseChecklist,
      ...(specificChecklists[calculationType] || [])
    ];
  }

  /**
   * Generate compliance report
   */
  generateComplianceReport(moduleName, calculationType, inputs, result, compliance) {
    return {
      summary: {
        overallCompliance: compliance.passed,
        sustainabilityScore: compliance.sustainabilityScore,
        qualityMetrics: compliance.qualityMetrics
      },
      standards: {
        applicable: compliance.applicableStandards,
        references: this.getStandardReferences(compliance.applicableStandards)
      },
      recommendations: {
        immediate: compliance.notes.filter(note => note.includes('required')),
        suggested: compliance.notes.filter(note => note.includes('recommended')),
        sustainability: this.getSustainabilityRecommendations(inputs, compliance.sustainabilityScore)
      },
      checklist: this.getQualityAssuranceChecklist(calculationType),
      nextSteps: this.getNextSteps(compliance)
    };
  }

  getStandardReferences(standards) {
    const references = {};
    standards.forEach(std => {
      if (this.standards[std]) {
        references[std] = this.standards[std];
      }
    });
    return references;
  }

  getNextSteps(compliance) {
    const steps = [];

    if (!compliance.passed) {
      steps.push('Address compliance issues before proceeding');
    }

    if (compliance.sustainabilityScore < 60) {
      steps.push('Improve sustainability measures');
    }

    if (compliance.qualityMetrics.documentationQuality < 75) {
      steps.push('Enhance documentation quality');
    }

    steps.push('Conduct independent design review');
    steps.push('Prepare construction specifications');
    steps.push('Develop quality control plan');

    return steps;
  }
}

export default ISOStandards;
class AIService {
  // Cost estimation AI model
  estimateCost(projectData) {
    const { type, area, complexity, location } = projectData;
    
    const baseCosts = {
      RESIDENTIAL: 800,
      COMMERCIAL: 1200,
      INDUSTRIAL: 1500
    };
    
    const locationMultiplier = {
      'Kuala Lumpur': 1.3,
      'Selangor': 1.2,
      'Penang': 1.15,
      'Johor': 1.1
    };
    
    const complexityMultiplier = {
      LOW: 0.8,
      MEDIUM: 1.0,
      HIGH: 1.3,
      VERY_HIGH: 1.6
    };
    
    const baseCost = baseCosts[type] || 1000;
    const locationFactor = locationMultiplier[location] || 1.0;
    const complexityFactor = complexityMultiplier[complexity] || 1.0;
    
    const estimatedCost = area * baseCost * locationFactor * complexityFactor;
    const confidence = this.calculateConfidence(projectData);
    
    return {
      estimatedCost: Math.round(estimatedCost),
      confidence,
      breakdown: {
        baseCost: baseCost * area,
        locationAdjustment: (locationFactor - 1) * baseCost * area,
        complexityAdjustment: (complexityFactor - 1) * baseCost * area
      }
    };
  }

  // Risk prediction algorithm
  predictRisks(projectData) {
    const risks = [];
    const { startDate, endDate, location, budget, type } = projectData;
    
    // Weather risk
    if (this.isMonsoonSeason(startDate, endDate)) {
      risks.push({
        type: 'WEATHER',
        severity: 'HIGH',
        description: 'Project timeline overlaps with monsoon season',
        mitigation: 'Consider waterproofing and drainage measures'
      });
    }
    
    // Budget risk
    const estimatedCost = this.estimateCost(projectData).estimatedCost;
    if (budget < estimatedCost * 0.9) {
      risks.push({
        type: 'BUDGET',
        severity: 'MEDIUM',
        description: 'Budget may be insufficient',
        mitigation: 'Review scope or increase budget allocation'
      });
    }
    
    return risks;
  }

  // Design optimization suggestions
  optimizeDesign(designData) {
    const suggestions = [];
    const { structuralType, materials, energyEfficiency } = designData;
    
    if (materials.includes('steel') && !materials.includes('composite')) {
      suggestions.push({
        category: 'MATERIAL',
        suggestion: 'Consider steel-composite hybrid for better strength-to-weight ratio',
        savings: '15-20% weight reduction'
      });
    }
    
    if (energyEfficiency < 0.7) {
      suggestions.push({
        category: 'ENERGY',
        suggestion: 'Implement LED lighting and smart HVAC controls',
        savings: '30-40% energy cost reduction'
      });
    }
    
    return suggestions;
  }

  // Compliance checking automation
  checkCompliance(projectData) {
    const issues = [];
    const { buildingHeight, plotRatio, setback, fireExit } = projectData;
    
    // UBBL compliance checks
    if (buildingHeight > 75 && !fireExit.helicopter) {
      issues.push({
        code: 'UBBL_164',
        severity: 'CRITICAL',
        description: 'Buildings >75m require helicopter landing facility'
      });
    }
    
    if (plotRatio > 12) {
      issues.push({
        code: 'UBBL_59',
        severity: 'HIGH',
        description: 'Plot ratio exceeds maximum allowable limit'
      });
    }
    
    return {
      compliant: issues.length === 0,
      issues,
      overallScore: Math.max(0, 100 - (issues.length * 20))
    };
  }

  calculateConfidence(data) {
    let score = 0.5;
    if (data.area) score += 0.2;
    if (data.location) score += 0.15;
    if (data.complexity) score += 0.15;
    return Math.min(score, 0.95);
  }

  isMonsoonSeason(start, end) {
    const startMonth = new Date(start).getMonth();
    const endMonth = new Date(end).getMonth();
    return (startMonth >= 9 && startMonth <= 11) || (endMonth >= 9 && endMonth <= 11);
  }
}

module.exports = new AIService();
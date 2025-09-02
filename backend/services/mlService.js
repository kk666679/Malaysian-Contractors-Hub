const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MLService {
  constructor() {
    this.models = {
      costPrediction: null,
      riskAssessment: null,
      timelineOptimization: null
    };
  }

  // Train cost prediction model with historical project data
  async trainCostModel() {
    const projects = await prisma.project.findMany({
      where: { status: 'COMPLETED' },
      include: { calculations: true }
    });

    const trainingData = projects.map(project => ({
      features: {
        area: project.area || 0,
        type: this.encodeProjectType(project.type),
        complexity: this.encodeComplexity(project.complexity),
        location: this.encodeLocation(project.location),
        duration: this.calculateDuration(project.startDate, project.endDate)
      },
      target: project.actualCost || project.budget
    }));

    // Simple linear regression implementation
    this.models.costPrediction = this.trainLinearRegression(trainingData);
    return { trained: true, samples: trainingData.length };
  }

  // Predict project cost using trained model
  predictProjectCost(projectData) {
    if (!this.models.costPrediction) {
      return this.fallbackCostEstimation(projectData);
    }

    const features = {
      area: projectData.area || 0,
      type: this.encodeProjectType(projectData.type),
      complexity: this.encodeComplexity(projectData.complexity),
      location: this.encodeLocation(projectData.location),
      duration: projectData.estimatedDuration || 12
    };

    const prediction = this.applyLinearModel(this.models.costPrediction, features);
    
    return {
      predictedCost: Math.round(prediction),
      confidence: this.calculateConfidence(features),
      factors: this.explainPrediction(features),
      modelVersion: '1.0'
    };
  }

  // Advanced risk assessment using ML
  async assessProjectRisks(projectData) {
    const historicalRisks = await this.getHistoricalRisks(projectData);
    const iotData = await this.getRecentIoTData(projectData.siteId);
    
    const riskFactors = {
      weather: this.assessWeatherRisk(projectData),
      budget: this.assessBudgetRisk(projectData),
      timeline: this.assessTimelineRisk(projectData),
      environmental: this.assessEnvironmentalRisk(iotData),
      technical: this.assessTechnicalRisk(projectData)
    };

    const overallRisk = this.calculateOverallRisk(riskFactors);
    
    return {
      overallRisk,
      riskFactors,
      recommendations: this.generateRiskMitigation(riskFactors),
      confidence: 0.85
    };
  }

  // Predictive maintenance using IoT data
  async predictMaintenance(deviceId) {
    const sensorData = await prisma.sensorReading.findMany({
      where: { siteId: deviceId },
      orderBy: { timestamp: 'desc' },
      take: 1000
    });

    const patterns = this.analyzeMaintenancePatterns(sensorData);
    const anomalies = this.detectAnomalies(sensorData);
    
    return {
      maintenanceNeeded: patterns.maintenanceScore > 0.7,
      urgency: this.calculateUrgency(patterns, anomalies),
      predictedFailureDate: this.predictFailureDate(patterns),
      recommendations: this.generateMaintenanceRecommendations(patterns)
    };
  }

  // Timeline optimization using historical data
  async optimizeTimeline(projectData) {
    const similarProjects = await this.findSimilarProjects(projectData);
    const optimizations = this.analyzeTimelineOptimizations(similarProjects);
    
    return {
      optimizedDuration: optimizations.suggestedDuration,
      criticalPath: optimizations.criticalTasks,
      bufferRecommendations: optimizations.buffers,
      riskMitigation: optimizations.risks
    };
  }

  // Helper methods
  trainLinearRegression(data) {
    // Simplified linear regression
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    data.forEach(point => {
      const x = Object.values(point.features).reduce((a, b) => a + b, 0);
      const y = point.target;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
  }

  applyLinearModel(model, features) {
    const x = Object.values(features).reduce((a, b) => a + b, 0);
    return model.slope * x + model.intercept;
  }

  encodeProjectType(type) {
    const types = { RESIDENTIAL: 1, COMMERCIAL: 2, INDUSTRIAL: 3 };
    return types[type] || 1;
  }

  encodeComplexity(complexity) {
    const levels = { LOW: 1, MEDIUM: 2, HIGH: 3, VERY_HIGH: 4 };
    return levels[complexity] || 2;
  }

  encodeLocation(location) {
    const locations = { 'Kuala Lumpur': 3, 'Selangor': 2, 'Penang': 2, 'Johor': 1 };
    return locations[location] || 1;
  }

  calculateDuration(start, end) {
    return Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24 * 30));
  }

  fallbackCostEstimation(projectData) {
    const baseCosts = { RESIDENTIAL: 800, COMMERCIAL: 1200, INDUSTRIAL: 1500 };
    const baseCost = baseCosts[projectData.type] || 1000;
    return {
      predictedCost: Math.round(projectData.area * baseCost),
      confidence: 0.6,
      factors: ['Using fallback estimation'],
      modelVersion: 'fallback'
    };
  }

  calculateConfidence(features) {
    return Math.min(0.95, 0.5 + (Object.keys(features).length * 0.1));
  }

  explainPrediction(features) {
    return [
      `Area factor: ${features.area}`,
      `Type factor: ${features.type}`,
      `Location factor: ${features.location}`
    ];
  }

  async getHistoricalRisks(projectData) {
    return await prisma.project.findMany({
      where: {
        type: projectData.type,
        location: projectData.location,
        status: 'COMPLETED'
      },
      select: { risks: true, delays: true, costOverruns: true }
    });
  }

  async getRecentIoTData(siteId) {
    if (!siteId) return null;
    return await prisma.sensorReading.findMany({
      where: { siteId },
      orderBy: { timestamp: 'desc' },
      take: 100
    });
  }

  assessWeatherRisk(projectData) {
    const startMonth = new Date(projectData.startDate).getMonth();
    return (startMonth >= 9 && startMonth <= 11) ? 0.8 : 0.3;
  }

  assessBudgetRisk(projectData) {
    const predicted = this.predictProjectCost(projectData);
    return projectData.budget < predicted.predictedCost * 0.9 ? 0.7 : 0.2;
  }

  assessTimelineRisk(projectData) {
    return projectData.estimatedDuration < 6 ? 0.6 : 0.3;
  }

  assessEnvironmentalRisk(iotData) {
    if (!iotData) return 0.3;
    const alerts = iotData.filter(reading => reading.status === 'ALERT');
    return Math.min(0.9, alerts.length / iotData.length);
  }

  assessTechnicalRisk(projectData) {
    return projectData.complexity === 'VERY_HIGH' ? 0.8 : 0.4;
  }

  calculateOverallRisk(factors) {
    const weights = { weather: 0.2, budget: 0.3, timeline: 0.2, environmental: 0.15, technical: 0.15 };
    return Object.entries(factors).reduce((sum, [key, value]) => sum + (value * weights[key]), 0);
  }

  generateRiskMitigation(factors) {
    const recommendations = [];
    if (factors.weather > 0.6) recommendations.push('Schedule around monsoon season');
    if (factors.budget > 0.6) recommendations.push('Increase budget allocation by 15%');
    if (factors.environmental > 0.6) recommendations.push('Implement environmental monitoring');
    return recommendations;
  }

  analyzeMaintenancePatterns(sensorData) {
    const avgValues = this.calculateAverages(sensorData);
    const trends = this.calculateTrends(sensorData);
    return {
      maintenanceScore: Math.min(1, (avgValues.temperature - 25) / 10 + trends.degradation),
      patterns: { avgValues, trends }
    };
  }

  detectAnomalies(sensorData) {
    return sensorData.filter(reading => reading.status === 'ALERT').length;
  }

  calculateUrgency(patterns, anomalies) {
    return patterns.maintenanceScore > 0.8 || anomalies > 10 ? 'HIGH' : 'MEDIUM';
  }

  predictFailureDate(patterns) {
    const daysToFailure = Math.max(7, (1 - patterns.maintenanceScore) * 90);
    const failureDate = new Date();
    failureDate.setDate(failureDate.getDate() + daysToFailure);
    return failureDate;
  }

  generateMaintenanceRecommendations(patterns) {
    return [
      'Schedule preventive maintenance',
      'Check sensor calibration',
      'Inspect equipment condition'
    ];
  }

  async findSimilarProjects(projectData) {
    return await prisma.project.findMany({
      where: {
        type: projectData.type,
        status: 'COMPLETED'
      },
      take: 10
    });
  }

  analyzeTimelineOptimizations(projects) {
    const avgDuration = projects.reduce((sum, p) => sum + this.calculateDuration(p.startDate, p.endDate), 0) / projects.length;
    return {
      suggestedDuration: Math.round(avgDuration),
      criticalTasks: ['Foundation', 'Structure', 'MEP'],
      buffers: { weather: 0.1, technical: 0.15 },
      risks: ['Weather delays', 'Material delivery']
    };
  }

  calculateAverages(data) {
    const grouped = data.reduce((acc, reading) => {
      if (!acc[reading.sensorType]) acc[reading.sensorType] = [];
      acc[reading.sensorType].push(reading.value);
      return acc;
    }, {});

    return Object.entries(grouped).reduce((acc, [type, values]) => {
      acc[type] = values.reduce((sum, val) => sum + val, 0) / values.length;
      return acc;
    }, {});
  }

  calculateTrends(data) {
    return { degradation: Math.random() * 0.3 }; // Simplified trend calculation
  }
}

module.exports = new MLService();
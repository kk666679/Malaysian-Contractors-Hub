const mqtt = require('mqtt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EdgeComputingService {
  constructor() {
    this.edgeNodes = new Map();
    this.processingRules = new Map();
    this.localCache = new Map();
  }

  // Initialize edge computing nodes
  async initializeEdgeNodes() {
    const sites = await prisma.site.findMany();
    
    sites.forEach(site => {
      this.edgeNodes.set(site.id, {
        id: site.id,
        location: site.location,
        status: 'ACTIVE',
        sensors: [],
        processingCapacity: 100,
        lastHeartbeat: new Date()
      });
    });

    return { initialized: this.edgeNodes.size };
  }

  // Process sensor data locally at edge
  processAtEdge(siteId, sensorData) {
    const edgeNode = this.edgeNodes.get(siteId);
    if (!edgeNode) return null;

    const processed = {
      ...sensorData,
      processedAt: 'edge',
      anomalyScore: this.calculateAnomalyScore(sensorData),
      localAlert: this.checkLocalThresholds(sensorData),
      timestamp: new Date()
    };

    // Store in local cache
    this.localCache.set(`${siteId}-${sensorData.sensorType}`, processed);

    // Send to cloud only if anomaly or alert
    if (processed.anomalyScore > 0.7 || processed.localAlert) {
      this.sendToCloud(processed);
    }

    return processed;
  }

  // Advanced sensor types processing
  processAdvancedSensors(sensorData) {
    const processors = {
      vibration: this.processVibrationData,
      fuel: this.processFuelData,
      gps: this.processGPSData,
      pressure: this.processPressureData,
      flow: this.processFlowData
    };

    const processor = processors[sensorData.type];
    return processor ? processor.call(this, sensorData) : sensorData;
  }

  processVibrationData(data) {
    const { x, y, z } = data.values;
    const magnitude = Math.sqrt(x*x + y*y + z*z);
    
    return {
      ...data,
      magnitude,
      frequency: this.calculateFrequency(data.values),
      healthScore: this.calculateEquipmentHealth(magnitude),
      maintenanceAlert: magnitude > 10
    };
  }

  processFuelData(data) {
    const consumption = this.calculateConsumption(data.level, data.previousLevel);
    
    return {
      ...data,
      consumption,
      efficiency: this.calculateEfficiency(consumption, data.operatingHours),
      refuelAlert: data.level < 0.2,
      estimatedRuntime: data.level / (consumption || 0.1) * 24
    };
  }

  processGPSData(data) {
    const { lat, lng, speed, heading } = data;
    
    return {
      ...data,
      geofenceAlert: this.checkGeofence(lat, lng),
      speedAlert: speed > data.speedLimit,
      route: this.calculateRoute(data.previousPosition, { lat, lng }),
      utilization: this.calculateUtilization(data.operatingTime)
    };
  }

  processPressureData(data) {
    return {
      ...data,
      trend: this.calculatePressureTrend(data.value, data.history),
      leakAlert: this.detectPressureLeak(data.value, data.expected),
      systemHealth: this.assessSystemHealth(data.value)
    };
  }

  processFlowData(data) {
    return {
      ...data,
      flowRate: this.calculateFlowRate(data.value),
      blockageAlert: data.value < data.expected * 0.7,
      efficiency: this.calculateFlowEfficiency(data.value, data.expected)
    };
  }

  // 3D site visualization data processing
  generate3DSiteData(siteId) {
    const sensors = Array.from(this.localCache.entries())
      .filter(([key]) => key.startsWith(siteId))
      .map(([key, data]) => ({
        id: key,
        position: this.getSensorPosition(data.sensorId),
        type: data.sensorType,
        value: data.value,
        status: data.status,
        alert: data.localAlert
      }));

    return {
      siteId,
      sensors,
      heatmap: this.generateHeatmap(sensors),
      alerts: sensors.filter(s => s.alert),
      timestamp: new Date()
    };
  }

  // BIM integration for spatial context
  async integrateBIMData(siteId, bimData) {
    const siteData = this.generate3DSiteData(siteId);
    
    const integrated = {
      bimModel: bimData.modelUrl,
      sensors: siteData.sensors.map(sensor => ({
        ...sensor,
        bimElement: this.mapToBIMElement(sensor.position, bimData.elements),
        spatialContext: this.getSpatialContext(sensor.position, bimData)
      })),
      spatialAnalysis: this.performSpatialAnalysis(siteData.sensors, bimData)
    };

    return integrated;
  }

  // Real-time edge analytics
  performEdgeAnalytics(siteId) {
    const siteData = Array.from(this.localCache.entries())
      .filter(([key]) => key.startsWith(siteId))
      .map(([, data]) => data);

    return {
      realTimeMetrics: this.calculateRealTimeMetrics(siteData),
      patterns: this.detectPatterns(siteData),
      predictions: this.makeLocalPredictions(siteData),
      recommendations: this.generateLocalRecommendations(siteData)
    };
  }

  // Helper methods
  calculateAnomalyScore(data) {
    const thresholds = {
      temperature: { min: 15, max: 35 },
      humidity: { min: 30, max: 80 },
      co2: { max: 1000 },
      vibration: { max: 5 },
      pressure: { min: 1, max: 10 }
    };

    const threshold = thresholds[data.sensorType];
    if (!threshold) return 0;

    let score = 0;
    if (threshold.min && data.value < threshold.min) score = (threshold.min - data.value) / threshold.min;
    if (threshold.max && data.value > threshold.max) score = (data.value - threshold.max) / threshold.max;

    return Math.min(1, score);
  }

  checkLocalThresholds(data) {
    const anomalyScore = this.calculateAnomalyScore(data);
    return anomalyScore > 0.5;
  }

  sendToCloud(data) {
    // Simulate cloud transmission
    console.log(`Sending to cloud: ${data.sensorType} - ${data.value}`);
  }

  calculateFrequency(values) {
    return Math.sqrt(values.x*values.x + values.y*values.y + values.z*values.z) * 10;
  }

  calculateEquipmentHealth(magnitude) {
    return Math.max(0, 1 - (magnitude / 20));
  }

  calculateConsumption(current, previous) {
    return Math.max(0, previous - current);
  }

  calculateEfficiency(consumption, hours) {
    return hours > 0 ? consumption / hours : 0;
  }

  checkGeofence(lat, lng) {
    // Simplified geofence check
    return lat < 3.0 || lat > 3.2 || lng < 101.6 || lng > 101.8;
  }

  calculateRoute(prev, current) {
    if (!prev) return 0;
    const distance = Math.sqrt(
      Math.pow(current.lat - prev.lat, 2) + Math.pow(current.lng - prev.lng, 2)
    );
    return distance * 111000; // Convert to meters
  }

  calculateUtilization(operatingTime) {
    return Math.min(1, operatingTime / 8); // 8 hours = 100%
  }

  calculatePressureTrend(current, history) {
    if (!history || history.length < 2) return 'stable';
    const recent = history.slice(-5);
    const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    return current > avg * 1.1 ? 'increasing' : current < avg * 0.9 ? 'decreasing' : 'stable';
  }

  detectPressureLeak(current, expected) {
    return current < expected * 0.8;
  }

  assessSystemHealth(pressure) {
    return pressure > 5 ? 'good' : pressure > 2 ? 'fair' : 'poor';
  }

  calculateFlowRate(value) {
    return value * 60; // Convert to per minute
  }

  calculateFlowEfficiency(actual, expected) {
    return expected > 0 ? actual / expected : 0;
  }

  getSensorPosition(sensorId) {
    // Mock sensor positions
    return { x: Math.random() * 100, y: Math.random() * 100, z: Math.random() * 10 };
  }

  generateHeatmap(sensors) {
    return sensors.map(sensor => ({
      position: sensor.position,
      intensity: sensor.value / 100,
      type: sensor.type
    }));
  }

  mapToBIMElement(position, elements) {
    // Find closest BIM element
    return elements.find(el => 
      Math.abs(el.position.x - position.x) < 5 &&
      Math.abs(el.position.y - position.y) < 5
    );
  }

  getSpatialContext(position, bimData) {
    return {
      floor: Math.floor(position.z / 3) + 1,
      zone: this.determineZone(position),
      nearbyElements: bimData.elements.filter(el => 
        this.calculateDistance(position, el.position) < 10
      )
    };
  }

  performSpatialAnalysis(sensors, bimData) {
    return {
      coverage: this.calculateSensorCoverage(sensors, bimData.area),
      gaps: this.identifyCoverageGaps(sensors, bimData.area),
      redundancy: this.calculateRedundancy(sensors)
    };
  }

  calculateRealTimeMetrics(data) {
    return {
      avgTemperature: this.calculateAverage(data, 'temperature'),
      avgHumidity: this.calculateAverage(data, 'humidity'),
      alertCount: data.filter(d => d.localAlert).length,
      dataPoints: data.length
    };
  }

  detectPatterns(data) {
    return {
      cyclical: this.detectCyclicalPatterns(data),
      trending: this.detectTrends(data),
      correlations: this.detectCorrelations(data)
    };
  }

  makeLocalPredictions(data) {
    return {
      nextHourTrend: this.predictNextHour(data),
      maintenanceNeeded: this.predictMaintenance(data),
      alertProbability: this.predictAlerts(data)
    };
  }

  generateLocalRecommendations(data) {
    const recommendations = [];
    const alerts = data.filter(d => d.localAlert);
    
    if (alerts.length > 0) {
      recommendations.push('Investigate sensor alerts immediately');
    }
    
    const highTemp = data.filter(d => d.sensorType === 'temperature' && d.value > 30);
    if (highTemp.length > 0) {
      recommendations.push('Consider cooling measures');
    }

    return recommendations;
  }

  calculateAverage(data, type) {
    const filtered = data.filter(d => d.sensorType === type);
    return filtered.length > 0 ? 
      filtered.reduce((sum, d) => sum + d.value, 0) / filtered.length : 0;
  }

  determineZone(position) {
    return position.x < 50 ? 'A' : 'B';
  }

  calculateDistance(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + 
      Math.pow(pos1.y - pos2.y, 2) + 
      Math.pow(pos1.z - pos2.z, 2)
    );
  }

  calculateSensorCoverage(sensors, area) {
    return Math.min(1, sensors.length / (area / 100));
  }

  identifyCoverageGaps(sensors, area) {
    return []; // Simplified - would identify areas without sensor coverage
  }

  calculateRedundancy(sensors) {
    const typeCount = sensors.reduce((acc, sensor) => {
      acc[sensor.type] = (acc[sensor.type] || 0) + 1;
      return acc;
    }, {});
    
    return Object.values(typeCount).filter(count => count > 1).length;
  }

  detectCyclicalPatterns(data) {
    return data.length > 24; // Simplified - would detect daily/weekly patterns
  }

  detectTrends(data) {
    return data.length > 10 ? 'increasing' : 'stable'; // Simplified trend detection
  }

  detectCorrelations(data) {
    return []; // Would detect correlations between sensor types
  }

  predictNextHour(data) {
    return 'stable'; // Simplified prediction
  }

  predictMaintenance(data) {
    return data.some(d => d.localAlert);
  }

  predictAlerts(data) {
    const alertRate = data.filter(d => d.localAlert).length / data.length;
    return Math.min(1, alertRate * 2);
  }
}

module.exports = new EdgeComputingService();
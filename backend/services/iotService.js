const mqtt = require('mqtt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class IoTService {
  constructor() {
    this.mqttClient = null;
    this.sensors = new Map();
    this.thresholds = {
      temperature: { min: 20, max: 30 },
      humidity: { min: 40, max: 70 },
      co2: { max: 1000 },
      noise: { max: 85 },
      dust: { max: 150 }
    };
  }

  async initialize() {
    this.mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883');
    
    this.mqttClient.on('connect', () => {
      console.log('IoT MQTT connected');
      this.mqttClient.subscribe('sensors/+/+');
    });

    this.mqttClient.on('message', (topic, message) => {
      this.processSensorData(topic, JSON.parse(message.toString()));
    });
  }

  async processSensorData(topic, data) {
    const [, siteId, sensorType] = topic.split('/');
    
    const sensorData = {
      siteId,
      sensorType,
      value: data.value,
      timestamp: new Date(data.timestamp),
      unit: data.unit,
      status: this.checkThreshold(sensorType, data.value)
    };

    // Store in database
    await prisma.sensorReading.create({ data: sensorData });

    // Check alerts
    if (sensorData.status === 'ALERT') {
      await this.triggerAlert(sensorData);
    }

    // Update real-time cache
    this.sensors.set(`${siteId}-${sensorType}`, sensorData);
  }

  checkThreshold(type, value) {
    const threshold = this.thresholds[type];
    if (!threshold) return 'NORMAL';
    
    if (threshold.min && value < threshold.min) return 'ALERT';
    if (threshold.max && value > threshold.max) return 'ALERT';
    return 'NORMAL';
  }

  async triggerAlert(sensorData) {
    await prisma.alert.create({
      data: {
        type: 'SENSOR_THRESHOLD',
        severity: 'HIGH',
        message: `${sensorData.sensorType} reading ${sensorData.value}${sensorData.unit} exceeds threshold`,
        siteId: sensorData.siteId,
        metadata: sensorData
      }
    });
  }

  async getSiteData(siteId) {
    const readings = await prisma.sensorReading.findMany({
      where: { siteId },
      orderBy: { timestamp: 'desc' },
      take: 100
    });

    return {
      current: Array.from(this.sensors.entries())
        .filter(([key]) => key.startsWith(siteId))
        .map(([, data]) => data),
      historical: readings
    };
  }

  async getAnalytics(siteId, timeRange = '24h') {
    const hours = parseInt(timeRange.replace('h', ''));
    const startTime = new Date(Date.now() - hours * 60 * 60 * 1000);

    const readings = await prisma.sensorReading.findMany({
      where: {
        siteId,
        timestamp: { gte: startTime }
      }
    });

    return {
      averages: this.calculateAverages(readings),
      trends: this.calculateTrends(readings),
      alerts: await this.getAlerts(siteId, startTime)
    };
  }

  calculateAverages(readings) {
    const grouped = readings.reduce((acc, reading) => {
      if (!acc[reading.sensorType]) acc[reading.sensorType] = [];
      acc[reading.sensorType].push(reading.value);
      return acc;
    }, {});

    return Object.entries(grouped).reduce((acc, [type, values]) => {
      acc[type] = values.reduce((sum, val) => sum + val, 0) / values.length;
      return acc;
    }, {});
  }

  calculateTrends(readings) {
    // Simple trend calculation - could be enhanced with ML
    const hourlyData = readings.reduce((acc, reading) => {
      const hour = new Date(reading.timestamp).getHours();
      if (!acc[hour]) acc[hour] = {};
      if (!acc[hour][reading.sensorType]) acc[hour][reading.sensorType] = [];
      acc[hour][reading.sensorType].push(reading.value);
      return acc;
    }, {});

    return hourlyData;
  }

  async getAlerts(siteId, startTime) {
    return await prisma.alert.findMany({
      where: {
        siteId,
        createdAt: { gte: startTime }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = new IoTService();
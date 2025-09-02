const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ARVRService {
  constructor() {
    this.arSessions = new Map();
    this.vrSessions = new Map();
    this.spatialAnchors = new Map();
  }

  // Augmented Reality for site visualization
  async createARSession(projectId, userId) {
    const session = {
      id: this.generateSessionId(),
      projectId,
      userId,
      type: 'AR',
      status: 'ACTIVE',
      startTime: new Date(),
      anchors: [],
      measurements: [],
      annotations: []
    };

    this.arSessions.set(session.id, session);
    return session;
  }

  // Place AR anchor for measurements
  async placeARMeasurement(sessionId, measurementData) {
    const session = this.arSessions.get(sessionId);
    if (!session) throw new Error('AR session not found');

    const measurement = {
      id: this.generateId(),
      type: measurementData.type, // 'distance', 'area', 'volume'
      points: measurementData.points,
      value: this.calculateMeasurement(measurementData),
      unit: measurementData.unit,
      timestamp: new Date(),
      worldPosition: measurementData.worldPosition
    };

    session.measurements.push(measurement);
    
    // Store in database
    await prisma.arMeasurement.create({
      data: {
        sessionId,
        projectId: session.projectId,
        type: measurement.type,
        value: measurement.value,
        unit: measurement.unit,
        data: measurement
      }
    });

    return measurement;
  }

  // Add AR annotation
  async addARAnnotation(sessionId, annotationData) {
    const session = this.arSessions.get(sessionId);
    if (!session) throw new Error('AR session not found');

    const annotation = {
      id: this.generateId(),
      text: annotationData.text,
      position: annotationData.position,
      type: annotationData.type, // 'note', 'issue', 'instruction'
      author: annotationData.userId,
      timestamp: new Date(),
      attachments: annotationData.attachments || []
    };

    session.annotations.push(annotation);
    return annotation;
  }

  // Virtual Reality project walkthrough
  async createVRWalkthrough(projectId, bimModelUrl) {
    const walkthrough = {
      id: this.generateId(),
      projectId,
      modelUrl: bimModelUrl,
      scenes: await this.generateVRScenes(projectId),
      interactions: this.defineVRInteractions(),
      navigation: this.setupVRNavigation(),
      createdAt: new Date()
    };

    await prisma.vrWalkthrough.create({
      data: {
        projectId,
        modelUrl: bimModelUrl,
        data: walkthrough
      }
    });

    return walkthrough;
  }

  // Start VR session
  async startVRSession(walkthroughId, userId) {
    const walkthrough = await prisma.vrWalkthrough.findUnique({
      where: { id: walkthroughId }
    });

    if (!walkthrough) throw new Error('VR walkthrough not found');

    const session = {
      id: this.generateSessionId(),
      walkthroughId,
      userId,
      currentScene: 0,
      startTime: new Date(),
      interactions: [],
      feedback: []
    };

    this.vrSessions.set(session.id, session);
    return session;
  }

  // Mixed reality for design collaboration
  async createMRCollaboration(projectId, participants) {
    const collaboration = {
      id: this.generateId(),
      projectId,
      participants: participants.map(p => ({
        userId: p.userId,
        role: p.role,
        status: 'INVITED',
        joinedAt: null
      })),
      sharedSpace: {
        origin: { x: 0, y: 0, z: 0 },
        scale: 1,
        objects: []
      },
      tools: this.getMRTools(),
      createdAt: new Date()
    };

    return collaboration;
  }

  // Join MR collaboration
  async joinMRCollaboration(collaborationId, userId) {
    const collaboration = await this.getMRCollaboration(collaborationId);
    const participant = collaboration.participants.find(p => p.userId === userId);
    
    if (!participant) throw new Error('User not invited to collaboration');

    participant.status = 'JOINED';
    participant.joinedAt = new Date();

    return {
      collaboration,
      userRole: participant.role,
      sharedSpace: collaboration.sharedSpace
    };
  }

  // Mobile AR for on-site measurements
  async processMobileARMeasurement(imageData, calibrationData) {
    const analysis = {
      imageProcessed: true,
      objectsDetected: this.detectObjects(imageData),
      measurements: this.extractMeasurements(imageData, calibrationData),
      accuracy: this.calculateAccuracy(calibrationData),
      timestamp: new Date()
    };

    return analysis;
  }

  // AR visualization of IoT data
  async overlayIoTDataAR(sessionId, siteId) {
    const session = this.arSessions.get(sessionId);
    if (!session) throw new Error('AR session not found');

    const iotData = await prisma.sensorReading.findMany({
      where: { siteId },
      orderBy: { timestamp: 'desc' },
      take: 50
    });

    const overlay = {
      sensors: iotData.map(reading => ({
        id: reading.id,
        type: reading.sensorType,
        value: reading.value,
        unit: reading.unit,
        status: reading.status,
        position: this.getSensorARPosition(reading.sensorId),
        visualization: this.getVisualizationType(reading.sensorType)
      })),
      heatmap: this.generateARHeatmap(iotData),
      alerts: iotData.filter(r => r.status === 'ALERT')
    };

    return overlay;
  }

  // VR training simulation
  async createVRTraining(trainingType, scenarios) {
    const training = {
      id: this.generateId(),
      type: trainingType, // 'safety', 'equipment', 'procedure'
      scenarios: scenarios.map(scenario => ({
        id: this.generateId(),
        name: scenario.name,
        description: scenario.description,
        objectives: scenario.objectives,
        environment: scenario.environment,
        interactions: scenario.interactions,
        assessment: scenario.assessment
      })),
      duration: this.calculateTrainingDuration(scenarios),
      difficulty: this.assessTrainingDifficulty(scenarios),
      createdAt: new Date()
    };

    return training;
  }

  // Helper methods
  calculateMeasurement(data) {
    switch (data.type) {
      case 'distance':
        return this.calculateDistance(data.points[0], data.points[1]);
      case 'area':
        return this.calculateArea(data.points);
      case 'volume':
        return this.calculateVolume(data.points);
      default:
        return 0;
    }
  }

  calculateDistance(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) +
      Math.pow(point2.y - point1.y, 2) +
      Math.pow(point2.z - point1.z, 2)
    );
  }

  calculateArea(points) {
    // Simplified area calculation for polygon
    if (points.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
  }

  calculateVolume(points) {
    // Simplified volume calculation
    const area = this.calculateArea(points.slice(0, -1));
    const height = points[points.length - 1].z;
    return area * height;
  }

  async generateVRScenes(projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { documents: true }
    });

    return [
      {
        id: 'exterior',
        name: 'Exterior View',
        description: 'Outside view of the building',
        position: { x: 0, y: 0, z: -10 },
        objects: this.generateExteriorObjects(project)
      },
      {
        id: 'interior',
        name: 'Interior Spaces',
        description: 'Inside the building',
        position: { x: 0, y: 0, z: 0 },
        objects: this.generateInteriorObjects(project)
      }
    ];
  }

  defineVRInteractions() {
    return [
      {
        type: 'teleport',
        description: 'Move to different locations',
        gesture: 'point_and_click'
      },
      {
        type: 'grab',
        description: 'Pick up and move objects',
        gesture: 'grip'
      },
      {
        type: 'measure',
        description: 'Measure distances and areas',
        gesture: 'trigger'
      }
    ];
  }

  setupVRNavigation() {
    return {
      type: 'teleport',
      boundaries: { x: [-50, 50], y: [0, 20], z: [-50, 50] },
      waypoints: [
        { name: 'Entrance', position: { x: 0, y: 0, z: -10 } },
        { name: 'Main Hall', position: { x: 0, y: 0, z: 0 } },
        { name: 'Upper Floor', position: { x: 0, y: 5, z: 0 } }
      ]
    };
  }

  getMRTools() {
    return [
      {
        name: 'Annotation Tool',
        description: 'Add 3D notes and comments',
        icon: 'note'
      },
      {
        name: 'Measurement Tool',
        description: 'Measure distances and dimensions',
        icon: 'ruler'
      },
      {
        name: 'Drawing Tool',
        description: 'Draw in 3D space',
        icon: 'pen'
      }
    ];
  }

  detectObjects(imageData) {
    // Simulate object detection
    return [
      { type: 'wall', confidence: 0.95, bounds: { x: 10, y: 20, width: 100, height: 80 } },
      { type: 'door', confidence: 0.88, bounds: { x: 50, y: 60, width: 30, height: 60 } }
    ];
  }

  extractMeasurements(imageData, calibrationData) {
    // Simulate measurement extraction
    return [
      { type: 'width', value: 3.2, unit: 'meters' },
      { type: 'height', value: 2.8, unit: 'meters' }
    ];
  }

  calculateAccuracy(calibrationData) {
    return calibrationData.referencePoints >= 3 ? 0.95 : 0.75;
  }

  getSensorARPosition(sensorId) {
    // Mock sensor positions in AR space
    return { x: Math.random() * 10, y: Math.random() * 3, z: Math.random() * 10 };
  }

  getVisualizationType(sensorType) {
    const visualizations = {
      temperature: 'heatmap',
      humidity: 'particles',
      co2: 'cloud',
      noise: 'waves',
      vibration: 'ripples'
    };
    return visualizations[sensorType] || 'icon';
  }

  generateARHeatmap(iotData) {
    return iotData.map(reading => ({
      position: this.getSensorARPosition(reading.sensorId),
      intensity: reading.value / 100,
      color: this.getHeatmapColor(reading.value, reading.sensorType)
    }));
  }

  getHeatmapColor(value, type) {
    // Simple color mapping
    const intensity = Math.min(1, value / 50);
    return {
      r: intensity,
      g: 1 - intensity,
      b: 0,
      a: 0.7
    };
  }

  calculateTrainingDuration(scenarios) {
    return scenarios.reduce((total, scenario) => total + (scenario.estimatedTime || 10), 0);
  }

  assessTrainingDifficulty(scenarios) {
    const avgDifficulty = scenarios.reduce((sum, s) => sum + (s.difficulty || 1), 0) / scenarios.length;
    return avgDifficulty > 3 ? 'Advanced' : avgDifficulty > 2 ? 'Intermediate' : 'Beginner';
  }

  generateExteriorObjects(project) {
    return [
      { type: 'building', position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
      { type: 'landscape', position: { x: 0, y: -1, z: 0 }, scale: { x: 2, y: 1, z: 2 } }
    ];
  }

  generateInteriorObjects(project) {
    return [
      { type: 'room', position: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
      { type: 'furniture', position: { x: 2, y: 0, z: 2 }, scale: { x: 0.5, y: 0.5, z: 0.5 } }
    ];
  }

  async getMRCollaboration(collaborationId) {
    // Mock collaboration retrieval
    return {
      id: collaborationId,
      participants: [],
      sharedSpace: { origin: { x: 0, y: 0, z: 0 }, scale: 1, objects: [] }
    };
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }

  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

module.exports = new ARVRService();
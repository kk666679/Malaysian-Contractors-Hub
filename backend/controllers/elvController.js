import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// ELV system design
export const designELVSystem = async (req, res) => {
  try {
    const { 
      buildingArea, 
      floors, 
      systemTypes, 
      occupancy,
      securityLevel = 'medium'
    } = req.body;

    if (!buildingArea || !floors || !systemTypes) {
      return res.status(400).json({
        success: false,
        message: 'Building area, floors, and system types are required'
      });
    }

    // System calculations
    const systems = {
      cctv: systemTypes.includes('cctv') ? {
        cameras: Math.ceil(buildingArea / 50) * floors,
        storage: Math.ceil(buildingArea / 50) * floors * 2, // TB
        cost: Math.ceil(buildingArea / 50) * floors * 1500
      } : null,
      
      access_control: systemTypes.includes('access_control') ? {
        readers: floors * 4 + Math.ceil(buildingArea / 200),
        controllers: Math.ceil(floors / 2),
        cost: (floors * 4 + Math.ceil(buildingArea / 200)) * 800
      } : null,
      
      fire_alarm: systemTypes.includes('fire_alarm') ? {
        detectors: Math.ceil(buildingArea / 25),
        panels: Math.ceil(floors / 3),
        cost: Math.ceil(buildingArea / 25) * 200
      } : null,
      
      pa_system: systemTypes.includes('pa_system') ? {
        speakers: Math.ceil(buildingArea / 30),
        amplifiers: Math.ceil(floors / 2),
        cost: Math.ceil(buildingArea / 30) * 300
      } : null
    };

    // Cable requirements
    const cableLength = buildingArea * floors * 0.8; // meters
    const cableCost = cableLength * 15; // RM per meter

    const totalCost = Object.values(systems)
      .filter(Boolean)
      .reduce((sum, system) => sum + system.cost, 0) + cableCost;

    const result = {
      systems,
      infrastructure: {
        cableLength: Math.round(cableLength),
        cableCost: Math.round(cableCost),
        rackUnits: Math.ceil(floors / 2) * 42
      },
      cost: {
        systems: Math.round(totalCost - cableCost),
        infrastructure: Math.round(cableCost),
        total: Math.round(totalCost)
      },
      compliance: [
        'MS 2593:2015 - Fire detection and alarm systems',
        'MS 1837:2006 - CCTV systems',
        'UBBL 1984 - Building safety requirements'
      ]
    };

    if (req.user) {
      await prisma.calculation.create({
        data: {
          userId: req.user.id,
          projectId: req.body.projectId || null,
          moduleType: 'ELV_AUTOMATION',
          inputData: req.body,
          resultData: result
        }
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('ELV system design error:', error);
    res.status(500).json({
      success: false,
      message: 'ELV system design failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Building automation design
export const designBuildingAutomation = async (req, res) => {
  try {
    const {
      buildingArea,
      hvacZones,
      lightingZones,
      automationLevel = 'standard'
    } = req.body;

    if (!buildingArea || !hvacZones || !lightingZones) {
      return res.status(400).json({
        success: false,
        message: 'Building area, HVAC zones, and lighting zones are required'
      });
    }

    // BMS calculations
    const controllers = {
      hvac: Math.ceil(hvacZones / 8),
      lighting: Math.ceil(lightingZones / 16),
      main: 1
    };

    const sensors = {
      temperature: hvacZones * 2,
      occupancy: lightingZones,
      co2: hvacZones
    };

    const energySavings = automationLevel === 'advanced' ? 0.25 : 0.15;
    const annualSavings = buildingArea * 50 * energySavings; // RM per year

    const result = {
      controllers,
      sensors,
      energyEfficiency: {
        expectedSavings: `${(energySavings * 100)}%`,
        annualSavings: Math.round(annualSavings),
        paybackPeriod: '3-5 years'
      },
      protocols: ['BACnet', 'Modbus', 'KNX'],
      features: [
        'Automated HVAC control',
        'Occupancy-based lighting',
        'Energy monitoring',
        'Remote access and control'
      ]
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Building automation design error:', error);
    res.status(500).json({
      success: false,
      message: 'Building automation design failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  designELVSystem,
  designBuildingAutomation
};
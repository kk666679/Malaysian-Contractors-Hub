import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// Sewerage pipe sizing calculation
export const calculatePipeSizing = async (req, res) => {
  try {
    const { 
      flowRate, 
      pipeLength, 
      slope, 
      roughness = 0.013,
      pipeType = 'pvc'
    } = req.body;

    if (!flowRate || !pipeLength || !slope) {
      return res.status(400).json({
        success: false,
        message: 'Flow rate, pipe length, and slope are required'
      });
    }

    // Manning's equation for pipe sizing
    const n = roughness; // Manning's roughness coefficient
    const s = slope / 100; // Convert percentage to decimal
    const q = flowRate / 1000; // Convert L/s to m³/s

    // Calculate required diameter using Manning's equation
    // Q = (1/n) * A * R^(2/3) * S^(1/2)
    // For circular pipe: A = π*D²/4, R = D/4
    const diameter = Math.pow((q * n * 8) / (Math.PI * Math.pow(s, 0.5)), 3/8);
    
    // Standard pipe sizes (mm)
    const standardSizes = [100, 150, 200, 250, 300, 375, 450, 525, 600, 750, 900, 1050, 1200];
    const selectedSize = standardSizes.find(size => size >= diameter * 1000) || standardSizes[standardSizes.length - 1];

    // Calculate actual velocity
    const actualArea = Math.PI * Math.pow(selectedSize / 2000, 2);
    const velocity = q / actualArea;

    // Self-cleansing velocity check (minimum 0.6 m/s)
    const selfCleansing = velocity >= 0.6;

    const result = {
      sizing: {
        calculatedDiameter: Math.round(diameter * 1000),
        selectedSize,
        actualVelocity: Math.round(velocity * 100) / 100,
        selfCleansing,
        unit: 'mm'
      },
      hydraulics: {
        flowRate: flowRate,
        slope: slope,
        roughness: roughness,
        pipeType: pipeType.toUpperCase()
      },
      compliance: [
        'MS 1228:1991 - Sewerage systems',
        'JPS Guidelines for sewerage design',
        'UBBL 1984 - Drainage requirements'
      ]
    };

    if (req.user) {
      await prisma.calculation.create({
        data: {
          userId: req.user.id,
          projectId: req.body.projectId || null,
          moduleType: 'SEWERAGE_DRAINAGE',
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
    console.error('Pipe sizing calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Pipe sizing calculation failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Stormwater drainage design
export const designStormwater = async (req, res) => {
  try {
    const {
      catchmentArea,
      rainfallIntensity,
      runoffCoefficient,
      timeOfConcentration = 15
    } = req.body;

    if (!catchmentArea || !rainfallIntensity || !runoffCoefficient) {
      return res.status(400).json({
        success: false,
        message: 'Catchment area, rainfall intensity, and runoff coefficient are required'
      });
    }

    // Rational method: Q = C * I * A
    const peakFlow = (runoffCoefficient * rainfallIntensity * catchmentArea) / 360; // L/s

    // Detention basin sizing (30-minute detention)
    const detentionVolume = peakFlow * 1800; // Liters
    const basinArea = detentionVolume / 2000; // m² (assuming 2m depth)

    // Pipe sizing for outlet
    const outletFlow = peakFlow * 0.5; // 50% of peak flow
    const minSlope = 1.0; // 1% minimum slope
    const outletDiameter = Math.pow((outletFlow * 0.013 * 8) / (Math.PI * Math.pow(minSlope / 100, 0.5)), 3/8) * 1000;

    const standardSizes = [150, 200, 250, 300, 375, 450, 525, 600];
    const selectedOutletSize = standardSizes.find(size => size >= outletDiameter) || standardSizes[standardSizes.length - 1];

    const result = {
      hydrology: {
        peakFlow: Math.round(peakFlow * 10) / 10,
        timeOfConcentration,
        method: 'Rational Method'
      },
      detention: {
        volume: Math.round(detentionVolume),
        basinArea: Math.round(basinArea),
        depth: 2.0,
        unit: 'liters/m²'
      },
      outlet: {
        diameter: selectedOutletSize,
        flow: Math.round(outletFlow * 10) / 10,
        slope: minSlope,
        unit: 'mm'
      },
      recommendations: [
        'Install silt traps at all inlets',
        'Provide maintenance access points',
        'Consider permeable paving to reduce runoff',
        'Regular cleaning and maintenance required'
      ]
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Stormwater design error:', error);
    res.status(500).json({
      success: false,
      message: 'Stormwater design failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  calculatePipeSizing,
  designStormwater
};
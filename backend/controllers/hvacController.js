import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// HVAC Load Calculation
export const calculateHVACLoad = async (req, res) => {
  try {
    const { 
      roomArea, 
      roomHeight, 
      occupancy, 
      lighting, 
      equipment, 
      orientation, 
      insulation,
      location = 'kuala-lumpur'
    } = req.body;

    // Validation
    if (!roomArea || !roomHeight || !occupancy) {
      return res.status(400).json({
        success: false,
        message: 'Room area, height, and occupancy are required'
      });
    }

    // Malaysian climate factors
    const climateFactors = {
      'kuala-lumpur': { temp: 32, humidity: 80, solar: 1000 },
      'penang': { temp: 31, humidity: 82, solar: 950 },
      'johor-bahru': { temp: 33, humidity: 78, solar: 1050 },
      'kota-kinabalu': { temp: 30, humidity: 85, solar: 900 }
    };

    const climate = climateFactors[location] || climateFactors['kuala-lumpur'];

    // Heat load calculations (BTU/hr)
    const sensibleHeat = {
      // People load (300 BTU/hr per person sensible)
      people: occupancy * 300,
      
      // Lighting load (3.4 BTU/hr per watt)
      lighting: (lighting || 10) * roomArea * 3.4,
      
      // Equipment load
      equipment: (equipment || 5) * roomArea * 3.4,
      
      // Solar heat gain through walls/windows
      solar: roomArea * climate.solar * 0.1 * (orientation === 'west' ? 1.3 : 1.0),
      
      // Conduction through walls/roof
      conduction: roomArea * (climate.temp - 24) * (insulation === 'good' ? 0.5 : 1.0)
    };

    // Latent heat (moisture load)
    const latentHeat = {
      // People load (200 BTU/hr per person latent)
      people: occupancy * 200,
      
      // Infiltration
      infiltration: roomArea * roomHeight * 0.5 * (climate.humidity - 50) * 0.68
    };

    const totalSensible = Object.values(sensibleHeat).reduce((sum, val) => sum + val, 0);
    const totalLatent = Object.values(latentHeat).reduce((sum, val) => sum + val, 0);
    const totalLoad = totalSensible + totalLatent;

    // Convert to tons (12,000 BTU/hr = 1 ton)
    const tonnage = totalLoad / 12000;

    // Equipment sizing with safety factor
    const safetyFactor = 1.2;
    const recommendedTonnage = Math.ceil(tonnage * safetyFactor * 2) / 2; // Round to nearest 0.5 ton

    // Energy efficiency calculations
    const energyConsumption = {
      hourly: recommendedTonnage * 3.5, // kW per hour
      daily: recommendedTonnage * 3.5 * 10, // Assuming 10 hours operation
      monthly: recommendedTonnage * 3.5 * 10 * 30 * 0.75 // 75% load factor
    };

    // Cost estimation (Malaysian rates)
    const electricityRate = 0.365; // RM per kWh
    const operatingCost = {
      daily: energyConsumption.daily * electricityRate,
      monthly: energyConsumption.monthly * electricityRate,
      yearly: energyConsumption.monthly * electricityRate * 12
    };

    const result = {
      loadCalculation: {
        sensibleHeat,
        latentHeat,
        totalSensible: Math.round(totalSensible),
        totalLatent: Math.round(totalLatent),
        totalLoad: Math.round(totalLoad),
        tonnage: Math.round(tonnage * 100) / 100
      },
      equipment: {
        recommendedTonnage,
        safetyFactor,
        unitType: recommendedTonnage <= 2 ? 'Split Unit' : 'Package Unit',
        refrigerant: 'R410A'
      },
      energy: {
        consumption: energyConsumption,
        operatingCost,
        efficiency: 'SEER 13-16 recommended for Malaysia'
      },
      compliance: [
        'MS 1525:2019 - Energy efficiency of air conditioners',
        'UBBL 1984 - Ventilation requirements',
        'MS 1184:2014 - Mechanical ventilation systems'
      ]
    };

    // Save calculation to database
    if (req.user) {
      await prisma.calculation.create({
        data: {
          userId: req.user.id,
          projectId: req.body.projectId || null,
          moduleType: 'ACMV_HVAC',
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
    console.error('HVAC load calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'HVAC load calculation failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Ductwork Design
export const designDuctwork = async (req, res) => {
  try {
    const { 
      airflow, 
      ductLength, 
      fittings, 
      ductMaterial = 'galvanized_steel',
      velocityLimit = 2000 
    } = req.body;

    if (!airflow || !ductLength) {
      return res.status(400).json({
        success: false,
        message: 'Airflow and duct length are required'
      });
    }

    // Duct sizing using equal friction method
    const frictionRate = 0.1; // inches of water per 100 ft
    const airflowCFM = airflow;

    // Calculate duct diameter (inches)
    const diameter = Math.pow((airflowCFM * 1.55) / (velocityLimit), 0.625);
    const roundedDiameter = Math.ceil(diameter);

    // Standard duct sizes (inches)
    const standardSizes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    const selectedSize = standardSizes.find(size => size >= roundedDiameter) || standardSizes[standardSizes.length - 1];

    // Actual velocity
    const actualVelocity = (airflowCFM * 1.55) / Math.pow(selectedSize, 1.6);

    // Pressure drop calculations
    const straightPressureDrop = (ductLength / 100) * frictionRate;
    const fittingPressureDrop = (fittings || 0) * 0.05; // Assumed 0.05" per fitting
    const totalPressureDrop = straightPressureDrop + fittingPressureDrop;

    // Material and cost calculations
    const materialCosts = {
      galvanized_steel: 25, // RM per meter
      aluminum: 35,
      pvc: 15,
      flexible: 20
    };

    const materialCost = (materialCosts[ductMaterial] || 25) * ductLength;
    const installationCost = materialCost * 1.5; // 150% of material cost
    const totalCost = materialCost + installationCost;

    const result = {
      sizing: {
        requiredDiameter: Math.round(diameter * 10) / 10,
        selectedSize: selectedSize,
        actualVelocity: Math.round(actualVelocity),
        velocityLimit: velocityLimit
      },
      pressure: {
        straightDrop: Math.round(straightPressureDrop * 100) / 100,
        fittingDrop: Math.round(fittingPressureDrop * 100) / 100,
        totalDrop: Math.round(totalPressureDrop * 100) / 100,
        unit: 'inches of water'
      },
      cost: {
        material: Math.round(materialCost),
        installation: Math.round(installationCost),
        total: Math.round(totalCost),
        currency: 'RM'
      },
      specifications: {
        material: ductMaterial.replace('_', ' ').toUpperCase(),
        insulation: 'R-6 minimum for supply ducts',
        sealing: 'All joints sealed with mastic',
        support: 'Hangers every 1.5m maximum'
      }
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Ductwork design error:', error);
    res.status(500).json({
      success: false,
      message: 'Ductwork design failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Indoor Air Quality Assessment
export const assessAirQuality = async (req, res) => {
  try {
    const {
      roomArea,
      occupancy,
      ventilationRate,
      outdoorAirQuality = 'moderate',
      activities = 'office'
    } = req.body;

    if (!roomArea || !occupancy) {
      return res.status(400).json({
        success: false,
        message: 'Room area and occupancy are required'
      });
    }

    // Malaysian outdoor air quality factors
    const aqiFactors = {
      good: { pm25: 15, co2: 400 },
      moderate: { pm25: 35, co2: 450 },
      unhealthy: { pm25: 65, co2: 500 }
    };

    const outdoor = aqiFactors[outdoorAirQuality] || aqiFactors.moderate;

    // Activity-based CO2 generation (L/hr per person)
    const co2Generation = {
      office: 20,
      meeting: 35,
      classroom: 25,
      restaurant: 40,
      gym: 60
    };

    const co2Rate = co2Generation[activities] || 20;

    // Ventilation requirements (ASHRAE 62.1 adapted for Malaysia)
    const requiredVentilation = {
      perPerson: 8.5, // L/s per person
      perArea: 0.3,   // L/s per m²
      total: (occupancy * 8.5) + (roomArea * 0.3)
    };

    const currentVentilation = ventilationRate || requiredVentilation.total;

    // Indoor air quality predictions
    const indoorCO2 = outdoor.co2 + (occupancy * co2Rate * 1000) / (currentVentilation * 3.6);
    const ventilationEffectiveness = Math.min(currentVentilation / requiredVentilation.total, 2.0);

    // Air quality assessment
    const assessment = {
      co2Level: Math.round(indoorCO2),
      co2Status: indoorCO2 < 800 ? 'Good' : indoorCO2 < 1000 ? 'Acceptable' : 'Poor',
      ventilationAdequacy: ventilationEffectiveness >= 1.0 ? 'Adequate' : 'Insufficient',
      overallRating: indoorCO2 < 800 && ventilationEffectiveness >= 1.0 ? 'Excellent' : 
                     indoorCO2 < 1000 && ventilationEffectiveness >= 0.8 ? 'Good' : 'Needs Improvement'
    };

    // Recommendations
    const recommendations = [];
    if (indoorCO2 > 1000) {
      recommendations.push('Increase outdoor air ventilation rate');
    }
    if (ventilationEffectiveness < 1.0) {
      recommendations.push('Install additional ventilation systems');
    }
    if (outdoor.pm25 > 50) {
      recommendations.push('Install air filtration system (MERV 13 minimum)');
    }
    recommendations.push('Regular maintenance of HVAC systems');
    recommendations.push('Monitor indoor air quality continuously');

    const result = {
      requirements: requiredVentilation,
      current: {
        ventilationRate: Math.round(currentVentilation * 10) / 10,
        effectiveness: Math.round(ventilationEffectiveness * 100) / 100
      },
      assessment,
      recommendations,
      standards: [
        'MS 1525:2019 - Code of practice for energy efficiency',
        'ASHRAE 62.1 - Ventilation for acceptable indoor air quality',
        'WHO Air Quality Guidelines'
      ]
    };

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Air quality assessment error:', error);
    res.status(500).json({
      success: false,
      message: 'Air quality assessment failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default {
  calculateHVACLoad,
  designDuctwork,
  assessAirQuality
};
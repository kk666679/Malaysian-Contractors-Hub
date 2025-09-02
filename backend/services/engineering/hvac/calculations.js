/**
 * HVAC Calculations
 * Based on MS 1525:2007 and Malaysian climate conditions
 */

class HVACCalculations {
  /**
   * Calculate cooling load for Malaysian climate
   */
  calculateCoolingLoad(inputs) {
    const { area, occupancy = 10, lighting = 15, equipment = 10, 
            wallArea = 0, roofArea = 0, windowArea = 0, 
            outdoorTemp = 35, indoorTemp = 24 } = inputs;
    
    // Sensible heat gains
    const occupantSensible = occupancy * 75; // W per person
    const lightingLoad = lighting * area; // W/m²
    const equipmentLoad = equipment * area; // W/m²
    
    // Building envelope loads (Malaysian conditions)
    const wallLoad = wallArea * 25; // W/m² (high solar gain)
    const roofLoad = roofArea * 40; // W/m² (intense solar radiation)
    const windowLoad = windowArea * 150; // W/m² (solar heat gain)
    
    // Ventilation load
    const ventilationSensible = occupancy * 8 * (outdoorTemp - indoorTemp) * 1.2; // W
    
    const totalSensible = occupantSensible + lightingLoad + equipmentLoad + 
                         wallLoad + roofLoad + windowLoad + ventilationSensible;
    
    // Latent heat gains (high humidity in Malaysia)
    const occupantLatent = occupancy * 55; // W per person
    const ventilationLatent = occupancy * 8 * 15 * 1.2; // W (high outdoor humidity)
    
    const totalLatent = occupantLatent + ventilationLatent;
    const totalLoad = totalSensible + totalLatent;
    
    // Safety factor
    const safetyFactor = 1.15;
    const designLoad = totalLoad * safetyFactor;
    
    return {
      inputs,
      results: {
        sensibleLoad: Math.round(totalSensible / 1000 * 10) / 10,
        latentLoad: Math.round(totalLatent / 1000 * 10) / 10,
        totalLoad: Math.round(totalLoad / 1000 * 10) / 10,
        designLoad: Math.round(designLoad / 1000 * 10) / 10,
        breakdown: {
          occupants: Math.round((occupantSensible + occupantLatent) / 1000 * 10) / 10,
          lighting: Math.round(lightingLoad / 1000 * 10) / 10,
          equipment: Math.round(equipmentLoad / 1000 * 10) / 10,
          envelope: Math.round((wallLoad + roofLoad + windowLoad) / 1000 * 10) / 10,
          ventilation: Math.round((ventilationSensible + ventilationLatent) / 1000 * 10) / 10
        },
        unit: 'kW'
      },
      recommendations: this.getCoolingRecommendations(designLoad / 1000, area),
      standards: ['MS 1525:2007', 'ASHRAE 62.1']
    };
  }

  /**
   * Calculate duct sizing
   */
  calculateDuctSizing(inputs) {
    const { airflow, velocity = 6, shape = 'rectangular', aspectRatio = 2 } = inputs;
    
    // Convert airflow from m³/h to m³/s
    const airflowRate = airflow / 3600;
    
    let ductSize;
    if (shape === 'circular') {
      // Circular duct
      const area = airflowRate / velocity;
      const diameter = Math.sqrt(4 * area / Math.PI) * 1000; // mm
      ductSize = { diameter: Math.round(diameter) };
    } else {
      // Rectangular duct
      const area = airflowRate / velocity;
      const height = Math.sqrt(area / aspectRatio) * 1000; // mm
      const width = aspectRatio * height; // mm
      ductSize = { 
        width: Math.round(width), 
        height: Math.round(height) 
      };
    }
    
    // Pressure loss calculation (simplified)
    const frictionFactor = 0.02;
    const density = 1.2; // kg/m³
    const pressureLoss = frictionFactor * (velocity * velocity) * density / 2; // Pa/m
    
    return {
      inputs,
      results: {
        ductSize,
        velocity: velocity,
        pressureLoss: Math.round(pressureLoss * 10) / 10,
        airflowRate: Math.round(airflowRate * 1000) / 1000,
        unit: 'mm, m/s, Pa/m, m³/s'
      },
      compliance: {
        velocityCheck: {
          actual: velocity,
          recommended: { min: 4, max: 8 },
          passed: velocity >= 4 && velocity <= 8
        }
      },
      standards: ['MS 1525:2007']
    };
  }

  /**
   * Calculate ventilation rate
   */
  calculateVentilationRate(inputs) {
    const { occupancy, area, spaceType = 'office', outdoorAirQuality = 'moderate' } = inputs;
    
    // Ventilation rates per MS 1525:2007
    const ventilationRates = {
      'office': { perPerson: 10, perArea: 1.2 },
      'retail': { perPerson: 7.5, perArea: 1.8 },
      'restaurant': { perPerson: 20, perArea: 2.5 },
      'classroom': { perPerson: 8, perArea: 1.2 },
      'hospital': { perPerson: 25, perArea: 2.0 }
    };
    
    const rates = ventilationRates[spaceType] || ventilationRates['office'];
    
    // Calculate required outdoor air
    const personVentilation = occupancy * rates.perPerson; // L/s
    const areaVentilation = area * rates.perArea; // L/s
    const requiredOutdoorAir = Math.max(personVentilation, areaVentilation);
    
    // Air changes per hour
    const roomVolume = area * 3; // Assume 3m ceiling height
    const airChangesPerHour = (requiredOutdoorAir * 3.6) / roomVolume;
    
    // Filtration requirements for Malaysian conditions
    const filterRecommendation = this.getFilterRecommendation(outdoorAirQuality);
    
    return {
      inputs,
      results: {
        requiredAirflow: Math.round(requiredOutdoorAir),
        airChangesPerHour: Math.round(airChangesPerHour * 10) / 10,
        personVentilation: Math.round(personVentilation),
        areaVentilation: Math.round(areaVentilation),
        filterRecommendation,
        unit: 'L/s, ACH'
      },
      compliance: {
        minimumVentilation: {
          required: requiredOutdoorAir,
          standard: 'MS 1525:2007',
          passed: true
        }
      },
      standards: ['MS 1525:2007', 'ASHRAE 62.1']
    };
  }

  getCoolingRecommendations(loadKW, area) {
    const recommendations = [];
    const loadPerArea = loadKW / area;
    
    if (loadPerArea > 0.15) {
      recommendations.push('High cooling load - consider energy-efficient systems');
      recommendations.push('Implement solar shading and insulation');
    }
    
    if (loadKW > 50) {
      recommendations.push('Large system - consider chilled water system');
      recommendations.push('Implement variable speed drives for energy savings');
    } else if (loadKW > 20) {
      recommendations.push('Medium system - consider VRF or packaged units');
    } else {
      recommendations.push('Small system - split units suitable');
    }
    
    // Malaysian climate specific
    recommendations.push('Design for high humidity conditions (80-90% RH)');
    recommendations.push('Consider monsoon season variations');
    recommendations.push('Implement proper drainage for condensate');
    
    return recommendations;
  }

  getFilterRecommendation(airQuality) {
    const recommendations = {
      'good': { filter: 'G4 + F7', efficiency: 'MERV 8-13' },
      'moderate': { filter: 'G4 + F8', efficiency: 'MERV 10-14' },
      'poor': { filter: 'G4 + F8 + F9', efficiency: 'MERV 13-16' },
      'hazardous': { filter: 'G4 + F8 + H10', efficiency: 'HEPA required' }
    };
    
    return recommendations[airQuality] || recommendations['moderate'];
  }
}

export default HVACCalculations;
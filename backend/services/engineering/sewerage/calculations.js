/**
 * Sewerage Calculations
 * Based on MS 1228:1991 and Malaysian drainage conditions
 */

class SewerageCalculations {
  /**
   * Calculate pipe sizing for sewerage systems
   */
  calculatePipeSizing(inputs) {
    const { flowRate, slope = 1, material = 'pvc', pipeType = 'gravity' } = inputs;
    
    // Manning's roughness coefficient
    const roughness = this.getRoughnessCoefficient(material);
    
    // Calculate pipe diameter using Manning's equation
    // Q = (1/n) * A * R^(2/3) * S^(1/2)
    // For circular pipe: A = πD²/4, R = D/4
    
    const slopeDecimal = slope / 100;
    let diameter = 0;
    let velocity = 0;
    
    // Iterative solution for diameter
    const diameters = [0.1, 0.15, 0.2, 0.25, 0.3, 0.375, 0.45, 0.525, 0.6, 0.75, 0.9, 1.05, 1.2, 1.35, 1.5];
    
    for (const d of diameters) {
      const area = Math.PI * d * d / 4;
      const hydraulicRadius = d / 4;
      const capacity = (1 / roughness) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slopeDecimal, 0.5);
      
      if (capacity >= flowRate / 1000) { // Convert L/s to m³/s
        diameter = d;
        velocity = (flowRate / 1000) / area;
        break;
      }
    }
    
    // Convert to mm
    const diameterMm = diameter * 1000;
    
    // Check minimum and maximum velocities
    const minVelocity = 0.6; // m/s (self-cleansing)
    const maxVelocity = 3.0; // m/s (prevent erosion)
    
    return {
      inputs,
      results: {
        pipeDiameter: Math.round(diameterMm),
        velocity: Math.round(velocity * 100) / 100,
        capacity: Math.round((1 / roughness) * (Math.PI * diameter * diameter / 4) * 
                  Math.pow(diameter / 4, 2/3) * Math.pow(slopeDecimal, 0.5) * 1000),
        slope: slope,
        unit: 'mm, m/s, L/s, %'
      },
      compliance: {
        velocityCheck: {
          actual: velocity,
          minimum: minVelocity,
          maximum: maxVelocity,
          passed: velocity >= minVelocity && velocity <= maxVelocity,
          notes: velocity < minVelocity ? ['Velocity too low - risk of sedimentation'] :
                 velocity > maxVelocity ? ['Velocity too high - risk of erosion'] : []
        }
      },
      standards: ['MS 1228:1991', 'UBBL 1984']
    };
  }

  /**
   * Calculate flow in open channels/drains
   */
  calculateFlow(inputs) {
    const { width, depth, slope, roughness = 0.013, shape = 'rectangular' } = inputs;
    
    let area, perimeter, hydraulicRadius;
    
    if (shape === 'rectangular') {
      area = width * depth;
      perimeter = width + 2 * depth;
    } else if (shape === 'trapezoidal') {
      const sideSlope = inputs.sideSlope || 1; // 1:1 side slope
      area = depth * (width + sideSlope * depth);
      perimeter = width + 2 * depth * Math.sqrt(1 + sideSlope * sideSlope);
    } else { // triangular
      const sideSlope = inputs.sideSlope || 1;
      area = sideSlope * depth * depth;
      perimeter = 2 * depth * Math.sqrt(1 + sideSlope * sideSlope);
    }
    
    hydraulicRadius = area / perimeter;
    
    // Manning's equation: Q = (1/n) * A * R^(2/3) * S^(1/2)
    const slopeDecimal = slope / 100;
    const flowRate = (1 / roughness) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slopeDecimal, 0.5);
    const velocity = flowRate / area;
    
    return {
      inputs,
      results: {
        flowRate: Math.round(flowRate * 1000), // L/s
        velocity: Math.round(velocity * 100) / 100,
        area: Math.round(area * 10000) / 10000, // m²
        hydraulicRadius: Math.round(hydraulicRadius * 1000) / 1000,
        unit: 'L/s, m/s, m², m'
      },
      standards: ['MS 1228:1991']
    };
  }

  /**
   * Calculate rainfall runoff for Malaysian conditions
   */
  calculateRainfall(inputs) {
    const { catchmentArea, location = 'kuala-lumpur', returnPeriod = 10, 
            timeOfConcentration = 15, runoffCoefficient } = inputs;
    
    // Malaysian rainfall intensities (mm/hr) for different return periods
    const rainfallIntensities = this.getRainfallIntensity(location, returnPeriod, timeOfConcentration);
    
    // Runoff coefficient based on surface type
    const coefficient = runoffCoefficient || this.getRunoffCoefficient(inputs.surfaceType || 'mixed');
    
    // Rational method: Q = C * I * A / 360
    const peakFlow = coefficient * rainfallIntensities.intensity * catchmentArea / 360; // m³/s
    
    // Convert to L/s
    const peakFlowLps = peakFlow * 1000;
    
    // Detention pond sizing (if required)
    const detentionVolume = this.calculateDetentionVolume(peakFlowLps, timeOfConcentration);
    
    return {
      inputs,
      results: {
        designRainfall: rainfallIntensities.intensity,
        runoffCoefficient: coefficient,
        peakFlow: Math.round(peakFlowLps),
        detentionVolume: Math.round(detentionVolume),
        timeOfConcentration: timeOfConcentration,
        unit: 'mm/hr, L/s, m³, min'
      },
      recommendations: this.getRainfallRecommendations(peakFlowLps, catchmentArea),
      standards: ['DID Manual', 'UBBL 1984', 'MS 1228:1991']
    };
  }

  getRoughnessCoefficient(material) {
    const coefficients = {
      'pvc': 0.010,
      'concrete': 0.013,
      'clay': 0.012,
      'cast-iron': 0.013,
      'steel': 0.012,
      'hdpe': 0.010
    };
    return coefficients[material] || 0.013;
  }

  getRainfallIntensity(location, returnPeriod, duration) {
    // Simplified Malaysian rainfall data (mm/hr)
    const baseIntensities = {
      'kuala-lumpur': { 2: 80, 5: 100, 10: 120, 25: 140, 50: 160, 100: 180 },
      'johor-bahru': { 2: 85, 5: 105, 10: 125, 25: 145, 50: 165, 100: 185 },
      'penang': { 2: 90, 5: 110, 10: 130, 25: 150, 50: 170, 100: 190 },
      'kota-kinabalu': { 2: 95, 5: 115, 10: 135, 25: 155, 50: 175, 100: 195 }
    };
    
    const locationData = baseIntensities[location] || baseIntensities['kuala-lumpur'];
    const baseIntensity = locationData[returnPeriod] || locationData[10];
    
    // Adjust for duration (IDF curve approximation)
    const durationFactor = Math.pow(duration / 60, -0.7); // 60 min reference
    const intensity = baseIntensity * durationFactor;
    
    return {
      intensity: Math.round(intensity),
      returnPeriod,
      duration,
      location
    };
  }

  getRunoffCoefficient(surfaceType) {
    const coefficients = {
      'concrete': 0.9,
      'asphalt': 0.85,
      'roof': 0.95,
      'grass': 0.25,
      'forest': 0.15,
      'mixed-urban': 0.6,
      'mixed-suburban': 0.4,
      'mixed': 0.5
    };
    return coefficients[surfaceType] || 0.5;
  }

  calculateDetentionVolume(peakFlow, duration) {
    // Simplified detention volume calculation
    // Volume = Peak flow × Duration × Storage factor
    const storageFactor = 0.5; // Typical for Malaysian conditions
    return peakFlow * duration * 60 * storageFactor / 1000; // m³
  }

  getRainfallRecommendations(peakFlow, area) {
    const recommendations = [];
    
    if (peakFlow > 1000) {
      recommendations.push('Large drainage system required - consider multiple outlets');
      recommendations.push('Detention pond recommended for flow control');
    }
    
    if (area > 10) {
      recommendations.push('Large catchment - implement sustainable drainage systems');
      recommendations.push('Consider permeable surfaces to reduce runoff');
    }
    
    // Malaysian specific
    recommendations.push('Design for monsoon season intensity');
    recommendations.push('Ensure adequate maintenance access');
    recommendations.push('Consider flood risk management');
    
    return recommendations;
  }
}

export default SewerageCalculations;
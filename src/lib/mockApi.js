// Mock API for the MonsoonRiskPlanner component

export const fetchWeatherForecast = async (state, days = 7) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate random weather data
  const forecast = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Random weather conditions
    const weatherTypes = ['sunny', 'partly_cloudy', 'light_rain', 'moderate_rain', 'heavy_rain'];
    const weatherIndex = Math.floor(Math.random() * weatherTypes.length);
    const weather = weatherTypes[weatherIndex];
    
    // Random rainfall based on weather
    let rainfall = 0;
    let risk = 'none';
    
    switch (weather) {
      case 'sunny':
        rainfall = Math.random() * 2;
        risk = 'none';
        break;
      case 'partly_cloudy':
        rainfall = 2 + Math.random() * 5;
        risk = 'low';
        break;
      case 'light_rain':
        rainfall = 5 + Math.random() * 10;
        risk = 'low';
        break;
      case 'moderate_rain':
        rainfall = 15 + Math.random() * 20;
        risk = 'medium';
        break;
      case 'heavy_rain':
        rainfall = 35 + Math.random() * 50;
        risk = 'high';
        break;
      default:
        rainfall = 0;
        risk = 'none';
    }
    
    return {
      date: date.toISOString(),
      weather,
      rainfall: Math.round(rainfall * 10) / 10,
      risk
    };
  });
  
  return {
    state,
    forecast
  };
};

export const assessMonsoonRisk = async (riskData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Calculate risk based on project type
  let baseRiskScore = 0;
  
  switch (riskData.project_type) {
    case 'civil':
      baseRiskScore = 2.1;
      break;
    case 'sewerage':
      baseRiskScore = 1.8;
      break;
    case 'electrical':
      baseRiskScore = 1.2;
      break;
    case 'elv':
      baseRiskScore = 0.7;
      break;
    default:
      baseRiskScore = 1.5;
  }
  
  // Adjust risk based on state (monsoon patterns)
  const stateMultiplier = {
    'KL': 0.9,
    'Penang': 1.1,
    'Johor': 1.3
  };
  
  const finalRiskScore = baseRiskScore * (stateMultiplier[riskData.state] || 1);
  
  // Determine risk level
  let riskLevel = 'low';
  if (finalRiskScore > 2.5) {
    riskLevel = 'high';
  } else if (finalRiskScore > 1.5) {
    riskLevel = 'medium';
  }
  
  // Generate risk breakdown
  const highRiskDays = Math.floor(Math.random() * 5);
  const mediumRiskDays = Math.floor(Math.random() * 8);
  const lowRiskDays = Math.floor(Math.random() * 10);
  const safeDays = riskData.duration_days - highRiskDays - mediumRiskDays - lowRiskDays;
  
  // Generate optimal and avoid work days
  const optimalWorkDays = [];
  const avoidWorkDays = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    optimalWorkDays.push(date.toISOString());
  }
  
  for (let i = 0; i < 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    avoidWorkDays.push(date.toISOString());
  }
  
  // Generate recommendations
  const recommendations = [
    'Schedule excavation work during dry periods in January-February',
    'Consider additional drainage measures for work during November-December',
    'Plan for 20% additional time buffer for outdoor activities',
    'Implement enhanced erosion control measures during monsoon season'
  ];
  
  return {
    risk_level: riskLevel,
    overall_risk_score: Math.round(finalRiskScore * 10) / 10,
    risk_breakdown: {
      high_risk_days: highRiskDays,
      medium_risk_days: mediumRiskDays,
      low_risk_days: lowRiskDays,
      safe_days: safeDays
    },
    optimal_work_days: optimalWorkDays,
    avoid_work_days: avoidWorkDays,
    recommendations
  };
};
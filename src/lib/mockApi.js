// Mock API for the feature pages

// Project Bid Engine API
export const generateProjectBid = async (bidData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate base cost based on area and project type
  const baseRates = {
    commercial: 1200,
    residential: 950,
    industrial: 1500,
    infrastructure: 2200
  };
  
  // Location multipliers
  const locationMultipliers = {
    kuala_lumpur: 1.2,
    penang: 1.1,
    johor: 1.0,
    sabah: 1.15,
    sarawak: 1.25
  };
  
  // Complexity multipliers
  const complexityMultipliers = {
    low: 0.85,
    medium: 1.0,
    high: 1.35
  };
  
  const baseRate = baseRates[bidData.projectType] || 1000;
  const locationMultiplier = locationMultipliers[bidData.location] || 1.0;
  const complexityMultiplier = complexityMultipliers[bidData.complexity] || 1.0;
  
  const totalArea = parseFloat(bidData.area) || 0;
  const totalCost = baseRate * totalArea * locationMultiplier * complexityMultiplier;
  
  // Calculate cost breakdown
  const materialCost = totalCost * 0.55;
  const laborCost = totalCost * 0.25;
  const equipmentCost = totalCost * 0.12;
  const overheadCost = totalCost * 0.08;
  
  // Generate timeline
  const durationMonths = parseInt(bidData.duration) || 6;
  const timeline = [
    { phase: 'Planning & Approvals', duration: Math.max(1, Math.round(durationMonths * 0.15)), percentage: 10 },
    { phase: 'Foundation Work', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 15 },
    { phase: 'Structural Work', duration: Math.max(1, Math.round(durationMonths * 0.25)), percentage: 30 },
    { phase: 'MEP Installation', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 25 },
    { phase: 'Finishing & Handover', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 20 }
  ];
  
  // Generate resource requirements
  const resources = [
    { type: 'Skilled Labor', quantity: Math.ceil(totalArea / 100), unit: 'workers' },
    { type: 'Concrete', quantity: Math.ceil(totalArea * 0.3), unit: 'm³' },
    { type: 'Steel', quantity: Math.ceil(totalArea * 0.05), unit: 'tons' },
    { type: 'Heavy Equipment', quantity: Math.ceil(totalArea / 500), unit: 'units' }
  ];
  
  // Generate risk assessment
  const risks = [
    { type: 'Weather Delays', probability: 'Medium', impact: 'Moderate', mitigation: 'Schedule buffer of 2 weeks' },
    { type: 'Material Price Fluctuation', probability: 'High', impact: 'Significant', mitigation: 'Pre-purchase critical materials' },
    { type: 'Labor Shortage', probability: 'Low', impact: 'Moderate', mitigation: 'Early contractor engagement' }
  ];
  
  return {
    projectName: bidData.projectName || 'Unnamed Project',
    totalCost: totalCost,
    costPerSqm: totalCost / totalArea,
    costBreakdown: {
      materials: materialCost,
      labor: laborCost,
      equipment: equipmentCost,
      overhead: overheadCost
    },
    timeline,
    resources,
    risks
  };
};

// Monsoon Risk Planner API
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

// Material Alerts API
export const fetchMaterialAlerts = async (filters = {}) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for material alerts
  const materialAlerts = [
    {
      id: 1,
      material: "Steel Reinforcement Bars",
      category: "structural",
      priceChange: 8.5,
      currentPrice: 3250,
      unit: "per ton",
      trend: "up",
      impact: "high",
      date: "2024-08-01",
      suppliers: 4,
      notes: "Global steel prices rising due to increased demand and supply chain constraints."
    },
    {
      id: 2,
      material: "Portland Cement",
      category: "concrete",
      priceChange: -2.1,
      currentPrice: 21.50,
      unit: "per bag",
      trend: "down",
      impact: "medium",
      date: "2024-08-03",
      suppliers: 6,
      notes: "Local oversupply has led to price reductions from major suppliers."
    },
    {
      id: 3,
      material: "Copper Wiring",
      category: "electrical",
      priceChange: 12.3,
      currentPrice: 42.80,
      unit: "per kg",
      trend: "up",
      impact: "high",
      date: "2024-08-02",
      suppliers: 3,
      notes: "Significant price increase due to global copper shortage and high demand."
    }
  ];
  
  // Apply filters if provided
  let filteredAlerts = [...materialAlerts];
  
  if (filters.category && filters.category !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.category === filters.category);
  }
  
  if (filters.trend && filters.trend !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.trend === filters.trend);
  }
  
  if (filters.impact && filters.impact !== 'all') {
    filteredAlerts = filteredAlerts.filter(alert => alert.impact === filters.impact);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredAlerts = filteredAlerts.filter(alert => 
      alert.material.toLowerCase().includes(searchLower) || 
      alert.category.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredAlerts;
};

// Site Management API
export const fetchSiteData = async (siteId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock site data
  return {
    id: siteId || 1,
    name: "Kuala Lumpur Commercial Tower",
    location: "Jalan Ampang, KL",
    progress: 68,
    startDate: "2023-09-15",
    endDate: "2024-12-30",
    status: "In Progress",
    weather: "Partly Cloudy, 32°C",
    siteManager: "Ahmad Rizal",
    workers: 124,
    vehicles: 8
  };
};

// Specialist Marketplace API
export const fetchSpecialists = async (filters = {}) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for specialists
  const specialists = [
    {
      id: 1,
      name: "Tan Wei Ming",
      avatar: "/avatar1.png",
      specialty: "Electrical Engineer",
      specialtyCategory: "electrical",
      location: "Kuala Lumpur",
      rating: 4.8,
      reviews: 24,
      hourlyRate: 120,
      experience: 12,
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Siti Aminah",
      avatar: "/avatar2.png",
      specialty: "Plumbing Engineer",
      specialtyCategory: "plumbing",
      location: "Penang",
      rating: 4.9,
      reviews: 31,
      hourlyRate: 110,
      experience: 15,
      availability: "Available in 2 weeks"
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      avatar: "/avatar3.png",
      specialty: "HVAC Engineer",
      specialtyCategory: "mechanical",
      location: "Kuala Lumpur",
      rating: 4.7,
      reviews: 19,
      hourlyRate: 130,
      experience: 10,
      availability: "Available Now"
    }
  ];
  
  // Apply filters if provided
  let filteredSpecialists = [...specialists];
  
  if (filters.specialty && filters.specialty !== 'all') {
    filteredSpecialists = filteredSpecialists.filter(specialist => 
      specialist.specialtyCategory === filters.specialty
    );
  }
  
  if (filters.location && filters.location !== 'all') {
    filteredSpecialists = filteredSpecialists.filter(specialist => 
      specialist.location === filters.location
    );
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredSpecialists = filteredSpecialists.filter(specialist => 
      specialist.name.toLowerCase().includes(searchLower) || 
      specialist.specialty.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredSpecialists;
};

export const getSpecialistDetails = async (specialistId) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock specialist details
  const specialists = {
    1: {
      id: 1,
      name: "Tan Wei Ming",
      avatar: "/avatar1.png",
      specialty: "Electrical Engineer",
      specialtyCategory: "electrical",
      location: "Kuala Lumpur",
      rating: 4.8,
      reviews: 24,
      hourlyRate: 120,
      experience: 12,
      availability: "Available Now",
      certifications: ["Professional Engineer (PE)", "TNB Certified", "Energy Commission Licensed"],
      skills: ["Power Distribution", "Building Automation", "Lighting Design", "Energy Efficiency"],
      bio: "Electrical engineer with 12 years of experience in commercial and industrial projects. Specializing in power distribution systems and energy-efficient designs for high-rise buildings.",
      projects: [
        { name: "KL Sentral Office Tower", role: "Lead Electrical Engineer", year: "2022" },
        { name: "Putrajaya Government Complex", role: "Electrical Consultant", year: "2020" },
        { name: "Johor Bahru Shopping Mall", role: "MEP Coordinator", year: "2019" }
      ],
      contact: {
        email: "tanweiming@example.com",
        phone: "+60 12-345-6789"
      }
    },
    2: {
      id: 2,
      name: "Siti Aminah",
      avatar: "/avatar2.png",
      specialty: "Plumbing Engineer",
      specialtyCategory: "plumbing",
      location: "Penang",
      rating: 4.9,
      reviews: 31,
      hourlyRate: 110,
      experience: 15,
      availability: "Available in 2 weeks",
      certifications: ["Professional Engineer (PE)", "IWK Certified", "Green Building Professional"],
      skills: ["Water Supply Systems", "Drainage Design", "Rainwater Harvesting", "Sustainable Plumbing"],
      bio: "Plumbing engineer with extensive experience in water supply and drainage systems. Expert in sustainable water management solutions for commercial and residential projects.",
      projects: [
        { name: "Penang Eco Park Residences", role: "Lead Plumbing Engineer", year: "2023" },
        { name: "Georgetown Heritage Hotel", role: "Water Systems Consultant", year: "2021" },
        { name: "Butterworth Industrial Complex", role: "Plumbing Systems Designer", year: "2019" }
      ],
      contact: {
        email: "sitiaminah@example.com",
        phone: "+60 13-456-7890"
      }
    }
  };
  
  return specialists[specialistId] || null;
};
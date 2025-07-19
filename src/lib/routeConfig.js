/**
 * Central route configuration for the Malaysian MEP Contractors Hub
 * This file serves as a single source of truth for all application routes
 */

// Define all application routes
export const ROUTES = {
  // Main routes
  HOME: '/',
  SERVICES: '/services',
  FEATURES: '/features',
  COMPLIANCE: '/compliance',
  MARKETPLACE: '/marketplace',
  ABOUT: '/about',
  CONTACT: '/contact',
  DASHBOARD: '/dashboard',
  
  // Service pages
  CIVIL_ENGINEERING: '/services/civil-engineering',
  ELECTRICAL_SYSTEMS: '/services/electrical-systems',
  SEWERAGE_DRAINAGE: '/services/sewerage-drainage',
  ELV_SYSTEMS: '/services/elv-systems',
  ACMV_SYSTEMS: '/services/acmv-systems',
  
  // Feature pages
  BID_ENGINE: '/bid-engine',
  SITE_MANAGEMENT: '/site-management',
  MATERIAL_ALERTS: '/material-alerts',
  MONSOON_PLANNER: '/monsoon-planner',
  BUILDING_AUTOMATION: '/building-automation',
  
  // Dashboard routes
  DASHBOARD_SECTION: '/dashboard/:section',
  PROJECT_DETAILS: '/dashboard/projects/:id',
  
  // Other routes
  WEB3_DEMO: '/web3-demo',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  
  // 404 route is handled by the catch-all route in App.jsx
};

// Navigation items for header
export const HEADER_NAVIGATION = [
  { name: 'Services', href: ROUTES.SERVICES },
  { name: 'Features', href: ROUTES.FEATURES },
  { name: 'Compliance', href: ROUTES.COMPLIANCE },
  { name: 'Marketplace', href: ROUTES.MARKETPLACE },
  { name: 'About', href: ROUTES.ABOUT }
];

// Service items
export const SERVICES = [
  {
    title: "Civil Engineering",
    description: "Comprehensive civil engineering solutions including structural design, construction management, and infrastructure development tailored for Malaysian building codes and standards.",
    icon: "Building2",
    to: ROUTES.CIVIL_ENGINEERING
  },
  {
    title: "Electrical Systems",
    description: "Advanced electrical system design, installation, and maintenance services compliant with Malaysian electrical regulations and energy efficiency standards.",
    icon: "Zap",
    to: ROUTES.ELECTRICAL_SYSTEMS
  },
  {
    title: "Sewerage & Drainage",
    description: "Expert sewerage and drainage solutions designed to meet IWK standards and Malaysian monsoon conditions, ensuring effective water management.",
    icon: "Droplets",
    to: ROUTES.SEWERAGE_DRAINAGE
  },
  {
    title: "ELV Systems",
    description: "State-of-the-art Extra Low Voltage systems including security, communications, and building automation tailored for Malaysian commercial and residential buildings.",
    icon: "Radio",
    to: ROUTES.ELV_SYSTEMS
  },
  {
    title: "ACMV Systems",
    description: "Air Conditioning and Mechanical Ventilation solutions optimized for Malaysia's tropical climate, focusing on energy efficiency and comfort.",
    icon: "Wind",
    to: ROUTES.ACMV_SYSTEMS
  }
];

// Feature items
export const FEATURES = [
  {
    id: 'bid-engine',
    title: 'Project Bid Engine',
    description: 'Generate accurate project bids with our comprehensive cost database tailored for Malaysian construction.',
    icon: 'Building2',
    to: ROUTES.BID_ENGINE
  },
  {
    id: 'compliance',
    title: 'Compliance Tracker',
    description: 'Stay up-to-date with Malaysian building codes, CIDB requirements, and local regulations.',
    icon: 'Shield',
    to: ROUTES.COMPLIANCE
  },
  {
    id: 'marketplace',
    title: 'Specialist Marketplace',
    description: 'Connect with qualified MEP specialists across Malaysia for your project needs.',
    icon: 'Users',
    to: ROUTES.MARKETPLACE
  },
  {
    id: 'monsoon-planner',
    title: 'Monsoon Risk Planner',
    description: "Plan your construction schedule around Malaysia's monsoon seasons to minimize weather-related delays.",
    icon: 'CloudRain',
    to: ROUTES.MONSOON_PLANNER
  }
];

// Helper function to check if a route exists
export const routeExists = (path) => {
  return Object.values(ROUTES).includes(path);
};

// Helper function to get route by name
export const getRoute = (routeName) => {
  return ROUTES[routeName] || ROUTES.HOME;
};

export default ROUTES;
/**
 * Role-based route metadata for the Malaysian MEP Contractors Hub
 * This file defines authentication requirements, role permissions, and navigation menus
 */

import { ROUTES } from './routeConfig';

// Route metadata for role-based access control
export const ROUTE_META = {
  // Public routes (no auth required)
  [ROUTES.HOME]: { requiresAuth: false },
  [ROUTES.SERVICES]: { requiresAuth: false },
  [ROUTES.FEATURES]: { requiresAuth: false },
  [ROUTES.COMPLIANCE]: { requiresAuth: false },
  [ROUTES.MARKETPLACE]: { requiresAuth: false },
  [ROUTES.ABOUT]: { requiresAuth: false },
  [ROUTES.CONTACT]: { requiresAuth: false },
  [ROUTES.CIVIL_ENGINEERING]: { requiresAuth: false },
  [ROUTES.ELECTRICAL_SYSTEMS]: { requiresAuth: false },
  [ROUTES.SEWERAGE_DRAINAGE]: { requiresAuth: false },
  [ROUTES.ELV_SYSTEMS]: { requiresAuth: false },
  [ROUTES.ACMV_SYSTEMS]: { requiresAuth: false },
  [ROUTES.PRIVACY]: { requiresAuth: false },
  [ROUTES.TERMS]: { requiresAuth: false },
  [ROUTES.API_TERMS]: { requiresAuth: false },
  [ROUTES.COOKIES]: { requiresAuth: false },
  [ROUTES.CONTENT_POLICY]: { requiresAuth: false },
  [ROUTES.COMMUNITY_GUIDELINES]: { requiresAuth: false },
  [ROUTES.HELP_CENTER]: { requiresAuth: false },

  // Authentication routes
  [ROUTES.LOGIN]: { requiresAuth: false },
  [ROUTES.UNAUTHORIZED]: { requiresAuth: false },

  // User routes (user role required)
  [ROUTES.DASHBOARD]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.DASHBOARD_SECTION]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.PROJECT_DETAILS]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.BID_ENGINE]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.SITE_MANAGEMENT]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.MATERIAL_ALERTS]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.MONSOON_PLANNER]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.BUILDING_AUTOMATION]: { requiresAuth: true, roles: ['user', 'admin'] },

  // Admin routes (admin role required)
  [ROUTES.ADMIN]: { requiresAuth: true, roles: ['admin'] },
  [ROUTES.ADMIN_USERS]: { requiresAuth: true, roles: ['admin'] },
  [ROUTES.ADMIN_LOGS]: { requiresAuth: true, roles: ['admin'] },
  [ROUTES.ADMIN_SETTINGS]: { requiresAuth: true, roles: ['admin'] },

  // Module routes (user role required)
  [ROUTES.POWER_GRID_SIMULATOR]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.SMART_COMPLIANCE_ENGINE]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.ENERGY_EFFICIENCY_AUDITOR]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.HVAC_DESIGN_CALCULATOR]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.PERFORMANCE_DIAGNOSTICS]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.INDOOR_AIR_QUALITY_DASHBOARD]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.STORMWATER_DESIGNER]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.FLOOD_RISK_ANALYZER]: { requiresAuth: true, roles: ['user', 'admin'] },

  // Other protected routes
  [ROUTES.WEB3_DEMO]: { requiresAuth: true, roles: ['user', 'admin'] },
  [ROUTES.DATABASE_TEST]: { requiresAuth: true, roles: ['admin'] },

  // Developer routes (dev-only)
  [ROUTES.DEV_ROUTES]: { requiresAuth: false },
};

// User navigation (shown when authenticated)
export const USER_NAVIGATION = [
  { name: 'Dashboard', href: ROUTES.DASHBOARD, roles: ['user', 'admin'], icon: 'BarChart2' },
  { name: 'Project Bid Engine', href: ROUTES.BID_ENGINE, roles: ['user', 'admin'], icon: 'Building2' },
  { name: 'Site Management', href: ROUTES.SITE_MANAGEMENT, roles: ['user', 'admin'], icon: 'MapPin' },
  { name: 'Material Alerts', href: ROUTES.MATERIAL_ALERTS, roles: ['user', 'admin'], icon: 'AlertTriangle' },
  { name: 'Monsoon Planner', href: ROUTES.MONSOON_PLANNER, roles: ['user', 'admin'], icon: 'CloudRain' },
  { name: 'Building Automation', href: ROUTES.BUILDING_AUTOMATION, roles: ['user', 'admin'], icon: 'Settings' },
];

// Admin navigation (shown only for admin role)
export const ADMIN_NAVIGATION = [
  { name: 'Admin Panel', href: ROUTES.ADMIN, roles: ['admin'], icon: 'Shield' },
  { name: 'User Management', href: ROUTES.ADMIN_USERS, roles: ['admin'], icon: 'Users' },
  { name: 'System Logs', href: ROUTES.ADMIN_LOGS, roles: ['admin'], icon: 'FileText' },
  { name: 'Settings', href: ROUTES.ADMIN_SETTINGS, roles: ['admin'], icon: 'Settings' },
];

// Helper function to get route metadata
export const getRouteMeta = (path) => {
  return ROUTE_META[path] || { requiresAuth: false };
};

// Helper function to check if user can access a route
export const canAccessRoute = (path, userRole, isAuthenticated) => {
  const meta = getRouteMeta(path);

  if (!meta.requiresAuth) {
    return true;
  }

  if (!isAuthenticated) {
    return false;
  }

  if (meta.roles && !meta.roles.includes(userRole)) {
    return false;
  }

  return true;
};

// Helper function to get navigation items for a specific role
export const getNavigationForRole = (role, isAuthenticated) => {
  if (!isAuthenticated) {
    return [];
  }

  const allNav = [...USER_NAVIGATION];

  if (role === 'admin') {
    allNav.push(...ADMIN_NAVIGATION);
  }

  return allNav.filter(item => item.roles.includes(role));
};

export default ROUTE_META;

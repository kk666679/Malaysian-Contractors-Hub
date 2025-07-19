/**
 * Route Validation Utility
 * 
 * This utility helps identify broken or missing routes in the application.
 * It compares the routes defined in the application with the routes used in components.
 */

import ROUTES from './routeConfig';

/**
 * Validates if a route exists in the defined routes
 * @param {string} path - The route path to validate
 * @returns {boolean} - Whether the route exists
 */
export const validateRoute = (path) => {
  // Check if the path is a direct match
  if (Object.values(ROUTES).includes(path)) {
    return true;
  }
  
  // Check if the path is a dynamic route (contains parameters)
  if (path.includes(':')) {
    // Extract the route pattern (e.g., '/dashboard/:section' -> '/dashboard/')
    const routePattern = path.split(':')[0];
    
    // Check if any defined route starts with this pattern
    return Object.values(ROUTES).some(route => 
      route.startsWith(routePattern) && route.includes(':')
    );
  }
  
  return false;
};

/**
 * Validates a collection of routes
 * @param {string[]} paths - Array of route paths to validate
 * @returns {Object} - Validation results with valid and invalid routes
 */
export const validateRoutes = (paths) => {
  const results = {
    valid: [],
    invalid: []
  };
  
  paths.forEach(path => {
    if (validateRoute(path)) {
      results.valid.push(path);
    } else {
      results.invalid.push(path);
    }
  });
  
  return results;
};

/**
 * Suggests a correct route for an invalid route
 * @param {string} invalidPath - The invalid route path
 * @returns {string|null} - A suggested correct route or null if no suggestion
 */
export const suggestRoute = (invalidPath) => {
  // Simple suggestion based on path similarity
  const allRoutes = Object.values(ROUTES);
  
  // Find the most similar route
  let bestMatch = null;
  let highestSimilarity = 0;
  
  allRoutes.forEach(route => {
    const similarity = calculateSimilarity(invalidPath, route);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = route;
    }
  });
  
  // Only suggest if similarity is above threshold
  return highestSimilarity > 0.5 ? bestMatch : null;
};

/**
 * Calculate similarity between two strings (simple implementation)
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Similarity score between 0 and 1
 */
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  // Count matching characters
  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) {
      matches++;
    }
  }
  
  return matches / longer.length;
};

export default {
  validateRoute,
  validateRoutes,
  suggestRoute
};
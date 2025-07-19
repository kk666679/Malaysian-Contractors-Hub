/**
 * Route Validation Script
 * 
 * This script scans the application code to find all route references
 * and validates them against the defined routes in routeConfig.js.
 * 
 * Usage: node scripts/validate-routes.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const ROUTE_CONFIG_PATH = path.join(SRC_DIR, 'lib', 'routeConfig.js');

// Regular expressions to find route references
const ROUTE_PATTERNS = [
  /to=["'](\/[^"']+)["']/g,                 // to="/route"
  /to={["'](\/[^"']+)["']}/g,               // to={"/route"}
  /to={ROUTES\.([A-Z_]+)}/g,                // to={ROUTES.ROUTE_NAME}
  /Link to=["'](\/[^"']+)["']/g,            // Link to="/route"
  /Link to={["'](\/[^"']+)["']}/g,          // Link to={"/route"}
  /Link to={ROUTES\.([A-Z_]+)}/g,           // Link to={ROUTES.ROUTE_NAME}
  /navigate\(["'](\/[^"']+)["']\)/g,        // navigate("/route")
  /navigate\(["'](\/[^"']+)["']\)/g,        // navigate("/route")
  /path=["'](\/[^"']+)["']/g,               // path="/route"
  /path={["'](\/[^"']+)["']}/g,             // path={"/route"}
  /path={ROUTES\.([A-Z_]+)}/g,              // path={ROUTES.ROUTE_NAME}
];

// Load route configuration
const loadRouteConfig = () => {
  try {
    // Extract route definitions using a simple regex approach
    const routeConfigContent = fs.readFileSync(ROUTE_CONFIG_PATH, 'utf8');
    const routeMatches = routeConfigContent.match(/[A-Z_]+:\s*['"]\/[^'"]+['"]/g) || [];
    
    const routes = {};
    routeMatches.forEach(match => {
      const [key, value] = match.split(':').map(part => part.trim());
      routes[key] = value.replace(/['"]/g, '');
    });
    
    return routes;
  } catch (error) {
    console.error('Error loading route configuration:', error);
    return {};
  }
};

// Find all route references in the codebase
const findRouteReferences = () => {
  const routeReferences = new Set();
  
  // Use grep to find potential route references
  try {
    const grepCommand = `grep -r "to=[\\\"\\']\\/\\|to={[\\\"\\']\\/\\|to={ROUTES\\|path=[\\\"\\']\\/\\|path={[\\\"\\']\\/\\|path={ROUTES\\|navigate([\\\"\\']\\/\\|navigate({[\\\"\\']\\/\\|navigate({ROUTES" --include="*.jsx" --include="*.js" ${SRC_DIR}`;
    const grepResult = execSync(grepCommand, { encoding: 'utf8' });
    
    const lines = grepResult.split('\n');
    lines.forEach(line => {
      ROUTE_PATTERNS.forEach(pattern => {
        const matches = line.matchAll(pattern);
        for (const match of matches) {
          if (match[1] && match[1].startsWith('/')) {
            routeReferences.add(match[1]);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error finding route references:', error);
  }
  
  return Array.from(routeReferences);
};

// Validate routes
const validateRoutes = (definedRoutes, routeReferences) => {
  const definedRoutePaths = Object.values(definedRoutes);
  
  const results = {
    valid: [],
    invalid: []
  };
  
  routeReferences.forEach(route => {
    if (definedRoutePaths.includes(route)) {
      results.valid.push(route);
    } else {
      // Check if it's a dynamic route
      const isDynamicRoute = definedRoutePaths.some(definedRoute => {
        if (definedRoute.includes(':')) {
          const pattern = definedRoute.split(':')[0];
          return route.startsWith(pattern);
        }
        return false;
      });
      
      if (isDynamicRoute) {
        results.valid.push(route);
      } else {
        results.invalid.push(route);
      }
    }
  });
  
  return results;
};

// Suggest corrections for invalid routes
const suggestCorrections = (definedRoutes, invalidRoutes) => {
  const definedRoutePaths = Object.values(definedRoutes);
  const suggestions = {};
  
  invalidRoutes.forEach(route => {
    let bestMatch = null;
    let highestSimilarity = 0;
    
    definedRoutePaths.forEach(definedRoute => {
      const similarity = calculateSimilarity(route, definedRoute);
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        bestMatch = definedRoute;
      }
    });
    
    if (highestSimilarity > 0.5) {
      suggestions[route] = bestMatch;
    }
  });
  
  return suggestions;
};

// Calculate similarity between two strings
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

// Main function
const main = () => {
  console.log('🔍 Validating routes in the application...');
  
  // Load route configuration
  const definedRoutes = loadRouteConfig();
  console.log(`📋 Found ${Object.keys(definedRoutes).length} defined routes in routeConfig.js`);
  
  // Find route references
  const routeReferences = findRouteReferences();
  console.log(`🔎 Found ${routeReferences.length} route references in the codebase`);
  
  // Validate routes
  const validationResults = validateRoutes(definedRoutes, routeReferences);
  
  console.log(`\n✅ Valid routes: ${validationResults.valid.length}`);
  
  if (validationResults.invalid.length > 0) {
    console.log(`\n❌ Invalid routes: ${validationResults.invalid.length}`);
    console.log(validationResults.invalid);
    
    // Suggest corrections
    const suggestions = suggestCorrections(definedRoutes, validationResults.invalid);
    
    if (Object.keys(suggestions).length > 0) {
      console.log('\n💡 Suggested corrections:');
      Object.entries(suggestions).forEach(([invalid, suggestion]) => {
        console.log(`  ${invalid} -> ${suggestion}`);
      });
    }
    
    process.exit(1);
  } else {
    console.log('\n🎉 All routes are valid!');
  }
};

// Run the script
main();
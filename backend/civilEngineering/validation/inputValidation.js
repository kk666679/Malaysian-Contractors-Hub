/**
 * Input Validation Module
 *
 * This module provides validation functions for civil engineering calculations
 * to ensure inputs are within realistic ranges and have appropriate units.
 */

/**
 * Validate beam dimensions
 * @param {number} length - Beam length in mm
 * @param {number} width - Beam width in mm
 * @param {number} height - Beam height in mm
 * @returns {object} Validation result with isValid and errors array
 */
export function validateBeamDimensions(length, width, height) {
  const errors = [];

  // Check if all values are numbers
  if (typeof length !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
    errors.push('All dimensions must be numbers');
    return { isValid: false, errors };
  }

  // Check positive values
  if (length <= 0 || width <= 0 || height <= 0) {
    errors.push('All dimensions must be positive');
  }

  // Realistic ranges for typical beams
  if (length < 1000 || length > 20000) { // 1m to 20m
    errors.push('Beam length should be between 1000mm and 20000mm');
  }

  if (width < 100 || width > 1000) { // 100mm to 1m
    errors.push('Beam width should be between 100mm and 1000mm');
  }

  if (height < 200 || height > 2000) { // 200mm to 2m
    errors.push('Beam height should be between 200mm and 2000mm');
  }

  // Check aspect ratio (height/width should be reasonable)
  const aspectRatio = height / width;
  if (aspectRatio < 1 || aspectRatio > 5) {
    errors.push('Beam aspect ratio (height/width) should be between 1 and 5');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate load values
 * @param {number} load - Load in N/mm
 * @param {string} loadType - Type of load ('dead', 'live', 'wind', etc.)
 * @returns {object} Validation result with isValid and errors array
 */
export function validateLoad(load, loadType = 'general') {
  const errors = [];

  if (typeof load !== 'number') {
    errors.push('Load must be a number');
    return { isValid: false, errors };
  }

  if (load <= 0) {
    errors.push('Load must be positive');
  }

  // Realistic load ranges based on type
  const loadRanges = {
    dead: { min: 1, max: 50 }, // kN/m² equivalent
    live: { min: 1, max: 10 },
    wind: { min: 0.5, max: 5 },
    general: { min: 0.1, max: 100 }
  };

  const range = loadRanges[loadType] || loadRanges.general;

  if (load < range.min || load > range.max) {
    errors.push(`Load for ${loadType} should be between ${range.min} and ${range.max} N/mm`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate material properties
 * @param {number} modulusOfElasticity - E in MPa
 * @param {number} yieldStrength - fy in MPa
 * @param {string} materialType - Type of material ('steel', 'concrete', etc.)
 * @returns {object} Validation result with isValid and errors array
 */
export function validateMaterialProperties(modulusOfElasticity, yieldStrength, materialType = 'steel') {
  const errors = [];

  if (typeof modulusOfElasticity !== 'number' || typeof yieldStrength !== 'number') {
    errors.push('Material properties must be numbers');
    return { isValid: false, errors };
  }

  if (modulusOfElasticity <= 0 || yieldStrength <= 0) {
    errors.push('Material properties must be positive');
  }

  // Realistic ranges for different materials
  const materialRanges = {
    steel: {
      E: { min: 180000, max: 220000 }, // MPa
      fy: { min: 250, max: 1000 } // MPa
    },
    concrete: {
      E: { min: 20000, max: 40000 }, // MPa
      fy: { min: 10, max: 100 } // MPa (for reinforcement)
    },
    general: {
      E: { min: 1000, max: 300000 },
      fy: { min: 1, max: 2000 }
    }
  };

  const range = materialRanges[materialType] || materialRanges.general;

  if (modulusOfElasticity < range.E.min || modulusOfElasticity > range.E.max) {
    errors.push(`Modulus of elasticity for ${materialType} should be between ${range.E.min} and ${range.E.max} MPa`);
  }

  if (yieldStrength < range.fy.min || yieldStrength > range.fy.max) {
    errors.push(`Yield strength for ${materialType} should be between ${range.fy.min} and ${range.fy.max} MPa`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate concrete strength class
 * @param {string} strengthClass - Concrete strength class (e.g., 'C25/30')
 * @returns {object} Validation result with isValid and errors array
 */
export function validateConcreteStrengthClass(strengthClass) {
  const errors = [];

  if (typeof strengthClass !== 'string') {
    errors.push('Strength class must be a string');
    return { isValid: false, errors };
  }

  // Check format (should be Cxx/yy)
  const strengthClassRegex = /^C\d+\/\d+$/;
  if (!strengthClassRegex.test(strengthClass)) {
    errors.push('Strength class should be in format Cxx/yy (e.g., C25/30)');
  }

  // Check if it's a valid strength class
  const validClasses = [
    'C12/15', 'C16/20', 'C20/25', 'C25/30', 'C30/37', 'C35/45',
    'C40/50', 'C45/55', 'C50/60', 'C55/67', 'C60/75', 'C70/85',
    'C80/95', 'C90/105'
  ];

  if (!validClasses.includes(strengthClass)) {
    errors.push(`Invalid strength class. Valid classes are: ${validClasses.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * General input validation wrapper
 * @param {object} inputs - Object containing input parameters
 * @param {object} validationRules - Object containing validation functions
 * @returns {object} Overall validation result
 */
export function validateInputs(inputs, validationRules) {
  const allErrors = [];
  let isValid = true;

  for (const [key, validationFn] of Object.entries(validationRules)) {
    if (inputs[key] !== undefined) {
      const result = validationFn(inputs[key]);
      if (!result.isValid) {
        isValid = false;
        allErrors.push(...result.errors.map(error => `${key}: ${error}`));
      }
    }
  }

  return {
    isValid,
    errors: allErrors
  };
}

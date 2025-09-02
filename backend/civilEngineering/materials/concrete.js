/**
 * Concrete Material Properties Module
 *
 * This module provides concrete material properties and related calculations
 * including strength classes, density, modulus of elasticity, and design parameters.
 *
 * All values follow relevant standards (e.g., BS EN 1992-1-1, ACI 318) and use SI units.
 */

/**
 * Concrete strength classes and their characteristic compressive strengths
 * Based on BS EN 1992-1-1 Table 3.1
 */
export const CONCRETE_STRENGTH_CLASSES = {
  'C12/15': { fck: 12, fcm: 20, fctm: 1.6 },
  'C16/20': { fck: 16, fcm: 24, fctm: 1.9 },
  'C20/25': { fck: 20, fcm: 28, fctm: 2.2 },
  'C25/30': { fck: 25, fcm: 33, fctm: 2.6 },
  'C30/37': { fck: 30, fcm: 38, fctm: 2.9 },
  'C35/45': { fck: 35, fcm: 43, fctm: 3.2 },
  'C40/50': { fck: 40, fcm: 48, fctm: 3.5 },
  'C45/55': { fck: 45, fcm: 53, fctm: 3.8 },
  'C50/60': { fck: 50, fcm: 58, fctm: 4.1 },
  'C55/67': { fck: 55, fcm: 63, fctm: 4.2 },
  'C60/75': { fck: 60, fcm: 68, fctm: 4.4 },
  'C70/85': { fck: 70, fcm: 78, fctm: 4.6 },
  'C80/95': { fck: 80, fcm: 88, fctm: 4.8 },
  'C90/105': { fck: 90, fcm: 98, fctm: 5.0 }
};

/**
 * Get concrete properties by strength class
 *
 * @param {string} strengthClass - Concrete strength class (e.g., 'C25/30')
 * @returns {object} Object containing fck, fcm, fctm in MPa
 */
export function getConcreteProperties(strengthClass) {
  const properties = CONCRETE_STRENGTH_CLASSES[strengthClass];
  if (!properties) {
    throw new Error(`Invalid concrete strength class: ${strengthClass}`);
  }
  return properties;
}

/**
 * Calculate modulus of elasticity for concrete
 *
 * Formula: E_cm = 22 * (f_cm / 10)^0.3 * 1000  (BS EN 1992-1-1 Eq. 3.14)
 *
 * @param {number} fcm - Mean compressive strength in MPa
 * @returns {number} Modulus of elasticity in MPa
 */
export function calculateModulusOfElasticity(fcm) {
  if (!fcm || fcm <= 0) {
    throw new Error('Invalid input: mean compressive strength must be positive');
  }

  return 22 * Math.pow(fcm / 10, 0.3) * 1000;
}

/**
 * Calculate concrete density
 *
 * @param {string} type - Type of concrete ('normal', 'lightweight', 'heavyweight')
 * @returns {number} Density in kg/m³
 */
export function getConcreteDensity(type = 'normal') {
  const densities = {
    normal: 2400,
    lightweight: 1800,
    heavyweight: 2800
  };

  if (!densities[type]) {
    throw new Error(`Invalid concrete type: ${type}`);
  }

  return densities[type];
}

/**
 * Calculate design compressive strength
 *
 * Formula: f_cd = α_cc * f_ck / γ_c
 *
 * @param {number} fck - Characteristic compressive strength in MPa
 * @param {number} alpha_cc - Coefficient taking account of long term effects (default 0.85)
 * @param {number} gamma_c - Partial safety factor (default 1.5)
 * @returns {number} Design compressive strength in MPa
 */
export function calculateDesignCompressiveStrength(fck, alpha_cc = 0.85, gamma_c = 1.5) {
  if (!fck || fck <= 0) {
    throw new Error('Invalid input: characteristic strength must be positive');
  }

  return (alpha_cc * fck) / gamma_c;
}

/**
 * Calculate design tensile strength
 *
 * Formula: f_ctd = α_ct * f_ctk,0.05 / γ_c
 *
 * @param {number} fctm - Mean tensile strength in MPa
 * @param {number} alpha_ct - Coefficient taking account of long term effects (default 1.0)
 * @param {number} gamma_c - Partial safety factor (default 1.5)
 * @returns {number} Design tensile strength in MPa
 */
export function calculateDesignTensileStrength(fctm, alpha_ct = 1.0, gamma_c = 1.5) {
  if (!fctm || fctm <= 0) {
    throw new Error('Invalid input: mean tensile strength must be positive');
  }

  // Approximate f_ctk,0.05 as 0.7 * f_ctm for simplification
  const fctk = 0.7 * fctm;
  return (alpha_ct * fctk) / gamma_c;
}

/**
 * Calculate creep coefficient
 *
 * Formula: φ = φ0 * β_c(t)  (Simplified approximation)
 *
 * @param {number} relativeHumidity - Relative humidity as percentage (20-100)
 * @param {number} age - Concrete age in days
 * @param {number} cementClass - Cement class (32.5, 42.5, 52.5)
 * @returns {number} Creep coefficient
 */
export function calculateCreepCoefficient(relativeHumidity, age, cementClass = 32.5) {
  if (!relativeHumidity || !age || relativeHumidity < 20 || relativeHumidity > 100 || age <= 0) {
    throw new Error('Invalid input: relative humidity (20-100%) and age (>0 days) required');
  }

  // Simplified calculation based on BS EN 1992-1-1
  const phiRH = (1 - relativeHumidity / 100) / (0.1 * Math.pow(100 / 100, 1.5));
  const beta_c = Math.pow(age / (0.035 * Math.pow(cementClass, 2) + age), 0.5);

  return phiRH * beta_c;
}

/**
 * Calculate shrinkage strain
 *
 * Formula: ε_cs = ε_cas * β_as(t)  (Simplified approximation)
 *
 * @param {number} relativeHumidity - Relative humidity as percentage (20-100)
 * @param {number} age - Concrete age in days
 * @param {number} cementClass - Cement class (32.5, 42.5, 52.5)
 * @returns {number} Shrinkage strain (dimensionless)
 */
export function calculateShrinkageStrain(relativeHumidity, age, cementClass = 32.5) {
  if (!relativeHumidity || !age || relativeHumidity < 20 || relativeHumidity > 100 || age <= 0) {
    throw new Error('Invalid input: relative humidity (20-100%) and age (>0 days) required');
  }

  // Simplified calculation based on BS EN 1992-1-1
  const epsilon_cas = (160 + 10 * (9 - relativeHumidity / 10)) * Math.pow(10, -6);
  const beta_as = 1 - Math.exp(-0.2 * Math.pow(age, 0.5));

  return epsilon_cas * beta_as;
}

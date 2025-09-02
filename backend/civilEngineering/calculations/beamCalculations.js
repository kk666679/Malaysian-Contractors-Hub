/**
 * Beam Calculations Module
 *
 * This module provides functions for structural beam calculations including:
 * - Bending moment calculations
 * - Shear force calculations
 * - Deflection calculations
 * - Section modulus calculations
 *
 * All calculations follow standard structural engineering principles
 * and use SI units (N, mm, MPa) unless otherwise specified.
 */

/**
 * Calculate maximum bending moment for a simply supported beam with uniform load
 *
 * Formula: M_max = (w * L^2) / 8
 *
 * @param {number} w - Uniform load in N/mm
 * @param {number} L - Span length in mm
 * @returns {number} Maximum bending moment in N·mm
 */
export function calculateMaxBendingMomentUniformLoad(w, L) {
  if (!w || !L || w <= 0 || L <= 0) {
    throw new Error('Invalid input: load and span must be positive numbers');
  }

  return (w * Math.pow(L, 2)) / 8;
}

/**
 * Calculate maximum shear force for a simply supported beam with uniform load
 *
 * Formula: V_max = w * L / 2
 *
 * @param {number} w - Uniform load in N/mm
 * @param {number} L - Span length in mm
 * @returns {number} Maximum shear force in N
 */
export function calculateMaxShearForceUniformLoad(w, L) {
  if (!w || !L || w <= 0 || L <= 0) {
    throw new Error('Invalid input: load and span must be positive numbers');
  }

  return (w * L) / 2;
}

/**
 * Calculate deflection at center for a simply supported beam with uniform load
 *
 * Formula: δ_max = (5 * w * L^4) / (384 * E * I)
 *
 * @param {number} w - Uniform load in N/mm
 * @param {number} L - Span length in mm
 * @param {number} E - Modulus of elasticity in MPa
 * @param {number} I - Moment of inertia in mm^4
 * @returns {number} Maximum deflection in mm
 */
export function calculateDeflectionUniformLoad(w, L, E, I) {
  if (!w || !L || !E || !I || w <= 0 || L <= 0 || E <= 0 || I <= 0) {
    throw new Error('Invalid input: all parameters must be positive numbers');
  }

  return (5 * w * Math.pow(L, 4)) / (384 * E * I);
}

/**
 * Calculate section modulus for rectangular section
 *
 * Formula: Z = (b * h^2) / 6
 *
 * @param {number} b - Width in mm
 * @param {number} h - Height in mm
 * @returns {number} Section modulus in mm^3
 */
export function calculateSectionModulusRectangular(b, h) {
  if (!b || !h || b <= 0 || h <= 0) {
    throw new Error('Invalid input: width and height must be positive numbers');
  }

  return (b * Math.pow(h, 2)) / 6;
}

/**
 * Calculate required section modulus based on bending stress
 *
 * Formula: Z_required = M / σ_allowable
 *
 * @param {number} M - Bending moment in N·mm
 * @param {number} sigmaAllowable - Allowable bending stress in MPa
 * @returns {number} Required section modulus in mm^3
 */
export function calculateRequiredSectionModulus(M, sigmaAllowable) {
  if (!M || !sigmaAllowable || sigmaAllowable <= 0) {
    throw new Error('Invalid input: bending moment and allowable stress must be positive numbers');
  }

  return M / sigmaAllowable;
}

/**
 * Calculate bending stress in a beam
 *
 * Formula: σ = M / Z
 *
 * @param {number} M - Bending moment in N·mm
 * @param {number} Z - Section modulus in mm^3
 * @returns {number} Bending stress in MPa
 */
export function calculateBendingStress(M, Z) {
  if (!M || !Z || Z <= 0) {
    throw new Error('Invalid input: section modulus must be positive');
  }

  return M / Z;
}

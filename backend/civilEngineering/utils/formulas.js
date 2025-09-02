/**
 * Engineering Formulas Utility Module
 *
 * This module provides common helper functions and formulas used across
 * civil engineering calculations, such as unit conversions and basic math utilities.
 */

/**
 * Convert length from meters to millimeters
 * @param {number} meters - Length in meters
 * @returns {number} Length in millimeters
 */
export function metersToMillimeters(meters) {
  if (typeof meters !== 'number' || meters < 0) {
    throw new Error('Invalid input: meters must be a non-negative number');
  }
  return meters * 1000;
}

/**
 * Convert length from millimeters to meters
 * @param {number} millimeters - Length in millimeters
 * @returns {number} Length in meters
 */
export function millimetersToMeters(millimeters) {
  if (typeof millimeters !== 'number' || millimeters < 0) {
    throw new Error('Invalid input: millimeters must be a non-negative number');
  }
  return millimeters / 1000;
}

/**
 * Convert force from kiloNewtons to Newtons
 * @param {number} kN - Force in kiloNewtons
 * @returns {number} Force in Newtons
 */
export function kiloNewtonsToNewtons(kN) {
  if (typeof kN !== 'number' || kN < 0) {
    throw new Error('Invalid input: kN must be a non-negative number');
  }
  return kN * 1000;
}

/**
 * Convert force from Newtons to kiloNewtons
 * @param {number} N - Force in Newtons
 * @returns {number} Force in kiloNewtons
 */
export function newtonsToKiloNewtons(N) {
  if (typeof N !== 'number' || N < 0) {
    throw new Error('Invalid input: N must be a non-negative number');
  }
  return N / 1000;
}

/**
 * Round a number to specified decimal places
 * @param {number} value - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
export function roundToDecimals(value, decimals = 2) {
  if (typeof value !== 'number' || typeof decimals !== 'number' || decimals < 0) {
    throw new Error('Invalid input: value must be a number and decimals a non-negative integer');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

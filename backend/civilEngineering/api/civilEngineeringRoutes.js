import express from 'express';
import {
  calculateMaxBendingMomentUniformLoad,
  calculateMaxShearForceUniformLoad,
  calculateDeflectionUniformLoad,
  calculateSectionModulusRectangular,
  calculateRequiredSectionModulus,
  calculateBendingStress
} from '../calculations/beamCalculations.js';

import {
  getConcreteProperties,
  calculateModulusOfElasticity,
  getConcreteDensity,
  calculateDesignCompressiveStrength,
  calculateDesignTensileStrength,
  calculateCreepCoefficient,
  calculateShrinkageStrain
} from '../materials/concrete.js';

import {
  metersToMillimeters,
  millimetersToMeters,
  kiloNewtonsToNewtons,
  newtonsToKiloNewtons,
  roundToDecimals
} from '../utils/formulas.js';

import {
  validateBeamDimensions,
  validateLoad,
  validateMaterialProperties,
  validateConcreteStrengthClass,
  validateInputs
} from '../validation/inputValidation.js';

const router = express.Router();

/**
 * @route POST /api/civil-engineering/beam/bending-moment
 * @desc Calculate maximum bending moment for simply supported beam with uniform load
 * @body {number} load - Uniform load in N/mm
 * @body {number} span - Span length in mm
 * @returns {object} Calculation result
 */
router.post('/beam/bending-moment', (req, res) => {
  try {
    const { load, span } = req.body;

    // Validate inputs
    const validation = validateInputs(
      { load, span },
      {
        load: (val) => validateLoad(val, 'general'),
        span: (val) => validateBeamDimensions(val, 100, 100) // Only validate span
      }
    );

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const bendingMoment = calculateMaxBendingMomentUniformLoad(load, span);

    res.json({
      success: true,
      calculation: 'Maximum Bending Moment',
      formula: 'M_max = (w × L²) / 8',
      inputs: { load: `${load} N/mm`, span: `${span} mm` },
      result: `${roundToDecimals(bendingMoment)} N·mm`,
      result_kNm: `${roundToDecimals(newtonsToKiloNewtons(bendingMoment))} kN·m`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route POST /api/civil-engineering/beam/shear-force
 * @desc Calculate maximum shear force for simply supported beam with uniform load
 * @body {number} load - Uniform load in N/mm
 * @body {number} span - Span length in mm
 * @returns {object} Calculation result
 */
router.post('/beam/shear-force', (req, res) => {
  try {
    const { load, span } = req.body;

    const validation = validateInputs(
      { load, span },
      {
        load: (val) => validateLoad(val, 'general'),
        span: (val) => validateBeamDimensions(val, 100, 100)
      }
    );

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const shearForce = calculateMaxShearForceUniformLoad(load, span);

    res.json({
      success: true,
      calculation: 'Maximum Shear Force',
      formula: 'V_max = w × L / 2',
      inputs: { load: `${load} N/mm`, span: `${span} mm` },
      result: `${roundToDecimals(shearForce)} N`,
      result_kN: `${roundToDecimals(newtonsToKiloNewtons(shearForce))} kN`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route POST /api/civil-engineering/beam/deflection
 * @desc Calculate maximum deflection for simply supported beam with uniform load
 * @body {number} load - Uniform load in N/mm
 * @body {number} span - Span length in mm
 * @body {number} modulusOfElasticity - E in MPa
 * @body {number} momentOfInertia - I in mm⁴
 * @returns {object} Calculation result
 */
router.post('/beam/deflection', (req, res) => {
  try {
    const { load, span, modulusOfElasticity, momentOfInertia } = req.body;

    const validation = validateInputs(
      { load, span, modulusOfElasticity, momentOfInertia },
      {
        load: (val) => validateLoad(val, 'general'),
        span: (val) => validateBeamDimensions(val, 100, 100),
        modulusOfElasticity: (val) => validateMaterialProperties(val, 250, 'steel'),
        momentOfInertia: (val) => ({ isValid: val > 0, errors: val <= 0 ? ['Moment of inertia must be positive'] : [] })
      }
    );

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const deflection = calculateDeflectionUniformLoad(load, span, modulusOfElasticity, momentOfInertia);

    res.json({
      success: true,
      calculation: 'Maximum Deflection',
      formula: 'δ_max = (5 × w × L⁴) / (384 × E × I)',
      inputs: {
        load: `${load} N/mm`,
        span: `${span} mm`,
        modulusOfElasticity: `${modulusOfElasticity} MPa`,
        momentOfInertia: `${momentOfInertia} mm⁴`
      },
      result: `${roundToDecimals(deflection, 3)} mm`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route POST /api/civil-engineering/concrete/properties
 * @desc Get concrete properties for a given strength class
 * @body {string} strengthClass - Concrete strength class (e.g., 'C25/30')
 * @returns {object} Concrete properties
 */
router.post('/concrete/properties', (req, res) => {
  try {
    const { strengthClass } = req.body;

    const validation = validateConcreteStrengthClass(strengthClass);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const properties = getConcreteProperties(strengthClass);
    const modulusOfElasticity = calculateModulusOfElasticity(properties.fcm);
    const density = getConcreteDensity('normal');

    res.json({
      success: true,
      strengthClass,
      properties: {
        characteristicStrength: `${properties.fck} MPa`,
        meanStrength: `${properties.fcm} MPa`,
        meanTensileStrength: `${properties.fctm} MPa`,
        modulusOfElasticity: `${roundToDecimals(modulusOfElasticity)} MPa`,
        density: `${density} kg/m³`
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route POST /api/civil-engineering/concrete/design-strength
 * @desc Calculate design compressive and tensile strengths
 * @body {string} strengthClass - Concrete strength class
 * @body {number} alpha_cc - Long term effects coefficient (default 0.85)
 * @body {number} gamma_c - Partial safety factor (default 1.5)
 * @returns {object} Design strengths
 */
router.post('/concrete/design-strength', (req, res) => {
  try {
    const { strengthClass, alpha_cc = 0.85, gamma_c = 1.5 } = req.body;

    const validation = validateConcreteStrengthClass(strengthClass);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    const properties = getConcreteProperties(strengthClass);
    const designCompressiveStrength = calculateDesignCompressiveStrength(
      properties.fck, alpha_cc, gamma_c
    );
    const designTensileStrength = calculateDesignTensileStrength(
      properties.fctm, 1.0, gamma_c
    );

    res.json({
      success: true,
      strengthClass,
      designStrengths: {
        compressive: `${roundToDecimals(designCompressiveStrength, 2)} MPa`,
        tensile: `${roundToDecimals(designTensileStrength, 2)} MPa`
      },
      parameters: {
        alpha_cc,
        gamma_c
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * @route GET /api/civil-engineering/info
 * @desc Get information about available civil engineering calculations
 * @returns {object} API information
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    message: 'Civil Engineering Calculations API',
    version: '1.0.0',
    endpoints: {
      beam: [
        'POST /beam/bending-moment - Calculate maximum bending moment',
        'POST /beam/shear-force - Calculate maximum shear force',
        'POST /beam/deflection - Calculate maximum deflection'
      ],
      concrete: [
        'POST /concrete/properties - Get concrete properties',
        'POST /concrete/design-strength - Calculate design strengths'
      ]
    },
    units: {
      force: 'N (Newtons), kN (kiloNewtons)',
      length: 'mm (millimeters), m (meters)',
      stress: 'MPa (MegaPascals)',
      moment: 'N·mm, kN·m'
    }
  });
});

export default router;

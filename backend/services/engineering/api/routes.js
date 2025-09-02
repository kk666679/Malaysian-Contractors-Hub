/**
 * Engineering Services API Routes
 * RESTful API endpoints for all engineering calculations
 */

import express from 'express';
import EngineeringServices from '../index.js';
import { validateRequest } from '../../../middleware/validation.js';
import { authenticateToken as auth } from '../../../middleware/auth.js';

const router = express.Router();
const engineeringServices = new EngineeringServices();

/**
 * @route GET /api/engineering/modules
 * @desc Get available engineering modules
 * @access Public
 */
router.get('/modules', handleAsync(async (req, res) => {
  const modules = engineeringServices.getAvailableModules();
  res.json({
    success: true,
    data: {
      modules,
      count: modules.length,
      description: 'Available engineering calculation modules'
    }
  });
}));

/**
 * @route GET /api/engineering/:module/calculations
 * @desc Get available calculations for a module
 * @access Public
 */
router.get('/:module/calculations', handleAsync(async (req, res) => {
  const { module } = req.params;
  
  try {
    const moduleInstance = await engineeringServices.getModule(module);
    const calculations = moduleInstance.getAvailableCalculations();
    
    res.json({
      success: true,
      data: {
        module,
        calculations,
        count: calculations.length
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}));

/**
 * @route POST /api/engineering/:module/calculate/:type
 * @desc Perform engineering calculation
 * @access Private
 */
router.post('/:module/calculate/:type', 
  auth,
  async (req, res) => {
    try {
    const { module, type } = req.params;
    const { inputs, options = {} } = req.body;
    
    try {
      // Add user context to options
      options.userId = req.user.id;
      options.userRole = req.user.role;
      options.checkCompliance = options.checkCompliance !== false; // Default true
      
      const result = await engineeringServices.performCalculation(
        module, 
        type, 
        inputs, 
        options
      );
      
      res.json({
        success: true,
        data: {
          module,
          calculationType: type,
          timestamp: new Date().toISOString(),
          ...result
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        module,
        calculationType: type
      });
    }
  })
);

/**
 * @route POST /api/engineering/civil/beam-analysis
 * @desc Analyze beam structure
 * @access Private
 */
router.post('/civil/beam-analysis', 
  auth,
  validateRequest(['length', 'load', 'width', 'height']),
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil', 
      'beam-analysis', 
      inputs, 
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route POST /api/engineering/civil/column-design
 * @desc Design reinforced concrete column
 * @access Private
 */
router.post('/civil/column-design',
  auth,
  validateRequest(['height', 'axialLoad', 'width', 'depth']),
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil',
      'column-design',
      inputs,
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route POST /api/engineering/civil/foundation-bearing
 * @desc Calculate foundation bearing capacity
 * @access Private
 */
router.post('/civil/foundation-bearing',
  auth,
  validateRequest(['width', 'length', 'depth', 'appliedLoad']),
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil',
      'foundation-bearing',
      inputs,
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route POST /api/engineering/civil/concrete-mix
 * @desc Design concrete mix
 * @access Private
 */
router.post('/civil/concrete-mix',
  auth,
  validateRequest(['targetStrength']),
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil',
      'concrete-mix',
      inputs,
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route POST /api/engineering/civil/steel-connection
 * @desc Design steel connection
 * @access Private
 */
router.post('/civil/steel-connection',
  auth,
  validateRequest(['appliedForce', 'numberOfBolts']),
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil',
      'steel-connection',
      inputs,
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route POST /api/engineering/civil/load-combination
 * @desc Calculate load combinations
 * @access Private
 */
router.post('/civil/load-combination',
  auth,
  handleAsync(async (req, res) => {
    const { inputs, options = {} } = req.body;
    
    const result = await engineeringServices.performCalculation(
      'civil',
      'load-combination',
      inputs,
      { ...options, checkCompliance: true }
    );
    
    res.json({
      success: true,
      data: result
    });
  })
);

/**
 * @route GET /api/engineering/standards/:country
 * @desc Get applicable standards for a country
 * @access Public
 */
router.get('/standards/:country', handleAsync(async (req, res) => {
  const { country } = req.params;
  
  let standards = {};
  
  switch (country.toLowerCase()) {
    case 'malaysia':
      standards = {
        'MS 76:2005': 'Code of practice for structural use of concrete',
        'MS 1462:2009': 'Code of practice for structural use of steel',
        'MS 1553:2002': 'Code of practice for wind loading',
        'MS 1194:2015': 'Code of practice for soil investigation',
        'UBBL 1984': 'Uniform Building By-Laws 1984'
      };
      break;
    case 'international':
      standards = {
        'ISO 9001:2015': 'Quality management systems',
        'ISO 14001:2015': 'Environmental management systems',
        'ISO 45001:2018': 'Occupational health and safety management'
      };
      break;
    default:
      return res.status(404).json({
        success: false,
        error: 'Standards not available for specified country'
      });
  }
  
  res.json({
    success: true,
    data: {
      country,
      standards,
      count: Object.keys(standards).length
    }
  });
}));

/**
 * @route POST /api/engineering/utils/convert
 * @desc Convert between units
 * @access Public
 */
router.post('/utils/convert', 
  validateRequest(['value', 'fromUnit', 'toUnit', 'type']),
  handleAsync(async (req, res) => {
    const { value, fromUnit, toUnit, type } = req.body;
    
    try {
      const convertedValue = engineeringServices.utils.unitConverter.convert(
        value, fromUnit, toUnit, type
      );
      
      res.json({
        success: true,
        data: {
          original: { value, unit: fromUnit },
          converted: { value: convertedValue, unit: toUnit },
          type,
          conversionFactor: type !== 'temperature' ? 
            engineeringServices.utils.unitConverter.getConversionFactor(fromUnit, toUnit, type) : 
            null
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  })
);

/**
 * @route GET /api/engineering/utils/units/:type
 * @desc Get available units for a type
 * @access Public
 */
router.get('/utils/units/:type', handleAsync(async (req, res) => {
  const { type } = req.params;
  
  try {
    const units = engineeringServices.utils.unitConverter.getAvailableUnits(type);
    
    res.json({
      success: true,
      data: {
        type,
        units,
        count: units.length
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}));

/**
 * @route POST /api/engineering/loads/calculate
 * @desc Calculate various load types
 * @access Private
 */
router.post('/loads/calculate',
  auth,
  validateRequest(['loadType']),
  handleAsync(async (req, res) => {
    const { loadType, inputs } = req.body;
    const loadCalculator = engineeringServices.utils.loadCalculator;
    
    let result;
    
    switch (loadType) {
      case 'dead':
        result = loadCalculator.calculateDeadLoads(inputs.elements);
        break;
      case 'live':
        result = loadCalculator.calculateLiveLoads(inputs.areas);
        break;
      case 'wind':
        result = loadCalculator.calculateWindLoads(inputs);
        break;
      case 'seismic':
        result = loadCalculator.calculateSeismicLoads(inputs);
        break;
      case 'combinations':
        result = loadCalculator.calculateLoadCombinations(inputs);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid load type'
        });
    }
    
    res.json({
      success: true,
      data: {
        loadType,
        timestamp: new Date().toISOString(),
        ...result
      }
    });
  })
);

/**
 * @route GET /api/engineering/loads/standards
 * @desc Get standard load values
 * @access Public
 */
router.get('/loads/standards', handleAsync(async (req, res) => {
  const standards = engineeringServices.utils.loadCalculator.getStandardLoads();
  
  res.json({
    success: true,
    data: standards
  });
}));

/**
 * @route POST /api/engineering/compliance/check
 * @desc Check compliance with standards
 * @access Private
 */
router.post('/compliance/check',
  auth,
  validateRequest(['module', 'calculationType', 'inputs', 'result']),
  handleAsync(async (req, res) => {
    const { module, calculationType, inputs, result } = req.body;
    
    const compliance = await engineeringServices.checkCompliance(
      module, calculationType, inputs, result
    );
    
    res.json({
      success: true,
      data: {
        module,
        calculationType,
        compliance,
        timestamp: new Date().toISOString()
      }
    });
  })
);

/**
 * @route GET /api/engineering/info
 * @desc Get API information and available endpoints
 * @access Public
 */
router.get('/info', handleAsync(async (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'MC-Hub Engineering Services API',
      version: '1.0.0',
      description: 'Comprehensive engineering calculations for Malaysian contractors',
      modules: engineeringServices.getAvailableModules(),
      endpoints: {
        calculations: '/:module/calculate/:type',
        standards: '/standards/:country',
        utilities: '/utils/*',
        loads: '/loads/*',
        compliance: '/compliance/check'
      },
      standards: [
        'Malaysian Standards (MS)',
        'ISO Standards',
        'OSHA, NIOSH, CIDB Compliance'
      ],
      features: [
        'Real-world engineering calculations',
        'Malaysian building code compliance',
        'Multi-user collaboration',
        'GCMS integration',
        'Mobile-responsive design'
      ]
    }
  });
}));

export default router;
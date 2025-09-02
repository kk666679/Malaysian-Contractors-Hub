/**
 * Engineering Services API Routes - Fixed Version
 * RESTful API endpoints for all engineering calculations
 */

import express from 'express';
import EngineeringServices from '../index.js';
import { authenticateToken as auth } from '../../../middleware/auth.js';

const router = express.Router();
const engineeringServices = new EngineeringServices();

/**
 * @route GET /api/engineering/modules
 * @desc Get available engineering modules
 * @access Public
 */
router.get('/modules', async (req, res) => {
  try {
    const modules = engineeringServices.getAvailableModules();
    res.json({
      success: true,
      data: {
        modules,
        count: modules.length,
        description: 'Available engineering calculation modules'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @route GET /api/engineering/:module/calculations
 * @desc Get available calculations for a module
 * @access Public
 */
router.get('/:module/calculations', async (req, res) => {
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
});

/**
 * @route POST /api/engineering/:module/calculate/:type
 * @desc Perform engineering calculation
 * @access Private
 */
router.post('/:module/calculate/:type', auth, async (req, res) => {
  const { module, type } = req.params;
  const { inputs, options = {} } = req.body;
  
  try {
    // Add user context to options
    options.userId = req.user.id;
    options.userRole = req.user.role;
    options.checkCompliance = options.checkCompliance !== false;
    
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
});

/**
 * @route GET /api/engineering/standards/:country
 * @desc Get applicable standards for a country
 * @access Public
 */
router.get('/standards/:country', async (req, res) => {
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
});

/**
 * @route GET /api/engineering/info
 * @desc Get API information and available endpoints
 * @access Public
 */
router.get('/info', async (req, res) => {
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
});

export default router;
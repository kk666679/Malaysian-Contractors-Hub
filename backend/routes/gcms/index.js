// GCMS Routes Index - Main router for all GCMS modules
const express = require('express');
const router = express.Router();

// Import module routes
const projectRoutes = require('./projectManagement');
const contractRoutes = require('./contractManagement');
const biddingRoutes = require('./bidding');
const financialRoutes = require('./financial');
const complianceRoutes = require('./compliance');
const subcontractorRoutes = require('./subcontractor');
const inventoryRoutes = require('./inventory');
const workforceRoutes = require('./workforce');
const analyticsRoutes = require('./analytics');

// Mount module routes
router.use('/projects', projectRoutes);
router.use('/contracts', contractRoutes);
router.use('/bidding', biddingRoutes);
router.use('/financial', financialRoutes);
router.use('/compliance', complianceRoutes);
router.use('/subcontractors', subcontractorRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/workforce', workforceRoutes);
router.use('/analytics', analyticsRoutes);

// GCMS System Info
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      system: 'General Contracting Management System (GCMS)',
      version: '1.0.0',
      modules: [
        'Project Management',
        'Contract & Document Management',
        'Bidding & Estimation',
        'Financial & Invoicing',
        'Compliance & Safety',
        'Subcontractor & Vendor Management',
        'Inventory & Materials',
        'Workforce Management',
        'Analytics & Reporting'
      ],
      features: [
        'Role-based access control',
        'Real-time collaboration',
        'Automated workflows',
        'Comprehensive reporting',
        'Mobile-responsive design',
        'API-first architecture'
      ]
    }
  });
});

module.exports = router;
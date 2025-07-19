const express = require('express');
const router = express.Router();

// Mock compliance data
const complianceData = {
  building_codes: [
    {
      id: 'BC001',
      name: 'Uniform Building By-Laws (UBBL)',
      authority: 'Local Authorities',
      last_updated: '2022-05-15',
      description: 'Regulations for building design and construction in Malaysia'
    },
    {
      id: 'BC002',
      name: 'MS 1183:2015',
      authority: 'Department of Standards Malaysia',
      last_updated: '2015-08-22',
      description: 'Fire precautions in the design and construction of buildings'
    },
    {
      id: 'BC003',
      name: 'MS 1525:2019',
      authority: 'Department of Standards Malaysia',
      last_updated: '2019-11-10',
      description: 'Energy efficiency and use of renewable energy for non-residential buildings'
    }
  ],
  cidb_requirements: [
    {
      id: 'CIDB001',
      name: 'Contractor Registration',
      category: 'Registration',
      description: 'Requirements for contractor registration with CIDB Malaysia'
    },
    {
      id: 'CIDB002',
      name: 'SCORE Program',
      category: 'Assessment',
      description: 'Contractor performance assessment system'
    },
    {
      id: 'CIDB003',
      name: 'Green Card',
      category: 'Safety',
      description: 'Mandatory safety training for construction personnel'
    }
  ],
  local_regulations: [
    {
      id: 'LR001',
      name: 'IWK Sewerage Guidelines',
      authority: 'Indah Water Konsortium',
      region: 'Nationwide',
      description: 'Standards for sewerage systems and connections'
    },
    {
      id: 'LR002',
      name: 'TNB Electricity Supply Application',
      authority: 'Tenaga Nasional Berhad',
      region: 'Peninsular Malaysia',
      description: 'Requirements for electrical supply connections'
    },
    {
      id: 'LR003',
      name: 'BOMBA Fire Safety Requirements',
      authority: 'Fire and Rescue Department of Malaysia',
      region: 'Nationwide',
      description: 'Fire safety standards and certification requirements'
    }
  ]
};

// Get all compliance data
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: complianceData
  });
});

// Get building codes
router.get('/building-codes', (req, res) => {
  res.json({
    success: true,
    data: complianceData.building_codes
  });
});

// Get CIDB requirements
router.get('/cidb-requirements', (req, res) => {
  res.json({
    success: true,
    data: complianceData.cidb_requirements
  });
});

// Get local regulations
router.get('/local-regulations', (req, res) => {
  res.json({
    success: true,
    data: complianceData.local_regulations
  });
});

module.exports = router;
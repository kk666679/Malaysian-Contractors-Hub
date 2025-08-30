// Compliance controller for handling compliance-related operations
const complianceController = {
  // Mock compliance data
  complianceData: {
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
  },

  // Get all compliance data
  getAllCompliance: (req, res) => {
    res.json({
      success: true,
      data: this.complianceData
    });
  },

  // Get building codes
  getBuildingCodes: (req, res) => {
    res.json({
      success: true,
      data: this.complianceData.building_codes
    });
  },

  // Get CIDB requirements
  getCIDBRequirements: (req, res) => {
    res.json({
      success: true,
      data: this.complianceData.cidb_requirements
    });
  },

  // Get local regulations
  getLocalRegulations: (req, res) => {
    res.json({
      success: true,
      data: this.complianceData.local_regulations
    });
  }
};

export default complianceController;

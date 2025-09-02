// Contract Management Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const {
  createContract,
  getContracts,
  updateContractStatus,
  uploadDocument,
  getDocuments,
  createChangeOrder,
  getContractTemplates,
  generateContractFromTemplate
} = require('../../controllers/gcms/contractManagementController');

// Contract routes
router.post('/', auth, createContract);
router.get('/', auth, getContracts);
router.put('/:id/status', auth, updateContractStatus);

// Document routes
router.post('/documents', auth, upload.single('file'), uploadDocument);
router.get('/documents', auth, getDocuments);

// Change order routes
router.post('/change-orders', auth, createChangeOrder);

// Template routes
router.get('/templates', auth, getContractTemplates);
router.post('/generate-from-template', auth, generateContractFromTemplate);

module.exports = router;
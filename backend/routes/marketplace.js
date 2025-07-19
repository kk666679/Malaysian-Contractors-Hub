const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

// Specialist routes
router.get('/specialists', marketplaceController.getSpecialists);
router.get('/specialist/:id', marketplaceController.getSpecialistDetails);
router.post('/hire', marketplaceController.hireSpecialist);
router.get('/categories', marketplaceController.getSpecialistCategories);
router.post('/search', marketplaceController.searchSpecialists);

// Project routes
router.get('/projects', marketplaceController.getProjects);
router.post('/projects', marketplaceController.createProject);
router.get('/projects/:id', marketplaceController.getProjectDetails);
router.post('/projects/:id/proposals', marketplaceController.submitProposal);
router.get('/projects/:id/proposals', marketplaceController.getProjectProposals);

// Supplier routes
router.get('/suppliers', marketplaceController.getSuppliers);
router.get('/suppliers/categories', marketplaceController.getSupplierCategories);
router.get('/suppliers/:id', marketplaceController.getSupplierDetails);
router.get('/suppliers/:id/products', marketplaceController.getSupplierProducts);
router.post('/suppliers/:id/quote', marketplaceController.requestQuote);

module.exports = router;
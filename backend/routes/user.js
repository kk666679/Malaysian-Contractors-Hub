const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get('/profile', userController.getProfile);

// Update user profile
router.put('/profile', userController.updateProfile);

// Get user projects
router.get('/projects', userController.getUserProjects);

// Get user specialists
router.get('/specialists', userController.getUserSpecialists);

module.exports = router;

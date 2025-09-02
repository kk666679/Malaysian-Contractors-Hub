// Project Management Routes - GCMS
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createProject,
  getProjects,
  createTask,
  getProjectDashboard
} = require('../../controllers/gcms/projectManagementController');

// Project routes
router.post('/', auth, createProject);
router.get('/', auth, getProjects);
router.get('/dashboard', auth, getProjectDashboard);

// Task routes
router.post('/tasks', auth, createTask);

module.exports = router;
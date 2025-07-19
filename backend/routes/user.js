const express = require('express');
const router = express.Router();

// Mock user data
const users = [
  {
    id: 'USR001',
    name: 'Ahmad Bin Abdullah',
    email: 'ahmad@example.com',
    company: 'ABC Construction Sdn Bhd',
    role: 'Project Manager',
    cidb_number: 'CIDB12345678',
    membership_type: 'Premium',
    joined_date: '2023-05-15'
  }
];

// Get user profile
router.get('/profile', (req, res) => {
  // In a real app, this would get the user from the authenticated session
  res.json({
    success: true,
    data: users[0]
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  const { name, company, role, phone } = req.body;
  
  // In a real app, this would update the user in the database
  const updatedUser = {
    ...users[0],
    name: name || users[0].name,
    company: company || users[0].company,
    role: role || users[0].role,
    phone: phone || users[0].phone,
    updated_at: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});

// Get user projects
router.get('/projects', (req, res) => {
  // In a real app, this would get the user's projects from the database
  res.json({
    success: true,
    data: {
      projects: [],
      total: 0
    }
  });
});

// Get user specialists
router.get('/specialists', (req, res) => {
  // In a real app, this would get the user's hired specialists from the database
  res.json({
    success: true,
    data: {
      specialists: [],
      total: 0
    }
  });
});

module.exports = router;
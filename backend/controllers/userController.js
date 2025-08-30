// User controller for handling user-related operations
const userController = {
  // Get user profile
  getProfile: (req, res) => {
    // Mock user data - in real app, this would come from database
    const user = {
      id: 'USR001',
      name: 'Ahmad Bin Abdullah',
      email: 'ahmad@example.com',
      company: 'ABC Construction Sdn Bhd',
      role: 'Project Manager',
      cidb_number: 'CIDB12345678',
      membership_type: 'Premium',
      joined_date: '2023-05-15'
    };
    
    res.json({
      success: true,
      data: user
    });
  },

  // Update user profile
  updateProfile: (req, res) => {
    const { name, company, role, phone } = req.body;
    
    // In a real app, this would update the user in the database
    const updatedUser = {
      id: 'USR001',
      name: name || 'Ahmad Bin Abdullah',
      email: 'ahmad@example.com',
      company: company || 'ABC Construction Sdn Bhd',
      role: role || 'Project Manager',
      cidb_number: 'CIDB12345678',
      membership_type: 'Premium',
      joined_date: '2023-05-15',
      phone: phone || '',
      updated_at: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  },

  // Get user projects
  getUserProjects: (req, res) => {
    // In a real app, this would get the user's projects from the database
    res.json({
      success: true,
      data: {
        projects: [],
        total: 0
      }
    });
  },

  // Get user specialists
  getUserSpecialists: (req, res) => {
    // In a real app, this would get the user's hired specialists from the database
    res.json({
      success: true,
      data: {
        specialists: [],
        total: 0
      }
    });
  }
};

module.exports = userController;

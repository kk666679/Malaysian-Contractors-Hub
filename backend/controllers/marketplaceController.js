// Sample data for marketplace functionality
import specialists from '../data/specialists.js';
import projects from '../data/projects.js';
import suppliers from '../data/suppliers.js';
import categories from '../data/categories.js';

const marketplaceController = {
  // Specialist controllers
  getSpecialists: (req, res) => {
    const { specialty, location, availability } = req.query;
    
    let filteredSpecialists = [...specialists];
    
    if (specialty && specialty !== 'all') {
      filteredSpecialists = filteredSpecialists.filter(s => 
        s.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
        s.specialties.some(spec => spec.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    if (location && location !== 'all') {
      filteredSpecialists = filteredSpecialists.filter(s => 
        s.location.toLowerCase() === location.toLowerCase()
      );
    }
    
    if (availability && availability !== 'all') {
      filteredSpecialists = filteredSpecialists.filter(s => 
        s.availability.toLowerCase() === availability.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      data: {
        specialists: filteredSpecialists,
        total: filteredSpecialists.length,
        filters_applied: { specialty, location, availability }
      }
    });
  },
  
  getSpecialistDetails: (req, res) => {
    const { id } = req.params;
    const specialist = specialists.find(s => s.id === id);
    
    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }
    
    res.json({
      success: true,
      data: specialist
    });
  },
  
  hireSpecialist: (req, res) => {
    const { specialist_id, project_details, client_info } = req.body;
    
    if (!specialist_id || !project_details) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // In a real app, this would be saved to a database
    const hiringRequest = {
      request_id: `HR${Math.floor(Math.random() * 100000)}`,
      specialist_id,
      status: 'Pending',
      submitted_date: new Date().toISOString(),
      project_details,
      client_info,
      estimated_response_time: '2-4 hours'
    };
    
    res.json({
      success: true,
      message: 'Hiring request submitted successfully',
      data: hiringRequest
    });
  },
  
  getSpecialistCategories: (req, res) => {
    res.json({
      success: true,
      data: categories.specialist_categories
    });
  },
  
  searchSpecialists: (req, res) => {
    const { keywords, location, min_rating, max_hourly_rate, certifications } = req.body;
    
    let filteredSpecialists = [...specialists];
    
    if (keywords) {
      const searchTerms = keywords.toLowerCase().split(' ');
      filteredSpecialists = filteredSpecialists.filter(s => 
        searchTerms.some(term => 
          s.name.toLowerCase().includes(term) ||
          s.specialty.toLowerCase().includes(term) ||
          s.specialties.some(spec => spec.toLowerCase().includes(term)) ||
          s.certifications.some(cert => cert.toLowerCase().includes(term))
        )
      );
    }
    
    if (location) {
      filteredSpecialists = filteredSpecialists.filter(s => 
        s.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (min_rating) {
      filteredSpecialists = filteredSpecialists.filter(s => s.rating >= min_rating);
    }
    
    if (max_hourly_rate) {
      filteredSpecialists = filteredSpecialists.filter(s => s.hourly_rate <= max_hourly_rate);
    }
    
    if (certifications && certifications.length > 0) {
      filteredSpecialists = filteredSpecialists.filter(s => 
        certifications.some(cert => 
          s.certifications.some(c => c.toLowerCase().includes(cert.toLowerCase()))
        )
      );
    }
    
    res.json({
      success: true,
      data: {
        specialists: filteredSpecialists,
        total: filteredSpecialists.length,
        search_criteria: req.body
      }
    });
  },
  
  // Project controllers
  getProjects: (req, res) => {
    const { category, location, budget_min, budget_max } = req.query;
    
    let filteredProjects = [...projects];
    
    if (category && category !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.category === category);
    }
    
    if (location && location !== 'all') {
      filteredProjects = filteredProjects.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (budget_min) {
      filteredProjects = filteredProjects.filter(p => p.budget_max >= budget_min);
    }
    
    if (budget_max) {
      filteredProjects = filteredProjects.filter(p => p.budget_min <= budget_max);
    }
    
    res.json({
      success: true,
      data: {
        projects: filteredProjects,
        total: filteredProjects.length,
        filters_applied: { category, location, budget_min, budget_max }
      }
    });
  },
  
  createProject: (req, res) => {
    const { title, description, location, category, budget_min, budget_max, timeline, skills_required } = req.body;
    
    if (!title || !description || !location || !category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // In a real app, this would be saved to a database
    const newProject = {
      id: `PRJ${Math.floor(Math.random() * 100000)}`,
      title,
      description,
      location,
      category,
      budget_min: budget_min || 0,
      budget_max: budget_max || 0,
      timeline,
      skills_required: skills_required || [],
      posted_date: new Date().toISOString(),
      status: 'Open',
      proposals_count: 0
    };
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  },
  
  getProjectDetails: (req, res) => {
    const { id } = req.params;
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  },
  
  submitProposal: (req, res) => {
    const { id } = req.params;
    const { specialist_id, price, timeline, description } = req.body;
    
    if (!specialist_id || !price || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // In a real app, this would be saved to a database
    const proposal = {
      id: `PROP${Math.floor(Math.random() * 100000)}`,
      project_id: id,
      specialist_id,
      price,
      timeline,
      description,
      submitted_date: new Date().toISOString(),
      status: 'Pending'
    };
    
    res.status(201).json({
      success: true,
      message: 'Proposal submitted successfully',
      data: proposal
    });
  },
  
  getProjectProposals: (req, res) => {
    const { id } = req.params;
    
    // In a real app, this would fetch from a database
    // For now, return empty array as we don't have stored proposals
    res.json({
      success: true,
      data: {
        proposals: [],
        total: 0,
        project_id: id
      }
    });
  },
  
  // Supplier controllers
  getSuppliers: (req, res) => {
    const { category, location } = req.query;
    
    let filteredSuppliers = [...suppliers];
    
    if (category && category !== 'all') {
      filteredSuppliers = filteredSuppliers.filter(s => 
        s.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
      );
    }
    
    if (location && location !== 'all') {
      filteredSuppliers = filteredSuppliers.filter(s => 
        s.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      data: {
        suppliers: filteredSuppliers,
        total: filteredSuppliers.length,
        filters_applied: { category, location }
      }
    });
  },
  
  getSupplierCategories: (req, res) => {
    res.json({
      success: true,
      data: categories.supplier_categories
    });
  },
  
  getSupplierDetails: (req, res) => {
    const { id } = req.params;
    const supplier = suppliers.find(s => s.id === id);
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    res.json({
      success: true,
      data: supplier
    });
  },
  
  getSupplierProducts: (req, res) => {
    const { id } = req.params;
    const { category } = req.query;
    
    const supplier = suppliers.find(s => s.id === id);
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    // In a real app, this would fetch from a database
    // For now, return empty array as we don't have stored products
    res.json({
      success: true,
      data: {
        products: [],
        total: 0,
        supplier_id: id,
        filters_applied: { category }
      }
    });
  },
  
  requestQuote: (req, res) => {
    const { id } = req.params;
    const { products, quantity, delivery_date, contact_info } = req.body;
    
    if (!products || !contact_info) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    const supplier = suppliers.find(s => s.id === id);
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    // In a real app, this would be saved to a database
    const quoteRequest = {
      id: `QR${Math.floor(Math.random() * 100000)}`,
      supplier_id: id,
      products,
      quantity,
      delivery_date,
      contact_info,
      submitted_date: new Date().toISOString(),
      status: 'Pending'
    };
    
    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully',
      data: quoteRequest
    });
  }
};

export default marketplaceController;

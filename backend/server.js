const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Import route modules
const marketplaceRoutes = require('./routes/marketplace');
const complianceRoutes = require('./routes/compliance');
const userRoutes = require('./routes/user');
const weatherRoutes = require('./routes/weather');
const civilEngineeringRoutes = require('./routes/civilEngineering');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/civil-engineering', civilEngineeringRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
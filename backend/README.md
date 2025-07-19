# Malaysian Civil & MEP Contractors Hub - Backend API

This is the backend API for the Malaysian Civil & MEP Contractors Hub platform.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. The API will be available at `http://localhost:5000/api`

## API Endpoints

### Marketplace API

#### Specialists

- `GET /api/marketplace/specialists` - Get all specialists
  - Query parameters: `specialty`, `location`, `availability`
- `GET /api/marketplace/specialist/:id` - Get specialist details
- `POST /api/marketplace/hire` - Submit a hiring request
- `GET /api/marketplace/categories` - Get specialist categories
- `POST /api/marketplace/search` - Advanced search for specialists

#### Projects

- `GET /api/marketplace/projects` - Get all projects
  - Query parameters: `category`, `location`, `budget_min`, `budget_max`
- `POST /api/marketplace/projects` - Create a new project
- `GET /api/marketplace/projects/:id` - Get project details
- `POST /api/marketplace/projects/:id/proposals` - Submit a proposal for a project
- `GET /api/marketplace/projects/:id/proposals` - Get proposals for a project

#### Suppliers

- `GET /api/marketplace/suppliers` - Get all suppliers
  - Query parameters: `category`, `location`
- `GET /api/marketplace/suppliers/categories` - Get supplier categories
- `GET /api/marketplace/suppliers/:id` - Get supplier details
- `GET /api/marketplace/suppliers/:id/products` - Get supplier products
- `POST /api/marketplace/suppliers/:id/quote` - Request a quote from a supplier

### Compliance API

- `GET /api/compliance` - Get all compliance data
- `GET /api/compliance/building-codes` - Get building codes
- `GET /api/compliance/cidb-requirements` - Get CIDB requirements
- `GET /api/compliance/local-regulations` - Get local regulations

### User API

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/projects` - Get user projects
- `GET /api/user/specialists` - Get user specialists

### Weather API

- `GET /api/weather` - Get weather data for all regions
- `GET /api/weather/:region` - Get weather data for a specific region
- `GET /api/weather/monsoon/forecast` - Get monsoon forecast

## Data Models

### Specialist

```javascript
{
  id: String,
  name: String,
  specialty: String,
  certifications: [String],
  location: String,
  rating: Number,
  reviews: Number,
  hourly_rate: Number,
  availability: String,
  experience_years: Number,
  completed_projects: Number,
  profile_image: String,
  specialties: [String],
  bio: String,
  portfolio: [
    {
      project: String,
      location: String,
      year: Number,
      description: String
    }
  ],
  recent_reviews: [
    {
      reviewer: String,
      rating: Number,
      comment: String,
      date: String
    }
  ],
  contact: {
    phone: String,
    email: String,
    whatsapp: String
  }
}
```

### Project

```javascript
{
  id: String,
  title: String,
  category: String,
  category_name: String,
  location: String,
  description: String,
  budget_min: Number,
  budget_max: Number,
  timeline: String,
  timeline_display: String,
  posted_date: String,
  status: String,
  proposals_count: Number,
  skills_required: [String],
  client: {
    name: String,
    contact_person: String,
    email: String
  }
}
```

### Supplier

```javascript
{
  id: String,
  name: String,
  logo: String,
  location: String,
  categories: [String],
  description: String,
  rating: Number,
  reviews: Number,
  years_active: Number,
  contact: {
    phone: String,
    email: String,
    website: String
  },
  address: {
    street: String,
    city: String,
    postcode: String,
    state: String
  },
  business_hours: String
}
```

## Error Handling

All API endpoints return a standard response format:

```javascript
{
  success: Boolean,
  message: String, // Only included if there's a message to display
  data: Object // The response data
}
```

For errors, the response will include:

```javascript
{
  success: false,
  message: String, // Error message
  error: String // Detailed error (only in development mode)
}
```

## Authentication

Authentication is not implemented in this version. In a production environment, JWT authentication would be used to secure the API endpoints.
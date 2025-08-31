# MC-Hub: Malaysian Contractors Hub

MC-Hub is a comprehensive web platform designed specifically for Malaysian contractors, providing integrated tools for managing construction projects across multiple engineering disciplines. The platform combines modern web technologies with industry-specific calculations, compliance checking, and project management features tailored to Malaysian building standards and regulations.

## 🚀 Current Status

**Version:** 0.2.0
**Backend:** ✅ Fully Implemented
**Frontend:** ✅ Core Implementation Complete
**Database:** ✅ Prisma + PostgreSQL
**Authentication:** ✅ JWT + Refresh Tokens
**Testing:** ✅ Comprehensive API Tests

### Frontend Implementation Status
- ✅ **Authentication System**: Login/Register with backend integration
- ✅ **Project Management**: CRUD operations with real-time data
- ✅ **Dashboard**: User overview with project statistics
- ✅ **UI Components**: Modern design with TailwindCSS + Radix UI
- ✅ **Protected Routes**: Role-based access control
- ✅ **Form Validation**: React Hook Form + Zod schemas
- ✅ **State Management**: React Query for server state
- ✅ **Responsive Design**: Mobile-first approach
- 🔄 **Module Components**: Civil/electrical engineering forms (in progress)
- 🔄 **Advanced Features**: Real-time notifications, file uploads (planned)

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup (Neon)](#database-setup-neon)
- [Deployment](#deployment)
- [External API Integrations](#external-api-integrations)
- [Authentication & Authorization](#authentication-authorization)
- [Testing](#testing)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

MC-Hub aims to streamline project management and contractor-client interactions across multiple disciplines, including civil engineering, electrical systems, sewerage & drainage, ELV systems, and HVAC systems. The platform allows users to:

- Generate custom bids based on real-time data.
- Monitor compliance with safety regulations and local building codes.
- Access tools for project design, simulation, and management.
- Track project timelines, budgets, and resources.

## Tech Stack

### Frontend
- **React 19**: Latest React with modern hooks and concurrent features
- **Vite 7**: Next-generation build tool for fast development and optimized production builds
- **TailwindCSS 4**: Utility-first CSS framework with modern features
- **React Router 7**: Advanced routing with data loading and mutation capabilities
- **React Hook Form + Zod**: Robust form handling with schema validation
- **Radix UI**: Accessible, unstyled UI components
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Powerful data fetching and caching
- **Recharts**: Beautiful, customizable charts and graphs
- **PWA Support**: Service workers for offline functionality

### Backend
- **Node.js 20+**: Modern JavaScript runtime with ES modules
- **Express 5**: Fast, minimalist web framework
- **Prisma**: Next-generation ORM with type safety
- **PostgreSQL**: Robust relational database (Neon serverless)
- **Redis**: High-performance caching and session storage
- **JWT + Refresh Tokens**: Secure authentication system
- **bcryptjs**: Password hashing for security
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logging

### Database Schema
- **25+ Models**: Comprehensive data structure covering users, projects, calculations, compliance, weather, etc.
- **Role-Based Access Control**: Admin, Contractor, Consultant, Supplier, Client roles
- **Multi-tenant Architecture**: User-specific data isolation
- **Audit Trail**: Creation and update timestamps on all entities

### Development Tools
- **ESLint**: Code linting and formatting
- **Vitest**: Fast unit testing framework
- **Testing Library**: Component testing utilities
- **Nodemon**: Auto-restart for development
- **PostCSS**: CSS processing and optimization

## Project Structure

### 1. Frontend Structure

The frontend codebase is organized as follows:

```bash
src/
│
├── assets/           # Static resources like images, icons, fonts
├── components/       # Reusable UI components (buttons, cards, inputs)
│   ├── ui/
│   ├── layout/
│   └── features/
├── forms/            # Form management (React Hook Form with Zod validation)
├── pages/            # Views (Dashboard, Marketplace, etc.)
├── hooks/            # Custom hooks for API calls, state management
├── styles/           # TailwindCSS setup and custom styles
├── types/            # TypeScript interfaces
└── utils/            # Helper functions like date formatting, API utils
```

### 2. Backend Structure

The backend is organized as a modular Express.js application:

```bash
backend/
│
├── controllers/      # Request handlers for each module
│   ├── authController.js
│   ├── civilEngineeringController.js
│   ├── electricalSystemsController.js
│   ├── projectController.js
│   ├── weatherController.js
│   └── userController.js
│
├── services/         # Business logic layer
│   ├── civilEngineeringService.js
│   ├── electricalSystemsService.js
│   └── redisService.js
│
├── routes/           # API route definitions
│   ├── auth.js
│   ├── civilEngineering.js
│   ├── electricalSystems.js
│   ├── project.js
│   ├── weather.js
│   └── user.js
│
├── middleware/       # Custom middleware
│   └── auth.js       # JWT authentication middleware
│
├── prisma/           # Database schema and migrations
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
│
├── data/             # Static data and seed files
│   ├── specialists.js
│   ├── projects.js
│   ├── suppliers.js
│   └── categories.js
│
├── tests/            # Test files and utilities
├── utils/            # Helper functions
├── config/           # Configuration files
└── server.js         # Main application entry point
```

### 3. Database Schema Overview

The Prisma schema defines a comprehensive data model with **25+ entities**:

#### Core Entities
- **Users**: Multi-role system (Admin, Contractor, Consultant, Supplier, Client)
- **Projects**: Full project lifecycle management with status tracking
- **Calculations**: Engineering calculations with input/output data storage

#### Engineering Modules
- **Civil Engineering**: Structural calculations, compliance checking
- **Electrical Systems**: Voltage drop, cable sizing, transformer calculations
- **Weather Data**: Regional weather information for monsoon planning
- **Material Alerts**: Supply chain monitoring and price tracking

#### Supporting Features
- **Compliance Checks**: Malaysian standards validation
- **Notifications**: Real-time messaging system
- **Documents**: File upload and management
- **Suppliers**: Contractor network and marketplace
- **Standards**: Malaysian building code references

#### Security & Audit
- **Refresh Tokens**: Secure token rotation
- **Audit Trail**: Creation/update timestamps on all entities
- **Role-Based Access**: Granular permission system

## Installation

### 1. Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mc-hub.git
   cd mc-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   # Backend API URL
   REACT_APP_API_URL=http://localhost:5000/api

   # Application Environment
   NODE_ENV=development
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

#### Frontend Features Implemented

- **Authentication**: Login/Register forms with JWT integration
- **Dashboard**: Project overview with statistics and quick actions
- **Project Management**: Create, view, and manage construction projects
- **Protected Routes**: Role-based access control (Admin, User roles)
- **Responsive Design**: Mobile-first with TailwindCSS
- **Form Validation**: React Hook Form with Zod schemas
- **State Management**: React Query for server state, Context for auth
- **UI Components**: Radix UI primitives with custom styling
- **Error Handling**: Comprehensive error boundaries and loading states

#### Demo Accounts

Use these demo accounts to test the application:

- **Admin Account**: `admin@mchub.com` / `admin123`
- **User Account**: `user@mchub.com` / `user123`

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the backend directory with the following variables:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@hostname:5432/database_name"

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_REFRESH_SECRET="your-refresh-token-secret-here"

   # Redis Configuration (optional)
   REDIS_URL="redis://localhost:6379"

   # Server Configuration
   PORT=5000
   NODE_ENV="development"

   # Email Configuration (optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. Set up the database with Prisma:

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # (Optional) Seed the database with initial data
   npx prisma db seed
   ```

5. Start the backend server:

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

   The server will start on `http://localhost:5000` by default.

### 3. API Usage Examples

Once the backend is running, you can test the API endpoints using tools like curl, Postman, or the built-in test script.

#### Authentication Endpoints

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contractor@example.com",
    "name": "John Contractor",
    "password": "securepassword123",
    "role": "CONTRACTOR"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contractor@example.com",
    "password": "securepassword123"
  }'
```

**Refresh token:**
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your-refresh-token-here"
  }'
```

#### Project Management Endpoints

**Create a project (requires authentication):**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Kuala Lumpur Office Complex",
    "description": "Modern office building construction",
    "location": "Kuala Lumpur, Malaysia",
    "client": "ABC Corporation",
    "budget": 5000000,
    "startDate": "2024-01-15",
    "endDate": "2024-12-15"
  }'
```

**Get user projects:**
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Update a project:**
```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "status": "CONSTRUCTION",
    "budget": 5500000
  }'
```

#### Civil Engineering Endpoints

**Calculate structural capacity:**
```bash
curl -X POST http://localhost:5000/api/civil-engineering/calculate-capacity \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "concreteGrade": "C30",
    "steelGrade": "B500",
    "beamWidth": 300,
    "beamDepth": 600,
    "beamLength": 5000,
    "reinforcement": 4,
    "barDiameter": 20,
    "loadType": "dead",
    "loadValue": 25
  }'
```

**Check compliance:**
```bash
curl -X POST http://localhost:5000/api/civil-engineering/check-compliance \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "designType": "building",
    "location": "Kuala Lumpur",
    "standards": ["MS 1183:2015", "UBBL 1984"]
  }'
```

#### Electrical Systems Endpoints

**Calculate voltage drop:**
```bash
curl -X POST http://localhost:5000/api/electrical-systems/voltage-drop \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "voltage": 400,
    "current": 50,
    "cableSize": "10",
    "cableType": "copper",
    "length": 100
  }'
```

**Calculate cable sizing:**
```bash
curl -X POST http://localhost:5000/api/electrical-systems/cable-sizing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "voltage": 400,
    "current": 60,
    "length": 150,
    "voltageDropMax": 3
  }'
```

#### Weather Endpoints

**Get all weather data:**
```bash
curl -X GET http://localhost:5000/api/weather
```

**Get specific region weather:**
```bash
curl -X GET http://localhost:5000/api/weather/kuala-lumpur
```

**Get monsoon forecast:**
```bash
curl -X GET http://localhost:5000/api/weather/monsoon/forecast
```

#### Running API Tests

The project includes a comprehensive test script that tests all endpoints:

```bash
cd backend
node test-api-endpoints.js
```

This will test authentication, civil engineering, electrical systems, weather, and protected routes.

### 4. Database Setup (Neon)

1. Create a Neon account at [Neon](https://neon.tech/) and set up a PostgreSQL instance.
2. Get the connection string and update your `.env` file in the backend with `DATABASE_URL=<your-neon-db-connection-url>`.
3. Run database migrations:

   ```bash
   npm run migrate
   ```

## Deployment

### 1. Frontend Deployment (Vercel)

1. Push the frontend code to a GitHub repository.
2. Sign up for a Vercel account and link your GitHub repository.
3. Vercel will automatically deploy the frontend and provide a live URL.

### 2. Backend Deployment

1. Containerize the backend using Docker for consistent environments across all deployments.
2. Deploy using platforms like **Heroku**, **AWS**, or **DigitalOcean** based on your requirements.

## External API Integrations

The platform integrates with various third-party APIs for enhanced functionality:

* **Bid Generation API**: Custom bid generation based on Malaysian market data.
* **Weather API**: Integration for real-time weather data for scheduling.
* **Compliance Tracker API**: Fetches updates on building codes and regulations.
* **Firebase Cloud Messaging**: For real-time notifications about bid statuses, project updates, and compliance issues.

## Authentication & Authorization

MC-Hub uses **JWT** for secure user authentication, **OAuth2** for social login (e.g., Google and Facebook), and **RBAC** (Role-Based Access Control) to manage user roles:

* **Admin**: Full access to all features.
* **Contractor**: Access to bid generation, project management, etc.
* **Client**: Access to marketplace, bids, and project updates.

## Testing

The project is equipped with comprehensive testing strategies to ensure reliability:

* **Jest** for unit and integration tests.
* **React Testing Library** for testing React components.
* **Supertest** for API endpoint testing.
* **Cypress/Playwright** for end-to-end testing to simulate real user interaction.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## Core Features

### 🔐 Authentication & User Management
- **JWT Authentication**: Secure login with access and refresh tokens
- **Role-Based Access Control**: 5 user roles (Admin, Contractor, Consultant, Supplier, Client)
- **User Profiles**: Comprehensive user management with company details and licensing
- **Session Management**: Secure token rotation and revocation

### 🏗️ Project Management
- **Full Project Lifecycle**: Planning → Design → Construction → Completion
- **Budget Tracking**: Real-time budget monitoring and cost control
- **Timeline Management**: Project scheduling with start/end dates
- **Multi-Module Support**: Civil, Electrical, HVAC, Sewerage integration
- **Document Management**: File upload and organization per project

### 🏛️ Civil Engineering Module
- **Structural Calculations**: Beam, column, slab, and foundation capacity analysis
- **Malaysian Standards Compliance**: MS 1183:2015, UBBL 1984, MS 1553:2018
- **Material Properties**: Concrete, steel, and timber calculations
- **Load Analysis**: Dead load, live load, wind load calculations
- **Design Reports**: Comprehensive structural design documentation

### ⚡ Electrical Systems Module
- **Voltage Drop Calculations**: Cable voltage drop analysis
- **Cable Sizing**: Automatic cable size recommendations
- **Transformer Sizing**: Load-based transformer calculations
- **Compliance Checking**: Electrical safety standards validation
- **Power Grid Simulation**: Electrical network analysis

### 🌦️ Weather Integration
- **Regional Weather Data**: Malaysian states and cities coverage
- **Monsoon Risk Assessment**: Construction scheduling optimization
- **7-Day Forecasts**: Weather impact analysis for project planning
- **Historical Data**: Weather pattern analysis for risk evaluation

### 📊 Compliance & Standards
- **Malaysian Building Codes**: Comprehensive standards database
- **Automated Compliance Checks**: Real-time regulation validation
- **Audit Trail**: Compliance history and documentation
- **Standards Updates**: Latest regulation tracking

### 🔔 Notification System
- **Real-time Notifications**: Project updates and alerts
- **Messaging System**: Internal communication between users
- **Alert Management**: Customizable notification preferences
- **Email Integration**: SMTP-based notification delivery

### 🏪 Marketplace & Suppliers
- **Supplier Network**: Contractor and supplier marketplace
- **Service Listings**: Service offerings and pricing
- **Rating System**: Supplier reputation and reviews
- **Material Alerts**: Price monitoring and shortage notifications

### 📱 Progressive Web App
- **Offline Functionality**: Core features work without internet
- **Fast Loading**: Optimized performance with service workers
- **Mobile Responsive**: Full mobile and tablet support
- **Installable**: Can be installed as a native app

## API Endpoints Overview

The platform provides **25+ RESTful API endpoints** across multiple modules:

### Authentication (5 endpoints)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Token refresh
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Project Management (6 endpoints)
- `POST /api/projects` - Create project
- `GET /api/projects` - List user projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats/summary` - Project statistics

### Civil Engineering (4 endpoints)
- `POST /api/civil-engineering/calculate-capacity` - Structural calculations
- `GET /api/civil-engineering/standards` - Get Malaysian standards
- `POST /api/civil-engineering/check-compliance` - Compliance verification
- `POST /api/civil-engineering/generate-report` - Design reports

### Electrical Systems (4 endpoints)
- `POST /api/electrical-systems/voltage-drop` - Voltage drop analysis
- `POST /api/electrical-systems/cable-sizing` - Cable size calculations
- `POST /api/electrical-systems/transformer-sizing` - Transformer calculations
- `POST /api/electrical-systems/check-compliance` - Electrical compliance

### Weather (3 endpoints)
- `GET /api/weather` - All weather data
- `GET /api/weather/:region` - Regional weather
- `GET /api/weather/monsoon/forecast` - Monsoon forecasts

## Testing & Quality Assurance

### Comprehensive Test Suite
- **API Endpoint Testing**: All 25+ endpoints tested with various scenarios
- **Authentication Testing**: JWT validation, refresh token rotation
- **Database Testing**: Prisma operations and data integrity
- **Error Handling**: Edge cases and error response validation
- **Performance Testing**: Response times and load handling

### Test Coverage
- ✅ Authentication flow (registration, login, token refresh)
- ✅ Project CRUD operations
- ✅ Civil engineering calculations and compliance
- ✅ Electrical systems calculations
- ✅ Weather data retrieval and processing
- ✅ Protected route access control
- ✅ Error handling and validation

## Development Roadmap

### ✅ Completed (Backend)
- **Core Infrastructure**: Express.js server with modular architecture
- **Database Layer**: Prisma ORM with comprehensive schema (25+ models)
- **Authentication System**: JWT + Refresh tokens with role-based access
- **API Layer**: 25+ RESTful endpoints across 5 modules
- **Engineering Modules**: Civil engineering and electrical systems calculations
- **Weather Integration**: Regional weather data and monsoon planning
- **Testing Suite**: Comprehensive API endpoint testing
- **Security**: Password hashing, input validation, CORS, rate limiting

### 🔄 In Progress (Frontend)
- **React Application**: Modern React 19 with Vite build system
- **UI Components**: Radix UI components with TailwindCSS styling
- **Routing**: React Router 7 with protected routes
- **State Management**: React Query for server state, Context for auth
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **PWA Features**: Service workers and offline functionality

### 📋 Next Steps (Frontend Integration)
- **Dashboard Development**: User dashboard with project overview
- **Module Components**: Civil and electrical engineering calculation forms
- **Weather Components**: Monsoon risk planner and weather displays
- **Project Management UI**: CRUD operations for projects
- **Authentication UI**: Login/register forms with validation
- **Responsive Design**: Mobile-first approach with tablet/desktop optimization
- **Real-time Features**: WebSocket integration for notifications

### 🚀 Future Enhancements
- **File Upload System**: Document management with cloud storage
- **Real-time Collaboration**: Multi-user project editing
- **Advanced Analytics**: Project performance metrics and reporting
- **Mobile App**: React Native companion application
- **AI Integration**: ML-powered design optimization
- **Third-party APIs**: Integration with construction software
- **Multi-language Support**: Localization for Malaysian market

## Quick Start Commands

```bash
# Install all dependencies
npm install
cd backend && npm install

# Set up database
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Start development servers
npm run dev          # Frontend (port 5173)
cd backend && npm run dev  # Backend (port 5000)

# Run tests
cd backend && node test-api-endpoints.js
```

## Contributing

We welcome contributions to MC-Hub! If you'd like to help improve the platform, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Submit a pull request.

Please make sure that your code adheres to the existing code style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

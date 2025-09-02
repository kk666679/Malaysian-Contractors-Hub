# MC-Hub: Malaysian Contractors Hub

MC-Hub is a comprehensive web platform designed specifically for Malaysian contractors, providing integrated tools for managing construction projects across multiple engineering disciplines. The platform combines modern web technologies with industry-specific calculations, compliance checking, and project management features tailored to Malaysian building standards and regulations.

## 🚀 Current Status

**Version:** 0.2.1  
**Backend:** ✅ Fully Implemented + GCMS Extension  
**Frontend:** ✅ 100% Complete - All Modules + GCMS Components  
**Database:** ✅ Prisma + PostgreSQL (25+ Models + GCMS Schema)  
**Authentication:** ✅ JWT + Refresh Tokens + Role-Based Access  
**Testing:** ✅ Comprehensive API Tests + Build Optimization  
**Documentation:** ✅ Organized in `/docs` folder  
**GCMS:** ✅ General Contracting Management System Integrated

### Implementation Status
- ✅ **Core Platform**: Authentication, Dashboard, Project Management
- ✅ **Engineering Modules**: Civil, Electrical, HVAC, Sewerage, ELV systems
- ✅ **GCMS Integration**: General Contracting Management System
  - ✅ Project Management (46 API endpoints)
  - ✅ Contract & Document Management
  - ✅ Financial & Invoicing System
  - ✅ Compliance & Safety Management
  - ✅ Subcontractor & Vendor Management
  - ✅ Bidding & Estimation Engine
- ✅ **Advanced Features**: Real-time notifications, PWA, marketplace
- ✅ **Modern Stack**: React 19, Vite 7, TailwindCSS 4, Node.js 20+
- ✅ **Build Optimization**: Vercel deployment with dependency fixes

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:

- **[GCMS Implementation Guide](docs/GCMS_IMPLEMENTATION_GUIDE.md)** - Complete GCMS system documentation
- **[Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)** - Project completion overview
- **[Deployment Guide](docs/README-DEPLOYMENT.md)** - Production deployment instructions
- **[Frontend Completion](docs/FRONTEND_COMPLETION_SUMMARY.md)** - Frontend implementation details
- **[Dependency Analysis](docs/DEPENDENCY_ANALYSIS.md)** - Technology stack analysis

## Table of Contents

- [Project Overview](#project-overview)
- [GCMS System](#gcms-system)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Project Overview

MC-Hub is a comprehensive digital platform that streamlines construction project management and contractor operations across multiple engineering disciplines. The platform integrates the **General Contracting Management System (GCMS)** for enterprise-level project management.

### Core Capabilities
- **Multi-Discipline Engineering**: Civil, Electrical, HVAC, Sewerage, ELV systems
- **GCMS Integration**: Complete contracting lifecycle management
- **Malaysian Standards**: Compliance with local building codes and regulations
- **Real-time Collaboration**: Multi-user project coordination
- **Advanced Analytics**: Project performance and financial insights
- **Mobile-First Design**: Responsive across all devices

## Tech Stack

### Frontend (Latest Stack)
- **React 19**: Latest React with modern hooks and concurrent features
- **Vite 7**: Next-generation build tool with optimized production builds
- **TailwindCSS 4**: Modern utility-first CSS framework
- **React Router 7**: Advanced routing with data loading capabilities
- **React Hook Form + Zod**: Type-safe form handling and validation
- **Radix UI**: Accessible, unstyled UI component primitives
- **Framer Motion 12**: Advanced animations and micro-interactions
- **TanStack Query**: Powerful data fetching, caching, and synchronization
- **Recharts 3**: Modern charting library for data visualization
- **PWA Support**: Service workers for offline functionality

### Backend (Enterprise-Ready)
- **Node.js 20+**: Modern JavaScript runtime with ES modules
- **Express.js**: Fast, minimalist web framework with middleware
- **Prisma ORM**: Type-safe database access with migrations
- **PostgreSQL**: Production-ready relational database
- **Redis**: High-performance caching and session management
- **JWT + Refresh Tokens**: Secure authentication with token rotation
- **bcryptjs**: Industry-standard password hashing
- **Socket.io**: Real-time bidirectional communication
- **Comprehensive Middleware**: Security, validation, error handling

### Database Architecture
- **50+ Models**: Core platform + GCMS extension models
- **GCMS Schema**: Project management, contracts, financial, compliance
- **Role-Based Access Control**: 8 user roles with granular permissions
- **Multi-tenant Architecture**: Company-based data isolation
- **Audit Trail**: Complete change tracking and versioning
- **Performance Optimized**: Indexed queries and connection pooling

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

## Quick Start

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database (local or cloud)
- Git for version control

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/kk666679/Malaysian-Contractors-Hub.git
cd Malaysian-Contractors-Hub

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Environment Setup

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
NODE_ENV=development
```

**Backend (.env)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mchub_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-token-secret"
REDIS_URL="redis://localhost:6379"
PORT=5000
```

### 3. Database Setup

```bash
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Start Development

```bash
# Terminal 1: Frontend (port 5173)
npm run dev

# Terminal 2: Backend (port 5000)
cd backend
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **GCMS Module**: http://localhost:5173/gcms

#### Demo Accounts

- **Admin**: `admin@mchub.com` / `admin123`
- **Contractor**: `contractor@mchub.com` / `contractor123`
- **Client**: `client@mchub.com` / `client123`

## Project Structure

```
Malaysian-Contractors-Hub/
├── docs/                          # 📚 Documentation
│   ├── GCMS_IMPLEMENTATION_GUIDE.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   └── README-DEPLOYMENT.md
├── backend/                       # 🔧 Backend API
│   ├── controllers/               # Request handlers
│   │   ├── gcms/                 # GCMS controllers
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── ...
│   ├── routes/                   # API routes
│   │   ├── gcms/                # GCMS routes
│   │   ├── auth.js
│   │   └── ...
│   ├── prisma/                  # Database
│   │   ├── schema.prisma        # Main schema
│   │   └── gcms-schema.prisma   # GCMS extension
│   ├── services/                # Business logic
│   ├── middleware/              # Auth, validation, security
│   └── tests/                   # API tests
├── src/                         # 🎨 Frontend
│   ├── components/              # React components
│   │   ├── gcms/               # GCMS components
│   │   ├── ui/                 # UI primitives
│   │   └── features/           # Feature components
│   ├── pages/                  # Route pages
│   │   ├── GCMSPage.jsx       # GCMS main page
│   │   └── ...
│   ├── modules/                # Engineering modules
│   │   ├── civil-engineering/
│   │   ├── electrical-systems/
│   │   └── ...
│   └── lib/                    # Utilities & services
└── public/                     # Static assets
```

## Features

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- Role-based access control (8 user roles)
- Password hashing with bcrypt
- Rate limiting and CORS protection
- Session management with Redis

### 🏗️ Core Engineering Modules

#### Civil Engineering
- Structural calculations (beams, columns, slabs)
- Malaysian standards compliance (MS 1183:2015, UBBL 1984)
- Load analysis and capacity calculations
- Material properties and design reports

#### Electrical Systems
- Voltage drop calculations
- Cable sizing and transformer calculations
- Power grid simulation
- Electrical safety compliance

#### HVAC Systems
- Load calculations and equipment sizing
- Energy efficiency analysis
- Ventilation design
- Climate control optimization

#### Sewerage & Drainage
- Pipe sizing and flow calculations
- Drainage system design
- Wastewater treatment planning
- Flood risk assessment

#### ELV Systems
- Low voltage system design
- Security and communication systems
- Fire alarm and detection systems
- Building automation integration

### 🏢 GCMS Enterprise Features
- **46 API Endpoints** across 6 modules
- **Project Lifecycle Management** from planning to completion
- **Financial Management** with invoicing and payment tracking
- **Contract Management** with document control
- **Compliance Monitoring** with safety checklists
- **Subcontractor Management** with performance tracking

### 🌦️ Weather Integration
- Regional weather data for Malaysian states
- Monsoon risk assessment for project planning
- 7-day forecasts for construction scheduling
- Historical weather pattern analysis

### 📱 Modern User Experience
- **Progressive Web App** with offline functionality
- **Real-time Notifications** via WebSocket
- **Responsive Design** optimized for mobile/tablet
- **Dark/Light Theme** with system preference detection
- **Advanced Charts** with Recharts for data visualization

## API Documentation

### Base URLs
- **Core API**: `http://localhost:5000/api`
- **GCMS API**: `http://localhost:5000/api/gcms`

### Authentication
All protected endpoints require JWT token:
```bash
Authorization: Bearer <jwt_token>
```

### Core API Endpoints (25+)

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Token refresh
- `GET /api/auth/profile` - User profile

#### Project Management
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Engineering Calculations
- `POST /api/civil-engineering/calculate-capacity`
- `POST /api/electrical-systems/voltage-drop`
- `POST /api/hvac/load-calculation`
- `POST /api/sewerage/pipe-sizing`

### GCMS API Endpoints (46+)

#### Project Management
- `GET /api/gcms/projects/dashboard` - Project dashboard
- `POST /api/gcms/projects` - Create GCMS project
- `GET /api/gcms/projects/:id/tasks` - Project tasks

#### Contract Management
- `POST /api/gcms/contracts` - Create contract
- `POST /api/gcms/contracts/documents` - Upload document
- `GET /api/gcms/contracts/:id/change-orders` - Change orders

#### Financial Management
- `POST /api/gcms/financial/invoices` - Create invoice
- `POST /api/gcms/financial/invoices/:id/payments` - Record payment
- `GET /api/gcms/financial/reports/cash-flow` - Cash flow report

#### Compliance & Safety
- `POST /api/gcms/compliance/checklists` - Create checklist
- `POST /api/gcms/compliance/incidents` - Report incident
- `GET /api/gcms/compliance/reports` - Compliance reports

### API Usage Examples

#### Authentication

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contractor@example.com",
    "name": "John Contractor",
    "password": "securepassword123",
    "role": "CONTRACTOR"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contractor@example.com",
    "password": "securepassword123"
  }'
```

#### GCMS Project Management

```bash
# Create GCMS project
curl -X POST http://localhost:5000/api/gcms/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "KL Office Complex",
    "code": "PROJ-001",
    "type": "COMMERCIAL",
    "budget": 5000000,
    "startDate": "2024-01-15",
    "endDate": "2024-12-15"
  }'

# Get project dashboard
curl -X GET http://localhost:5000/api/gcms/projects/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Engineering Calculations

```bash
# Civil engineering calculation
curl -X POST http://localhost:5000/api/civil-engineering/calculate-capacity \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "concreteGrade": "C30",
    "steelGrade": "B500",
    "beamWidth": 300,
    "beamDepth": 600,
    "loadValue": 25
  }'
```

#### GCMS Financial Management

```bash
# Create invoice
curl -X POST http://localhost:5000/api/gcms/financial/invoices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "STANDARD",
    "clientName": "ABC Corp",
    "dueDate": "2024-02-01",
    "invoiceItems": [{
      "description": "Construction services",
      "quantity": 1,
      "unitPrice": 50000
    }]
  }'
```

## Testing

### Comprehensive Test Suite
- **API Testing**: 25+ core endpoints + 46+ GCMS endpoints
- **Authentication Flow**: Registration, login, token refresh
- **Engineering Calculations**: All module calculations tested
- **GCMS Operations**: Project, contract, financial workflows
- **Error Handling**: Edge cases and validation testing

### Running Tests

```bash
# Backend API tests
cd backend
node test-api-endpoints.js

# Frontend component tests
npm test

# Specific module tests
npm test -- --grep "Civil Engineering"
```

### Test Coverage
- ✅ Authentication and authorization
- ✅ Project CRUD operations
- ✅ Engineering calculations (all modules)
- ✅ GCMS workflow testing
- ✅ Weather data integration
- ✅ Error handling and validation
- ✅ Performance and load testing

## Deployment

### Production Build

```bash
# Frontend build
npm run build

# Backend preparation
cd backend
npm ci --only=production
```

### Vercel Deployment (Frontend)

1. **Automatic Deployment**: Connected to GitHub for auto-deploy
2. **Build Optimization**: Uses `--legacy-peer-deps` for React 19 compatibility
3. **Environment Variables**: Configure in Vercel dashboard
4. **Custom Domain**: Support for custom domain configuration

### Backend Deployment Options

#### Docker Deployment
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Cloud Platforms
- **Railway**: Easy Node.js deployment
- **Heroku**: Traditional PaaS deployment
- **AWS/DigitalOcean**: VPS or container deployment
- **Vercel**: Full-stack deployment option

### Database Options
- **Neon**: Serverless PostgreSQL (recommended)
- **Supabase**: PostgreSQL with additional features
- **Railway**: Integrated PostgreSQL
- **AWS RDS**: Enterprise PostgreSQL

### Environment Configuration

#### Production Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Security
JWT_SECRET="production-jwt-secret"
JWT_REFRESH_SECRET="production-refresh-secret"

# Redis (optional)
REDIS_URL="redis://host:6379"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="app-password"
```

## Contributing

We welcome contributions to MC-Hub! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards
- **ESLint**: Follow existing linting rules
- **Prettier**: Use for code formatting
- **Testing**: Add tests for new features
- **Documentation**: Update docs for API changes

### Areas for Contribution
- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **New Features**: Enhance existing modules
- 📚 **Documentation**: Improve guides and examples
- 🧪 **Testing**: Increase test coverage
- 🎨 **UI/UX**: Improve user experience
- 🔧 **Performance**: Optimize code and queries

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 Latest Updates (v0.2.1)

- ✅ **GCMS Integration**: Complete General Contracting Management System
- ✅ **Build Optimization**: Fixed React 19 compatibility issues
- ✅ **Documentation**: Organized all docs in `/docs` folder
- ✅ **46 GCMS Endpoints**: Full enterprise contracting features
- ✅ **Modern Stack**: Updated to latest versions (React 19, Vite 7, TailwindCSS 4)
- ✅ **Production Ready**: Optimized for Vercel deployment

**Next Release (v0.3.0)**: Mobile app, advanced analytics, AI integration

---

*For detailed implementation guides, API documentation, and deployment instructions, see the `/docs` folder.*



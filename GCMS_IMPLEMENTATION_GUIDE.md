# General Contracting Management System (GCMS) - Implementation Guide

## 🏗️ System Overview

The General Contracting Management System (GCMS) is a comprehensive digital platform designed to streamline all aspects of construction contracting operations. It provides modular tools for project management, financial operations, compliance, and stakeholder collaboration.

## 📁 Project Structure

```
Malaysian-Contractors-Hub/
├── backend/
│   ├── controllers/gcms/          # GCMS-specific controllers
│   │   ├── projectManagementController.js
│   │   ├── contractManagementController.js
│   │   ├── biddingController.js
│   │   ├── financialController.js
│   │   ├── complianceController.js
│   │   └── subcontractorController.js
│   ├── routes/gcms/               # GCMS API routes
│   │   ├── index.js
│   │   ├── projectManagement.js
│   │   ├── contractManagement.js
│   │   ├── bidding.js
│   │   ├── financial.js
│   │   ├── compliance.js
│   │   └── subcontractor.js
│   └── prisma/
│       └── gcms-schema.prisma     # Extended database schema
├── src/
│   ├── components/gcms/           # GCMS frontend components
│   │   ├── GCMSDashboard.jsx
│   │   ├── project-management/
│   │   ├── contract-management/
│   │   ├── bidding/
│   │   ├── financial/
│   │   ├── compliance/
│   │   └── subcontractor/
│   └── pages/
│       └── GCMSPage.jsx           # Main GCMS page
└── GCMS_IMPLEMENTATION_GUIDE.md   # This file
```

## 🚀 Quick Start

### 1. Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Update Database Schema**
   ```bash
   # Copy the GCMS schema to main schema file
   cat prisma/gcms-schema.prisma >> prisma/schema.prisma
   
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name "add-gcms-models"
   ```

3. **Update Server Configuration**
   ```javascript
   // In backend/server.js, add GCMS routes
   const gcmsRoutes = require('./routes/gcms');
   app.use('/api/gcms', gcmsRoutes);
   ```

### 2. Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add GCMS Route**
   ```javascript
   // In src/App.jsx or routing configuration
   import GCMSPage from './pages/GCMSPage';
   
   // Add route
   <Route path="/gcms" element={<GCMSPage />} />
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📊 Module Implementation Status

### ✅ Completed Modules

#### 1. Project Management
- **Backend**: ✅ Complete
  - Project CRUD operations
  - Task management
  - Progress tracking
  - Dashboard analytics
- **Frontend**: ✅ Complete
  - Project listing with filters
  - Progress visualization
  - Task management interface
- **API Endpoints**: 4 endpoints implemented

#### 2. Contract & Document Management
- **Backend**: ✅ Complete
  - Contract lifecycle management
  - Document upload/download
  - Change order tracking
  - Template system
- **Frontend**: 🔄 In Progress
- **API Endpoints**: 8 endpoints implemented

#### 3. Bidding & Estimation
- **Backend**: ✅ Complete
  - Bid creation and management
  - Cost estimation calculator
  - Bid comparison analysis
  - Performance analytics
- **Frontend**: 🔄 In Progress
- **API Endpoints**: 7 endpoints implemented

#### 4. Financial & Invoicing
- **Backend**: ✅ Complete
  - Invoice generation
  - Payment tracking
  - Expense management
  - Financial reporting
  - Cash flow forecasting
- **Frontend**: 🔄 In Progress
- **API Endpoints**: 8 endpoints implemented

#### 5. Compliance & Safety
- **Backend**: ✅ Complete
  - Safety checklist management
  - Incident reporting
  - Compliance tracking
  - Regulatory standards
- **Frontend**: 🔄 In Progress
- **API Endpoints**: 10 endpoints implemented

#### 6. Subcontractor & Vendor Management
- **Backend**: ✅ Complete
  - Subcontractor onboarding
  - Performance evaluation
  - Vendor management
  - Analytics and reporting
- **Frontend**: 🔄 In Progress
- **API Endpoints**: 9 endpoints implemented

### 🔄 In Progress Modules

#### 7. Inventory & Materials Management
- **Backend**: 📋 Planned
- **Frontend**: 📋 Planned
- **Features**: Material tracking, purchase orders, stock alerts

#### 8. Workforce Management
- **Backend**: 📋 Planned
- **Frontend**: 📋 Planned
- **Features**: Employee management, timesheets, scheduling

#### 9. Analytics & Reporting
- **Backend**: 📋 Planned
- **Frontend**: 📋 Planned
- **Features**: Advanced analytics, custom reports, KPI dashboards

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api/gcms
```

### Authentication
All endpoints require JWT authentication via Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Project Management Endpoints

#### Create Project
```http
POST /projects
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project description",
  "code": "PROJ-001",
  "type": "COMMERCIAL",
  "budget": 1000000,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "address": "Project address",
  "city": "Kuala Lumpur",
  "state": "Selangor",
  "priority": "HIGH"
}
```

#### Get Projects
```http
GET /projects?status=CONSTRUCTION&type=COMMERCIAL&page=1&limit=10
```

#### Get Project Dashboard
```http
GET /projects/dashboard
```

### Contract Management Endpoints

#### Create Contract
```http
POST /contracts
Content-Type: application/json

{
  "title": "Construction Contract",
  "type": "MAIN_CONTRACT",
  "value": 1000000,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "clientName": "Client Name",
  "clientEmail": "client@example.com",
  "clientAddress": "Client address",
  "paymentTerms": "Net 30 days",
  "deliverables": "Project deliverables",
  "projectId": "project_id"
}
```

#### Upload Document
```http
POST /contracts/documents
Content-Type: multipart/form-data

{
  "name": "Document name",
  "type": "CONTRACT",
  "category": "Legal",
  "description": "Document description",
  "projectId": "project_id",
  "file": <file_upload>
}
```

### Financial Management Endpoints

#### Create Invoice
```http
POST /financial/invoices
Content-Type: application/json

{
  "type": "STANDARD",
  "clientName": "Client Name",
  "clientEmail": "client@example.com",
  "clientAddress": "Client address",
  "dueDate": "2024-02-01",
  "contractId": "contract_id",
  "invoiceItems": [
    {
      "description": "Service description",
      "quantity": 1,
      "unit": "item",
      "unitPrice": 1000
    }
  ],
  "taxAmount": 60
}
```

#### Record Payment
```http
POST /financial/invoices/:invoiceId/payments
Content-Type: application/json

{
  "amount": 1000,
  "method": "BANK_TRANSFER",
  "reference": "TXN123456",
  "notes": "Payment notes"
}
```

### Compliance & Safety Endpoints

#### Create Safety Checklist
```http
POST /compliance/checklists
Content-Type: application/json

{
  "name": "Site Safety Checklist",
  "description": "Daily safety inspection checklist",
  "category": "GENERAL_SAFETY",
  "projectId": "project_id",
  "items": [
    {
      "description": "Check PPE availability",
      "isRequired": true
    },
    {
      "description": "Inspect safety barriers",
      "isRequired": true
    }
  ]
}
```

#### Report Incident
```http
POST /compliance/incidents
Content-Type: application/json

{
  "title": "Minor Injury",
  "description": "Worker slipped on wet surface",
  "type": "INJURY",
  "severity": "LOW",
  "location": "Site A - Building 1",
  "dateOccurred": "2024-01-15T10:30:00Z",
  "injuredParty": "John Doe",
  "witnesses": ["Jane Smith", "Bob Johnson"],
  "immediateAction": "First aid provided, area cordoned off",
  "projectId": "project_id"
}
```

## 🔐 Role-Based Access Control

### User Roles

1. **SUPER_ADMIN**: Full system access
2. **COMPANY_ADMIN**: Company-wide management
3. **PROJECT_MANAGER**: Project-level control
4. **CONTRACTOR**: Field operations access
5. **SUBCONTRACTOR**: Limited project access
6. **CLIENT**: View-only with approval rights
7. **ACCOUNTANT**: Financial module access
8. **SAFETY_OFFICER**: Compliance module access

### Permission Matrix

| Module | Super Admin | Company Admin | Project Manager | Contractor | Client | Accountant | Safety Officer |
|--------|-------------|---------------|-----------------|------------|--------|------------|----------------|
| Projects | Full | Full | Assigned Projects | View/Update | View Only | View | View |
| Contracts | Full | Full | Create/Edit | View | View/Approve | View | View |
| Financial | Full | Full | View | Limited | View Own | Full | View |
| Compliance | Full | Full | Full | Report/View | View | View | Full |
| Subcontractors | Full | Full | Assign/Evaluate | View | View | View | View |

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/gcms_db"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

# File Upload
UPLOAD_PATH="./uploads"
MAX_FILE_SIZE=10485760  # 10MB

# Email (for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Database Configuration

The GCMS extends the existing database schema with 25+ new models:

- **Core Models**: Company, Project, Task, Milestone
- **Contract Models**: Contract, Document, ChangeOrder
- **Financial Models**: Invoice, Payment, Expense
- **Compliance Models**: SafetyChecklist, Incident, RiskAssessment
- **Vendor Models**: Subcontractor, Vendor, Material

## 📱 Frontend Components

### Component Structure

```
src/components/gcms/
├── GCMSDashboard.jsx              # Main dashboard
├── project-management/
│   ├── ProjectManagement.jsx      # Project listing
│   ├── ProjectForm.jsx            # Create/edit project
│   ├── TaskManagement.jsx         # Task management
│   └── GanttChart.jsx             # Project timeline
├── contract-management/
│   ├── ContractList.jsx           # Contract listing
│   ├── ContractForm.jsx           # Create/edit contract
│   └── DocumentManager.jsx       # Document management
├── financial/
│   ├── InvoiceManager.jsx         # Invoice management
│   ├── ExpenseTracker.jsx         # Expense tracking
│   └── FinancialDashboard.jsx     # Financial overview
└── compliance/
    ├── SafetyChecklists.jsx       # Safety management
    ├── IncidentReporting.jsx      # Incident reports
    └── ComplianceDashboard.jsx    # Compliance overview
```

### UI Components Used

- **Shadcn/ui**: Card, Button, Input, Select, Badge, Tabs
- **Lucide React**: Icons for all modules
- **React Hook Form**: Form management
- **React Query**: Data fetching and caching

## 🧪 Testing

### API Testing

```bash
# Run API tests
cd backend
npm test

# Test specific module
npm test -- --grep "Project Management"
```

### Frontend Testing

```bash
# Run component tests
npm test

# Run specific component test
npm test -- ProjectManagement.test.jsx
```

## 🚀 Deployment

### Production Build

```bash
# Build frontend
npm run build

# Build backend (if using TypeScript)
cd backend
npm run build
```

### Docker Deployment

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Environment Setup

1. **Development**: Local PostgreSQL + Redis
2. **Staging**: Docker containers + managed database
3. **Production**: Kubernetes + cloud database

## 📈 Performance Optimization

### Database Optimization

- Indexed frequently queried fields
- Connection pooling configured
- Query optimization for large datasets

### Frontend Optimization

- Code splitting by module
- Lazy loading for heavy components
- Image optimization for documents

### Caching Strategy

- Redis for session management
- API response caching
- Static asset caching

## 🔄 Integration Points

### External Systems

1. **ERP Integration**: SAP, Oracle, Microsoft Dynamics
2. **Accounting**: QuickBooks, Xero, Sage
3. **BIM Software**: Autodesk, Bentley Systems
4. **Payment Gateways**: Stripe, PayPal, local banks

### API Integration Examples

```javascript
// ERP Integration
const syncProjectToERP = async (projectData) => {
  const response = await fetch('/api/integrations/erp/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData)
  });
  return response.json();
};

// Accounting Integration
const syncInvoiceToAccounting = async (invoiceData) => {
  const response = await fetch('/api/integrations/accounting/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(invoiceData)
  });
  return response.json();
};
```

## 🎯 Next Steps

### Immediate (Next 2 weeks)
1. Complete frontend components for all modules
2. Implement remaining API endpoints
3. Add comprehensive error handling
4. Set up automated testing

### Short-term (Next month)
1. Implement inventory management module
2. Add workforce management features
3. Create advanced analytics dashboard
4. Mobile app development

### Long-term (Next quarter)
1. AI-powered insights and automation
2. Advanced reporting and business intelligence
3. Third-party integrations
4. Multi-language support

## 📞 Support

For implementation support or questions:

- **Documentation**: Check this guide and API documentation
- **Issues**: Create GitHub issues for bugs or feature requests
- **Community**: Join our Discord server for discussions

---

*This implementation guide provides a comprehensive overview of the GCMS system. For detailed API documentation, refer to the individual controller files and route definitions.*
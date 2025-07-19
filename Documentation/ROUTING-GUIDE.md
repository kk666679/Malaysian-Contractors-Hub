# Routing Guide for Malaysian MEP Contractors Hub

This document provides guidelines for managing routes in the Malaysian MEP Contractors Hub application.

## Routing Architecture

The application uses React Router v6 for routing. All routes are defined in a centralized configuration file to ensure consistency across the application.

### Key Components

1. **Route Configuration**: All routes are defined in `/src/lib/routeConfig.js`
2. **Route Validation**: Route validation utilities are available in `/src/lib/routeValidator.js`
3. **Route Checking Script**: A script to validate all routes is available at `/scripts/validate-routes.js`

## Route Definition Guidelines

### 1. Define All Routes in routeConfig.js

All routes should be defined as constants in the `routeConfig.js` file:

```javascript
export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  // ...other routes
};
```

### 2. Use Route Constants in Components

Always use the route constants from `routeConfig.js` when defining links or navigation:

```jsx
import { ROUTES } from '../lib/routeConfig';

// Good
<Link to={ROUTES.SERVICES}>Services</Link>

// Avoid
<Link to="/services">Services</Link>
```

### 3. Route Naming Conventions

- Use UPPERCASE_WITH_UNDERSCORES for route constant names
- Use kebab-case for URL paths (e.g., `/services/civil-engineering`)
- Group related routes together in the configuration file

## Route Structure

The application follows a hierarchical route structure:

1. **Main Routes**: Top-level routes like `/services`, `/features`, etc.
2. **Nested Routes**: Routes that are nested under a parent route, like `/services/civil-engineering`
3. **Dynamic Routes**: Routes with parameters, like `/dashboard/projects/:id`

## Adding New Routes

When adding a new route to the application:

1. Add the route constant to `routeConfig.js`
2. Add the route definition to the `<Routes>` component in `App.jsx`
3. Create the corresponding page component
4. Run the route validation script to ensure the route is properly configured

## Route Validation

To validate all routes in the application, run:

```bash
node scripts/validate-routes.js
```

This script will:
- Check all route references in the codebase
- Validate them against the defined routes in `routeConfig.js`
- Report any invalid routes
- Suggest corrections for invalid routes

## Common Routing Patterns

### Protected Routes

For routes that require authentication:

```jsx
<Route
  path={ROUTES.DASHBOARD}
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### Nested Routes

For routes that share a common layout:

```jsx
<Route path={ROUTES.SERVICES} element={<ServiceLayout />}>
  <Route index element={<ServicesPage />} />
  <Route path="civil-engineering" element={<CivilEngineeringPage />} />
  {/* Other service routes */}
</Route>
```

### Dynamic Routes

For routes with parameters:

```jsx
<Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetailsPage />} />
// where ROUTES.PROJECT_DETAILS = '/dashboard/projects/:id'
```

## Best Practices

1. **Consistency**: Always use the route constants from `routeConfig.js`
2. **Validation**: Run the route validation script before committing changes
3. **Documentation**: Update this guide when making significant changes to the routing structure
4. **Navigation Components**: Use the `<Button>` component with the `to` prop for navigation
5. **Error Handling**: Ensure the 404 route is properly configured to handle invalid routes
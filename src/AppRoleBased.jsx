import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import { Suspense, lazy, useState, useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/routes/ProtectedRoute'
import RoleBasedNavbar from './components/layout/RoleBasedNavbar'
import AdminLayout from './components/layout/AdminLayout'
import UserLayout from './components/layout/UserLayout'
import Footer from './components/layout/Footer'
import FloatingActionButton from './components/layout/FloatingActionButton'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'
import GlobalStyles from './styles/GlobalStyles'
import { darkTheme, lightTheme, fonts } from './styles/theme'
import ErrorBoundary from './components/features/ErrorBoundary'
import { queryClient } from './lib/queryClient'
import ProtectedModuleRoutes from './routes/ProtectedModuleRoutes'

// Lazy load components for better performance
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))
const CompliancePage = lazy(() => import('./pages/CompliancePage'))
const MarketplacePage = lazy(() => import('./pages/SpecialistMarketplace'))
const MonsoonRiskPlanner = lazy(() => import('./pages/MonsoonRiskPlanner'))
const ProjectBidEngine = lazy(() => import('./pages/ProjectBidEngine'))
const SiteManagement = lazy(() => import('./pages/SiteManagement'))
const MaterialAlerts = lazy(() => import('./pages/MaterialAlerts'))
const DashboardPage = lazy(() => import('./modules/Dashboard'))
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'))
const BuildingAutomation = lazy(() => import('./pages/BuildingAutomation.jsx'))
const PlaceholderPage = lazy(() => import('./components/features/PlaceholderPage'))
const Web3Dashboard = lazy(() => import('./components/features/Web3Dashboard'))
const Web3DemoPage = lazy(() => import('./pages/Web3DemoPage'))
const DatabaseTestPage = lazy(() => import('./pages/DatabaseTestPage'))

// Legal and Policy Pages
const APITerms = lazy(() => import('./pages/legal/APITerms'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'))
const CookiesPolicy = lazy(() => import('./pages/legal/CookiesPolicy'))
const ContentPolicy = lazy(() => import('./pages/resources/ContentPolicy'))
const CommunityGuidelines = lazy(() => import('./pages/community/CommunityGuidelines'))
const HelpCenterPolicy = lazy(() => import('./pages/support/HelpCenterPolicy'))

// Service pages
const CivilEngineeringPage = lazy(() => import('./pages/services/CivilEngineeringPage'))
const ElectricalSystemsPage = lazy(() => import('./pages/services/ElectricalSystemsPage'))
const SewerageDrainagePage = lazy(() => import('./pages/services/SewerageDrainagePage'))
const ELVSystemsPage = lazy(() => import('./pages/services/ELVSystemsPage'))
const ACMVSystemsPage = lazy(() => import('./pages/services/ACMVSystemsPage'))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>
)

// Public Layout component with AnimatePresence
const PublicLayout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <RoleBasedNavbar />
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />} key={location.pathname}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  )
}

// Router component with role-based routes
const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<PublicLayout />}>
      <Route index element={
        <ErrorBoundary>
          <LandingPage />
        </ErrorBoundary>
      } />
      <Route path="services" element={<ServicesPage />} />
      <Route path="services/civil-engineering" element={<CivilEngineeringPage />} />
      <Route path="services/electrical-systems" element={<ElectricalSystemsPage />} />
      <Route path="services/sewerage-drainage" element={<SewerageDrainagePage />} />
      <Route path="services/elv-systems" element={<ELVSystemsPage />} />
      <Route path="services/acmv-systems" element={<ACMVSystemsPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="compliance" element={<CompliancePage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="about" element={<PlaceholderPage title="About Page" />} />
      <Route path="contact" element={<PlaceholderPage title="Contact Page" />} />

      {/* Legal and Policy Routes */}
      <Route path="legal/api-terms" element={<APITerms />} />
      <Route path="legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="legal/terms-of-service" element={<TermsOfService />} />
      <Route path="legal/cookies-policy" element={<CookiesPolicy />} />
      <Route path="resources/content-policy" element={<ContentPolicy />} />
      <Route path="community/guidelines" element={<CommunityGuidelines />} />
      <Route path="support/help-center-policy" element={<HelpCenterPolicy />} />
    </Route>

    {/* Authentication Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* Protected User Routes */}
    <Route path="/dashboard" element={
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <UserLayout />
      </ProtectedRoute>
    }>
      <Route index element={<Web3Dashboard />} />
      <Route path=":section" element={<DashboardPage />} />
      <Route path="projects/:id" element={<ProjectDetailsPage />} />
    </Route>

    {/* Protected Feature Routes */}
    <Route path="/" element={
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <UserLayout />
      </ProtectedRoute>
    }>
      <Route path="bid-engine" element={<ProjectBidEngine />} />
      <Route path="site-management" element={<SiteManagement />} />
      <Route path="material-alerts" element={
        <ErrorBoundary>
          <MaterialAlerts />
        </ErrorBoundary>
      } />
      <Route path="monsoon-planner" element={<MonsoonRiskPlanner />} />
      <Route path="building-automation" element={<BuildingAutomation />} />
      <Route path="web3-demo" element={<Web3DemoPage />} />
      <Route path="database-test" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DatabaseTestPage />
        </ProtectedRoute>
      } />
    </Route>

    {/* Protected Admin Routes */}
    <Route path="/admin" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    }>
      <Route index element={<PlaceholderPage title="Admin Dashboard" />} />
      <Route path="users" element={<PlaceholderPage title="User Management" />} />
      <Route path="logs" element={<PlaceholderPage title="System Logs" />} />
      <Route path="settings" element={<PlaceholderPage title="Admin Settings" />} />
    </Route>

    {/* Protected Module Routes */}
    <Route path="/*" element={
      <ProtectedRoute allowedRoles={['user', 'admin']}>
        <UserLayout />
      </ProtectedRoute>
    }>
      <Route path="electrical-systems/*" element={<ProtectedModuleRoutes />} />
      <Route path="acmv-hvac/*" element={<ProtectedModuleRoutes />} />
      <Route path="sewerage-drainage/*" element={<ProtectedModuleRoutes />} />
    </Route>

    {/* Development Routes */}
    {process.env.NODE_ENV === 'development' && (
      <Route path="/dev/routes" element={<PlaceholderPage title="Dev Routes" />} />
    )}

    {/* 404 Route */}
    <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
  </Routes>
)

function AppRoleBased() {
  const [theme, setTheme] = useState('dark')

  // Check user's preferred theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      <ThemeProvider theme={{ ...(theme === 'dark' ? darkTheme : lightTheme), fonts, toggleTheme }}>
        <GlobalStyles />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppRoleBased

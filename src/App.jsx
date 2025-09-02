import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Suspense, lazy, useState, useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingActionButton from './components/layout/FloatingActionButton'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProjectsPage from './pages/ProjectsPage'
import Dashboard from './pages/Dashboard'
import GlobalStyles from './styles/GlobalStyles'
import { darkTheme, lightTheme, fonts } from './styles/theme'
import ErrorBoundary from './components/features/ErrorBoundary'
import { queryClient } from './lib/queryClient'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { ThemeProvider as CustomThemeProvider } from './hooks/useTheme'
import pwaService from './lib/pwaService'
import NotificationContainer from './components/ui/notification'
import PWAInstaller from './components/pwa/PWAInstaller'
import { ThemeProvider } from './components/ui/theme-provider'

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
import BuildingAutomation from './pages/BuildingAutomation.jsx'
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

const ContactPage = lazy(() => import('./pages/ContactPage'))

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

// Layout component with AnimatePresence
const Layout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Added pt-16 for navbar spacing */}
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

// Router component with Layout
import DevRoutesUtility from './components/dev/DevRoutesUtility'

import ModuleRoutes from './routes/ModuleRoutes'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={
        <ErrorBoundary>
          <LandingPage />
        </ErrorBoundary>
      } />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="services/civil-engineering" element={<CivilEngineeringPage />} />
      <Route path="services/electrical-systems" element={<ElectricalSystemsPage />} />
      <Route path="services/sewerage-drainage" element={<SewerageDrainagePage />} />
      <Route path="services/elv-systems" element={<ELVSystemsPage />} />
      <Route path="services/acmv-systems" element={<ACMVSystemsPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="compliance" element={<CompliancePage />} />
      <Route path="projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="monsoon-planner" element={<MonsoonRiskPlanner />} />
      <Route path="about" element={<PlaceholderPage title="About Page" />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="dashboard" element={<Web3Dashboard />} />
      <Route path="dashboard/:section" element={<DashboardPage />} />
      <Route path="dashboard/projects/:id" element={<ProjectDetailsPage />} />
      <Route path="bid-engine" element={<ProjectBidEngine />} />
      <Route path="site-management" element={<SiteManagement />} />
      <Route path="material-alerts" element={
        <ErrorBoundary>
          <MaterialAlerts />
        </ErrorBoundary>
      } />
      <Route path="building-automation" element={<BuildingAutomation />} />
      <Route path="web3-demo" element={<Web3DemoPage />} />
      <Route path="database-test" element={<DatabaseTestPage />} />
      {/* Legal and Policy Routes */}
      <Route path="legal/api-terms" element={<APITerms />} />
      <Route path="legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="legal/terms-of-service" element={<TermsOfService />} />
      <Route path="legal/cookies-policy" element={<CookiesPolicy />} />
      <Route path="resources/content-policy" element={<ContentPolicy />} />
      <Route path="community/guidelines" element={<CommunityGuidelines />} />
      <Route path="support/help-center-policy" element={<HelpCenterPolicy />} />
      {process.env.NODE_ENV === 'development' && (
        <Route path="dev/routes" element={<DevRoutesUtility />} />
      )}

      {/* Module Routes */}
      <Route path="electrical-systems/*" element={<ModuleRoutes />} />
      <Route path="acmv-hvac/*" element={<ModuleRoutes />} />
      <Route path="sewerage-drainage/*" element={<ModuleRoutes />} />

      <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
    </Route>
  </Routes>
)

function App() {
  const [theme, setTheme] = useState('dark')
  const [pwaUpdateAvailable, setPwaUpdateAvailable] = useState(false)

  // Check user's preferred theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  // Initialize PWA service
  useEffect(() => {
    // Register service worker
    pwaService.register()

    // Listen for PWA update available
    const handlePWAUpdate = () => {
      setPwaUpdateAvailable(true)
    }

    window.addEventListener('pwa-update-available', handlePWAUpdate)

    return () => {
      window.removeEventListener('pwa-update-available', handlePWAUpdate)
    }
  }, [])

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Handle PWA update
  const handlePWAUpdate = async () => {
    await pwaService.skipWaiting()
    window.location.reload()
  }

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      <ThemeProvider>
        <CustomThemeProvider>
          <StyledThemeProvider theme={{ ...(theme === 'dark' ? darkTheme : lightTheme), fonts, toggleTheme }}>
          <GlobalStyles />
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
              <NotificationContainer />
              <PWAInstaller />
              {/* PWA Update Notification */}
              {pwaUpdateAvailable && (
                <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
                  <p className="mb-2">App update available!</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePWAUpdate}
                      className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setPwaUpdateAvailable(false)}
                      className="bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Later
                    </button>
                  </div>
                </div>
              )}
            </BrowserRouter>
          </AuthProvider>
        </StyledThemeProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  )
}

export default App

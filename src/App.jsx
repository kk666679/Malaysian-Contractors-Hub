import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import { Suspense, lazy, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActionButton from './components/FloatingActionButton'
import HomePage from './pages/HomePage'
import GlobalStyles from './styles/GlobalStyles'
import { darkTheme, lightTheme, fonts } from './styles/theme'

// Lazy load components for better performance
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'))
const CompliancePage = lazy(() => import('./pages/CompliancePage'))
const MarketplacePage = lazy(() => import('./pages/SpecialistMarketplace'))
const MonsoonRiskPlanner = lazy(() => import('./pages/MonsoonRiskPlanner'))
const ProjectBidEngine = lazy(() => import('./pages/ProjectBidEngine'))
const SiteManagement = lazy(() => import('./pages/SiteManagement'))
const MaterialAlerts = lazy(() => import('./pages/MaterialAlerts'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'))
const PlaceholderPage = lazy(() => import('./components/PlaceholderPage'))
const Web3Dashboard = lazy(() => import('./components/Web3Dashboard'))
const Web3DemoPage = lazy(() => import('./pages/Web3DemoPage'))

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
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="services/civil-engineering" element={<CivilEngineeringPage />} />
      <Route path="services/electrical-systems" element={<ElectricalSystemsPage />} />
      <Route path="services/sewerage-drainage" element={<SewerageDrainagePage />} />
      <Route path="services/elv-systems" element={<ELVSystemsPage />} />
      <Route path="services/acmv-systems" element={<ACMVSystemsPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="compliance" element={<CompliancePage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
      <Route path="monsoon-planner" element={<MonsoonRiskPlanner />} />
      <Route path="about" element={<PlaceholderPage title="About Page" />} />
      <Route path="contact" element={<PlaceholderPage title="Contact Page" />} />
      <Route path="dashboard" element={<Web3Dashboard />} />
      <Route path="dashboard/:section" element={<DashboardPage />} />
      <Route path="dashboard/projects/:id" element={<ProjectDetailsPage />} />
      <Route path="bid-engine" element={<ProjectBidEngine />} />
      <Route path="site-management" element={<SiteManagement />} />
      <Route path="material-alerts" element={<MaterialAlerts />} />
      <Route path="building-automation" element={<PlaceholderPage title="Building Automation" />} />
      <Route path="web3-demo" element={<Web3DemoPage />} />
      <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
    </Route>
  </Routes>
)

function App() {
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
    <ThemeProvider theme={{ ...(theme === 'dark' ? darkTheme : lightTheme), fonts, toggleTheme }}>
      <GlobalStyles />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
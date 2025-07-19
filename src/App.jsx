import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingActionButton from './components/FloatingActionButton'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import FeaturesPage from './pages/FeaturesPage'
import CompliancePage from './pages/CompliancePage'
import MarketplacePage from './pages/MarketplacePage'
import MonsoonRiskPlanner from './pages/MonsoonRiskPlanner'
import DashboardPage from './pages/DashboardPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import PlaceholderPage from './components/PlaceholderPage'
import Web3Dashboard from './components/Web3Dashboard'
import Web3DemoPage from './pages/Web3DemoPage'
import GlobalStyles from './styles/GlobalStyles'
import { darkTheme, fonts } from './styles/theme'

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/compliance" element={<CompliancePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/monsoon-planner" element={<MonsoonRiskPlanner />} />
        {/* Placeholder routes for other pages */}
        <Route path="/about" element={<PlaceholderPage title="About Page" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Page" />} />
        <Route path="/dashboard" element={<Web3Dashboard />} />
        <Route path="/dashboard/:section" element={<DashboardPage />} />
        <Route path="/dashboard/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/bid-engine" element={<PlaceholderPage title="Bid Engine" />} />
        <Route path="/site-management" element={<PlaceholderPage title="Site Management" />} />
        <Route path="/material-alerts" element={<PlaceholderPage title="Material Alerts" />} />
        <Route path="/building-automation" element={<PlaceholderPage title="Building Automation" />} />
        <Route path="/web3-demo" element={<Web3DemoPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider theme={{ ...darkTheme, fonts }}>
      <GlobalStyles />
      <Router>
        <div className="min-h-screen">
          <Header />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <FloatingActionButton />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
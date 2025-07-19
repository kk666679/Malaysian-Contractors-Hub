import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import FloatingActionButton from './components/FloatingActionButton.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import CompliancePage from './pages/CompliancePage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'
import MonsoonRiskPlanner from './pages/MonsoonRiskPlanner.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProjectDetailsPage from './pages/ProjectDetailsPage.jsx'
import PlaceholderPage from './components/PlaceholderPage.jsx'

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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/:section" element={<DashboardPage />} />
        <Route path="/dashboard/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/bid-engine" element={<PlaceholderPage title="Bid Engine" />} />
        <Route path="/site-management" element={<PlaceholderPage title="Site Management" />} />
        <Route path="/material-alerts" element={<PlaceholderPage title="Material Alerts" />} />
        <Route path="/building-automation" element={<PlaceholderPage title="Building Automation" />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingActionButton />
      </div>
    </Router>
  )
}

export default App
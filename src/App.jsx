import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import CompliancePage from './pages/CompliancePage.jsx'
import MarketplacePage from './pages/MarketplacePage.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            {/* Placeholder routes for other pages */}
            <Route path="/about" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">About Page Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Contact Page Coming Soon</h1></div>} />
            <Route path="/dashboard" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Dashboard Coming Soon</h1></div>} />
            <Route path="/bid-engine" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Bid Engine Page Coming Soon</h1></div>} />
            <Route path="/site-management" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Site Management Page Coming Soon</h1></div>} />
            <Route path="/material-alerts" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Material Alerts Page Coming Soon</h1></div>} />
            <Route path="/monsoon-planner" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Monsoon Planner Page Coming Soon</h1></div>} />
            <Route path="/building-automation" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Building Automation Page Coming Soon</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
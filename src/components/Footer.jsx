import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Malaysian Contractors Hub</span>
            </div>
            <p className="text-gray-300 text-sm">
              Malaysia's premier platform for Civil & MEP contractors, providing comprehensive 
              solutions for regulatory compliance and project management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/civil" className="text-gray-300 hover:text-white transition-colors">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-gray-300 hover:text-white transition-colors">
                  Electrical Systems
                </Link>
              </li>
              <li>
                <Link to="/services/sewerage" className="text-gray-300 hover:text-white transition-colors">
                  Sewerage & Drainage
                </Link>
              </li>
              <li>
                <Link to="/services/elv" className="text-gray-300 hover:text-white transition-colors">
                  ELV Systems
                </Link>
              </li>
              <li>
                <Link to="/services/acmv" className="text-gray-300 hover:text-white transition-colors">
                  ACMV Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bid-engine" className="text-gray-300 hover:text-white transition-colors">
                  Project Bid Engine
                </Link>
              </li>
              <li>
                <Link to="/site-management" className="text-gray-300 hover:text-white transition-colors">
                  Site Management
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                  Specialist Marketplace
                </Link>
              </li>
              <li>
                <Link to="/material-alerts" className="text-gray-300 hover:text-white transition-colors">
                  Material Alerts
                </Link>
              </li>
              <li>
                <Link to="/monsoon-planner" className="text-gray-300 hover:text-white transition-colors">
                  Monsoon Risk Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">
                  Kuala Lumpur, Malaysia
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">
                  +60 3-1234 5678
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">
                  info@malaysiancontractors.my
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/contact">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2025 Malaysian Contractors Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/compliance" className="text-sm text-gray-400 hover:text-white transition-colors">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
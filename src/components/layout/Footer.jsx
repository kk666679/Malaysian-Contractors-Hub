import React from 'react';
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import logoMep from '../../assets/images/mchub-logo.svg'
import { ROUTES } from '../../lib/routeConfig'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logoMep} alt="MCHub Logo" className="h-10 w-10" />
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
                <Link to={ROUTES.CIVIL_ENGINEERING} className="text-gray-300 hover:text-white transition-colors">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ELECTRICAL_SYSTEMS} className="text-gray-300 hover:text-white transition-colors">
                  Electrical Systems
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SEWERAGE_DRAINAGE} className="text-gray-300 hover:text-white transition-colors">
                  Sewerage & Drainage
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ELV_SYSTEMS} className="text-gray-300 hover:text-white transition-colors">
                  ELV Systems
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ACMV_SYSTEMS} className="text-gray-300 hover:text-white transition-colors">
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
                <Link to={ROUTES.BID_ENGINE} className="text-gray-300 hover:text-white transition-colors">
                  Project Bid Engine
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SITE_MANAGEMENT} className="text-gray-300 hover:text-white transition-colors">
                  Site Management
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MARKETPLACE} className="text-gray-300 hover:text-white transition-colors">
                  Specialist Marketplace
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MATERIAL_ALERTS} className="text-gray-300 hover:text-white transition-colors">
                  Material Alerts
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MONSOON_PLANNER} className="text-gray-300 hover:text-white transition-colors">
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
                  +60 176 348 006
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">
                  info@matmotofix.pro
                </span>
              </div>
            </div>
            <div className="pt-2">
              <Link to={ROUTES.CONTACT}>
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
              <Link to={ROUTES.PRIVACY} className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to={ROUTES.TERMS} className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to={ROUTES.COMPLIANCE} className="text-sm text-gray-400 hover:text-white transition-colors">
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
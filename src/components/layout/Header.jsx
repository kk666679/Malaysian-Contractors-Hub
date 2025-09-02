import React from 'react';
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../ui/button.jsx'
import { Badge } from '../ui/badge.jsx'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '../ui/theme-toggle.jsx'
import NotificationSystem from './NotificationSystem.jsx'
import SearchDialog from '../forms/SearchDialog.jsx'
import logoMep from '../assets/images/logo-mep.svg'
import { HEADER_NAVIGATION, ROUTES } from '../lib/routeConfig'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Using centralized navigation configuration
  const navigation = HEADER_NAVIGATION

  const isActive = (href) => location.pathname === href

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button to="/" variant="ghost" className="flex items-center space-x-2 p-0 h-auto hover:bg-transparent">
              <img src={logoMep} alt="MEP Logo" className="h-10 w-10" />
              <span className="text-xl font-bold text-foreground">
                Malaysian Contractors Hub
              </span>
            </Button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Button
                key={item.name}
                to={item.href}
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {item.name === 'Services' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    7
                  </Badge>
                )}
                {item.name === 'Features' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    6
                  </Badge>
                )}
                {item.name === 'Compliance' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    4
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="mr-2">
              <SearchDialog />
            </div>
            <NotificationSystem />
            <ThemeToggle />
            <Button 
              to={ROUTES.CONTACT} 
              variant="outline" 
              size="sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </Button>
            <Button 
              to={ROUTES.DASHBOARD} 
              size="sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-accent"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  to={item.href}
                  variant="ghost"
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </Button>
              ))}
              <div className="pt-4 pb-2 space-y-2">
                <Button 
                  to={ROUTES.CONTACT} 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact
                </Button>
                <Button 
                  to={ROUTES.DASHBOARD} 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
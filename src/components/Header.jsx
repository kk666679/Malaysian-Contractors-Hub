import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button.jsx'
import { Badge } from './ui/badge.jsx'
import { Building2, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Features', href: '/features' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'About', href: '/about' }
  ]

  const isActive = (href) => location.pathname === href

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Malaysian Contractors Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:text-primary hover:bg-accent'
                }`}
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
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/contact">
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:text-primary hover:bg-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2 space-y-2">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact
                  </Button>
                </Link>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button.jsx';
import { ThemeToggle } from '../ui/theme-toggle.jsx';
import { DropdownMenu, DropdownItem, DropdownSeparator } from '../ui/dropdown-menu.jsx';
import NotificationSystem from './NotificationSystem.jsx';
import SearchDialog from '../forms/SearchDialog.jsx';
import mchubLogo from '../../assets/images/mchub-logo.svg';
import {
  Menu, X, ChevronDown, Home, Briefcase,
  Shield, Users, BarChart2, Cloud, Wrench, Settings, LogOut, User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getNavigationForRole } from '../../lib/routeMeta';
import { ROUTES } from '../../lib/routeConfig';

const RoleBasedNavbar = () => {
  const { user, role, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);

    // Add body scroll lock when mobile menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [location.pathname, isMenuOpen]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  // Get role-based navigation
  const roleBasedNav = getNavigationForRole(role, isAuthenticated);

  // Main navigation items (public)
  const publicNavigation = [
    {
      name: 'Home',
      href: '/',
      icon: <Home size={18} />
    },
    {
      name: 'Services',
      href: '/services',
      icon: <Briefcase size={18} />,
      dropdown: [
        { name: 'Civil Engineering', href: '/services/civil-engineering' },
        { name: 'Electrical Systems', href: '/services/electrical-systems' },
        { name: 'Sewerage & Drainage', href: '/services/sewerage-drainage' },
        { name: 'ELV Systems', href: '/services/elv-systems' },
        { name: 'ACMV Systems', href: '/services/acmv-systems' }
      ]
    },
    {
      name: 'Features',
      href: '/features',
      icon: <Wrench size={18} />,
      dropdown: [
        { name: 'Compliance Tracker', href: '/compliance' },
        { name: 'Specialist Marketplace', href: '/marketplace' }
      ]
    }
  ];

  // Combine public and role-based navigation
  const navigation = isAuthenticated ? [...publicNavigation, ...roleBasedNav.map(item => ({
    name: item.name,
    href: item.href,
    icon: getIconForRoute(item.icon)
  }))] : publicNavigation;

  function getIconForRoute(iconName) {
    const iconMap = {
      BarChart2: <BarChart2 size={18} />,
      Building2: <Briefcase size={18} />,
      MapPin: <Wrench size={18} />,
      AlertTriangle: <Cloud size={18} />,
      CloudRain: <Cloud size={18} />,
      Settings: <Settings size={18} />,
      Shield: <Shield size={18} />,
      Users: <Users size={18} />,
      FileText: <Wrench size={18} />
    };
    return iconMap[iconName] || <Wrench size={18} />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.img
              src={mchubLogo}
              alt="MCHub Logo"
              className="h-9 w-9"
              whileHover={{ rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.span
              className="text-lg font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent hidden sm:block"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Malaysian Contractors Hub
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div>
                    <Button
                      variant="ghost"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary'
                      }`}
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-1">{item.name}</span>
                        <ChevronDown size={16} className="ml-1" />
                      </span>
                    </Button>

                    <AnimatePresence mode="sync" initial={false}>
                      {(activeDropdown === item.name || (!activeDropdown && isActive(item.href))) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden z-20 pointer-events-auto"
                        >
                          <div className="py-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className={`block px-4 py-2 text-sm ${
                                  location.pathname === subItem.href
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-foreground hover:bg-accent hover:text-primary'
                                }`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Button
                    to={item.href}
                    variant="ghost"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-1">{item.name}</span>
                    </span>
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <SearchDialog />
            <NotificationSystem />
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button
                  to={role === 'admin' ? '/admin' : '/dashboard'}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
                >
                  <BarChart2 size={16} className="mr-1" />
                  {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu
                  align="right"
                  trigger={
                    <Button variant="ghost" size="icon-sm" className="rounded-full border-2 border-primary/20">
                      <img
                        src={user?.avatar || "/avatar.png"}
                        alt="User"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </Button>
                  }
                >
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-medium border-b border-border">
                      <div className="font-semibold">{user?.name || 'User'}</div>
                      <div className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</div>
                      <div className="text-xs text-primary font-medium mt-1">Role: {role}</div>
                    </div>

                    <DropdownItem icon={<User size={16} />} onClick={() => {}}>
                      Profile
                    </DropdownItem>
                    <DropdownItem icon={<Settings size={16} />} onClick={() => {}}>
                      Settings
                    </DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem icon={<LogOut size={16} />} className="text-accent-red" onClick={handleLogout}>
                      Logout
                    </DropdownItem>
                  </div>
                </DropdownMenu>
              </>
            ) : (
              <Button
                to="/login"
                size="sm"
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <ThemeToggle />
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
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence mode="sync" initial={false}>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={`w-full justify-between px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(item.href)
                            ? 'text-primary bg-primary/10'
                            : 'text-foreground hover:text-primary'
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <span className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}
                        />
                      </Button>

                      <AnimatePresence mode="sync" initial={false}>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 border-l border-border ml-4 space-y-1"
                          >
                            {item.dropdown.map((subItem) => (
                              <Button
                                key={subItem.name}
                                to={subItem.href}
                                variant="ghost"
                                size="sm"
                                className={`w-full justify-start px-3 py-1.5 text-sm ${
                                  location.pathname === subItem.href
                                    ? 'text-primary bg-primary/10'
                                    : 'text-foreground hover:text-primary'
                                }`}
                              >
                                {subItem.name}
                              </Button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Button
                      to={item.href}
                      variant="ghost"
                      className={`w-full justify-start px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </span>
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center justify-between">
                <SearchDialog />
                <NotificationSystem />
              </div>

              {isAuthenticated ? (
                <>
                  <Button
                    to={role === 'admin' ? '/admin' : '/dashboard'}
                    size="sm"
                    className="w-full mt-3 bg-gradient-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
                  >
                    <BarChart2 size={16} className="mr-1" />
                    {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </Button>

                  {/* User Profile Section */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={user?.avatar || "/avatar.png"}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-primary/20"
                      />
                      <div>
                        <div className="font-medium">{user?.name || 'User'}</div>
                        <div className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</div>
                        <div className="text-xs text-primary font-medium">Role: {role}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User size={16} className="mr-2" />
                        Profile
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-accent-red" onClick={handleLogout}>
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  to="/login"
                  size="sm"
                  className="w-full mt-3 bg-gradient-to-r from-primary to-blue-500 hover:from-primary-hover hover:to-blue-600"
                >
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default RoleBasedNavbar;

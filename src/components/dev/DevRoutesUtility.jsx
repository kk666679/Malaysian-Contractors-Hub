import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HIDDEN_ROUTES = [
  {
    path: '/database-test',
    name: 'Database Test',
    description: 'Internal database testing page',
    type: 'dev-only',
    protected: false,
    lazy: true
  },
  {
    path: '/web3-demo',
    name: 'Web3 Demo',
    description: 'Web3 integration demonstration',
    type: 'dev-only',
    protected: false,
    lazy: true
  },
  {
    path: '/projects',
    name: 'Projects Page',
    description: 'Projects listing page',
    type: 'internal',
    protected: false,
    lazy: true
  },
  {
    path: '/redis-test',
    name: 'Redis Test',
    description: 'Redis service testing page',
    type: 'dev-only',
    protected: false,
    lazy: false
  },
  {
    path: '/admin/logs',
    name: 'Admin Logs',
    description: 'System logs and monitoring',
    type: 'admin',
    protected: true,
    lazy: true
  },
  {
    path: '/settings/roles',
    name: 'Role Settings',
    description: 'User role management',
    type: 'admin',
    protected: true,
    lazy: true
  },
  {
    path: '/internal/tools',
    name: 'Internal Tools',
    description: 'Developer internal tools',
    type: 'dev-only',
    protected: false,
    lazy: true
  },
  // Electrical Systems Module
  {
    path: '/electrical-systems/power-grid-simulator',
    name: 'Power Grid Simulator',
    description: 'Design and simulate electrical distribution networks',
    type: 'module',
    protected: false,
    lazy: true
  },
  {
    path: '/electrical-systems/smart-compliance-engine',
    name: 'Smart Compliance Engine',
    description: 'Automated compliance tracking with Malaysian regulations',
    type: 'module',
    protected: false,
    lazy: true
  },
  {
    path: '/electrical-systems/energy-efficiency-auditor',
    name: 'Energy Efficiency Auditor',
    description: 'Comprehensive energy audit with cost analysis',
    type: 'module',
    protected: false,
    lazy: true
  },
  // ACMV-HVAC Module
  {
    path: '/acmv-hvac/hvac-design-calculator',
    name: 'HVAC Design Calculator',
    description: 'Calculate cooling loads and design HVAC systems',
    type: 'module',
    protected: false,
    lazy: true
  },
  {
    path: '/acmv-hvac/performance-diagnostics',
    name: 'Performance Diagnostics',
    description: 'Monitor HVAC system performance and receive alerts',
    type: 'module',
    protected: false,
    lazy: true
  },
  {
    path: '/acmv-hvac/indoor-air-quality-dashboard',
    name: 'IAQ Dashboard',
    description: 'Monitor CO₂, VOCs, particulates, and environmental conditions',
    type: 'module',
    protected: false,
    lazy: true
  },
  // Sewerage-Drainage Module
  {
    path: '/sewerage-drainage/stormwater-designer',
    name: 'Stormwater Designer',
    description: 'Design stormwater drainage systems with DID compliance',
    type: 'module',
    protected: false,
    lazy: true
  },
  {
    path: '/sewerage-drainage/flood-risk-analyzer',
    name: 'Flood Risk Analyzer',
    description: 'Assess flood risk using Malaysian DID flood mapping data',
    type: 'module',
    protected: false,
    lazy: true
  }
];

// Mock roles for simulation
const MOCK_ROLES = ['user', 'admin', 'super-admin', 'developer'];

const DevRoutesUtility = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discoveredRoutes, setDiscoveredRoutes] = useState([]);
  const [useAutoDiscovery, setUseAutoDiscovery] = useState(true);
  const [selectedRole, setSelectedRole] = useState('developer');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Auto-discovery logic (attempts to extract routes from App.jsx structure)
  useEffect(() => {
    if (useAutoDiscovery) {
      try {
        // This would ideally parse the actual route structure
        // For now, we'll use the manual array as fallback
        setDiscoveredRoutes(HIDDEN_ROUTES);
      } catch (error) {
        console.warn('Auto-discovery failed, using manual routes:', error);
        setUseAutoDiscovery(false);
      }
    }
  }, [useAutoDiscovery]);

  const routes = useAutoDiscovery ? discoveredRoutes : HIDDEN_ROUTES;

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRouteTypeColor = (type) => {
    switch (type) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'dev-only': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'internal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRouteClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        title="Developer Routes Utility"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </motion.button>

      {/* Routes Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full max-h-96 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hidden Routes Utility
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="auto-discovery"
                    checked={useAutoDiscovery}
                    onChange={(e) => setUseAutoDiscovery(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="auto-discovery" className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-discovery
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role Simulation
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {MOCK_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Routes List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredRoutes.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No routes found
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRoutes.map((route, index) => (
                    <motion.div
                      key={route.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleRouteClick(route.path)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {route.name}
                            </span>
                            {route.lazy && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                                Lazy
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {route.path}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {route.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-1 ml-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRouteTypeColor(route.type)}`}>
                            {route.type}
                          </span>
                          {route.protected && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200">
                              Protected
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {routes.length} hidden routes • Role: {selectedRole}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DevRoutesUtility;

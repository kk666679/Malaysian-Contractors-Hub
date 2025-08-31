import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const AuthSections = ({ activeSection, onSectionChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  if (activeSection !== 'signup' && activeSection !== 'login') {
    return null
  }

  return (
    <section id={activeSection} className="page-section py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {activeSection === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
            {activeSection === 'signup'
              ? 'Join hundreds of Malaysian contractors using MC-Hub'
              : 'Log in to your MC-Hub account'
            }
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md">
            <form>
              {activeSection === 'signup' && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="company">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="industry">
                      Primary Industry
                    </label>
                    <select
                      id="industry"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select your industry</option>
                      <option value="civil">Civil Engineering</option>
                      <option value="electrical">Electrical Systems</option>
                      <option value="elv">ELV Systems</option>
                      <option value="hvac">HVAC</option>
                      <option value="plumbing">Sewerage & Plumbing</option>
                      <option value="general">General Contracting</option>
                    </select>
                  </div>
                </>
              )}

              {activeSection === 'login' && (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="login-email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="login-password">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        id="login-password"
                        className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </a>
                  </div>
                </>
              )}

              <button
                type="button"
                className="btn-hover w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mb-4"
              >
                {activeSection === 'signup' ? 'Create Account' : 'Log In'}
              </button>

              <p className="text-center text-gray-600 dark:text-gray-300">
                {activeSection === 'signup' ? "Already have an account?" : "Don't have an account?"}{' '}
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => onSectionChange(activeSection === 'signup' ? 'login' : 'signup')}
                >
                  {activeSection === 'signup' ? 'Log in' : 'Sign up'}
                </button>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AuthSections

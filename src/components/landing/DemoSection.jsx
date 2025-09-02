import React from 'react';
import { motion } from 'framer-motion'
import { Play, Building2 } from 'lucide-react'

const DemoSection = ({ onSectionChange }) => {
  return (
    <section id="demo" className="page-section py-16 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6">See MC-Hub in Action</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch our product demo to see how MC-Hub can transform your contracting business
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-2 mb-8">
            <div className="aspect-video bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">Product demo video</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-hover px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              onClick={() => onSectionChange('signup')}
            >
              Start Free Trial
            </button>
            <button
              className="btn-hover px-6 py-3 rounded-xl border border-gray-300 font-medium hover:border-gray-400 transition-colors"
              onClick={() => onSectionChange('home')}
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DemoSection

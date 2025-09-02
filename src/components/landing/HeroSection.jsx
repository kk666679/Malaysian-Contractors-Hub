import React from 'react';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Building2 } from 'lucide-react'

const HeroSection = ({ onSectionChange }) => {
  const [counters, setCounters] = useState({
    contractors: 0,
    projects: 0,
    value: 0,
    satisfaction: 0
  })

  useEffect(() => {
    const animateCounter = (key, target, suffix = '+') => {
      let count = 0
      const duration = 2000
      const increment = target / (duration / 16)

      const timer = setInterval(() => {
        count += increment
        if (count >= target) {
          count = target
          clearInterval(timer)
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(count)
        }))
      }, 16)
    }

    // Start counters when component mounts
    setTimeout(() => {
      animateCounter('contractors', 500)
      animateCounter('projects', 1200)
      animateCounter('value', 350)
      animateCounter('satisfaction', 98, '%')
    }, 500)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-blue-600">MC-Hub</span>: Malaysian Contractors Hub
          </h1>

          <p className="max-w-2xl text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 mx-auto">
            Streamline project management and contractor-client interactions across civil, electrical, ELV, HVAC, and sewerage systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => window.location.href = '/register'}
              className="btn-hover px-8 py-4 rounded-xl bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => window.location.href = '/features'}
              className="btn-hover px-8 py-4 rounded-xl border border-gray-300 text-lg font-medium hover:border-gray-400 transition-colors flex items-center"
            >
              <span>Watch Demo</span>
              <Play className="w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">Platform dashboard preview</p>
                <button
                  onClick={() => window.location.href = '/features'}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto"
                >
                  Explore Features
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-1"
                  >
                    →
                  </motion.div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <div className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 counter">
                {counters.contractors}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2">Active Contractors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 counter">
                {counters.projects}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 counter">
                RM {counters.value}M
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2">Project Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 counter">
                {counters.satisfaction}%
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection

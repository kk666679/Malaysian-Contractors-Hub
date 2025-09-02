import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle2, FileSpreadsheet, HardHat, Building2, BarChart3, Settings, Users } from 'lucide-react'
import { useState } from 'react'

const featuresData = [
  {
    id: 'custom-bids',
    title: 'Custom Bids',
    description: 'Generate bids with real-time project data and Malaysian cost databases.',
    icon: <FileSpreadsheet className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description: 'Monitor safety & building regulation adherence with JKR and CIDB standards.',
    icon: <HardHat className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'project-tools',
    title: 'Project Tools',
    description: 'Design, simulate & manage complex projects with integrated workflows.',
    icon: <Building2 className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'tracking',
    title: 'Tracking',
    description: 'Track budgets, resources, and project milestones with real-time dashboards.',
    icon: <BarChart3 className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Simplify workflows with AI-driven tools for documentation and reporting.',
    icon: <Settings className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Seamless communication between contractors, clients, and authorities.',
    icon: <Users className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
]

const FeaturesSection = ({ onSectionChange }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="features" className="page-section py-16 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Powerful Features for Malaysian Contractors</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Designed specifically for Malaysia&apos;s construction industry with local regulations and requirements in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              className="card-hover rounded-2xl shadow-md bg-white dark:bg-gray-900 p-6 flex flex-col items-start text-left space-y-4"
              onMouseEnter={() => setHovered(feature.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}
            >
              <div className={`p-3 rounded-xl ${feature.bgColor} ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              <button
                className="text-blue-600 hover:text-blue-700 mt-2 flex items-center"
                onClick={() => onSectionChange('pricing')}
              >
                Learn more <span className="ml-1">→</span>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="btn-hover px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            onClick={() => onSectionChange('pricing')}
          >
            View All Features & Pricing
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

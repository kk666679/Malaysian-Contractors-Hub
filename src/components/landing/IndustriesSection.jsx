import { useState } from 'react'
import { motion } from 'framer-motion'
import { HardHat, Zap, Wifi, Wind, Droplets, Building } from 'lucide-react'

const industries = [
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    description: 'Infrastructure development, road construction, and large-scale projects',
    icon: <HardHat className="w-12 h-12" />,
    bgColor: 'bg-blue-100',
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-indigo-50',
    textColor: 'text-blue-600',
  },
  {
    id: 'electrical-systems',
    title: 'Electrical Systems',
    description: 'Power distribution, electrical installations, and smart building solutions',
    icon: <Zap className="w-12 h-12" />,
    bgColor: 'bg-green-100',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-emerald-50',
    textColor: 'text-green-600',
  },
  {
    id: 'elv-systems',
    title: 'ELV Systems',
    description: 'Security systems, communication networks, and automation solutions',
    icon: <Wifi className="w-12 h-12" />,
    bgColor: 'bg-purple-100',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-violet-50',
    textColor: 'text-purple-600',
  },
  {
    id: 'hvac',
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning systems for optimal comfort',
    icon: <Wind className="w-12 h-12" />,
    bgColor: 'bg-orange-100',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-red-50',
    textColor: 'text-orange-600',
  },
  {
    id: 'sewerage-drainage',
    title: 'Sewerage & Drainage',
    description: 'Water management, plumbing systems, and drainage solutions',
    icon: <Droplets className="w-12 h-12" />,
    bgColor: 'bg-cyan-100',
    gradientFrom: 'from-cyan-50',
    gradientTo: 'to-blue-50',
    textColor: 'text-cyan-600',
  },
  {
    id: 'general-contracting',
    title: 'General Contracting',
    description: 'Complete project management and construction services',
    icon: <Building className="w-12 h-12" />,
    bgColor: 'bg-gray-100',
    gradientFrom: 'from-gray-50',
    gradientTo: 'to-slate-50',
    textColor: 'text-gray-600',
  },
]

const IndustriesSection = ({ onSectionChange }) => {
  return (
    <section id="industries" className="page-section py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-4">Industries We Serve</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Comprehensive solutions tailored for Malaysia&apos;s diverse construction sectors
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className={`industry-card rounded-2xl shadow-md p-6 text-center bg-gradient-to-br ${industry.gradientFrom} ${industry.gradientTo}`}
            >
              <div className={`p-4 rounded-xl mx-auto mb-4 w-fit ${industry.bgColor} ${industry.textColor}`}>
                {industry.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{industry.description}</p>
              <button
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => onSectionChange('pricing')}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustriesSection

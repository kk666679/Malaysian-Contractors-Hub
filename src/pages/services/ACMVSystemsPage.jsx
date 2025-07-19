import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wind, Thermometer, Fan, Gauge, Leaf } from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

// Feature card component
const FeatureCard = ({ title, description, icon: Icon }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-background-secondary rounded-lg p-6 border border-border"
  >
    <div className="flex items-center mb-4">
      <div className="p-2 rounded-full bg-primary/10 mr-3">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-text-secondary">{description}</p>
  </motion.div>
)

const ACMVSystemsPage = () => {
  // Features data
  const features = [
    {
      title: "Air Conditioning",
      description: "Energy-efficient air conditioning solutions optimized for Malaysia's tropical climate and humidity levels.",
      icon: Thermometer
    },
    {
      title: "Mechanical Ventilation",
      description: "Advanced ventilation systems designed to maintain air quality and meet Malaysian building standards.",
      icon: Wind
    },
    {
      title: "Cooling Systems",
      description: "Comprehensive cooling solutions for commercial, industrial, and residential buildings across Malaysia.",
      icon: Fan
    },
    {
      title: "Performance Monitoring",
      description: "Smart ACMV monitoring systems to ensure optimal performance and energy efficiency.",
      icon: Gauge
    },
    {
      title: "Green Building Solutions",
      description: "Sustainable ACMV designs that meet GBI (Green Building Index) standards for Malaysian buildings.",
      icon: Leaf
    }
  ]

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left column - Content */}
        <motion.div variants={itemVariants} className="md:w-2/3">
          <Link to="/services" className="inline-flex items-center text-primary hover:text-primary-hover mb-6">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <h1 className="text-4xl font-display font-bold mb-6">ACMV Systems</h1>
          
          <div className="prose prose-lg dark:prose-invert mb-8">
            <p>
              Our Air Conditioning and Mechanical Ventilation (ACMV) services provide comprehensive 
              solutions for climate control in buildings across Malaysia. We specialize in designing 
              and implementing systems that effectively manage Malaysia's tropical climate challenges, 
              including high temperatures and humidity levels.
            </p>
            
            <p>
              With our team of experienced ACMV engineers and technicians, we ensure that all systems 
              meet the highest standards of quality, energy efficiency, and compliance with Malaysian 
              building regulations and green building standards.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Our ACMV Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
          <div className="bg-background-tertiary border border-border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Malaysian Standards Compliance</h3>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                MS 1525 - Energy Efficiency and Use of Renewable Energy for Non-Residential Buildings
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ASHRAE Standards adapted for Malaysian climate
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Green Building Index (GBI) Requirements
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Uniform Building By-Laws (UBBL) Ventilation Requirements
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right column - CTA and info */}
        <motion.div variants={itemVariants} className="md:w-1/3">
          <div className="sticky top-24">
            <div className="bg-background-secondary rounded-lg border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Need ACMV expertise?</h3>
              <p className="text-text-secondary mb-6">
                Our team of ACMV specialists is ready to help with your climate control requirements.
              </p>
              <Link 
                to="/contact" 
                className="block w-full text-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Request Consultation
              </Link>
            </div>
            
            <div className="bg-background-secondary rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Why Choose Our ACMV Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Specialized knowledge of Malaysian tropical climate requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Energy-efficient system designs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">GBI-certified ACMV professionals</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Comprehensive maintenance and support services</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ACMVSystemsPage
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Droplets, Waves, Route, CloudRain, FlaskConical } from 'lucide-react'

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

const SewerageDrainagePage = () => {
  // Features data
  const features = [
    {
      title: "Sewerage Systems",
      description: "Comprehensive sewerage system design and installation compliant with IWK standards and Malaysian regulations.",
      icon: Droplets
    },
    {
      title: "Stormwater Management",
      description: "Advanced stormwater drainage solutions designed for Malaysia's heavy rainfall and monsoon seasons.",
      icon: CloudRain
    },
    {
      title: "Pipeline Networks",
      description: "Design and installation of efficient pipeline networks for water distribution and waste management.",
      icon: Route
    },
    {
      title: "Flood Mitigation",
      description: "Specialized flood mitigation systems to protect properties in flood-prone areas across Malaysia.",
      icon: Waves
    },
    {
      title: "Water Treatment",
      description: "Water and wastewater treatment solutions compliant with Malaysian environmental regulations.",
      icon: FlaskConical
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
          
          <h1 className="text-4xl font-display font-bold mb-6">Sewerage & Drainage</h1>
          
          <div className="prose prose-lg dark:prose-invert mb-8">
            <p>
              Our Sewerage and Drainage services provide comprehensive solutions for water management 
              in construction projects across Malaysia. We specialize in designing and implementing systems 
              that effectively handle Malaysia's unique climate challenges, including heavy rainfall and 
              monsoon seasons.
            </p>
            
            <p>
              With our team of experienced engineers and technicians, we ensure that all sewerage and 
              drainage systems meet the highest standards of quality and compliance with Malaysian 
              regulations, particularly IWK standards and Department of Irrigation and Drainage (JPS) 
              requirements.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Our Sewerage & Drainage Services</h2>
          
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
                IWK Sewerage Guidelines and Standards
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Urban Stormwater Management Manual for Malaysia (MSMA)
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Department of Irrigation and Drainage (JPS) Requirements
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Environmental Quality Act 1974 Regulations
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right column - CTA and info */}
        <motion.div variants={itemVariants} className="md:w-1/3">
          <div className="sticky top-24">
            <div className="bg-background-secondary rounded-lg border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Need drainage solutions?</h3>
              <p className="text-text-secondary mb-6">
                Our team of specialists can help with your sewerage and drainage requirements.
              </p>
              <Link 
                to="/contact" 
                className="block w-full text-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Request Consultation
              </Link>
            </div>
            
            <div className="bg-background-secondary rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Why Choose Our Drainage Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">IWK-approved sewerage system designs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Specialized knowledge of Malaysian monsoon conditions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Sustainable drainage system designs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Comprehensive flood risk assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SewerageDrainagePage
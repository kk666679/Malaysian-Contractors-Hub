import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, Zap, Droplets, Radio, Wind } from 'lucide-react'
import { SERVICES, ROUTES } from '../lib/routeConfig'

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

// Service card component
const ServiceCard = ({ title, description, icon: Icon, to }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-background-secondary rounded-lg shadow-card p-6 border border-border hover:border-primary transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      <div className="p-3 rounded-full bg-primary/10 mr-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <p className="text-text-secondary mb-6">{description}</p>
    <Link 
      to={to} 
      className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
    >
      Learn more
      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  </motion.div>
)

const ServicesPage = () => {
  // Map icon strings to actual icon components
  const iconMap = {
    Building2,
    Zap,
    Droplets,
    Radio,
    Wind
  };
  
  // Use services from centralized config but map string icons to components
  const services = SERVICES.map(service => ({
    ...service,
    icon: iconMap[service.icon] || Building2
  }))

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-primary text-transparent bg-clip-text">
          Our Services
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Comprehensive MEP solutions tailored for Malaysian construction industry standards and regulations
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-16 p-8 bg-background-tertiary rounded-lg shadow-sm border border-border text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Need a custom solution?</h2>
        <p className="mb-6 text-text-secondary">Our team of experts can help you with specialized MEP requirements for your project</p>
        <Link 
          to={ROUTES.CONTACT} 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
        >
          Contact Us
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default ServicesPage
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Radio, Wifi, ShieldCheck, Video, Cpu } from 'lucide-react'

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

const ELVSystemsPage = () => {
  // Features data
  const features = [
    {
      title: "Communication Systems",
      description: "Advanced telecommunication and data network infrastructure for commercial and residential buildings.",
      icon: Radio
    },
    {
      title: "Network Infrastructure",
      description: "Comprehensive structured cabling and wireless network solutions optimized for Malaysian buildings.",
      icon: Wifi
    },
    {
      title: "Security Systems",
      description: "Integrated security solutions including access control, intrusion detection, and alarm systems.",
      icon: ShieldCheck
    },
    {
      title: "Surveillance Systems",
      description: "High-definition CCTV and video surveillance systems with remote monitoring capabilities.",
      icon: Video
    },
    {
      title: "Building Automation",
      description: "Smart building management systems for lighting, HVAC, and energy control integration.",
      icon: Cpu
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
          
          <h1 className="text-4xl font-display font-bold mb-6">ELV Systems</h1>
          
          <div className="prose prose-lg dark:prose-invert mb-8">
            <p>
              Our Extra Low Voltage (ELV) Systems services provide comprehensive solutions for modern 
              building infrastructure needs across Malaysia. We specialize in designing and implementing 
              integrated systems that enhance security, communication, and building automation.
            </p>
            
            <p>
              With our team of certified ELV specialists, we ensure that all installations meet the 
              highest standards of quality and compliance with Malaysian telecommunications and 
              building regulations, while providing cutting-edge technology solutions.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Our ELV Systems Services</h2>
          
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
                MCMC (Malaysian Communications and Multimedia Commission) Standards
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                MS IEC 60364 Low Voltage Electrical Installations
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                TIA/EIA-568 Structured Cabling Standards
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                MATV/SMATV Signal Distribution Standards
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right column - CTA and info */}
        <motion.div variants={itemVariants} className="md:w-1/3">
          <div className="sticky top-24">
            <div className="bg-background-secondary rounded-lg border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Need ELV systems expertise?</h3>
              <p className="text-text-secondary mb-6">
                Our team of certified ELV specialists is ready to help with your project requirements.
              </p>
              <Link 
                to="/contact" 
                className="block w-full text-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              >
                Request Consultation
              </Link>
            </div>
            
            <div className="bg-background-secondary rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4">Why Choose Our ELV Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">MCMC certified ELV specialists</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Integrated system design approach</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Future-proof technology solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-text-secondary">Comprehensive system maintenance and support</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ELVSystemsPage
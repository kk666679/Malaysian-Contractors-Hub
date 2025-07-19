import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, Building, Users, Cloud, Package, Building2 } from 'lucide-react'
import PageTransition from '../components/PageTransition.jsx'

const FeatureCard = ({ icon, title, description, link, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)' }}
      className={`bg-card rounded-lg shadow-md p-6 border-t-4 ${color} transition-all`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-background-secondary rounded-full">
          {icon}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-text-secondary mb-6">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center text-primary hover:underline font-medium"
      >
        Explore Feature
        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  )
}

const FeaturesPage = () => {
  const features = [
    {
      icon: <Calculator className="h-6 w-6 text-blue-600" />,
      title: "Project Bid Engine",
      description: "Generate accurate project bids with comprehensive cost database tailored for Malaysian construction industry.",
      link: "/bid-engine",
      color: "border-blue-500"
    },
    {
      icon: <Building className="h-6 w-6 text-green-600" />,
      title: "Site Management",
      description: "Manage construction sites efficiently with real-time updates on tasks, issues, materials, and inspections.",
      link: "/site-management",
      color: "border-green-500"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Specialist Marketplace",
      description: "Connect with qualified MEP specialists across Malaysia for your construction projects.",
      link: "/marketplace",
      color: "border-purple-500"
    },
    {
      icon: <Package className="h-6 w-6 text-amber-600" />,
      title: "Material Alerts",
      description: "Stay updated on material price changes, availability, and supply chain issues affecting your projects.",
      link: "/material-alerts",
      color: "border-amber-500"
    },
    {
      icon: <Cloud className="h-6 w-6 text-cyan-600" />,
      title: "Monsoon Risk Planner",
      description: "Plan construction schedules around Malaysia's monsoon seasons with weather impact analysis.",
      link: "/monsoon-planner",
      color: "border-cyan-500"
    },
    {
      icon: <Building2 className="h-6 w-6 text-rose-600" />,
      title: "Building Automation",
      description: "Connect with building automation systems for smart building integration and management.",
      link: "/building-automation",
      color: "border-rose-500"
    }
  ]
  
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Platform Features</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover the tools designed to streamline your contracting business in Malaysia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

export default FeaturesPage
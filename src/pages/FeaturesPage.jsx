import React from 'react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, Building, Users, Cloud, Package, Building2, Search } from 'lucide-react'
import PageTransition from '../components/features/PageTransition.jsx'
import { useState } from 'react'

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
  const [searchQuery, setSearchQuery] = useState('')

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

  // Filter features based on search query
  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Platform Features</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Discover the tools designed to streamline your contracting business in Malaysia
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
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

        {filteredFeatures.length === 0 && searchQuery && (
          <div className="text-center py-12 bg-background-secondary rounded-lg">
            <Search className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
            <h4 className="text-lg font-medium mb-2">No features found</h4>
            <p className="text-text-muted">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default FeaturesPage
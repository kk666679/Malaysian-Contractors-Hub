import React from 'react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/features/PageTransition.jsx'
import {
  HeroSection,
  FeaturesSection,
  IndustriesSection,
  TestimonialsSection,
  PricingSection,
  AuthSections,
  DemoSection
} from '../components/landing'

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('home')

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection onSectionChange={handleSectionChange} />
            <FeaturesSection onSectionChange={handleSectionChange} />
            <IndustriesSection onSectionChange={handleSectionChange} />
            <TestimonialsSection onSectionChange={handleSectionChange} />
            <PricingSection onSectionChange={handleSectionChange} />
          </>
        )
      case 'features':
        return <FeaturesSection onSectionChange={handleSectionChange} />
      case 'industries':
        return <IndustriesSection onSectionChange={handleSectionChange} />
      case 'testimonials':
        return <TestimonialsSection onSectionChange={handleSectionChange} />
      case 'pricing':
        return <PricingSection onSectionChange={handleSectionChange} />
      case 'signup':
      case 'login':
        return <AuthSections activeSection={activeSection} onSectionChange={handleSectionChange} />
      case 'demo':
        return <DemoSection onSectionChange={handleSectionChange} />
      default:
        return (
          <>
            <HeroSection onSectionChange={handleSectionChange} />
            <FeaturesSection onSectionChange={handleSectionChange} />
            <IndustriesSection onSectionChange={handleSectionChange} />
            <TestimonialsSection onSectionChange={handleSectionChange} />
            <PricingSection onSectionChange={handleSectionChange} />
          </>
        )
    }
  }

  return (
    <PageTransition>
      <div className="bg-background overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

export default HomePage

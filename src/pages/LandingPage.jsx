import React from 'react';
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import IndustriesSection from "../components/landing/IndustriesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import PricingSection from "../components/landing/PricingSection";
import ContactSection from "../components/landing/ContactSection";
import CTASection from "../components/landing/CTASection";

const LandingPage = () => {
  const { theme } = useTheme();

  const handleSectionChange = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <main>
        <HeroSection onSectionChange={handleSectionChange} />
        <FeaturesSection onSectionChange={handleSectionChange} />
        <IndustriesSection onSectionChange={handleSectionChange} />
        <TestimonialsSection onSectionChange={handleSectionChange} />
        <PricingSection onSectionChange={handleSectionChange} />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

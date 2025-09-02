import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-16">
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold mb-6">About Malaysian Contractors Hub</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Empowering Malaysia's construction industry with cutting-edge technology and comprehensive project management solutions.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  To revolutionize the Malaysian construction industry by providing innovative, technology-driven solutions that streamline project management, enhance collaboration, and ensure compliance with local regulations.
                </p>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  <span className="font-medium">Driving Innovation in Construction</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  To become the leading digital platform for Malaysian contractors, fostering a connected ecosystem where projects are delivered efficiently, safely, and sustainably.
                </p>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className="font-medium">Excellence in Every Project</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose MC-Hub?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Local Expertise</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Built specifically for Malaysian construction standards and regulations
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Collaborative Platform</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Connect contractors, clients, and stakeholders seamlessly
                  </p>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Proven Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Trusted by hundreds of contractors across Malaysia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
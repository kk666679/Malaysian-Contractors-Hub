import React from 'react';
import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import PageTransition from '../../components/features/PageTransition'

const HelpCenterPolicy = () => {
  return (
    <PageTransition>
      <div className="py-8 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-none dark:prose-invert"
        >
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Help Center & Support Policy
            </h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is placeholder content. The actual Help Center & Support Policy content should be provided and added here.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Support Availability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our support team is available during business hours to assist with technical issues, account questions, and general inquiries.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How to Get Help</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You can access help through our help center, contact forms, or by reaching out to our support team directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Response Times</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We aim to respond to all inquiries within 24-48 hours during business days. Priority support is available for critical issues.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Self-Service Resources</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our help center includes comprehensive documentation, FAQs, tutorials, and troubleshooting guides to help you find answers quickly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Feedback and Suggestions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We welcome feedback on our platform and services. Your suggestions help us improve and better serve the construction community.
            </p>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default HelpCenterPolicy

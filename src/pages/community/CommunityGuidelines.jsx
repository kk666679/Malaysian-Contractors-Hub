import React from 'react';
import { motion } from 'framer-motion'
import { ArrowLeft, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import PageTransition from '../../components/features/PageTransition'

const CommunityGuidelines = () => {
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
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Community Guidelines
            </h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is placeholder content. The actual Community Guidelines content should be provided and added here.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Respect and Professionalism</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Treat all community members with respect and maintain professional conduct in all interactions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Content Standards</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              All content must be relevant to the construction and MEP industry. Spam, off-topic posts, and inappropriate content are not allowed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Respect intellectual property rights. Do not share copyrighted materials without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Privacy and Confidentiality</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Protect sensitive information and respect privacy. Do not share confidential project details or personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Reporting Violations</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Report any violations of these guidelines to the community moderators. We take violations seriously and will take appropriate action.
            </p>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default CommunityGuidelines

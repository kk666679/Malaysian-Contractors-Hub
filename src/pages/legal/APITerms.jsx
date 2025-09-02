import React from 'react';
import { motion } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import PageTransition from '../../components/features/PageTransition'

const APITerms = () => {
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
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              API Terms of Service
            </h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is placeholder content. The actual API Terms of Service content should be provided and added here.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to the Malaysian Contractors Hub API. These terms govern your use of our API services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. API Usage Guidelines</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When using our API, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
              <li>Respect rate limits and usage quotas</li>
              <li>Use the API only for lawful purposes</li>
              <li>Maintain the security of your API keys</li>
              <li>Provide accurate and up-to-date information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your use of the API is subject to our Privacy Policy and applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Support</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For API support, please contact our developer support team.
            </p>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default APITerms

import { motion } from 'framer-motion'
import { ArrowLeft, FileCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import PageTransition from '../../components/features/PageTransition'

const TermsOfService = () => {
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
            <FileCheck className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Terms of Service
            </h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is placeholder content. The actual Terms of Service content should be provided and added here.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing and using the Malaysian Contractors Hub platform, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Permission is granted to temporarily use the platform for personal and business use, subject to restrictions stated in these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Service Availability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We strive to keep the platform available, but we do not guarantee uninterrupted or error-free operation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              In no event shall Malaysian Contractors Hub be liable for any damages arising out of the use or inability to use the platform.
            </p>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default TermsOfService

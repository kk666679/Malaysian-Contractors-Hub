import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import PageTransition from '../../components/features/PageTransition'

const ContentPolicy = () => {
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
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Content Policy
            </h1>
          </div>

          <div className="text-sm text-gray-500 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> This is placeholder content. The actual Content Policy (covering Blog, Guides, Webinars) should be provided and added here.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Blog Content Guidelines</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our blog provides valuable insights into construction industry trends, best practices, and regulatory updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Guides and Documentation</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Technical guides and documentation are provided to help users understand and implement various construction processes and compliance requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Webinars and Training</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Educational webinars cover topics related to MEP systems, compliance, project management, and industry best practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Content Accuracy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We strive to provide accurate and up-to-date information. However, content is for general informational purposes and should not be considered professional advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. User-Generated Content</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Users may contribute content through comments, forums, or other interactive features. All user-generated content must comply with our community guidelines.
            </p>
          </section>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default ContentPolicy

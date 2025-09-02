import React from 'react';
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

const CTASection = () => {
  const benefits = [
    'Free 30-day trial',
    'No setup fees',
    'Cancel anytime',
    '24/7 support'
  ]

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Construction Business?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of Malaysian contractors who trust MC-Hub for their project success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection

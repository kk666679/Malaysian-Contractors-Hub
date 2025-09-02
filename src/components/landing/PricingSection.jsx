import React from 'react';
import { motion } from 'framer-motion'

const pricingPlans = [
  {
    id: 'starter',
    title: 'Starter',
    price: 'RM 99',
    period: '/month',
    description: 'Perfect for small contractors and individual professionals',
    features: [
      'Up to 5 projects',
      'Basic bidding tools',
      'Standard compliance checks',
      'Email support',
    ],
    popular: false,
  },
  {
    id: 'professional',
    title: 'Professional',
    price: 'RM 249',
    period: '/month',
    description: 'Ideal for growing contracting businesses',
    features: [
      'Unlimited projects',
      'Advanced bidding tools',
      'Full compliance suite',
      'Priority support',
      'Team collaboration',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large contracting firms with complex needs',
    features: [
      'Everything in Professional',
      'Custom workflows',
      'Dedicated account manager',
      'API access',
      'Onboarding & training',
    ],
    popular: false,
  },
]

const PricingSection = ({ onSectionChange }) => {
  return (
    <section id="pricing" className="page-section py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Simple, Transparent Pricing</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Choose the plan that works best for your contracting business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`card-hover bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border ${
                plan.popular ? 'border-2 border-blue-500 relative' : 'border-gray-200 dark:border-gray-700'
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {plan.price}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{plan.period}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`btn-hover w-full py-3 rounded-xl ${
                  plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                } font-medium transition-colors`}
                onClick={() => onSectionChange(plan.id === 'enterprise' ? 'contact' : 'signup')}
              >
                {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about pricing?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium" onClick={() => onSectionChange('contact')}>
              Contact our team
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSection

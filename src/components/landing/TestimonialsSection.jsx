import React from 'react';
import { motion } from 'framer-motion'
import { Star, MapPin } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "MC-Hub streamlined our bidding process and helped us win 40% more projects in the last year.",
    author: "Ahmad Firdaus",
    position: "Project Director",
    company: "Firdaus Construction Sdn Bhd",
    location: "Kuala Lumpur",
    initials: "AF",
  },
  {
    id: 2,
    quote: "The compliance features saved us countless hours dealing with JKR and CIDB requirements.",
    author: "Sarah Lim",
    position: "Site Manager",
    company: "Lim Engineering",
    location: "Penang",
    initials: "SL",
  },
  {
    id: 3,
    quote: "Finally a platform that understands the unique needs of Malaysian contractors across different sectors.",
    author: "Rajesh Kumar",
    position: "Procurement Manager",
    company: "RK Electrical Solutions",
    location: "Johor Bahru",
    initials: "RK",
  },
]

const TestimonialsSection = ({ onSectionChange }) => {
  return (
    <section id="testimonials" className="page-section py-16 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Trusted by Malaysian Contractors</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Hear from contractors who have transformed their businesses with MC-Hub
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="btn-hover px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            onClick={() => onSectionChange('signup')}
          >
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

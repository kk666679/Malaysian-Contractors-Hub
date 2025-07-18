import React from 'react'

const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <p className="text-lg text-center mb-12">
        Comprehensive solutions for Malaysian Civil & MEP contractors
      </p>
      
      {/* Services content will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Civil Engineering</h2>
          <p>Content coming soon...</p>
        </div>
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Electrical Systems</h2>
          <p>Content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
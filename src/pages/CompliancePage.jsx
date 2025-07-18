import React from 'react'

const CompliancePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Compliance Resources</h1>
      <p className="text-lg text-center mb-12">
        Stay up-to-date with Malaysian building codes and regulations
      </p>
      
      {/* Compliance content will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">CIDB Standards</h2>
          <p>Content coming soon...</p>
        </div>
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">JKR Building Standards</h2>
          <p>Content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default CompliancePage
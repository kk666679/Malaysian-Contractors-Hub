import React, { useState } from 'react'
import { Button } from './ui/button'

const HireSpecialistForm = ({ specialist, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    project_title: '',
    project_description: '',
    project_location: '',
    start_date: '',
    duration: '',
    budget_type: 'hourly',
    budget: '',
    additional_info: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // In a real app, this would be an API call
    setTimeout(() => {
      onSubmit({
        specialist_id: specialist.id,
        project_details: formData,
        client_info: {
          // In a real app, this would come from the logged-in user
          name: 'Current User',
          company: 'User Company',
          contact: {
            email: 'user@example.com',
            phone: '+60 12-345-6789'
          }
        }
      })
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Hire {specialist.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <img 
                src={specialist.profile_image} 
                alt={specialist.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold">{specialist.name}</h3>
                <p className="text-sm text-gray-600">{specialist.specialty}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              Fill out the form below to hire this specialist. They will review your request and contact you directly.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <input
                type="text"
                name="project_title"
                value={formData.project_title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Project Description</label>
              <textarea
                name="project_description"
                value={formData.project_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md h-24"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Location</label>
                <input
                  type="text"
                  name="project_location"
                  value={formData.project_location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="3 months">3 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Budget Type</label>
                <div className="flex">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="budget_type"
                      value="hourly"
                      checked={formData.budget_type === 'hourly'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Hourly
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="budget_type"
                      value="fixed"
                      checked={formData.budget_type === 'fixed'}
                      onChange={handleChange}
                      className="mr-1"
                    />
                    Fixed Price
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                {formData.budget_type === 'hourly' ? 'Hourly Budget (RM)' : 'Fixed Budget (RM)'}
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Additional Information</label>
              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md h-24"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HireSpecialistForm
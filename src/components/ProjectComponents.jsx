import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'

const PostProjectForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    budget_min: '',
    budget_max: '',
    timeline: '',
    skills_required: [],
    attachments: []
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills_required.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills_required: [...prev.skills_required, skillInput.trim()]
      }))
      setSkillInput('')
    }
  }
  
  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.filter(s => s !== skill)
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    // In a real app, this would be an API call
    setTimeout(() => {
      onSubmit(formData)
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Post a New Project</h2>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
                placeholder="e.g., Office Building ACMV Installation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Project Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md h-32"
                required
                placeholder="Describe your project requirements, scope, and any specific details..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  placeholder="e.g., Kuala Lumpur"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                >
                  <option value="">Select category</option>
                  <option value="plumbing">Plumbing & Water Systems</option>
                  <option value="electrical">Electrical Systems</option>
                  <option value="acmv">ACMV Systems</option>
                  <option value="fire_protection">Fire Protection</option>
                  <option value="elv">ELV Systems</option>
                  <option value="telecommunications">Telecommunications</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Budget Range (RM)</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="budget_min"
                    value={formData.budget_min}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    placeholder="Min"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="number"
                    name="budget_max"
                    value={formData.budget_max}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                    placeholder="Max"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                >
                  <option value="">Select timeline</option>
                  <option value="less_than_week">Less than 1 week</option>
                  <option value="1_2_weeks">1-2 weeks</option>
                  <option value="2_4_weeks">2-4 weeks</option>
                  <option value="1_3_months">1-3 months</option>
                  <option value="3_6_months">3-6 months</option>
                  <option value="more_than_6_months">More than 6 months</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Skills Required</label>
              <div className="flex">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-l-md"
                  placeholder="e.g., ACMV Certification"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <Button 
                  type="button" 
                  onClick={handleAddSkill}
                  className="rounded-l-none"
                >
                  Add
                </Button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills_required.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1">
                    {skill}
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Attachments (Optional)</label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-md"
                multiple
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload project plans, drawings, or other relevant documents (Max 5MB each)
              </p>
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
              {submitting ? 'Posting...' : 'Post Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ProjectCard = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge>{project.category_name}</Badge>
        </div>
        <p className="text-sm text-gray-500">{project.location} • Posted {project.posted_date}</p>
      </CardHeader>
      
      <CardContent>
        <p className="mb-4 line-clamp-3">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <span className="font-medium">Budget:</span> RM{project.budget_min} - RM{project.budget_max}
          </div>
          <div>
            <span className="font-medium">Timeline:</span> {project.timeline_display}
          </div>
        </div>
        
        <div className="mb-3">
          <span className="text-sm font-medium">Skills Required:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {project.skills_required.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm">
          <span className="font-medium">{project.proposals_count}</span> proposals
        </div>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  )
}

const ProjectsBoard = ({ projects = [] }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Open Projects</h2>
        <Button>Post a Project</Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-lg mb-4">No open projects at the moment</p>
          <Button>Post Your First Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export { PostProjectForm, ProjectsBoard }
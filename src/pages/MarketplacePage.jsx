import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import SpecialistDetailModal from '../components/SpecialistDetailModal'
import HireSpecialistForm from '../components/HireSpecialistForm'
import { PostProjectForm, ProjectsBoard } from '../components/ProjectComponents'
import MaterialSuppliers from '../components/MaterialSuppliers'

const MarketplacePage = () => {
  const [specialists, setSpecialists] = useState([])
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('specialists')
  const [selectedSpecialist, setSelectedSpecialist] = useState(null)
  const [showHireForm, setShowHireForm] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: 'PRJ001',
      title: 'Office Building ACMV Installation',
      category: 'acmv',
      category_name: 'ACMV Systems',
      location: 'Kuala Lumpur',
      description: 'Complete ACMV system installation for a 10-story office building including chillers, AHUs, and ductwork. Must comply with Malaysian energy efficiency standards.',
      budget_min: 250000,
      budget_max: 350000,
      timeline_display: '3-6 months',
      posted_date: '2 days ago',
      proposals_count: 5,
      skills_required: ['ACMV Certification', 'Energy Efficiency', 'Commercial Projects']
    },
    {
      id: 'PRJ002',
      title: 'Residential Complex Fire Protection',
      category: 'fire_protection',
      category_name: 'Fire Protection',
      location: 'Penang',
      description: 'Design and installation of fire protection systems for a new residential complex with 150 units. Must comply with BOMBA regulations.',
      budget_min: 180000,
      budget_max: 220000,
      timeline_display: '2-4 weeks',
      posted_date: '1 week ago',
      proposals_count: 3,
      skills_required: ['BOMBA Certified', 'Fire Sprinkler Systems', 'Fire Alarm Systems']
    }
  ])
  
  // Mock API call - in production, this would be a real API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setSpecialists([
        {
          id: 'SP001',
          name: 'Ahmad Bin Hassan',
          specialty: 'IWK Certified Plumber',
          certifications: ['IWK Certified', 'CIDB Grade G4'],
          location: 'Kuala Lumpur',
          rating: 4.8,
          reviews: 127,
          hourly_rate: 85,
          availability: 'Available',
          profile_image: 'https://randomuser.me/api/portraits/men/1.jpg',
          specialties: ['Sewerage Systems', 'Drainage', 'Water Supply'],
          bio: 'Experienced plumber with 12 years in the industry. Specialized in IWK-compliant sewerage systems and drainage solutions. Committed to quality workmanship and timely project completion.',
          contact: {
            phone: '+60 12-345 6789',
            email: 'ahmad.hassan@email.com'
          },
          portfolio: [
            {
              project: 'Residential Complex Sewerage System',
              location: 'Mont Kiara, KL',
              year: 2024,
              description: 'Complete sewerage system installation for 200-unit residential complex'
            },
            {
              project: 'Commercial Building Drainage',
              location: 'KLCC, KL',
              year: 2023,
              description: 'Storm drainage system for 30-story commercial building'
            }
          ]
        },
        {
          id: 'SP002',
          name: 'Lim Wei Ming',
          specialty: 'High Voltage Electrician',
          certifications: ['TNB Certified', 'CIDB Grade G5'],
          location: 'Penang',
          rating: 4.9,
          reviews: 203,
          hourly_rate: 120,
          availability: 'Available',
          profile_image: 'https://randomuser.me/api/portraits/men/2.jpg',
          specialties: ['High Voltage Systems', 'Switchgear', 'Power Distribution']
        },
        {
          id: 'SP003',
          name: 'Siti Nurhaliza',
          specialty: 'ACMV Technician',
          certifications: ['ACMV Certified', 'CIDB Grade G4'],
          location: 'Johor Bahru',
          rating: 4.7,
          reviews: 94,
          hourly_rate: 95,
          availability: 'Busy',
          profile_image: 'https://randomuser.me/api/portraits/women/3.jpg',
          specialties: ['ACMV Systems', 'Chiller Maintenance', 'Ductwork']
        },
        {
          id: 'SP004',
          name: 'Raj Kumar',
          specialty: 'Fire Protection Specialist',
          certifications: ['BOMBA Certified', 'NFPA Certified'],
          location: 'Kuala Lumpur',
          rating: 4.9,
          reviews: 178,
          hourly_rate: 110,
          availability: 'Available',
          profile_image: 'https://randomuser.me/api/portraits/men/4.jpg',
          specialties: ['Fire Sprinkler Systems', 'Fire Alarm', 'Emergency Systems']
        },
        {
          id: 'SP005',
          name: 'Chen Li Hua',
          specialty: 'ELV Systems Engineer',
          certifications: ['SIRIM Certified', 'CCTV Specialist'],
          location: 'Selangor',
          rating: 4.6,
          reviews: 112,
          hourly_rate: 100,
          availability: 'Available',
          profile_image: 'https://randomuser.me/api/portraits/women/5.jpg',
          specialties: ['CCTV Systems', 'Access Control', 'PA Systems']
        },
        {
          id: 'SP006',
          name: 'Muhammad Farid',
          specialty: 'Fiber Optic Technician',
          certifications: ['TM Certified', 'Fiber Optic Specialist'],
          location: 'Penang',
          rating: 4.8,
          reviews: 156,
          hourly_rate: 90,
          availability: 'Available',
          profile_image: 'https://randomuser.me/api/portraits/men/6.jpg',
          specialties: ['Fiber Optic Installation', 'Network Cabling', 'Telecommunications']
        }
      ])
      
      setCategories({
        'all': { name: 'All Specialists', count: 6 },
        'plumbing': { name: 'Plumbing & Water Systems', count: 1 },
        'electrical': { name: 'Electrical Systems', count: 1 },
        'acmv': { name: 'ACMV Systems', count: 1 },
        'fire_protection': { name: 'Fire Protection', count: 1 },
        'elv': { name: 'ELV Systems', count: 1 },
        'telecommunications': { name: 'Telecommunications', count: 1 }
      })
      
      setLoading(false)
    }, 500)
  }, [])
  
  // Filter specialists based on search and filters
  const filteredSpecialists = specialists.filter(specialist => {
    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryMap = {
        'plumbing': ['Plumber', 'Water', 'Sewerage', 'Drainage'],
        'electrical': ['Electrician', 'Voltage', 'Power'],
        'acmv': ['ACMV', 'Technician', 'Chiller'],
        'fire_protection': ['Fire', 'BOMBA', 'NFPA'],
        'elv': ['ELV', 'CCTV', 'Access Control'],
        'telecommunications': ['Fiber', 'Network', 'Telecommunications']
      }
      
      const keywords = categoryMap[selectedCategory]
      const matchesCategory = keywords.some(keyword => 
        specialist.specialty.includes(keyword) || 
        specialist.specialties.some(s => s.includes(keyword))
      )
      
      if (!matchesCategory) return false
    }
    
    // Filter by location
    if (locationFilter !== 'all' && specialist.location !== locationFilter) {
      return false
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        specialist.name.toLowerCase().includes(query) ||
        specialist.specialty.toLowerCase().includes(query) ||
        specialist.specialties.some(s => s.toLowerCase().includes(query)) ||
        specialist.certifications.some(c => c.toLowerCase().includes(query))
      )
    }
    
    return true
  })
  
  // Get unique locations for filter
  const locations = ['all', ...new Set(specialists.map(s => s.location))]
  
  // Handle specialist selection
  const handleViewProfile = (specialist) => {
    setSelectedSpecialist(specialist)
  }
  
  // Handle hire specialist
  const handleHireClick = (specialist) => {
    setSelectedSpecialist(specialist)
    setShowHireForm(true)
  }
  
  // Handle hire form submission
  const handleHireSubmit = (data) => {
    // In a real app, this would be an API call
    console.log('Hire request submitted:', data)
    setShowHireForm(false)
    setSelectedSpecialist(null)
    setSuccessMessage(`Hiring request for ${data.specialist_id} submitted successfully!`)
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }
  
  // Handle project form submission
  const handleProjectSubmit = (data) => {
    // In a real app, this would be an API call
    console.log('Project posted:', data)
    
    // Add the new project to the list
    const newProject = {
      id: `PRJ${Math.floor(Math.random() * 1000)}`,
      title: data.title,
      category: data.category,
      category_name: categories[data.category]?.name || data.category,
      location: data.location,
      description: data.description,
      budget_min: data.budget_min,
      budget_max: data.budget_max,
      timeline_display: data.timeline,
      posted_date: 'Just now',
      proposals_count: 0,
      skills_required: data.skills_required
    }
    
    setProjects([newProject, ...projects])
    setShowProjectForm(false)
    setSuccessMessage('Project posted successfully!')
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Specialist Marketplace</h1>
      <p className="text-lg text-center mb-12">
        Connect with qualified MEP specialists across Malaysia
      </p>
      
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'specialists' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('specialists')}
          >
            Find Specialists
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'projects' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects Board
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'suppliers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('suppliers')}
          >
            Material Suppliers
          </button>
        </nav>
      </div>
      
      {/* Specialists Tab */}
      {activeTab === 'specialists' && (
        <>
          {/* Search and Filter Section */}
          <div className="bg-card rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search specialists, skills, or certifications..."
                  className="w-full px-4 py-2 border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 border rounded-md bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {Object.entries(categories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                
                <select
                  className="px-4 py-2 border rounded-md bg-white"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Specialists Listing */}
          <h2 className="text-2xl font-semibold mb-6">Available Specialists</h2>
          
          {loading ? (
            <div className="text-center py-12">Loading specialists...</div>
          ) : filteredSpecialists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">No specialists found matching your criteria.</p>
              <Button className="mt-4" variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setLocationFilter('all')
              }}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecialists.map(specialist => (
                <Card key={specialist.id} className="overflow-hidden">
                  <div className="flex items-center p-6">
                    <img 
                      src={specialist.profile_image} 
                      alt={specialist.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{specialist.name}</h3>
                      <p className="text-sm text-gray-600">{specialist.specialty}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{specialist.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({specialist.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-2">
                    <p className="mb-2">
                      <span className="font-medium">Location:</span> {specialist.location}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Rate:</span> RM{specialist.hourly_rate}/hour
                    </p>
                    <p className="mb-4">
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-1 ${specialist.availability === 'Available' ? 'text-green-600' : 'text-amber-600'}`}>
                        {specialist.availability}
                      </span>
                    </p>
                    
                    <div className="mb-4">
                      {specialist.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="mr-2 mb-2">{cert}</Badge>
                      ))}
                    </div>
                    
                    <div className="mb-4">
                      {specialist.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <CardFooter className="border-t bg-gray-50 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(specialist)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleHireClick(specialist)}
                      disabled={specialist.availability !== 'Available'}
                    >
                      Hire Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
      
      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Projects Board</h2>
            <Button onClick={() => setShowProjectForm(true)}>Post a Project</Button>
          </div>
          
          <ProjectsBoard projects={projects} />
        </div>
      )}
      
      {/* Suppliers Tab */}
      {activeTab === 'suppliers' && (
        <MaterialSuppliers />
      )}
      
      {/* Specialist Detail Modal */}
      {selectedSpecialist && !showHireForm && (
        <SpecialistDetailModal 
          specialist={selectedSpecialist} 
          onClose={() => setSelectedSpecialist(null)}
          onHire={handleHireClick}
        />
      )}
      
      {/* Hire Specialist Form */}
      {showHireForm && selectedSpecialist && (
        <HireSpecialistForm 
          specialist={selectedSpecialist}
          onClose={() => setShowHireForm(false)}
          onSubmit={handleHireSubmit}
        />
      )}
      
      {/* Post Project Form */}
      {showProjectForm && (
        <PostProjectForm 
          onClose={() => setShowProjectForm(false)}
          onSubmit={handleProjectSubmit}
        />
      )}
    </div>
  )
}

export default MarketplacePage
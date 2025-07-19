import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, Briefcase, Award, ChevronDown, Users, Phone, Mail, Calendar } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Avatar } from '../components/ui/avatar.jsx'
import PageTransition from '../components/PageTransition.jsx'

const SpecialistMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedSpecialist, setSelectedSpecialist] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  // Mock data for specialists
  const specialists = [
    {
      id: 1,
      name: "Tan Wei Ming",
      avatar: "/avatar1.png",
      specialty: "Electrical Engineer",
      specialtyCategory: "electrical",
      location: "Kuala Lumpur",
      rating: 4.8,
      reviews: 24,
      hourlyRate: 120,
      experience: 12,
      availability: "Available Now",
      certifications: ["Professional Engineer (PE)", "TNB Certified", "Energy Commission Licensed"],
      skills: ["Power Distribution", "Building Automation", "Lighting Design", "Energy Efficiency"],
      bio: "Electrical engineer with 12 years of experience in commercial and industrial projects. Specializing in power distribution systems and energy-efficient designs for high-rise buildings.",
      projects: [
        { name: "KL Sentral Office Tower", role: "Lead Electrical Engineer", year: "2022" },
        { name: "Putrajaya Government Complex", role: "Electrical Consultant", year: "2020" },
        { name: "Johor Bahru Shopping Mall", role: "MEP Coordinator", year: "2019" }
      ],
      contact: {
        email: "tanweiming@example.com",
        phone: "+60 12-345-6789"
      }
    },
    {
      id: 2,
      name: "Siti Aminah",
      avatar: "/avatar2.png",
      specialty: "Plumbing Engineer",
      specialtyCategory: "plumbing",
      location: "Penang",
      rating: 4.9,
      reviews: 31,
      hourlyRate: 110,
      experience: 15,
      availability: "Available in 2 weeks",
      certifications: ["Professional Engineer (PE)", "IWK Certified", "Green Building Professional"],
      skills: ["Water Supply Systems", "Drainage Design", "Rainwater Harvesting", "Sustainable Plumbing"],
      bio: "Plumbing engineer with extensive experience in water supply and drainage systems. Expert in sustainable water management solutions for commercial and residential projects.",
      projects: [
        { name: "Penang Eco Park Residences", role: "Lead Plumbing Engineer", year: "2023" },
        { name: "Georgetown Heritage Hotel", role: "Water Systems Consultant", year: "2021" },
        { name: "Butterworth Industrial Complex", role: "Plumbing Systems Designer", year: "2019" }
      ],
      contact: {
        email: "sitiaminah@example.com",
        phone: "+60 13-456-7890"
      }
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      avatar: "/avatar3.png",
      specialty: "HVAC Engineer",
      specialtyCategory: "mechanical",
      location: "Kuala Lumpur",
      rating: 4.7,
      reviews: 19,
      hourlyRate: 130,
      experience: 10,
      availability: "Available Now",
      certifications: ["ASHRAE Member", "Professional Engineer (PE)", "Energy Efficiency Specialist"],
      skills: ["Chiller Systems", "VRF Systems", "Energy Modeling", "Indoor Air Quality"],
      bio: "HVAC specialist with focus on energy-efficient cooling solutions for Malaysia's tropical climate. Experience in designing systems for healthcare, commercial, and data center facilities.",
      projects: [
        { name: "KL Medical Center", role: "HVAC Lead", year: "2022" },
        { name: "Cyberjaya Data Center", role: "Mechanical Engineer", year: "2021" },
        { name: "KLCC Office Tower", role: "HVAC Consultant", year: "2020" }
      ],
      contact: {
        email: "rajeshkumar@example.com",
        phone: "+60 14-567-8901"
      }
    },
    {
      id: 4,
      name: "Lim Mei Ling",
      avatar: "/avatar4.png",
      specialty: "Fire Protection Engineer",
      specialtyCategory: "fire_safety",
      location: "Johor",
      rating: 4.9,
      reviews: 27,
      hourlyRate: 125,
      experience: 14,
      availability: "Available in 1 week",
      certifications: ["BOMBA Certified", "Professional Engineer (PE)", "NFPA Member"],
      skills: ["Sprinkler Systems", "Fire Alarm Design", "Smoke Control", "Emergency Evacuation"],
      bio: "Fire protection specialist with expertise in comprehensive fire safety systems. Experienced in high-rise, industrial, and commercial projects throughout Malaysia.",
      projects: [
        { name: "Johor Premium Outlets", role: "Fire Safety Lead", year: "2023" },
        { name: "Iskandar Financial District", role: "Fire Protection Consultant", year: "2021" },
        { name: "Singapore-Malaysia Industrial Park", role: "Fire Systems Engineer", year: "2020" }
      ],
      contact: {
        email: "limmeiling@example.com",
        phone: "+60 15-678-9012"
      }
    },
    {
      id: 5,
      name: "Ahmad Rizal",
      avatar: "/avatar5.png",
      specialty: "Building Automation Specialist",
      specialtyCategory: "automation",
      location: "Kuala Lumpur",
      rating: 4.6,
      reviews: 15,
      hourlyRate: 140,
      experience: 8,
      availability: "Available Now",
      certifications: ["KNX Certified", "BACnet Specialist", "IoT Solutions Provider"],
      skills: ["BMS Integration", "Smart Building Systems", "Energy Management", "Security Systems"],
      bio: "Building automation expert specializing in integrated smart building solutions. Experience with KNX, BACnet, and IoT systems for commercial and high-end residential projects.",
      projects: [
        { name: "TRX Financial Tower", role: "Automation Systems Lead", year: "2022" },
        { name: "Bangsar South Smart Offices", role: "BMS Consultant", year: "2021" },
        { name: "Damansara Smart Homes", role: "IoT Systems Designer", year: "2020" }
      ],
      contact: {
        email: "ahmadrizal@example.com",
        phone: "+60 16-789-0123"
      }
    }
  ]
  
  // Filter specialists based on search query and filters
  const filteredSpecialists = specialists.filter(specialist => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSpecialty = selectedSpecialty === 'all' || specialist.specialtyCategory === selectedSpecialty
    const matchesLocation = selectedLocation === 'all' || specialist.location === selectedLocation
    
    return matchesSearch && matchesSpecialty && matchesLocation
  })
  
  // Get unique locations for filter
  const locations = [...new Set(specialists.map(s => s.location))]
  
  // Specialty categories
  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'mechanical', name: 'Mechanical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'fire_safety', name: 'Fire Safety' },
    { id: 'automation', name: 'Building Automation' }
  ]
  
  const handleSpecialistSelect = (specialist) => {
    setSelectedSpecialist(specialist)
  }
  
  const handleContactSpecialist = () => {
    alert(`Contact request sent to ${selectedSpecialist.name}`)
  }
  
  return (
    <PageTransition>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              as="a"
              href="/features"
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Features
            </Button>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Specialist Marketplace</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Connect with qualified MEP specialists across Malaysia for your construction projects
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search specialists by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 p-4 border border-border rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialty</label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {specialties.map((specialty) => (
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Specialists List */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Available Specialists</h3>
              
              {filteredSpecialists.length > 0 ? (
                <div className="space-y-4">
                  {filteredSpecialists.map((specialist) => (
                    <Card 
                      key={specialist.id}
                      className={`cursor-pointer transition-all ${selectedSpecialist?.id === specialist.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleSpecialistSelect(specialist)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <img src={specialist.avatar} alt={specialist.name} />
                          </Avatar>
                          
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h4 className="text-lg font-semibold">{specialist.name}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{specialist.rating}</span>
                                <span className="text-text-muted">({specialist.reviews} reviews)</span>
                              </div>
                            </div>
                            
                            <div className="mt-1 text-primary font-medium">{specialist.specialty}</div>
                            
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{specialist.location}</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                <span>{specialist.experience} years exp.</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{specialist.availability}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {specialist.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-background-secondary">
                                  {skill}
                                </Badge>
                              ))}
                              {specialist.skills.length > 3 && (
                                <Badge variant="outline" className="bg-background-secondary">
                                  +{specialist.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right hidden sm:block">
                            <div className="text-lg font-bold text-primary">RM {specialist.hourlyRate}/hr</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-background-secondary rounded-lg">
                  <Users className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
                  <h4 className="text-lg font-medium mb-2">No specialists found</h4>
                  <p className="text-text-muted">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
            
            {/* Specialist Details */}
            <div>
              {selectedSpecialist ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Specialist Profile</CardTitle>
                    <CardDescription>Detailed information and contact options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <img src={selectedSpecialist.avatar} alt={selectedSpecialist.name} />
                      </Avatar>
                      <h3 className="text-xl font-bold">{selectedSpecialist.name}</h3>
                      <div className="text-primary font-medium">{selectedSpecialist.specialty}</div>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{selectedSpecialist.rating}</span>
                        <span className="text-text-muted">({selectedSpecialist.reviews} reviews)</span>
                      </div>
                      <div className="mt-2 text-lg font-bold text-primary">RM {selectedSpecialist.hourlyRate}/hr</div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-text-muted" />
                        <span>{selectedSpecialist.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-text-muted" />
                        <span>{selectedSpecialist.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-text-muted" />
                        <span>{selectedSpecialist.availability}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">About</h4>
                      <p className="text-text-secondary">{selectedSpecialist.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSpecialist.certifications.map((cert, index) => (
                          <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Notable Projects</h4>
                      <div className="space-y-2">
                        {selectedSpecialist.projects.map((project, index) => (
                          <div key={index} className="p-3 bg-background-secondary rounded-lg">
                            <div className="font-medium">{project.name}</div>
                            <div className="flex justify-between text-sm">
                              <span className="text-text-muted">{project.role}</span>
                              <span className="text-text-muted">{project.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-text-muted" />
                          <a href={`mailto:${selectedSpecialist.contact.email}`} className="text-primary hover:underline">
                            {selectedSpecialist.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-text-muted" />
                          <a href={`tel:${selectedSpecialist.contact.phone}`} className="text-primary hover:underline">
                            {selectedSpecialist.contact.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={handleContactSpecialist}>
                        Contact Specialist
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center bg-background-secondary rounded-lg p-8">
                  <div className="text-center">
                    <Users className="h-16 w-16 mx-auto mb-4 text-text-muted opacity-30" />
                    <h3 className="text-xl font-medium mb-2">Select a Specialist</h3>
                    <p className="text-text-muted max-w-md">
                      Click on a specialist card to view their detailed profile and contact information.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default SpecialistMarketplace
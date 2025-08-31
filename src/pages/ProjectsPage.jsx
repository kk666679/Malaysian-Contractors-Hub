import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, MapPin, Calendar, DollarSign, Users, Building2, ChevronDown, Plus } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import PageTransition from '../components/features/PageTransition.jsx'
import { Link } from 'react-router-dom'

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'KL Tower Renovation',
      type: 'Commercial',
      location: 'Kuala Lumpur',
      budget: 2500000,
      duration: '12 months',
      status: 'In Progress',
      client: 'KL Tower Management',
      description: 'Complete renovation of KL Tower including facade upgrades and interior modernization.',
      startDate: '2024-01-15',
      completionDate: '2025-01-15',
      team: ['Ahmad Rizal', 'Siti Aminah', 'Rajesh Kumar'],
      progress: 35
    },
    {
      id: 2,
      title: 'Penang Bridge Maintenance',
      type: 'Infrastructure',
      location: 'Penang',
      budget: 1800000,
      duration: '8 months',
      status: 'Planning',
      client: 'Penang State Government',
      description: 'Structural maintenance and painting of Penang Bridge infrastructure.',
      startDate: '2024-03-01',
      completionDate: '2024-11-01',
      team: ['Lim Wei Ming', 'Tan Mei Ling'],
      progress: 10
    },
    {
      id: 3,
      title: 'Johor Bahru Shopping Mall',
      type: 'Commercial',
      location: 'Johor',
      budget: 4500000,
      duration: '18 months',
      status: 'Completed',
      client: 'Johor Development Corp',
      description: 'Construction of modern shopping mall with retail spaces and entertainment facilities.',
      startDate: '2022-06-01',
      completionDate: '2023-12-01',
      team: ['Ahmad Ismail', 'Sarah Tan', 'Rajesh Kumar', 'Lim Mei Ling'],
      progress: 100
    },
    {
      id: 4,
      title: 'Cyberjaya Data Center',
      type: 'Industrial',
      location: 'Selangor',
      budget: 3200000,
      duration: '15 months',
      status: 'In Progress',
      client: 'TechCorp Malaysia',
      description: 'Construction of high-security data center with redundant power systems.',
      startDate: '2023-09-01',
      completionDate: '2024-12-01',
      team: ['Tan Wei Ming', 'Ahmad Rizal', 'Siti Aminah'],
      progress: 65
    },
    {
      id: 5,
      title: 'Kuala Lumpur Hospital Extension',
      type: 'Healthcare',
      location: 'Kuala Lumpur',
      budget: 5800000,
      duration: '24 months',
      status: 'Planning',
      client: 'Ministry of Health',
      description: 'Hospital wing extension with specialized medical facilities and patient wards.',
      startDate: '2024-06-01',
      completionDate: '2026-06-01',
      team: ['Dr. Lim Chen', 'Ahmad Rizal', 'Sarah Tan'],
      progress: 5
    }
  ]

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === 'all' || project.type.toLowerCase() === selectedType.toLowerCase()
    const matchesLocation = selectedLocation === 'all' || project.location === selectedLocation

    return matchesSearch && matchesType && matchesLocation
  })

  // Get unique locations for filter
  const locations = [...new Set(projects.map(p => p.location))]

  // Project types
  const projectTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'residential', name: 'Residential' }
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case 'Planning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Planning</Badge>
      case 'On Hold':
        return <Badge className="bg-red-100 text-red-800 border-red-200">On Hold</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
    }
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
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Manage and track all your construction projects in one centralized location
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search projects by name, client, or description..."
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

              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
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
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
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

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({projects.filter(p => p.status === 'In Progress').length})</TabsTrigger>
              <TabsTrigger value="planning">Planning ({projects.filter(p => p.status === 'Planning').length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({projects.filter(p => p.status === 'Completed').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-text-muted">Budget</div>
                          <div className="font-semibold">{formatCurrency(project.budget)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.team.length} team members</span>
                        </div>
                        <Button as={Link} to={`/dashboard/projects/${project.id}`} size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.status === 'In Progress').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-text-muted">Budget</div>
                          <div className="font-semibold">{formatCurrency(project.budget)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.team.length} team members</span>
                        </div>
                        <Button as={Link} to={`/dashboard/projects/${project.id}`} size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="planning">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.status === 'Planning').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-text-muted">Budget</div>
                          <div className="font-semibold">{formatCurrency(project.budget)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.team.length} team members</span>
                        </div>
                        <Button as={Link} to={`/dashboard/projects/${project.id}`} size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.filter(p => p.status === 'Completed').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary line-clamp-2">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-text-muted">Budget</div>
                          <div className="font-semibold">{formatCurrency(project.budget)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.team.length} team members</span>
                        </div>
                        <Button as={Link} to={`/dashboard/projects/${project.id}`} size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-background-secondary rounded-lg">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
              <h4 className="text-lg font-medium mb-2">No projects found</h4>
              <p className="text-text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}

export default ProjectsPage

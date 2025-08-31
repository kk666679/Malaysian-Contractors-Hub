import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, MapPin, Calendar, DollarSign, Users, Building2, ChevronDown, Plus, Loader2 } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import PageTransition from '../components/features/PageTransition.jsx'
import { Link } from 'react-router-dom'
import projectService from '../lib/projectService'
import { useAuth } from '../contexts/AuthContext'
import ProjectCreateForm from '../components/projects/ProjectCreateForm'

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const { isAuthenticated } = useAuth()

  // Fetch projects on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
    }
  }, [isAuthenticated])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await projectService.getAllProjects()
      if (response.success) {
        setProjects(response.data.projects || [])
      } else {
        setError('Failed to load projects')
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = (project.name || project.title)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === 'all' || project.category?.toLowerCase() === selectedType.toLowerCase()
    const matchesLocation = selectedLocation === 'all' || project.location === selectedLocation

    return matchesSearch && matchesType && matchesLocation
  })

  // Get unique locations for filter
  const locations = [...new Set(projects.map(p => p.location).filter(Boolean))]

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

              <Button className="flex items-center gap-2" onClick={() => setShowCreateForm(true)}>
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-2" />
              <span>Loading projects...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">{error}</div>
              <Button onClick={fetchProjects} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Projects Content */}
          {!loading && !error && (
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'In Progress').length})</TabsTrigger>
                <TabsTrigger value="planning">Planning ({projects.filter(p => p.status === 'PLANNING' || p.status === 'Planning').length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({projects.filter(p => p.status === 'COMPLETED' || p.status === 'Completed').length})</TabsTrigger>
              </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.name || project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.category || project.type}</span>
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
                          <div className="font-semibold">{formatCurrency(project.budget || 0)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.teamMembers?.length || 0} team members</span>
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
                {filteredProjects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'In Progress').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.name || project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.category || project.type}</span>
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
                          <div className="font-semibold">{formatCurrency(project.budget || 0)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.teamMembers?.length || 0} team members</span>
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
                {filteredProjects.filter(p => p.status === 'PLANNING' || p.status === 'Planning').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.name || project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.category || project.type}</span>
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
                          <div className="font-semibold">{formatCurrency(project.budget || 0)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.teamMembers?.length || 0} team members</span>
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
                {filteredProjects.filter(p => p.status === 'COMPLETED' || p.status === 'Completed').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.name || project.title}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        {getStatusBadge(project.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{project.category || project.type}</span>
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
                          <div className="font-semibold">{formatCurrency(project.budget || 0)}</div>
                        </div>
                        <div>
                          <div className="text-text-muted">Duration</div>
                          <div className="font-semibold">{project.duration || 'N/A'}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-background-secondary rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-sm text-text-muted">
                          <Users className="h-4 w-4" />
                          <span>{project.teamMembers?.length || 0} team members</span>
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
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-background-secondary rounded-lg">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
              <h4 className="text-lg font-medium mb-2">No projects found</h4>
              <p className="text-text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {showCreateForm && (
          <ProjectCreateForm
            onClose={() => setShowCreateForm(false)}
            onSuccess={(newProject) => {
              setProjects(prev => [newProject, ...prev]);
              setShowCreateForm(false);
            }}
          />
        )}
      </section>
    </PageTransition>
  )
}

export default ProjectsPage

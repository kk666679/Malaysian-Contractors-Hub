import React from 'react';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, Filter, FileText, Shield, AlertTriangle, CheckCircle, Clock, Download, ExternalLink, ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import PageTransition from '../components/features/PageTransition.jsx'

const CompliancePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for compliance documents
  const documents = [
    {
      id: 1,
      title: 'CIDB Compliance Guide 2024',
      category: 'CIDB Standards',
      type: 'Guide',
      status: 'Active',
      lastUpdated: '2024-01-15',
      description: 'Comprehensive guide to Construction Industry Development Board compliance requirements for Malaysian contractors.',
      downloadUrl: '#',
      tags: ['CIDB', 'Compliance', 'Standards'],
      priority: 'High'
    },
    {
      id: 2,
      title: 'JKR Building Standards 2023',
      category: 'JKR Standards',
      type: 'Standard',
      status: 'Active',
      lastUpdated: '2023-11-20',
      description: 'Public Works Department building standards and specifications for infrastructure projects.',
      downloadUrl: '#',
      tags: ['JKR', 'Infrastructure', 'Standards'],
      priority: 'High'
    },
    {
      id: 3,
      title: 'Malaysian MEP Best Practices',
      category: 'MEP Guidelines',
      type: 'Guideline',
      status: 'Active',
      lastUpdated: '2024-02-01',
      description: 'Best practices for Mechanical, Electrical, and Plumbing systems in Malaysian construction.',
      downloadUrl: '#',
      tags: ['MEP', 'Best Practices', 'Guidelines'],
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Green Building Index Requirements',
      category: 'Sustainability',
      type: 'Requirement',
      status: 'Active',
      lastUpdated: '2023-12-10',
      description: 'Requirements and guidelines for achieving Green Building Index certification in Malaysia.',
      downloadUrl: '#',
      tags: ['Green Building', 'Sustainability', 'Certification'],
      priority: 'Medium'
    },
    {
      id: 5,
      title: 'Occupational Safety Guidelines',
      category: 'Safety',
      type: 'Guideline',
      status: 'Active',
      lastUpdated: '2024-01-30',
      description: 'DOSH occupational safety and health guidelines for construction sites.',
      downloadUrl: '#',
      tags: ['Safety', 'DOSH', 'OSH'],
      priority: 'High'
    },
    {
      id: 6,
      title: 'Fire Safety Regulations 2024',
      category: 'Safety',
      type: 'Regulation',
      status: 'Active',
      lastUpdated: '2024-03-01',
      description: 'BOMBA fire safety regulations and requirements for buildings and construction sites.',
      downloadUrl: '#',
      tags: ['Fire Safety', 'BOMBA', 'Regulations'],
      priority: 'High'
    },
    {
      id: 7,
      title: 'Environmental Impact Assessment',
      category: 'Environmental',
      type: 'Assessment',
      status: 'Active',
      lastUpdated: '2023-10-15',
      description: 'Guidelines for conducting environmental impact assessments for construction projects.',
      downloadUrl: '#',
      tags: ['EIA', 'Environment', 'Assessment'],
      priority: 'Medium'
    },
    {
      id: 8,
      title: 'Construction Quality Control Manual',
      category: 'Quality',
      type: 'Manual',
      status: 'Active',
      lastUpdated: '2023-09-20',
      description: 'Quality control procedures and standards for Malaysian construction projects.',
      downloadUrl: '#',
      tags: ['Quality Control', 'Standards', 'Manual'],
      priority: 'Medium'
    }
  ]

  // Filter documents based on search query and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = [...new Set(documents.map(d => d.category))]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case 'Under Review':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Under Review</Badge>
      case 'Deprecated':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Deprecated</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Priority</Badge>
      case 'Low':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low Priority</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{priority}</Badge>
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Guide':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'Standard':
        return <Shield className="h-5 w-5 text-green-500" />
      case 'Guideline':
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      case 'Requirement':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'Regulation':
        return <Shield className="h-5 w-5 text-red-500" />
      case 'Assessment':
        return <FileText className="h-5 w-5 text-cyan-500" />
      case 'Manual':
        return <FileText className="h-5 w-5 text-indigo-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
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
            <h2 className="text-3xl font-bold mb-4">Compliance & Standards</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Access the latest Malaysian construction compliance documents, standards, and regulatory requirements
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search documents by title, description, or tags..."
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
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Document Type</label>
                    <select
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="Guide">Guide</option>
                      <option value="Standard">Standard</option>
                      <option value="Guideline">Guideline</option>
                      <option value="Requirement">Requirement</option>
                      <option value="Regulation">Regulation</option>
                      <option value="Assessment">Assessment</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Documents ({documents.length})</TabsTrigger>
              <TabsTrigger value="standards">Standards ({documents.filter(d => d.type === 'Standard').length})</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines ({documents.filter(d => d.type === 'Guideline').length})</TabsTrigger>
              <TabsTrigger value="regulations">Regulations ({documents.filter(d => d.type === 'Regulation').length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(doc.type)}
                          <div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <CardDescription>{doc.category}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-text-secondary line-clamp-3">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-2">
                        {getPriorityBadge(doc.priority)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="standards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.filter(d => d.type === 'Standard').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(doc.type)}
                          <div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <CardDescription>{doc.category}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-text-secondary line-clamp-3">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-2">
                        {getPriorityBadge(doc.priority)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guidelines">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.filter(d => d.type === 'Guideline').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(doc.type)}
                          <div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <CardDescription>{doc.category}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-text-secondary line-clamp-3">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-2">
                        {getPriorityBadge(doc.priority)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.filter(d => d.type === 'Regulation').map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(doc.type)}
                          <div>
                            <CardTitle className="text-lg">{doc.title}</CardTitle>
                            <CardDescription>{doc.category}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-text-secondary line-clamp-3">
                        {doc.description}
                      </p>

                      <div className="flex items-center gap-2">
                        {getPriorityBadge(doc.priority)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-text-muted pt-2 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Updated {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12 bg-background-secondary rounded-lg">
              <FileText className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
              <h4 className="text-lg font-medium mb-2">No documents found</h4>
              <p className="text-text-muted">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}

export default CompliancePage

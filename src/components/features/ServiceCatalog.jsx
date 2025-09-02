import React from 'react';
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { 
  Building2, 
  Zap,
  Droplets,
  Shield,
  Wifi
} from 'lucide-react'

const ServiceCatalog = () => {
  const [activeTab, setActiveTab] = useState('civil')

  const tabs = [
    { id: 'civil', label: 'Civil' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'sewerage', label: 'Sewerage' },
    { id: 'elv', label: 'ELV' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'civil':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Earthworks
                </CardTitle>
                <CardDescription>
                  Excavation, grading, and site preparation services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">JKR Compliant</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Piling
                </CardTitle>
                <CardDescription>
                  Foundation and deep foundation systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">MS Standards</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Drainage
                </CardTitle>
                <CardDescription>
                  Surface and subsurface drainage systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">MSMA Compliant</Badge>
              </CardContent>
            </Card>
          </div>
        )

      case 'electrical':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Solar/Smart Grid
                </CardTitle>
                <CardDescription>
                  Renewable energy and smart grid solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">SEDA Approved</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Gensets
                </CardTitle>
                <CardDescription>
                  Generator systems for 24/7 operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">TNB Compliant</Badge>
              </CardContent>
            </Card>
          </div>
        )

      case 'sewerage':
        return (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                IWK-Approved Systems
              </CardTitle>
              <CardDescription>
                Sewerage systems compliant with Indah Water Konsortium standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">IWK Certified</Badge>
              <p className="text-sm text-gray-600 mt-2">
                Pre-configured templates for sewerage policies and procedures
              </p>
            </CardContent>
          </Card>
        )

      case 'elv':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  CCTV Systems
                </CardTitle>
                <CardDescription>
                  Security and surveillance systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">BOMBA Approved</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Access Control
                </CardTitle>
                <CardDescription>
                  Building access and security management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">MS Standards</Badge>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Catalog Manager</h2>
          <p className="text-lg text-gray-600">
            Dynamic database covering all 7 MEP domains with Malaysian-specific compliance
          </p>
        </div>

        <div className="w-full">
          {/* Tab Navigation */}
          <div className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceCatalog


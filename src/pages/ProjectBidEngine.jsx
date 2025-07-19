import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calculator, FileText, Clock, DollarSign, BarChart3, Building, Truck, Users } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import PageTransition from '../components/PageTransition.jsx'

const ProjectBidEngine = () => {
  const [bidData, setBidData] = useState({
    projectName: '',
    projectType: 'commercial',
    location: 'kuala_lumpur',
    area: 1000,
    duration: 6,
    complexity: 'medium'
  })
  
  const [bidResult, setBidResult] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const projectTypes = [
    { id: 'commercial', label: 'Commercial Building' },
    { id: 'residential', label: 'Residential' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'infrastructure', label: 'Infrastructure' }
  ]
  
  const locations = [
    { id: 'kuala_lumpur', label: 'Kuala Lumpur' },
    { id: 'penang', label: 'Penang' },
    { id: 'johor', label: 'Johor' },
    { id: 'sabah', label: 'Sabah' },
    { id: 'sarawak', label: 'Sarawak' }
  ]
  
  const complexityLevels = [
    { id: 'low', label: 'Low', description: 'Standard construction, minimal customization' },
    { id: 'medium', label: 'Medium', description: 'Some specialized systems, moderate customization' },
    { id: 'high', label: 'High', description: 'Highly specialized, extensive customization' }
  ]

  const generateBid = async () => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Calculate base cost based on area and project type
    const baseRates = {
      commercial: 1200,
      residential: 950,
      industrial: 1500,
      infrastructure: 2200
    }
    
    // Location multipliers
    const locationMultipliers = {
      kuala_lumpur: 1.2,
      penang: 1.1,
      johor: 1.0,
      sabah: 1.15,
      sarawak: 1.25
    }
    
    // Complexity multipliers
    const complexityMultipliers = {
      low: 0.85,
      medium: 1.0,
      high: 1.35
    }
    
    const baseRate = baseRates[bidData.projectType] || 1000
    const locationMultiplier = locationMultipliers[bidData.location] || 1.0
    const complexityMultiplier = complexityMultipliers[bidData.complexity] || 1.0
    
    const totalArea = parseFloat(bidData.area) || 0
    const totalCost = baseRate * totalArea * locationMultiplier * complexityMultiplier
    
    // Calculate cost breakdown
    const materialCost = totalCost * 0.55
    const laborCost = totalCost * 0.25
    const equipmentCost = totalCost * 0.12
    const overheadCost = totalCost * 0.08
    
    // Generate timeline
    const durationMonths = parseInt(bidData.duration) || 6
    const timeline = [
      { phase: 'Planning & Approvals', duration: Math.max(1, Math.round(durationMonths * 0.15)), percentage: 10 },
      { phase: 'Foundation Work', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 15 },
      { phase: 'Structural Work', duration: Math.max(1, Math.round(durationMonths * 0.25)), percentage: 30 },
      { phase: 'MEP Installation', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 25 },
      { phase: 'Finishing & Handover', duration: Math.max(1, Math.round(durationMonths * 0.2)), percentage: 20 }
    ]
    
    // Generate resource requirements
    const resources = [
      { type: 'Skilled Labor', quantity: Math.ceil(totalArea / 100), unit: 'workers' },
      { type: 'Concrete', quantity: Math.ceil(totalArea * 0.3), unit: 'm³' },
      { type: 'Steel', quantity: Math.ceil(totalArea * 0.05), unit: 'tons' },
      { type: 'Heavy Equipment', quantity: Math.ceil(totalArea / 500), unit: 'units' }
    ]
    
    // Generate risk assessment
    const risks = [
      { type: 'Weather Delays', probability: 'Medium', impact: 'Moderate', mitigation: 'Schedule buffer of 2 weeks' },
      { type: 'Material Price Fluctuation', probability: 'High', impact: 'Significant', mitigation: 'Pre-purchase critical materials' },
      { type: 'Labor Shortage', probability: 'Low', impact: 'Moderate', mitigation: 'Early contractor engagement' }
    ]
    
    setBidResult({
      projectName: bidData.projectName || 'Unnamed Project',
      totalCost: totalCost,
      costPerSqm: totalCost / totalArea,
      costBreakdown: {
        materials: materialCost,
        labor: laborCost,
        equipment: equipmentCost,
        overhead: overheadCost
      },
      timeline,
      resources,
      risks
    })
    
    setLoading(false)
  }
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
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
            <h2 className="text-3xl font-bold mb-4">Project Bid Engine</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Generate accurate project bids with comprehensive cost database tailored for Malaysian construction industry
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Project Parameters
                </CardTitle>
                <CardDescription>
                  Enter your project details to generate an accurate bid
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={bidData.projectName}
                    onChange={(e) => setBidData(prev => ({ ...prev, projectName: e.target.value }))}
                    placeholder="Enter project name"
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    value={bidData.projectType}
                    onChange={(e) => setBidData(prev => ({ ...prev, projectType: e.target.value }))}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {projectTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <select
                    value={bidData.location}
                    onChange={(e) => setBidData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Project Area */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Area (m²)
                  </label>
                  <input
                    type="number"
                    value={bidData.area}
                    onChange={(e) => setBidData(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                  />
                </div>
                
                {/* Project Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Duration (months)
                  </label>
                  <input
                    type="number"
                    value={bidData.duration}
                    onChange={(e) => setBidData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    max="60"
                  />
                </div>
                
                {/* Complexity */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Complexity
                  </label>
                  <div className="space-y-2">
                    {complexityLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setBidData(prev => ({ ...prev, complexity: level.id }))}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          bidData.complexity === level.id
                            ? 'border-primary bg-primary-hover/10 text-primary'
                            : 'border-border hover:border-primary/30'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{level.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {level.description}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={generateBid} 
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Generating Bid...' : 'Generate Project Bid'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Bid Results */}
            <div>
              {bidResult ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Bid Results: {bidResult.projectName}
                    </CardTitle>
                    <CardDescription>
                      Comprehensive bid analysis and cost breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="summary">
                      <TabsList className="grid grid-cols-4 mb-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="risks">Risks</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary" className="space-y-4">
                        {/* Cost Summary */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background-secondary p-4 rounded-lg text-center">
                            <div className="text-sm text-text-muted mb-1">Total Project Cost</div>
                            <div className="text-2xl font-bold text-primary">{formatCurrency(bidResult.totalCost)}</div>
                          </div>
                          <div className="bg-background-secondary p-4 rounded-lg text-center">
                            <div className="text-sm text-text-muted mb-1">Cost per m²</div>
                            <div className="text-2xl font-bold">{formatCurrency(bidResult.costPerSqm)}</div>
                          </div>
                        </div>
                        
                        {/* Cost Breakdown */}
                        <div>
                          <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <div className="w-32">Materials</div>
                              <div className="flex-1">
                                <div className="h-2 bg-background-secondary rounded-full">
                                  <div 
                                    className="h-2 bg-primary rounded-full" 
                                    style={{ width: '55%' }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-24 text-right">{formatCurrency(bidResult.costBreakdown.materials)}</div>
                              <div className="w-16 text-right text-text-muted">55%</div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-32">Labor</div>
                              <div className="flex-1">
                                <div className="h-2 bg-background-secondary rounded-full">
                                  <div 
                                    className="h-2 bg-primary rounded-full" 
                                    style={{ width: '25%' }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-24 text-right">{formatCurrency(bidResult.costBreakdown.labor)}</div>
                              <div className="w-16 text-right text-text-muted">25%</div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-32">Equipment</div>
                              <div className="flex-1">
                                <div className="h-2 bg-background-secondary rounded-full">
                                  <div 
                                    className="h-2 bg-primary rounded-full" 
                                    style={{ width: '12%' }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-24 text-right">{formatCurrency(bidResult.costBreakdown.equipment)}</div>
                              <div className="w-16 text-right text-text-muted">12%</div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-32">Overhead</div>
                              <div className="flex-1">
                                <div className="h-2 bg-background-secondary rounded-full">
                                  <div 
                                    className="h-2 bg-primary rounded-full" 
                                    style={{ width: '8%' }}
                                  ></div>
                                </div>
                              </div>
                              <div className="w-24 text-right">{formatCurrency(bidResult.costBreakdown.overhead)}</div>
                              <div className="w-16 text-right text-text-muted">8%</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-background-secondary rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-text-muted">
                            <DollarSign className="h-4 w-4" />
                            <span>Prices include GST and are based on current market rates in Malaysia</span>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="timeline" className="space-y-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Project Timeline ({bidData.duration} months)</h4>
                          
                          <div className="space-y-3">
                            {bidResult.timeline.map((phase, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <div className="font-medium">{phase.phase}</div>
                                  <div className="text-sm text-text-muted">{phase.duration} month{phase.duration > 1 ? 's' : ''}</div>
                                </div>
                                <div className="h-2 bg-background-secondary rounded-full">
                                  <div 
                                    className="h-2 bg-primary rounded-full" 
                                    style={{ width: `${phase.percentage}%` }}
                                  ></div>
                                </div>
                                <div className="text-right text-xs text-text-muted">{phase.percentage}% of project</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 p-3 bg-background-secondary rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-text-muted">
                              <Clock className="h-4 w-4" />
                              <span>Timeline includes approval processes and weather considerations</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="resources" className="space-y-4">
                        <h4 className="font-semibold">Resource Requirements</h4>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {bidResult.resources.map((resource, index) => (
                            <div key={index} className="p-3 bg-background-secondary rounded-lg">
                              <div className="text-sm text-text-muted">{resource.type}</div>
                              <div className="text-xl font-semibold">{resource.quantity} {resource.unit}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 p-3 bg-background-secondary rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-text-muted">
                            <Truck className="h-4 w-4" />
                            <span>Resource estimates based on project type and local availability</span>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="risks" className="space-y-4">
                        <h4 className="font-semibold">Risk Assessment</h4>
                        
                        <div className="space-y-3">
                          {bidResult.risks.map((risk, index) => (
                            <div key={index} className="p-3 bg-background-secondary rounded-lg">
                              <div className="flex justify-between">
                                <div className="font-medium">{risk.type}</div>
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    risk.probability === 'High' 
                                      ? 'text-red-500 border-red-200 bg-red-50' 
                                      : risk.probability === 'Medium'
                                        ? 'text-yellow-500 border-yellow-200 bg-yellow-50'
                                        : 'text-green-500 border-green-200 bg-green-50'
                                  }`}
                                >
                                  {risk.probability} probability
                                </Badge>
                              </div>
                              <div className="text-sm text-text-muted mt-1">Impact: {risk.impact}</div>
                              <div className="text-sm mt-2">
                                <span className="font-medium">Mitigation:</span> {risk.mitigation}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="mt-6">
                      <Button className="w-full">
                        Export Bid as PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] bg-background-secondary rounded-lg p-8">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-text-muted opacity-30" />
                    <h3 className="text-xl font-medium mb-2">No Bid Generated Yet</h3>
                    <p className="text-text-muted max-w-md">
                      Fill in the project parameters and click "Generate Project Bid" to create a detailed cost estimate and project plan.
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

export default ProjectBidEngine
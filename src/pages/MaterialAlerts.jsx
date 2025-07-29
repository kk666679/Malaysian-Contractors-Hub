import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, TrendingUp, TrendingDown, AlertTriangle, Package, Truck, Calendar, Filter, ChevronDown, Search, BarChart3, Percent, DollarSign, ShoppingCart, Clock } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const MaterialAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [subscribedAlerts, setSubscribedAlerts] = useState([1, 3, 5, 8])
  
  // Mock data for material alerts
  const materialAlerts = [
    {
      id: 1,
      material: "Steel Reinforcement Bars",
      category: "structural",
      priceChange: 8.5,
      currentPrice: 3250,
      unit: "per ton",
      trend: "up",
      impact: "high",
      date: "2024-08-01",
      suppliers: 4,
      notes: "Global steel prices rising due to increased demand and supply chain constraints."
    },
    {
      id: 2,
      material: "Portland Cement",
      category: "concrete",
      priceChange: -2.1,
      currentPrice: 21.50,
      unit: "per bag",
      trend: "down",
      impact: "medium",
      date: "2024-08-03",
      suppliers: 6,
      notes: "Local oversupply has led to price reductions from major suppliers."
    },
    {
      id: 3,
      material: "Copper Wiring",
      category: "electrical",
      priceChange: 12.3,
      currentPrice: 42.80,
      unit: "per kg",
      trend: "up",
      impact: "high",
      date: "2024-08-02",
      suppliers: 3,
      notes: "Significant price increase due to global copper shortage and high demand."
    },
    {
      id: 4,
      material: "PVC Pipes (100mm)",
      category: "plumbing",
      priceChange: 0,
      currentPrice: 18.75,
      unit: "per meter",
      trend: "stable",
      impact: "low",
      date: "2024-08-04",
      suppliers: 8,
      notes: "Prices remain stable with good availability across suppliers."
    },
    {
      id: 5,
      material: "HVAC Ductwork",
      category: "mechanical",
      priceChange: 5.2,
      currentPrice: 85.30,
      unit: "per meter",
      trend: "up",
      impact: "medium",
      date: "2024-08-01",
      suppliers: 4,
      notes: "Moderate price increases due to rising aluminum costs."
    },
    {
      id: 6,
      material: "Ceramic Floor Tiles",
      category: "finishing",
      priceChange: -3.5,
      currentPrice: 42.00,
      unit: "per sqm",
      trend: "down",
      impact: "low",
      date: "2024-08-03",
      suppliers: 10,
      notes: "Seasonal discounts from major suppliers to clear inventory."
    },
    {
      id: 7,
      material: "Structural Timber",
      category: "structural",
      priceChange: 15.8,
      currentPrice: 2850,
      unit: "per cubic meter",
      trend: "up",
      impact: "high",
      date: "2024-07-30",
      suppliers: 3,
      notes: "Severe shortage due to export restrictions and high global demand."
    },
    {
      id: 8,
      material: "Electrical Conduit",
      category: "electrical",
      priceChange: 4.2,
      currentPrice: 12.50,
      unit: "per meter",
      trend: "up",
      impact: "medium",
      date: "2024-08-02",
      suppliers: 5,
      notes: "Moderate price increase following rising PVC material costs."
    }
  ]
  
  // Material shortage alerts
  const shortageAlerts = [
    {
      id: 101,
      material: "Microchips for Building Automation",
      category: "automation",
      severity: "critical",
      estimatedDelay: "8-12 weeks",
      affectedRegions: ["All Malaysia", "Singapore", "Thailand"],
      alternatives: ["Simplified control systems", "Alternative suppliers from Taiwan"],
      date: "2024-08-01"
    },
    {
      id: 102,
      material: "Specialized Fire-Rated Glass",
      category: "fire_safety",
      severity: "moderate",
      estimatedDelay: "3-4 weeks",
      affectedRegions: ["Kuala Lumpur", "Selangor"],
      alternatives: ["Standard fire-rated alternatives", "Local substitutes with certification"],
      date: "2024-08-03"
    },
    {
      id: 103,
      material: "High-Grade Insulation Materials",
      category: "mechanical",
      severity: "low",
      estimatedDelay: "1-2 weeks",
      affectedRegions: ["East Malaysia"],
      alternatives: ["Alternative thickness combinations", "Different R-value materials"],
      date: "2024-08-04"
    }
  ]
  
  // Material categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'structural', name: 'Structural' },
    { id: 'concrete', name: 'Concrete' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'mechanical', name: 'Mechanical' },
    { id: 'finishing', name: 'Finishing' },
    { id: 'automation', name: 'Automation' },
    { id: 'fire_safety', name: 'Fire Safety' }
  ]
  
  // Filter alerts based on search query and category
  const filteredAlerts = materialAlerts.filter(alert => {
    const matchesSearch = alert.material.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Toggle alert subscription
  const toggleAlertSubscription = (alertId) => {
    if (subscribedAlerts.includes(alertId)) {
      setSubscribedAlerts(subscribedAlerts.filter(id => id !== alertId))
    } else {
      setSubscribedAlerts([...subscribedAlerts, alertId])
    }
  }
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }
  
  // Get trend icon and color
  const getTrendIndicator = (trend, priceChange) => {
    if (trend === 'up') {
      return {
        icon: <TrendingUp className="h-5 w-5 text-red-500" />,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        sign: '+'
      }
    } else if (trend === 'down') {
      return {
        icon: <TrendingDown className="h-5 w-5 text-green-500" />,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        sign: '-'
      }
    } else {
      return {
        icon: <ArrowLeft className="h-5 w-5 text-blue-500" />,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        sign: ''
      }
    }
  }
  
  // Get impact badge
  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Impact</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Impact</Badge>
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low Impact</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{impact}</Badge>
    }
  }
  
  // Get severity badge
  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>
      case 'moderate':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Moderate</Badge>
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{severity}</Badge>
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
            <h2 className="text-3xl font-bold mb-4">Material Alerts</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Stay updated on material price changes, availability, and supply chain issues
            </p>
          </div>
          
          <Tabs defaultValue="price-alerts" className="mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="price-alerts">Price Alerts</TabsTrigger>
              <TabsTrigger value="shortage-alerts">Shortage Alerts</TabsTrigger>
              <TabsTrigger value="market-trends">Market Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price-alerts">
              {/* Search and Filters */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search materials..."
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Material Category</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Price Change</label>
                        <select
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="all">All Changes</option>
                          <option value="increase">Price Increases</option>
                          <option value="decrease">Price Decreases</option>
                          <option value="stable">Stable Prices</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Impact Level</label>
                        <select
                          className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="all">All Impact Levels</option>
                          <option value="high">High Impact</option>
                          <option value="medium">Medium Impact</option>
                          <option value="low">Low Impact</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Price Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => {
                    const trendIndicator = getTrendIndicator(alert.trend, alert.priceChange)
                    
                    return (
                      <Card key={alert.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className={`p-6 md:w-1/4 ${trendIndicator.bgColor}`}>
                              <div className="flex flex-col h-full justify-center items-center text-center">
                                <div className={`text-3xl font-bold ${trendIndicator.color}`}>
                                  {alert.trend !== 'stable' ? trendIndicator.sign : ''}{Math.abs(alert.priceChange)}%
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                  {trendIndicator.icon}
                                  <span className={`font-medium ${trendIndicator.color}`}>
                                    {alert.trend === 'up' ? 'Increase' : alert.trend === 'down' ? 'Decrease' : 'Stable'}
                                  </span>
                                </div>
                                <div className="mt-2 text-sm text-text-muted">
                                  Updated: {new Date(alert.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6 md:w-3/4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{alert.material}</h3>
                                  <div className="text-sm text-text-muted capitalize mt-1">
                                    {alert.category}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  {getImpactBadge(alert.impact)}
                                  <Button
                                    variant={subscribedAlerts.includes(alert.id) ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => toggleAlertSubscription(alert.id)}
                                  >
                                    <Bell className="h-4 w-4" />
                                    {subscribedAlerts.includes(alert.id) ? 'Subscribed' : 'Subscribe'}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                  <div className="text-sm text-text-muted">Current Price</div>
                                  <div className="font-semibold">{formatCurrency(alert.currentPrice)} {alert.unit}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-text-muted">Suppliers</div>
                                  <div className="font-semibold">{alert.suppliers} available</div>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                  <div className="text-sm text-text-muted">Notes</div>
                                  <div className="text-sm">{alert.notes}</div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                  <ShoppingCart className="h-4 w-4" />
                                  View Suppliers
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <div className="text-center py-12 bg-background-secondary rounded-lg">
                    <Package className="h-12 w-12 mx-auto mb-4 text-text-muted opacity-40" />
                    <h4 className="text-lg font-medium mb-2">No material alerts found</h4>
                    <p className="text-text-muted">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="shortage-alerts">
              <div className="mb-8 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Material Shortage Alerts</h3>
                <Button className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Manage Notifications
                </Button>
              </div>
              
              <div className="space-y-4">
                {shortageAlerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{alert.material}</h3>
                          <div className="text-sm text-text-muted capitalize mt-1">
                            {alert.category.replace('_', ' ')}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {getSeverityBadge(alert.severity)}
                          <div className="text-sm">
                            <span className="text-text-muted">Reported:</span> {new Date(alert.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-text-muted">Estimated Delay</div>
                          <div className="font-semibold flex items-center gap-2">
                            <Clock className="h-4 w-4 text-text-muted" />
                            {alert.estimatedDelay}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm text-text-muted">Affected Regions</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {alert.affectedRegions.map((region, index) => (
                              <Badge key={index} variant="outline" className="bg-background-secondary">
                                {region}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-text-muted mb-2">Alternative Solutions</div>
                        <ul className="list-disc list-inside space-y-1 text-sm pl-1">
                          {alert.alternatives.map((alternative, index) => (
                            <li key={index}>{alternative}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" size="sm">Find Alternatives</Button>
                        <Button size="sm">Contact Suppliers</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="market-trends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Material Price Trends
                    </CardTitle>
                    <CardDescription>
                      6-month price movement for key materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={256}>
                      <BarChart data={[
                        { name: 'Steel', priceChange: 15.2 },
                        { name: 'Copper', priceChange: 22.8 },
                        { name: 'Cement', priceChange: -3.5 }
                      ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="priceChange" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between items-center p-3 bg-background-secondary rounded-lg">
                        <div className="font-medium">Steel</div>
                        <div className="flex items-center gap-2 text-red-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>+15.2%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background-secondary rounded-lg">
                        <div className="font-medium">Copper</div>
                        <div className="flex items-center gap-2 text-red-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>+22.8%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-background-secondary rounded-lg">
                        <div className="font-medium">Cement</div>
                        <div className="flex items-center gap-2 text-green-500">
                          <TrendingDown className="h-4 w-4" />
                          <span>-3.5%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Supply Chain Insights
                    </CardTitle>
                    <CardDescription>
                      Current logistics and supply chain status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <h4 className="font-medium">Port Congestion Alert</h4>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">
                          Port Klang experiencing 3-5 day delays due to high volume. Consider alternative shipping routes.
                        </p>
                        <div className="text-sm text-text-muted">Updated: August 3, 2024</div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">Freight Rate Decrease</h4>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">
                          International shipping rates decreased by 8% this month. Good time to import materials.
                        </p>
                        <div className="text-sm text-text-muted">Updated: August 1, 2024</div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium">Upcoming Industry Events</h4>
                        </div>
                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between text-sm">
                            <span>Malaysia Building Materials Expo</span>
                            <span className="text-text-muted">Aug 15-18</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>CIDB Construction Conference</span>
                            <span className="text-text-muted">Sep 5-7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Material Cost Forecasts
                    </CardTitle>
                    <CardDescription>
                      Projected price changes for the next quarter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">Material Category</th>
                            <th className="text-left py-3 px-4 font-medium">Current Trend</th>
                            <th className="text-left py-3 px-4 font-medium">3-Month Forecast</th>
                            <th className="text-left py-3 px-4 font-medium">6-Month Forecast</th>
                            <th className="text-left py-3 px-4 font-medium">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Steel & Metals</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 text-red-500">
                                <TrendingUp className="h-4 w-4" />
                                <span>Rising</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">+5-8%</td>
                            <td className="py-3 px-4">+10-15%</td>
                            <td className="py-3 px-4">High</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Concrete & Cement</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 text-green-500">
                                <TrendingDown className="h-4 w-4" />
                                <span>Falling</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">-2-4%</td>
                            <td className="py-3 px-4">Stabilizing</td>
                            <td className="py-3 px-4">Medium</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Electrical Components</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 text-red-500">
                                <TrendingUp className="h-4 w-4" />
                                <span>Rising</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">+8-12%</td>
                            <td className="py-3 px-4">+15-20%</td>
                            <td className="py-3 px-4">High</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Plumbing Materials</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 text-blue-500">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Stable</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">+1-2%</td>
                            <td className="py-3 px-4">+2-4%</td>
                            <td className="py-3 px-4">Medium</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Finishing Materials</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1 text-green-500">
                                <TrendingDown className="h-4 w-4" />
                                <span>Falling</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">-3-5%</td>
                            <td className="py-3 px-4">-1-3%</td>
                            <td className="py-3 px-4">Medium</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Analyst Insights</h4>
                          <p className="text-sm text-text-secondary">
                            Global supply chain disruptions and high energy costs continue to drive material price inflation. 
                            Consider locking in prices for critical materials through forward contracts and exploring alternative materials where possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageTransition>
  )
}

export default MaterialAlerts
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Building, Users, Truck, AlertTriangle, CheckCircle, Clock, Calendar, Map, Camera } from 'lucide-react'
import { Button } from '../components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Badge } from '../components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.jsx'
import { Progress } from '../components/ui/progress.jsx'
import PageTransition from '../components/PageTransition.jsx'

const SiteManagement = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data for site management
  const siteData = {
    name: "Kuala Lumpur Commercial Tower",
    location: "Jalan Ampang, KL",
    progress: 68,
    startDate: "2023-09-15",
    endDate: "2024-12-30",
    status: "In Progress",
    weather: "Partly Cloudy, 32°C",
    siteManager: "Ahmad Rizal",
    workers: 124,
    vehicles: 8
  }
  
  const tasks = [
    { id: 1, name: "Foundation Inspection", status: "completed", dueDate: "2023-10-20", assignee: "Tan Wei Ming" },
    { id: 2, name: "Structural Steel Installation", status: "in_progress", dueDate: "2024-08-15", assignee: "Rajesh Kumar" },
    { id: 3, name: "Electrical Conduit Installation", status: "in_progress", dueDate: "2024-08-22", assignee: "Lim Mei Ling" },
    { id: 4, name: "HVAC Ductwork", status: "pending", dueDate: "2024-09-05", assignee: "Unassigned" },
    { id: 5, name: "Plumbing Rough-In", status: "in_progress", dueDate: "2024-08-18", assignee: "Siti Aminah" }
  ]
  
  const issues = [
    { 
      id: 1, 
      title: "Material Delivery Delay", 
      priority: "high", 
      status: "open", 
      reportedDate: "2024-08-02", 
      description: "Steel delivery delayed by 3 days, impacting structural work schedule",
      assignee: "Chong Wei Liang"
    },
    { 
      id: 2, 
      title: "Concrete Quality Issue", 
      priority: "medium", 
      status: "investigating", 
      reportedDate: "2024-08-05", 
      description: "Batch #45 concrete samples showing lower than specified strength",
      assignee: "Dr. Noor Azmi"
    },
    { 
      id: 3, 
      title: "Safety Railing Missing", 
      priority: "high", 
      status: "resolved", 
      reportedDate: "2024-07-28", 
      description: "Level 12 east wing missing safety railings",
      assignee: "Safety Officer Raju"
    }
  ]
  
  const materials = [
    { name: "Reinforcement Steel", quantity: "45 tons", status: "On Site", deliveryDate: "2024-07-25" },
    { name: "Concrete Mix (G30)", quantity: "120 m³", status: "Scheduled", deliveryDate: "2024-08-12" },
    { name: "Electrical Conduit", quantity: "2,500 m", status: "On Site", deliveryDate: "2024-07-30" },
    { name: "HVAC Ducts", quantity: "850 m", status: "Delayed", deliveryDate: "2024-08-15" },
    { name: "Copper Piping", quantity: "1,200 m", status: "On Site", deliveryDate: "2024-07-20" }
  ]
  
  const inspections = [
    { name: "Foundation Inspection", date: "2023-10-15", status: "Passed", inspector: "JKR Officer Tan" },
    { name: "Structural Frame Inspection", date: "2024-03-22", status: "Passed", inspector: "CIDB Inspector Wong" },
    { name: "Electrical Rough-In", date: "2024-07-10", status: "Conditional Pass", inspector: "TNB Officer Muthu" },
    { name: "Fire Safety Systems", date: "2024-08-20", status: "Scheduled", inspector: "BOMBA Lt. Ibrahim" }
  ]
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
      case "Passed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "in_progress":
      case "investigating":
      case "Conditional Pass":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>
      case "pending":
      case "Scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "open":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Open</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      case "Delayed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Delayed</Badge>
      case "On Site":
        return <Badge className="bg-green-100 text-green-800 border-green-200">On Site</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
    }
  }
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{priority}</Badge>
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
          
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">{siteData.name}</h2>
                <div className="flex items-center gap-2 mt-2 text-text-secondary">
                  <Map className="h-4 w-4" />
                  <span>{siteData.location}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Site Photos
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Site Map
                </Button>
                <Button className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
          
          {/* Site Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-text-muted">Project Progress</p>
                    <p className="text-2xl font-bold mt-1">{siteData.progress}%</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <Progress value={siteData.progress} className="mt-4 h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-text-muted">On-site Personnel</p>
                    <p className="text-2xl font-bold mt-1">{siteData.workers}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-text-muted">
                  <span className="font-medium">Site Manager:</span> {siteData.siteManager}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-text-muted">Equipment On-site</p>
                    <p className="text-2xl font-bold mt-1">{siteData.vehicles}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <Truck className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-text-muted">
                  <span className="font-medium">Types:</span> Excavators, Cranes, Mixers
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-text-muted">Timeline</p>
                    <p className="text-2xl font-bold mt-1">132 days left</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 text-sm text-text-muted">
                  <span className="font-medium">Completion:</span> {new Date(siteData.endDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Tabs */}
          <Tabs defaultValue="tasks" className="mt-8">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="inspections">Inspections</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Current Tasks</h3>
                <Button>Add New Task</Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : task.status === 'in_progress' ? (
                            <Clock className="h-5 w-5 text-blue-500" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          )}
                          <div>
                            <div className="font-medium">{task.name}</div>
                            <div className="text-sm text-text-muted">Assigned to: {task.assignee}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-text-muted">Due Date</div>
                            <div>{new Date(task.dueDate).toLocaleDateString()}</div>
                          </div>
                          {getStatusBadge(task.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="issues" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Site Issues</h3>
                <Button>Report New Issue</Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {issues.map((issue) => (
                      <div key={issue.id} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-5 w-5 ${
                              issue.priority === 'high' ? 'text-red-500' : 
                              issue.priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                            }`} />
                            <h4 className="font-medium">{issue.title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(issue.priority)}
                            {getStatusBadge(issue.status)}
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{issue.description}</p>
                        <div className="flex justify-between text-sm text-text-muted">
                          <div>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</div>
                          <div>Assigned to: {issue.assignee}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="materials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Material Tracking</h3>
                <Button>Add Material</Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium">Material</th>
                          <th className="text-left py-3 px-4 font-medium">Quantity</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Delivery Date</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {materials.map((material, index) => (
                          <tr key={index} className="border-b border-border">
                            <td className="py-3 px-4">{material.name}</td>
                            <td className="py-3 px-4">{material.quantity}</td>
                            <td className="py-3 px-4">{getStatusBadge(material.status)}</td>
                            <td className="py-3 px-4">{new Date(material.deliveryDate).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inspections" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Compliance Inspections</h3>
                <Button>Schedule Inspection</Button>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {inspections.map((inspection, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <div className="font-medium">{inspection.name}</div>
                          <div className="text-sm text-text-muted">Inspector: {inspection.inspector}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-text-muted">Date</div>
                            <div>{new Date(inspection.date).toLocaleDateString()}</div>
                          </div>
                          {getStatusBadge(inspection.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Site Reports</h3>
                <Button>Generate Report</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Progress Reports</CardTitle>
                    <CardDescription>Last 7 days of site activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - i);
                        return (
                          <div key={i} className="flex justify-between items-center p-3 border border-border rounded-lg">
                            <div className="font-medium">{date.toLocaleDateString()}</div>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Safety Reports</CardTitle>
                    <CardDescription>Incident and compliance records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                        <div className="font-medium">Monthly Safety Audit</div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                        <div className="font-medium">Incident Report #45</div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <div className="flex justify-between items-center p-3 border border-border rounded-lg">
                        <div className="font-medium">Safety Training Log</div>
                        <Button variant="ghost" size="sm">View</Button>
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

export default SiteManagement
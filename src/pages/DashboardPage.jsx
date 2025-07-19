import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Building2,
  FileText,
  CloudRain
} from 'lucide-react'
import DashboardLayout from '../components/layouts/DashboardLayout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for charts
const projectData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 21 },
  { name: 'Jun', value: 32 },
]

const revenueData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
]

// Mock data for projects
const projects = [
  {
    id: 1,
    name: 'KL Tower Renovation',
    client: 'DBKL',
    status: 'In Progress',
    dueDate: '2023-12-15',
    progress: 65,
    priority: 'High'
  },
  {
    id: 2,
    name: 'Penang Bridge Maintenance',
    client: 'JKR Pulau Pinang',
    status: 'Planning',
    dueDate: '2024-01-30',
    progress: 25,
    priority: 'Medium'
  },
  {
    id: 3,
    name: 'Johor Bahru Shopping Mall',
    client: 'Southern Developers',
    status: 'Bidding',
    dueDate: '2023-11-10',
    progress: 10,
    priority: 'High'
  }
]

// Mock data for compliance alerts
const complianceAlerts = [
  {
    id: 1,
    title: 'CIDB Registration Renewal',
    description: 'Your CIDB G7 registration expires in 30 days',
    type: 'warning',
    date: '2023-11-15'
  },
  {
    id: 2,
    title: 'Safety Compliance Report',
    description: 'Monthly safety report due for KL Tower project',
    type: 'info',
    date: '2023-10-30'
  },
  {
    id: 3,
    title: 'JKR Certification Updated',
    description: 'Your JKR certification has been successfully renewed',
    type: 'success',
    date: '2023-10-25'
  }
]

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'Project Kickoff Meeting',
    project: 'Johor Bahru Shopping Mall',
    date: '2023-10-28',
    time: '10:00 AM'
  },
  {
    id: 2,
    title: 'Site Inspection',
    project: 'KL Tower Renovation',
    date: '2023-10-30',
    time: '9:30 AM'
  },
  {
    id: 3,
    title: 'Client Presentation',
    project: 'Penang Bridge Maintenance',
    date: '2023-11-02',
    time: '2:00 PM'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500'
      case 'Planning': return 'bg-amber-500'
      case 'Bidding': return 'bg-purple-500'
      case 'Completed': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      default: return <Clock className="h-5 w-5 text-blue-500" />
    }
  }
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Mohd Azlan!</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">
            New Project
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  +1 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +3 new specialists
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weather Alerts</CardTitle>
                <CloudRain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Monsoon alerts for Penang
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  Number of projects per month
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={projectData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>
                  Monthly revenue in MYR
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RM ${value.toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="value" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your most recent projects and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{project.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {project.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.client}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <div>Due: {new Date(project.dueDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">{project.progress}% complete</div>
                      </div>
                      <div className={`w-2 h-8 rounded-full ${getStatusColor(project.status)}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <a href="/dashboard/projects">
                  View all projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Compliance and Events */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Alerts</CardTitle>
                <CardDescription>
                  Recent compliance notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className="flex gap-4">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {alert.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <a href="/compliance">
                    View all alerts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your scheduled meetings and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
                        <span className="text-xs font-medium">
                          {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                        </span>
                        <span className="text-lg font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {event.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.project}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <a href="/dashboard/calendar">
                    View calendar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Manage your ongoing and upcoming projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Projects content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance</CardTitle>
              <CardDescription>
                Track your compliance with Malaysian regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Compliance content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>
                View your upcoming meetings and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Schedule content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
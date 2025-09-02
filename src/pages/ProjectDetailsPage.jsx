import React from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  BarChart3,
  Pencil,
  Trash2,
  Plus,
  ArrowLeft
} from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { Progress } from '../components/ui/progress'

// Mock project data
const projectData = {
  id: 1,
  name: 'KL Tower Renovation',
  client: 'DBKL',
  description: 'Comprehensive renovation of the KL Tower observation deck and visitor facilities, including electrical systems upgrade, plumbing modernization, and HVAC replacement.',
  status: 'In Progress',
  startDate: '2023-06-15',
  dueDate: '2023-12-15',
  budget: 2500000,
  spent: 1625000,
  progress: 65,
  priority: 'High',
  location: 'Kuala Lumpur',
  manager: {
    name: 'Ahmad Rizal',
    role: 'Project Manager',
    avatar: '/avatar1.png'
  },
  team: [
    { id: 1, name: 'Sarah Tan', role: 'Electrical Engineer', avatar: '/avatar2.png' },
    { id: 2, name: 'Rajesh Kumar', role: 'Plumbing Specialist', avatar: '/avatar3.png' },
    { id: 3, name: 'Lee Wei', role: 'HVAC Technician', avatar: '/avatar4.png' },
    { id: 4, name: 'Nurul Huda', role: 'Safety Officer', avatar: '/avatar5.png' }
  ],
  tasks: [
    { id: 1, title: 'Electrical System Assessment', status: 'Completed', assignee: 'Sarah Tan', dueDate: '2023-07-15' },
    { id: 2, title: 'Plumbing System Upgrade Plan', status: 'Completed', assignee: 'Rajesh Kumar', dueDate: '2023-07-30' },
    { id: 3, title: 'HVAC Replacement', status: 'In Progress', assignee: 'Lee Wei', dueDate: '2023-10-15' },
    { id: 4, title: 'Safety Compliance Check', status: 'In Progress', assignee: 'Nurul Huda', dueDate: '2023-10-30' },
    { id: 5, title: 'Final Inspection', status: 'Pending', assignee: 'Ahmad Rizal', dueDate: '2023-12-01' }
  ],
  documents: [
    { id: 1, name: 'Project Proposal.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Ahmad Rizal', date: '2023-05-20' },
    { id: 2, name: 'Electrical Diagrams.dwg', type: 'CAD', size: '5.7 MB', uploadedBy: 'Sarah Tan', date: '2023-06-25' },
    { id: 3, name: 'Budget Breakdown.xlsx', type: 'Excel', size: '1.2 MB', uploadedBy: 'Ahmad Rizal', date: '2023-06-30' },
    { id: 4, name: 'Safety Protocols.docx', type: 'Word', size: '890 KB', uploadedBy: 'Nurul Huda', date: '2023-07-05' }
  ],
  updates: [
    { id: 1, user: 'Ahmad Rizal', message: 'Completed the initial assessment of the observation deck.', date: '2023-06-20', time: '10:30 AM' },
    { id: 2, user: 'Sarah Tan', message: 'Electrical system assessment completed. Found several outdated components that need replacement.', date: '2023-07-15', time: '3:45 PM' },
    { id: 3, user: 'Rajesh Kumar', message: 'Plumbing system upgrade plan approved by the client.', date: '2023-07-30', time: '11:15 AM' },
    { id: 4, user: 'Ahmad Rizal', message: 'Monthly progress meeting scheduled for next week.', date: '2023-08-15', time: '9:00 AM' }
  ],
  risks: [
    { id: 1, title: 'Weather Delays', description: 'Potential delays due to monsoon season', severity: 'Medium', mitigation: 'Adjust schedule to prioritize indoor work during rainy periods' },
    { id: 2, title: 'Material Shortages', description: 'Possible shortage of specialized HVAC components', severity: 'High', mitigation: 'Pre-order critical components and identify alternative suppliers' },
    { id: 3, title: 'Compliance Issues', description: 'New safety regulations may affect current plans', severity: 'Low', mitigation: 'Regular consultation with CIDB and JKR for updates' }
  ]
}

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-500'
      case 'In Progress': return 'bg-blue-500'
      case 'Pending': return 'bg-amber-500'
      default: return 'bg-gray-500'
    }
  }
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-500 bg-red-50'
      case 'Medium': return 'text-amber-500 bg-amber-50'
      case 'Low': return 'text-emerald-500 bg-emerald-50'
      default: return 'text-gray-500 bg-gray-50'
    }
  }
  
  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <a href="/dashboard/projects">
            <ArrowLeft className="h-5 w-5" />
          </a>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{projectData.name}</h1>
          <p className="text-muted-foreground">Client: {projectData.client}</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Progress</div>
              <div className="text-sm font-medium">{projectData.progress}%</div>
            </div>
            <Progress value={projectData.progress} className="h-2" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium">{new Date(projectData.startDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Due Date</div>
                <div className="font-medium">{new Date(projectData.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">Budget</div>
              <Badge variant={projectData.spent <= projectData.budget ? 'outline' : 'destructive'}>
                {projectData.spent <= projectData.budget ? 'On Budget' : 'Over Budget'}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">
              RM {projectData.spent.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ RM {projectData.budget.toLocaleString()}</span>
            </div>
            <Progress value={(projectData.spent / projectData.budget) * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">Status</div>
              <Badge>{projectData.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Priority</div>
                <div className="font-medium">{projectData.priority}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{projectData.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{projectData.description}</p>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={projectData.manager.avatar} alt={projectData.manager.name} />
                    <AvatarFallback>{projectData.manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-lg">{projectData.manager.name}</div>
                    <div className="text-muted-foreground">{projectData.manager.role}</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.updates.slice(0, 2).map((update) => (
                    <div key={update.id} className="border-l-2 border-primary pl-4">
                      <p className="text-sm">{update.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {update.user} - {update.date} at {update.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View all updates
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Task Progress</CardTitle>
              <CardDescription>
                Overview of project tasks and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center">
                    <div className={`w-2 h-8 rounded-full ${getStatusColor(task.status)} mr-4`} />
                    <div className="flex-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Assigned to: {task.assignee}
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <div>{task.status}</div>
                      <div className="text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Manage and track project tasks
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.tasks.map((task) => (
                  <div key={task.id} className="flex items-center p-3 border rounded-md">
                    <div className={`w-2 h-8 rounded-full ${getStatusColor(task.status)} mr-4`} />
                    <div className="flex-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Assigned to: {task.assignee}
                      </div>
                    </div>
                    <div className="text-sm text-right mr-4">
                      <div>{task.status}</div>
                      <div className="text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Project team and specialists
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={projectData.manager.avatar} alt={projectData.manager.name} />
                    <AvatarFallback>{projectData.manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-lg">{projectData.manager.name}</div>
                    <div className="text-muted-foreground">{projectData.manager.role}</div>
                    <Badge className="mt-2">Project Manager</Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
                
                {projectData.team.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-4 border rounded-md">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-lg">{member.name}</div>
                      <div className="text-muted-foreground">{member.role}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Project files and documentation
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center p-3 border rounded-md">
                    <div className="p-2 rounded-md bg-primary/10 mr-4">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.size} • Uploaded by {doc.uploadedBy}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mr-4">
                      {new Date(doc.date).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>
                  Identified risks and mitigation strategies
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.risks.map((risk) => (
                  <div key={risk.id} className="p-4 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-lg">{risk.title}</div>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity} Risk
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{risk.description}</p>
                    <div>
                      <span className="text-sm font-medium">Mitigation: </span>
                      <span className="text-sm">{risk.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
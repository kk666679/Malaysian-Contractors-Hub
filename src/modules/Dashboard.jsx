import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Building2, 
  Zap, 
  Droplets, 
  Cpu, 
  Wind,
  BarChart3,
  Users,
  FileText,
  Settings
} from 'lucide-react';

// Import module components
import StructuralDesignSuite from './civil-engineering/components/StructuralDesignSuite';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('overview');

  const modules = [
    {
      id: 'civil',
      name: 'Civil Engineering',
      icon: Building2,
      description: 'Structural design and construction management'
    },
    {
      id: 'electrical',
      name: 'Electrical Systems',
      icon: Zap,
      description: 'Power distribution and safety solutions'
    },
    {
      id: 'sewerage',
      name: 'Sewerage & Drainage',
      icon: Droplets,
      description: 'Stormwater management and flood mitigation'
    },
    {
      id: 'elv',
      name: 'ELV & Automation',
      icon: Cpu,
      description: 'Building automation and low-voltage systems'
    },
    {
      id: 'acmv',
      name: 'ACMV (HVAC)',
      icon: Wind,
      description: 'Air conditioning and mechanical ventilation'
    }
  ];

  const quickStats = [
    { label: 'Active Projects', value: '12', change: '+2', icon: FileText },
    { label: 'Team Members', value: '24', change: '+3', icon: Users },
    { label: 'Compliance Score', value: '92%', change: '+5%', icon: BarChart3 },
    { label: 'Tasks Due', value: '8', change: '-4', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ContractorOS Dashboard</h1>
              <p className="text-gray-600">Integrated contracting management platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Help Center</Button>
              <Button>New Project</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {modules.map((module) => (
                    <Button
                      key={module.id}
                      variant={activeModule === module.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveModule(module.id)}
                    >
                      <module.icon className="h-4 w-4 mr-2" />
                      {module.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Project approved', project: 'KL Tower Renovation', time: '2 hours ago' },
                    { action: 'Design submitted', project: 'Penang Bridge', time: '4 hours ago' },
                    { action: 'Compliance check passed', project: 'Johor Mall', time: '1 day ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.project}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeModule} onValueChange={setActiveModule}>
              <TabsList className="grid grid-cols-5 mb-6">
                {modules.map((module) => (
                  <TabsTrigger key={module.id} value={module.id}>
                    <module.icon className="h-4 w-4 mr-2" />
                    {module.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome to ContractorOS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Getting Started</h3>
                        <ul className="space-y-2 text-sm">
                          <li>• Create your first project</li>
                          <li>• Invite team members</li>
                          <li>• Set up compliance requirements</li>
                          <li>• Connect with suppliers</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full">Upload Design</Button>
                          <Button variant="outline" className="w-full">Check Compliance</Button>
                          <Button variant="outline" className="w-full">Generate Report</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="civil">
                <StructuralDesignSuite />
              </TabsContent>

              <TabsContent value="electrical">
                <Card>
                  <CardHeader>
                    <CardTitle>Electrical Systems Module</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Power distribution design, compliance checking, and energy efficiency tools coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sewerage">
                <Card>
                  <CardHeader>
                    <CardTitle>Sewerage & Drainage Suite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Stormwater design, flood risk analysis, and environmental compliance tools coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="elv">
                <Card>
                  <CardHeader>
                    <CardTitle>ELV & Building Automation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Low-voltage systems design and building automation tools coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="acmv">
                <Card>
                  <CardHeader>
                    <CardTitle>ACMV (HVAC) Specialist Module</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">HVAC design, performance diagnostics, and air quality monitoring tools coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

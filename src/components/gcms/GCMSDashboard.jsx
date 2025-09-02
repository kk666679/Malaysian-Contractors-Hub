import React from 'react';
// GCMS Main Dashboard Component
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Building2, 
  FileText, 
  DollarSign, 
  Users, 
  Shield, 
  Package,
  Clock,
  BarChart3,
  Plus,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const GCMSDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    projects: { total: 0, active: 0, completed: 0 },
    contracts: { total: 0, active: 0, pending: 0 },
    financial: { revenue: 0, expenses: 0, profit: 0 },
    compliance: { inspections: 0, incidents: 0, score: 0 },
    subcontractors: { total: 0, active: 0, rating: 0 }
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls to different modules
      const mockData = {
        projects: { total: 24, active: 8, completed: 16 },
        contracts: { total: 18, active: 12, pending: 3 },
        financial: { revenue: 2450000, expenses: 1890000, profit: 560000 },
        compliance: { inspections: 156, incidents: 3, score: 94 },
        subcontractors: { total: 32, active: 18, rating: 4.2 }
      };

      const mockActivities = [
        { id: 1, type: 'project', message: 'New project "KL Tower Renovation" created', time: '2 hours ago' },
        { id: 2, type: 'contract', message: 'Contract signed for "Penang Bridge Maintenance"', time: '4 hours ago' },
        { id: 3, type: 'financial', message: 'Invoice #INV-000123 paid by client', time: '6 hours ago' },
        { id: 4, type: 'compliance', message: 'Safety inspection completed for Site A', time: '8 hours ago' },
        { id: 5, type: 'subcontractor', message: 'New subcontractor "ABC Construction" onboarded', time: '1 day ago' }
      ];

      setDashboardData(mockData);
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  const moduleCards = [
    {
      title: 'Project Management',
      icon: Building2,
      color: 'bg-blue-500',
      stats: [
        { label: 'Total Projects', value: dashboardData.projects.total },
        { label: 'Active', value: dashboardData.projects.active },
        { label: 'Completed', value: dashboardData.projects.completed }
      ],
      actions: [
        { label: 'New Project', action: () => console.log('New Project') },
        { label: 'View All', action: () => console.log('View Projects') }
      ]
    },
    {
      title: 'Contract Management',
      icon: FileText,
      color: 'bg-green-500',
      stats: [
        { label: 'Total Contracts', value: dashboardData.contracts.total },
        { label: 'Active', value: dashboardData.contracts.active },
        { label: 'Pending', value: dashboardData.contracts.pending }
      ],
      actions: [
        { label: 'New Contract', action: () => console.log('New Contract') },
        { label: 'Templates', action: () => console.log('Templates') }
      ]
    },
    {
      title: 'Financial Management',
      icon: DollarSign,
      color: 'bg-yellow-500',
      stats: [
        { label: 'Revenue', value: formatCurrency(dashboardData.financial.revenue) },
        { label: 'Expenses', value: formatCurrency(dashboardData.financial.expenses) },
        { label: 'Profit', value: formatCurrency(dashboardData.financial.profit) }
      ],
      actions: [
        { label: 'New Invoice', action: () => console.log('New Invoice') },
        { label: 'Reports', action: () => console.log('Financial Reports') }
      ]
    },
    {
      title: 'Compliance & Safety',
      icon: Shield,
      color: 'bg-red-500',
      stats: [
        { label: 'Inspections', value: dashboardData.compliance.inspections },
        { label: 'Incidents', value: dashboardData.compliance.incidents },
        { label: 'Safety Score', value: `${dashboardData.compliance.score}%` }
      ],
      actions: [
        { label: 'New Inspection', action: () => console.log('New Inspection') },
        { label: 'Report Incident', action: () => console.log('Report Incident') }
      ]
    },
    {
      title: 'Subcontractor Management',
      icon: Users,
      color: 'bg-purple-500',
      stats: [
        { label: 'Total Subcontractors', value: dashboardData.subcontractors.total },
        { label: 'Active', value: dashboardData.subcontractors.active },
        { label: 'Avg Rating', value: `${dashboardData.subcontractors.rating}/5` }
      ],
      actions: [
        { label: 'Add Subcontractor', action: () => console.log('Add Subcontractor') },
        { label: 'Performance', action: () => console.log('Performance') }
      ]
    },
    {
      title: 'Inventory Management',
      icon: Package,
      color: 'bg-indigo-500',
      stats: [
        { label: 'Materials', value: 156 },
        { label: 'Low Stock', value: 8 },
        { label: 'Purchase Orders', value: 23 }
      ],
      actions: [
        { label: 'Add Material', action: () => console.log('Add Material') },
        { label: 'New PO', action: () => console.log('New PO') }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">GCMS Dashboard</h1>
          <p className="text-gray-600">General Contracting Management System</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold">{dashboardData.projects.active}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(dashboardData.financial.revenue)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Safety Score</p>
                <p className="text-2xl font-bold">{dashboardData.compliance.score}%</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold">{dashboardData.compliance.incidents}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500">2 critical, 1 medium</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleCards.map((module, index) => {
          const IconComponent = module.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {module.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex justify-between text-sm">
                      <span className="text-gray-600">{stat.label}</span>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  {module.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant={actionIndex === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={action.action}
                      className="flex-1"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GCMSDashboard;
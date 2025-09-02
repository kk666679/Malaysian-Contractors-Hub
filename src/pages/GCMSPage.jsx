import React from 'react';
// GCMS Main Page Component
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import GCMSDashboard from '../components/gcms/GCMSDashboard';
import ProjectManagement from '../components/gcms/project-management/ProjectManagement';
import { 
  LayoutDashboard,
  Building2,
  FileText,
  Calculator,
  DollarSign,
  Shield,
  Users,
  Package,
  Clock,
  BarChart3
} from 'lucide-react';

const GCMSPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const modules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      component: GCMSDashboard
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: Building2,
      component: ProjectManagement
    },
    {
      id: 'contracts',
      name: 'Contracts',
      icon: FileText,
      component: () => <div className="p-6">Contract Management - Coming Soon</div>
    },
    {
      id: 'bidding',
      name: 'Bidding',
      icon: Calculator,
      component: () => <div className="p-6">Bidding & Estimation - Coming Soon</div>
    },
    {
      id: 'financial',
      name: 'Financial',
      icon: DollarSign,
      component: () => <div className="p-6">Financial Management - Coming Soon</div>
    },
    {
      id: 'compliance',
      name: 'Compliance',
      icon: Shield,
      component: () => <div className="p-6">Compliance & Safety - Coming Soon</div>
    },
    {
      id: 'subcontractors',
      name: 'Subcontractors',
      icon: Users,
      component: () => <div className="p-6">Subcontractor Management - Coming Soon</div>
    },
    {
      id: 'inventory',
      name: 'Inventory',
      icon: Package,
      component: () => <div className="p-6">Inventory Management - Coming Soon</div>
    },
    {
      id: 'workforce',
      name: 'Workforce',
      icon: Clock,
      component: () => <div className="p-6">Workforce Management - Coming Soon</div>
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      component: () => <div className="p-6">Analytics & Reporting - Coming Soon</div>
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
              {modules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <TabsTrigger
                    key={module.id}
                    value={module.id}
                    className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs font-medium">{module.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto">
          {modules.map((module) => {
            const ComponentToRender = module.component;
            return (
              <TabsContent key={module.id} value={module.id} className="mt-0">
                <ComponentToRender />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default GCMSPage;
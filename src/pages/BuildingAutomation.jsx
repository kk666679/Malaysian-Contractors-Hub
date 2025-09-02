import React, { useState } from 'react';
import { Button } from '../components/ui/button.jsx';
import { ArrowLeft, Building2 } from 'lucide-react';
import PageTransition from '../components/features/PageTransition.jsx';
import IoTDashboard from '../components/iot/IoTDashboard.jsx';

const BuildingAutomation = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [selectedSite, setSelectedSite] = useState('site-001');

  return (
    <PageTransition>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              to="/features"
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Features
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Building Automation & IoT Monitoring</h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Real-time monitoring and control of construction site sensors and building automation systems.
            </p>
          </div>

          <div className="flex space-x-4 mb-6">
            {['monitoring', 'analytics', 'alerts'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'monitoring' && (
            <IoTDashboard siteId={selectedSite} />
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Site Analytics</h3>
              <p>Advanced analytics and reporting for IoT sensor data.</p>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Alert Management</h3>
              <p>Configure thresholds and manage alert notifications.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}

export default BuildingAutomation

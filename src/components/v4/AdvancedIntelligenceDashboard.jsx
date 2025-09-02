import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdvancedIntelligenceDashboard = () => {
  const [activeTab, setActiveTab] = useState('ml');
  const [selectedProject, setSelectedProject] = useState('');

  // ML Queries
  const { data: mlPrediction } = useQuery({
    queryKey: ['ml-prediction', selectedProject],
    queryFn: () => fetch('/api/v4/ml/predict-cost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: selectedProject })
    }).then(r => r.json()),
    enabled: !!selectedProject
  });

  const { data: blockchainStats } = useQuery({
    queryKey: ['blockchain-stats'],
    queryFn: () => fetch('/api/v4/blockchain/stats').then(r => r.json())
  });

  const trainModel = useMutation({
    mutationFn: () => fetch('/api/v4/ml/train', { method: 'POST' }).then(r => r.json())
  });

  const createARSession = useMutation({
    mutationFn: (projectId) => fetch('/api/v4/ar/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId })
    }).then(r => r.json())
  });

  const tabs = [
    { id: 'ml', name: 'Machine Learning', icon: '🤖' },
    { id: 'edge', name: 'Edge Computing', icon: '⚡' },
    { id: 'blockchain', name: 'Blockchain', icon: '🔗' },
    { id: 'arvr', name: 'AR/VR', icon: '🥽' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Advanced Intelligence Dashboard</h1>
        <div className="text-sm text-gray-600">v0.4.0</div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id 
                ? 'bg-white shadow text-blue-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* ML Tab */}
      {activeTab === 'ml' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Cost Prediction Model</h3>
              <div className="space-y-4">
                <button
                  onClick={() => trainModel.mutate()}
                  disabled={trainModel.isPending}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {trainModel.isPending ? 'Training...' : 'Train Model'}
                </button>
                {trainModel.data && (
                  <div className="p-3 bg-green-50 rounded">
                    <p>Model trained with {trainModel.data.data?.samples} samples</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Predictive Maintenance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span>Equipment A</span>
                  <span className="text-yellow-600 font-medium">Maintenance Due</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span>Equipment B</span>
                  <span className="text-green-600 font-medium">Healthy</span>
                </div>
              </div>
            </div>
          </div>

          {mlPrediction && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Cost Prediction Results</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    RM {mlPrediction.data?.predictedCost?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Predicted Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((mlPrediction.data?.confidence || 0) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {mlPrediction.data?.modelVersion}
                  </div>
                  <div className="text-sm text-gray-600">Model Version</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edge Computing Tab */}
      {activeTab === 'edge' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Edge Nodes Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Site A - Edge Node</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Site B - Edge Node</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Site C - Edge Node</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">Processing</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Processing Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Local Processing</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cloud Sync</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency Reduction</span>
                  <span className="font-medium text-green-600">-60ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">3D Site Visualization</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🏗️</div>
                <p className="text-gray-600">3D Site Model with Real-time Sensor Data</p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                  Launch 3D View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Tab */}
      {activeTab === 'blockchain' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {blockchainStats?.data && (
              <>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-blue-600">{blockchainStats.data.blocks}</div>
                  <div className="text-sm text-gray-600">Blocks</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-green-600">{blockchainStats.data.transactions}</div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className="text-2xl font-bold text-purple-600">{blockchainStats.data.contracts}</div>
                  <div className="text-sm text-gray-600">Smart Contracts</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <div className={`text-2xl font-bold ${blockchainStats.data.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {blockchainStats.data.isValid ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">Chain Valid</div>
                </div>
              </>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Smart Contracts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Project Milestone Contract</div>
                  <div className="text-sm text-gray-600">5 milestones, 3 completed</div>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Active</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">Compliance Record</div>
                  <div className="text-sm text-gray-600">Safety inspection verified</div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AR/VR Tab */}
      {activeTab === 'arvr' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Augmented Reality</h3>
              <div className="space-y-4">
                <button
                  onClick={() => createARSession.mutate(selectedProject)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  🔍 Start AR Session
                </button>
                <div className="text-sm text-gray-600">
                  • On-site measurements
                  • IoT data overlay
                  • Real-time annotations
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Virtual Reality</h3>
              <div className="space-y-4">
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
                  🥽 Launch VR Walkthrough
                </button>
                <div className="text-sm text-gray-600">
                  • Project visualization
                  • Virtual collaboration
                  • Training simulations
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Mixed Reality Collaboration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded">
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">Multi-user</div>
                <div className="text-sm text-gray-600">Collaborative design</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl mb-2">📐</div>
                <div className="font-medium">Measurements</div>
                <div className="text-sm text-gray-600">Precise AR measuring</div>
              </div>
              <div className="text-center p-4 border rounded">
                <div className="text-2xl mb-2">🎓</div>
                <div className="font-medium">Training</div>
                <div className="text-sm text-gray-600">VR safety training</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedIntelligenceDashboard;
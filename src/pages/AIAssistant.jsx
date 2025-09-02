import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('cost-estimation');
  const [formData, setFormData] = useState({});

  const costEstimation = useMutation({
    mutationFn: (data) => fetch('/api/ai/estimate-cost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
  });

  const riskPrediction = useMutation({
    mutationFn: (data) => fetch('/api/ai/predict-risks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json())
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'cost-estimation') {
      costEstimation.mutate(formData);
    } else if (activeTab === 'risk-prediction') {
      riskPrediction.mutate(formData);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Assistant</h1>
      
      <div className="flex space-x-4 mb-6">
        {['cost-estimation', 'risk-prediction', 'design-optimization', 'compliance-check'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'cost-estimation' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Type</label>
              <select 
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="INDUSTRIAL">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Area (sq ft)</label>
              <input 
                type="number" 
                onChange={(e) => setFormData({...formData, area: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select location</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Selangor">Selangor</option>
                <option value="Penang">Penang</option>
                <option value="Johor">Johor</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Estimate Cost
            </button>
          </form>
        )}

        {costEstimation.data && (
          <div className="mt-6 p-4 bg-green-50 rounded">
            <h3 className="font-semibold">Cost Estimation Result</h3>
            <p>Estimated Cost: RM {costEstimation.data.data?.estimatedCost?.toLocaleString()}</p>
            <p>Confidence: {Math.round((costEstimation.data.data?.confidence || 0) * 100)}%</p>
          </div>
        )}

        {riskPrediction.data && (
          <div className="mt-6 p-4 bg-yellow-50 rounded">
            <h3 className="font-semibold">Risk Analysis</h3>
            {riskPrediction.data.data?.map((risk, index) => (
              <div key={index} className="mt-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  risk.severity === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {risk.severity}
                </span>
                <p className="mt-1">{risk.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
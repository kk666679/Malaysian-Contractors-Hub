import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

const SmartComplianceEngine = () => {
  const [complianceData, setComplianceData] = useState({
    lastUpdated: new Date().toISOString(),
    overallScore: 85,
    categories: [
      {
        name: 'Electrical Safety',
        score: 92,
        status: 'compliant',
        regulations: ['MS IEC 60364', 'ST 1:2014'],
        issues: []
      },
      {
        name: 'Energy Efficiency',
        score: 78,
        status: 'warning',
        regulations: ['MS 1525:2019', 'GEMS Requirements'],
        issues: ['Power factor below 0.95', 'Inefficient lighting systems']
      },
      {
        name: 'TNB Standards',
        score: 95,
        status: 'compliant',
        regulations: ['TNB Technical Guide', 'Electricity Supply Act 1990'],
        issues: []
      },
      {
        name: 'Building Codes',
        score: 88,
        status: 'compliant',
        regulations: ['UBBL 1984', 'MS 1936:2016'],
        issues: ['Minor cable routing concern']
      }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'New Regulation Update',
      message: 'ST 2:2023 Electrical Installations now available',
      date: '2024-01-15',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Compliance Deadline',
      message: 'Energy audit report due in 30 days',
      date: '2024-01-10',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Certificate Renewal',
      message: 'Electrical contractor license expires in 6 months',
      date: '2024-01-08',
      read: true
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'non-compliant': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return '✓';
      case 'warning': return '⚠';
      case 'non-compliant': return '✗';
      default: return '○';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ Smart Compliance Engine
            <Badge variant="secondary">Real-time Monitoring</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Automated compliance tracking with Malaysian electrical regulations and real-time alerts
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Overall Compliance Score</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {complianceData.overallScore}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Last updated: {new Date(complianceData.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Progress value={complianceData.overallScore} className="h-3" />

                <div className="grid grid-cols-1 gap-3">
                  {complianceData.categories.map((category, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCategory === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{getStatusIcon(category.status)}</span>
                            <div>
                              <h4 className="font-medium">{category.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={category.score} className="h-2 w-20" />
                                <span className="text-sm font-medium">{category.score}%</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(category.status)}>
                            {category.status}
                          </Badge>
                        </div>

                        {selectedCategory === index && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="space-y-2">
                              <div>
                                <div className="text-sm font-medium mb-1">Regulations:</div>
                                <div className="flex flex-wrap gap-1">
                                  {category.regulations.map((reg, regIndex) => (
                                    <Badge key={regIndex} variant="outline" className="text-xs">
                                      {reg}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {category.issues.length > 0 && (
                                <div>
                                  <div className="text-sm font-medium mb-1">Issues:</div>
                                  <ul className="text-xs space-y-1">
                                    {category.issues.map((issue, issueIndex) => (
                                      <li key={issueIndex} className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>{issue}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.read
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-sm">
                            {notification.type === 'alert' && '🚨'}
                            {notification.type === 'warning' && '⚠️'}
                            {notification.type === 'info' && 'ℹ️'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium truncate">
                              {notification.title}
                            </h5>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              {notification.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📋 Generate Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📅 Schedule Audit
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📚 View Regulations
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🔔 Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartComplianceEngine;

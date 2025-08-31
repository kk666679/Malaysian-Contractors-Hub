import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';

const IndoorAirQualityDashboard = () => {
  const [iaqData, setIaqData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = async () => {
    setIsMonitoring(true);

    // Simulate IAQ data fetching
    await new Promise(resolve => setTimeout(resolve, 1500));

    const data = {
      co2: 650,
      voc: 0.3,
      pm25: 12,
      temperature: 24.5,
      humidity: 55,
      airQualityIndex: 75,
      lastUpdated: new Date().toISOString()
    };

    setIaqData(data);
    setIsMonitoring(false);
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌬️ Indoor Air Quality Dashboard
            <Badge variant="secondary">Real-time Monitoring</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Monitor CO₂, VOCs, particulates, and environmental conditions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={startMonitoring} disabled={isMonitoring} className="w-full">
              {isMonitoring ? 'Monitoring...' : 'Start IAQ Monitoring'}
            </Button>

            {iaqData && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Air Quality Index</h3>
                  <div className={`text-4xl font-bold ${getAirQualityStatus(iaqData.airQualityIndex).color}`}>
                    {iaqData.airQualityIndex}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAirQualityStatus(iaqData.airQualityIndex).bg} ${getAirQualityStatus(iaqData.airQualityIndex).color}`}>
                    {getAirQualityStatus(iaqData.airQualityIndex).status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">CO₂ Level</h4>
                    <div className="text-2xl font-bold">{iaqData.co2} ppm</div>
                    <div className="text-sm text-gray-600">Target: Below 800 ppm</div>
                  </div>

                  <div>
                    <h4 className="font-medium">VOC Level</h4>
                    <div className="text-2xl font-bold">{iaqData.voc} ppm</div>
                    <div className="text-sm text-gray-600">Target: Below 0.5 ppm</div>
                  </div>

                  <div>
                    <h4 className="font-medium">PM2.5</h4>
                    <div className="text-2xl font-bold">{iaqData.pm25} µg/m³</div>
                    <div className="text-sm text-gray-600">Target: Below 25 µg/m³</div>
                  </div>

                  <div>
                    <h4 className="font-medium">Temperature</h4>
                    <div className="text-2xl font-bold">{iaqData.temperature}°C</div>
                    <div className="text-sm text-gray-600">Target: 23-26°C</div>
                  </div>

                  <div>
                    <h4 className="font-medium">Humidity</h4>
                    <div className="text-2xl font-bold">{iaqData.humidity}%</div>
                    <div className="text-sm text-gray-600">Target: 40-60%</div>
                  </div>

                  <div>
                    <h4 className="font-medium">Last Updated</h4>
                    <div className="text-sm">{new Date(iaqData.lastUpdated).toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndoorAirQualityDashboard;

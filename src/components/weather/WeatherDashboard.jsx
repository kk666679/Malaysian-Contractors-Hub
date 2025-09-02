import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Cloud, Sun, CloudRain, AlertTriangle } from 'lucide-react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch('/api/weather/kuala-lumpur');
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data.data);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading weather data...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Weather - Kuala Lumpur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sun className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-3xl font-bold">32°C</p>
                <p className="text-gray-600">Partly Cloudy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Humidity: 75%</p>
              <p className="text-sm text-gray-600">Wind: 15 km/h</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Monsoon Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span>Current Risk Level</span>
              <span className="font-semibold text-yellow-700">Moderate</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span>Next 7 Days</span>
              <span className="font-semibold text-blue-700">High Rainfall Expected</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDashboard;
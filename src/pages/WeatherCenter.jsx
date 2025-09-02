import React from 'react';
import WeatherDashboard from '../components/weather/WeatherDashboard';

const WeatherCenter = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Weather Center</h1>
        <p className="text-gray-600 mt-2">Monitor weather conditions and monsoon risks for construction planning</p>
      </div>
      <WeatherDashboard />
    </div>
  );
};

export default WeatherCenter;
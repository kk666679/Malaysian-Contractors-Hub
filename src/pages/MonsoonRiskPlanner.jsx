import React from 'react';

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { Button } from '../components/ui/button.jsx'
import { Badge } from '../components/ui/badge.jsx'
import PageTransition from '../components/features/PageTransition.jsx'
import { motion } from 'framer-motion'
import monsoonRiskService from '../lib/monsoonRiskService.js'
import { 
  Cloud,
  AlertTriangle,
  Calendar,
  MapPin,
  Droplets,
  Sun,
  CloudRain,
  ArrowLeft,
  Loader2
} from 'lucide-react'

const MonsoonRiskPlanner = () => {
  const [riskData, setRiskData] = useState({
    state: 'KL',
    project_type: 'civil',
    start_date: new Date().toISOString().split('T')[0],
    duration_days: 30
  })
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const states = [
    { id: 'KL', label: 'Kuala Lumpur' },
    { id: 'Penang', label: 'Penang' },
    { id: 'Johor', label: 'Johor' }
  ]

  const projectTypes = [
    { id: 'civil', label: 'Civil Works', sensitivity: 'High' },
    { id: 'electrical', label: 'Electrical', sensitivity: 'Medium' },
    { id: 'sewerage', label: 'Sewerage', sensitivity: 'High' },
    { id: 'elv', label: 'ELV Systems', sensitivity: 'Low' }
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'none': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'sunny': return <Sun className="h-4 w-4" />
      case 'partly_cloudy': return <Cloud className="h-4 w-4" />
      case 'light_rain': return <CloudRain className="h-4 w-4" />
      case 'moderate_rain': return <CloudRain className="h-4 w-4" />
      case 'heavy_rain': return <Droplets className="h-4 w-4" />
      default: return <Cloud className="h-4 w-4" />
    }
  }

  const assessRisk = async () => {
    setLoading(true)
    setError(null)
    try {
      // Get weather forecast using API service
      const forecastResponse = await monsoonRiskService.fetchWeatherForecast(riskData.state, 7)
      if (forecastResponse.success) {
        setWeatherForecast(forecastResponse.data)
      }

      // Get risk assessment using API service
      const riskResponse = await monsoonRiskService.assessMonsoonRisk(riskData)
      if (riskResponse.success) {
        setRiskAssessment(riskResponse.data)
      }
    } catch (error) {
      setError('Failed to assess monsoon risk. Please try again.')
      console.error('Error assessing risk:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              to="/"
              variant="ghost" 
              className="flex items-center gap-2"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Monsoon Risk Planner</h2>
          <p className="text-lg text-gray-600">
            Weather impact analysis on drainage/earthwork schedules
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={assessRisk}
            >
              Try Again
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                Project Parameters
              </CardTitle>
              <CardDescription>
                Configure your project for weather risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  value={riskData.state}
                  onChange={(e) => setRiskData(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <div className="space-y-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setRiskData(prev => ({ ...prev, project_type: type.id }))}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        riskData.project_type === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{type.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {type.sensitivity} Risk
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Duration (days)
                </label>
                <input
                  type="number"
                  value={riskData.duration_days}
                  onChange={(e) => setRiskData(prev => ({ ...prev, duration_days: parseInt(e.target.value) }))}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="365"
                />
              </div>

              <Button 
                onClick={assessRisk} 
                disabled={loading}
                className="w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Analyzing Risk...' : 'Assess Weather Risk'}
              </Button>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                7-Day Forecast
              </CardTitle>
              <CardDescription>
                Weather conditions for {riskData.state}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {weatherForecast ? (
                <div className="space-y-3">
                  {weatherForecast.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getWeatherIcon(day.weather)}
                        <div>
                          <div className="font-medium">{new Date(day.date).toLocaleDateString('en-MY', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                          <div className="text-sm text-gray-500 capitalize">{day.weather.replace('_', ' ')}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{day.rainfall}mm</div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRiskColor(day.risk)}`}
                        >
                          {day.risk} risk
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Cloud className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Click "Assess Weather Risk" to view forecast</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Risk Assessment
              </CardTitle>
              <CardDescription>
                Weather impact analysis and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {riskAssessment ? (
                <div className="space-y-6">
                  {/* Overall Risk */}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Overall Risk Level</div>
                    <Badge 
                      className={`text-lg px-4 py-2 ${getRiskColor(riskAssessment.risk_level)}`}
                    >
                      {riskAssessment.risk_level.toUpperCase()}
                    </Badge>
                    <div className="text-sm text-gray-600 mt-2">
                      Score: {riskAssessment.overall_risk_score}/3.0
                    </div>
                  </div>

                  {/* Risk Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Risk Breakdown</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-semibold text-red-600">{riskAssessment.risk_breakdown.high_risk_days}</div>
                        <div className="text-red-600">High Risk Days</div>
                      </div>
                      
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="font-semibold text-yellow-600">{riskAssessment.risk_breakdown.medium_risk_days}</div>
                        <div className="text-yellow-600">Medium Risk Days</div>
                      </div>
                      
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-semibold text-blue-600">{riskAssessment.risk_breakdown.low_risk_days}</div>
                        <div className="text-blue-600">Low Risk Days</div>
                      </div>
                      
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-semibold text-green-600">{riskAssessment.risk_breakdown.safe_days}</div>
                        <div className="text-green-600">Safe Days</div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Recommendations</h4>
                    <div className="space-y-2">
                      {riskAssessment.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded text-sm">
                          <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimal Work Days */}
                  {riskAssessment.optimal_work_days.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Optimal Work Days</h4>
                      <div className="flex flex-wrap gap-1">
                        {riskAssessment.optimal_work_days.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-green-600 bg-green-50">
                            {new Date(date).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Avoid Work Days */}
                  {riskAssessment.avoid_work_days.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Avoid Work Days</h4>
                      <div className="flex flex-wrap gap-1">
                        {riskAssessment.avoid_work_days.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-red-600 bg-red-50">
                            {new Date(date).toLocaleDateString('en-MY', { month: 'short', day: 'numeric' })}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Configure project parameters and assess risk to view analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </PageTransition>
  )
}

export default MonsoonRiskPlanner


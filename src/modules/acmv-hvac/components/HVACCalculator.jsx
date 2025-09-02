import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Thermometer, Calculator } from 'lucide-react';

const HVACCalculator = () => {
  const [formData, setFormData] = useState({
    roomArea: '',
    roomHeight: '',
    occupancy: '',
    location: 'kuala-lumpur'
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateLoad = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/hvac/load-calculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.data);
      }
    } catch (error) {
      console.error('HVAC calculation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            HVAC Load Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Room Area (m²)"
              value={formData.roomArea}
              onChange={(e) => setFormData({...formData, roomArea: e.target.value})}
            />
            <Input
              type="number"
              placeholder="Room Height (m)"
              value={formData.roomHeight}
              onChange={(e) => setFormData({...formData, roomHeight: e.target.value})}
            />
            <Input
              type="number"
              placeholder="Occupancy"
              value={formData.occupancy}
              onChange={(e) => setFormData({...formData, occupancy: e.target.value})}
            />
            <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kuala-lumpur">Kuala Lumpur</SelectItem>
                <SelectItem value="penang">Penang</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateLoad} disabled={loading}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded">
                <div className="font-semibold">Total Load</div>
                <div>{results.loadCalculation.totalLoad} BTU/hr</div>
              </div>
              <div className="p-4 bg-green-50 rounded">
                <div className="font-semibold">Recommended</div>
                <div>{results.equipment.recommendedTonnage} tons</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HVACCalculator;
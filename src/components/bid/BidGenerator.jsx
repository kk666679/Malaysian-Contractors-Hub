import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calculator, FileText } from 'lucide-react';

const BidGenerator = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    area: '',
    location: '',
    timeline: ''
  });
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateBid = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/bid/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          area: parseFloat(formData.area),
          timeline: parseInt(formData.timeline)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBid(data.data);
      }
    } catch (error) {
      console.error('Bid generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Project Bid Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={formData.projectType} onValueChange={(value) => setFormData({...formData, projectType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="number"
              placeholder="Area (sqm)"
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
            />

            <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kuala-lumpur">Kuala Lumpur</SelectItem>
                <SelectItem value="selangor">Selangor</SelectItem>
                <SelectItem value="penang">Penang</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Timeline (months)"
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
            />
          </div>

          <Button onClick={generateBid} disabled={loading} className="w-full">
            {loading ? 'Generating...' : 'Generate Bid'}
          </Button>
        </CardContent>
      </Card>

      {bid && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Bid
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold">Total Cost</h4>
                <p className="text-2xl font-bold text-blue-600">RM {bid.totalCost.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold">Per sqm</h4>
                <p className="text-2xl font-bold text-green-600">RM {bid.pricePerSqm.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BidGenerator;
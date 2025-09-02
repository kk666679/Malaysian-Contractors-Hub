import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

const ComplianceChecker = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    location: '',
    buildingHeight: '',
    occupancy: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkCompliance = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/civil-engineering/check-compliance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          designType: formData.projectType,
          location: formData.location
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.data);
      }
    } catch (error) {
      console.error('Compliance check error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Checker
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
              placeholder="Building Height (m)"
              value={formData.buildingHeight}
              onChange={(e) => setFormData({...formData, buildingHeight: e.target.value})}
            />

            <Input
              type="number"
              placeholder="Occupancy"
              value={formData.occupancy}
              onChange={(e) => setFormData({...formData, occupancy: e.target.value})}
            />
          </div>

          <Button onClick={checkCompliance} disabled={loading} className="w-full">
            {loading ? 'Checking...' : 'Check Compliance'}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.standards?.map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{standard}</span>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComplianceChecker;
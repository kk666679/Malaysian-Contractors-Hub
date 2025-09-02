import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';

const StormwaterDesigner = () => {
  const [designData, setDesignData] = useState({
    catchmentArea: '5000',
    rainfallIntensity: '150',
    timeOfConcentration: '15',
    slope: '2',
    soilType: 'clay',
    landUse: 'residential'
  });

  const [designResults, setDesignResults] = useState(null);
  const [isDesigning, setIsDesigning] = useState(false);

  const soilTypes = [
    { value: 'sand', label: 'Sandy Soil', runoffCoeff: 0.15 },
    { value: 'loam', label: 'Loamy Soil', runoffCoeff: 0.25 },
    { value: 'clay', label: 'Clay Soil', runoffCoeff: 0.35 },
    { value: 'impervious', label: 'Impervious', runoffCoeff: 0.95 }
  ];

  const landUses = [
    { value: 'residential', label: 'Residential', runoffCoeff: 0.30 },
    { value: 'commercial', label: 'Commercial', runoffCoeff: 0.70 },
    { value: 'industrial', label: 'Industrial', runoffCoeff: 0.80 },
    { value: 'park', label: 'Park/Open Space', runoffCoeff: 0.15 }
  ];

  const calculateStormwater = async () => {
    setIsDesigning(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/sewerage/stormwater-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          catchmentArea: parseFloat(designData.catchmentArea),
          rainfallIntensity: parseFloat(designData.rainfallIntensity),
          runoffCoefficient: Math.max(
            soilTypes.find(s => s.value === designData.soilType).runoffCoeff,
            landUses.find(l => l.value === designData.landUse).runoffCoeff
          ),
          timeOfConcentration: parseFloat(designData.timeOfConcentration)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDesignResults(data.data);
      }
    } catch (error) {
      console.error('Stormwater design error:', error);
    } finally {
      setIsDesigning(false);
    }
  };


  };

  const generateRecommendations = (flow, data) => {
    const recommendations = [];

    if (flow > 5) {
      recommendations.push('Consider underground detention system for high flow rates');
      recommendations.push('Implement flow control devices to prevent downstream flooding');
    }

    if (parseFloat(data.slope) < 1) {
      recommendations.push('Increase pipe slope or consider pumping station');
    }

    recommendations.push('Install silt traps at drainage inlets');
    recommendations.push('Provide access points for maintenance');
    recommendations.push('Consider sustainable drainage systems (SUDS)');

    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌧️ Stormwater Designer
            <Badge variant="secondary">DID Standards</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Design stormwater drainage systems with Malaysian DID compliance
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="catchmentArea">Catchment Area (m²)</Label>
                <Input
                  type="number"
                  value={designData.catchmentArea}
                  onChange={(e) => setDesignData({ ...designData, catchmentArea: e.target.value })}
                  placeholder="5000"
                />
              </div>

              <div>
                <Label htmlFor="rainfallIntensity">Rainfall Intensity (mm/hr)</Label>
                <Input
                  type="number"
                  value={designData.rainfallIntensity}
                  onChange={(e) => setDesignData({ ...designData, rainfallIntensity: e.target.value })}
                  placeholder="150"
                />
              </div>

              <div>
                <Label htmlFor="timeOfConcentration">Time of Concentration (min)</Label>
                <Input
                  type="number"
                  value={designData.timeOfConcentration}
                  onChange={(e) => setDesignData({ ...designData, timeOfConcentration: e.target.value })}
                  placeholder="15"
                />
              </div>

              <div>
                <Label htmlFor="slope">Pipe Slope (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={designData.slope}
                  onChange={(e) => setDesignData({ ...designData, slope: e.target.value })}
                  placeholder="2.0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select
                  value={designData.soilType}
                  onValueChange={(value) => setDesignData({ ...designData, soilType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.value} value={soil.value}>
                        {soil.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="landUse">Land Use</Label>
                <Select
                  value={designData.landUse}
                  onValueChange={(value) => setDesignData({ ...designData, landUse: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {landUses.map((land) => (
                      <SelectItem key={land.value} value={land.value}>
                        {land.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Design Parameters</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Soil Runoff Coefficient: {soilTypes.find(s => s.value === designData.soilType)?.runoffCoeff}</div>
                  <div>Land Use Coefficient: {landUses.find(l => l.value === designData.landUse)?.runoffCoeff}</div>
                  <div>Return Period: 100 years</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={calculateStormwater}
              disabled={isDesigning}
              size="lg"
            >
              {isDesigning ? 'Designing System...' : 'Design Stormwater System'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {designResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hydrology Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Runoff Coefficient:</span>
                  <span className="font-mono font-semibold">{designResults.hydrology.runoffCoefficient}</span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Flow:</span>
                  <span className="font-mono font-semibold">{designResults.hydrology.peakFlow} m³/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Time of Concentration:</span>
                  <span className="font-mono">{designResults.hydrology.timeOfConcentration} min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detention Basin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Storage Volume:</span>
                  <span className="font-mono font-semibold">{designResults.detention.storageVolume} m³</span>
                </div>
                <div className="flex justify-between">
                  <span>Basin Area:</span>
                  <span className="font-mono">{designResults.detention.basinArea} m²</span>
                </div>
                <div className="flex justify-between">
                  <span>Detention Time:</span>
                  <span className="font-mono">{designResults.detention.detentionTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Drainage Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Pipe Diameter:</span>
                  <span className="font-mono font-semibold">{designResults.drainage.pipeDiameter} mm</span>
                </div>
                <div className="flex justify-between">
                  <span>Flow Velocity:</span>
                  <span className="font-mono">{designResults.drainage.flowVelocity} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Pipe Slope:</span>
                  <span className="font-mono">{designResults.drainage.slope}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Design Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StormwaterDesigner;

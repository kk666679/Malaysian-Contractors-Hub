import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

const FloodRiskAnalyzer = () => {
  const [analysisData, setAnalysisData] = useState({
    location: 'kuala-lumpur',
    elevation: '10',
    rainfallReturnPeriod: '100',
    drainageCapacity: '5',
    landUse: 'urban',
    soilPermeability: 'low'
  });

  const [riskResults, setRiskResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const locations = [
    { value: 'kuala-lumpur', label: 'Kuala Lumpur', floodRisk: 'high', rainfall: 200 },
    { value: 'penang', label: 'Penang', floodRisk: 'medium', rainfall: 180 },
    { value: 'johor-bahru', label: 'Johor Bahru', floodRisk: 'high', rainfall: 190 },
    { value: 'kuching', label: 'Kuching', floodRisk: 'medium', rainfall: 170 },
    { value: 'kota-kinabalu', label: 'Kota Kinabalu', floodRisk: 'low', rainfall: 160 }
  ];

  const returnPeriods = [
    { value: '25', label: '25-year (4% risk)', intensity: 120 },
    { value: '50', label: '50-year (2% risk)', intensity: 140 },
    { value: '100', label: '100-year (1% risk)', intensity: 160 },
    { value: '200', label: '200-year (0.5% risk)', intensity: 180 }
  ];

  const landUses = [
    { value: 'urban', label: 'Urban/Developed', runoffCoeff: 0.85 },
    { value: 'suburban', label: 'Suburban', runoffCoeff: 0.65 },
    { value: 'rural', label: 'Rural/Agricultural', runoffCoeff: 0.35 },
    { value: 'forest', label: 'Forest/Natural', runoffCoeff: 0.15 }
  ];

  const soilTypes = [
    { value: 'high', label: 'High Permeability', infiltration: 15 },
    { value: 'medium', label: 'Medium Permeability', infiltration: 8 },
    { value: 'low', label: 'Low Permeability', infiltration: 3 }
  ];

  const analyzeFloodRisk = async () => {
    setIsAnalyzing(true);

    // Simulate risk analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    const location = locations.find(loc => loc.value === analysisData.location);
    const returnPeriod = returnPeriods.find(rp => rp.value === analysisData.rainfallReturnPeriod);
    const landUse = landUses.find(lu => lu.value === analysisData.landUse);
    const soil = soilTypes.find(s => s.value === analysisData.soilPermeability);

    // Calculate flood risk factors
    const rainfallIntensity = returnPeriod.intensity;
    const drainageCapacity = parseFloat(analysisData.drainageCapacity);
    const elevation = parseFloat(analysisData.elevation);

    // Risk assessment algorithm
    const runoffVolume = (rainfallIntensity * landUse.runoffCoeff) / 1000; // m³/m²
    const infiltrationRate = soil.infiltration / 1000; // m/s
    const excessRunoff = Math.max(0, runoffVolume - (infiltrationRate * 3600)); // m³/m²/hr

    // Flood risk calculation
    const floodDepth = Math.max(0, excessRunoff - drainageCapacity) * 1000; // mm
    const floodRiskScore = calculateRiskScore(floodDepth, elevation, location.floodRisk);

    const riskLevel = floodRiskScore > 75 ? 'High' :
                     floodRiskScore > 50 ? 'Medium' : 'Low';

    const results = {
      riskAssessment: {
        overallRisk: riskLevel,
        riskScore: floodRiskScore.toFixed(1),
        floodDepth: floodDepth.toFixed(1),
        returnPeriod: returnPeriod.label
      },
      contributingFactors: {
        rainfall: `${rainfallIntensity} mm/hr`,
        runoff: `${(landUse.runoffCoeff * 100).toFixed(0)}%`,
        drainage: `${drainageCapacity} m³/s`,
        elevation: `${elevation} m`,
        soilInfiltration: `${soil.infiltration} mm/hr`
      },
      mitigationStrategies: generateMitigationStrategies(riskLevel, analysisData),
      vulnerabilityIndex: calculateVulnerabilityIndex(analysisData)
    };

    setRiskResults(results);
    setIsAnalyzing(false);
  };

  const calculateRiskScore = (depth, elevation, baseRisk) => {
    let score = 0;

    // Depth factor
    if (depth > 500) score += 40;
    else if (depth > 200) score += 25;
    else if (depth > 50) score += 10;

    // Elevation factor
    if (elevation < 5) score += 30;
    else if (elevation < 10) score += 15;

    // Base risk factor
    if (baseRisk === 'high') score += 20;
    else if (baseRisk === 'medium') score += 10;

    return Math.min(100, score);
  };

  const generateMitigationStrategies = (riskLevel, data) => {
    const strategies = [];

    if (riskLevel === 'High') {
      strategies.push('Implement retention basins and detention ponds');
      strategies.push('Upgrade drainage infrastructure to higher capacity');
      strategies.push('Develop flood emergency response plan');
      strategies.push('Consider property buyout for high-risk areas');
    } else if (riskLevel === 'Medium') {
      strategies.push('Improve drainage maintenance schedule');
      strategies.push('Install flood monitoring sensors');
      strategies.push('Create flood awareness programs');
    } else {
      strategies.push('Regular drainage system inspection');
      strategies.push('Maintain vegetation for natural drainage');
    }

    if (parseFloat(data.elevation) < 10) {
      strategies.push('Elevate critical infrastructure');
    }

    strategies.push('Implement sustainable urban drainage systems (SUDS)');

    return strategies;
  };

  const calculateVulnerabilityIndex = (data) => {
    const elevation = parseFloat(data.elevation);
    const drainage = parseFloat(data.drainageCapacity);

    let vulnerability = 50; // Base vulnerability

    if (elevation < 5) vulnerability += 25;
    else if (elevation < 10) vulnerability += 10;

    if (drainage < 3) vulnerability += 20;
    else if (drainage < 5) vulnerability += 10;

    if (data.landUse === 'urban') vulnerability += 15;
    if (data.soilPermeability === 'low') vulnerability += 10;

    return Math.min(100, vulnerability);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌊 Flood Risk Analyzer
            <Badge variant="secondary">DID Flood Mapping</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Assess flood risk and vulnerability using Malaysian DID flood mapping data
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Select
                  value={analysisData.location}
                  onValueChange={(value) => setAnalysisData({ ...analysisData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="elevation">Ground Elevation (m)</Label>
                <Input
                  type="number"
                  value={analysisData.elevation}
                  onChange={(e) => setAnalysisData({ ...analysisData, elevation: e.target.value })}
                  placeholder="10"
                />
              </div>

              <div>
                <Label htmlFor="rainfallReturnPeriod">Return Period</Label>
                <Select
                  value={analysisData.rainfallReturnPeriod}
                  onValueChange={(value) => setAnalysisData({ ...analysisData, rainfallReturnPeriod: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {returnPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="drainageCapacity">Drainage Capacity (m³/s)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={analysisData.drainageCapacity}
                  onChange={(e) => setAnalysisData({ ...analysisData, drainageCapacity: e.target.value })}
                  placeholder="5.0"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="landUse">Land Use</Label>
                <Select
                  value={analysisData.landUse}
                  onValueChange={(value) => setAnalysisData({ ...analysisData, landUse: value })}
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

              <div>
                <Label htmlFor="soilPermeability">Soil Permeability</Label>
                <Select
                  value={analysisData.soilPermeability}
                  onValueChange={(value) => setAnalysisData({ ...analysisData, soilPermeability: value })}
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

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Risk Factors</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Location Risk: {locations.find(loc => loc.value === analysisData.location)?.floodRisk}</div>
                  <div>Base Rainfall: {locations.find(loc => loc.value === analysisData.location)?.rainfall} mm/hr</div>
                  <div>Runoff Coefficient: {landUses.find(lu => lu.value === analysisData.landUse)?.runoffCoeff}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={analyzeFloodRisk}
              disabled={isAnalyzing}
              size="lg"
            >
              {isAnalyzing ? 'Analyzing Risk...' : 'Analyze Flood Risk'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {riskResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold px-3 py-2 rounded-lg ${getRiskColor(riskResults.riskAssessment.overallRisk)}`}>
                    {riskResults.riskAssessment.overallRisk} Risk
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Risk Score: {riskResults.riskAssessment.riskScore}/100
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Flood Depth:</span>
                    <span className="font-mono">{riskResults.riskAssessment.floodDepth} mm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Return Period:</span>
                    <span>{riskResults.riskAssessment.returnPeriod}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contributing Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Rainfall Intensity:</span>
                  <span className="font-mono">{riskResults.contributingFactors.rainfall}</span>
                </div>
                <div className="flex justify-between">
                  <span>Runoff Coefficient:</span>
                  <span className="font-mono">{riskResults.contributingFactors.runoff}</span>
                </div>
                <div className="flex justify-between">
                  <span>Drainage Capacity:</span>
                  <span className="font-mono">{riskResults.contributingFactors.drainage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Elevation:</span>
                  <span className="font-mono">{riskResults.contributingFactors.elevation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Soil Infiltration:</span>
                  <span className="font-mono">{riskResults.contributingFactors.soilInfiltration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vulnerability Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {riskResults.vulnerabilityIndex}%
                  </div>
                  <div className="text-sm text-gray-600">Vulnerability Score</div>
                </div>

                <Progress value={riskResults.vulnerabilityIndex} className="h-3" />

                <div className="text-xs text-gray-600 text-center">
                  Higher scores indicate greater vulnerability to flooding
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskResults.mitigationStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-500 mt-1">🛡️</span>
                    <span className="text-sm">{strategy}</span>
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

export default FloodRiskAnalyzer;

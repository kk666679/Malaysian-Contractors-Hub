import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';

const HVACDesignCalculator = () => {
  const [designData, setDesignData] = useState({
    buildingType: 'office',
    floorArea: '1000',
    ceilingHeight: '3',
    occupancy: '50',
    location: 'kuala-lumpur',
    designTemperature: '24',
    ventilationRate: '10'
  });

  const [calculationResults, setCalculationResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const buildingTypes = [
    { value: 'office', label: 'Office Building', coolingLoad: 100 },
    { value: 'retail', label: 'Retail/Shopping', coolingLoad: 150 },
    { value: 'residential', label: 'Residential', coolingLoad: 80 },
    { value: 'hospital', label: 'Hospital', coolingLoad: 200 },
    { value: 'school', label: 'School', coolingLoad: 120 },
    { value: 'industrial', label: 'Industrial', coolingLoad: 180 }
  ];

  const locations = [
    { value: 'kuala-lumpur', label: 'Kuala Lumpur', designTemp: 32, humidity: 75 },
    { value: 'penang', label: 'Penang', designTemp: 31, humidity: 78 },
    { value: 'johor-bahru', label: 'Johor Bahru', designTemp: 33, humidity: 72 },
    { value: 'kuching', label: 'Kuching', designTemp: 34, humidity: 80 },
    { value: 'kota-kinabalu', label: 'Kota Kinabalu', designTemp: 31, humidity: 76 }
  ];

  const calculateHVAC = async () => {
    setIsCalculating(true);

    // Simulate calculation processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const buildingTypeData = buildingTypes.find(bt => bt.value === designData.buildingType);
    const locationData = locations.find(loc => loc.value === designData.location);

    // Basic cooling load calculation (simplified)
    const baseLoad = buildingTypeData.coolingLoad; // W/m²
    const floorArea = parseFloat(designData.floorArea);
    const totalCoolingLoad = baseLoad * floorArea;

    // Heat load calculations
    const sensibleHeat = totalCoolingLoad * 0.8;
    const latentHeat = totalCoolingLoad * 0.2;

    // Air flow calculations
    const airFlowRate = (totalCoolingLoad / 1000) / (1.2 * 1.005 * (locationData.designTemp - parseFloat(designData.designTemperature))) * 3600;

    // Equipment sizing
    const tonnage = totalCoolingLoad / 3517; // Convert W to Tons (1 ton = 3517W)
    const recommendedTonnage = Math.ceil(tonnage / 5) * 5; // Round to nearest 5 tons

    // Ventilation requirements (ASHRAE 62.1)
    const ventilationAirFlow = parseFloat(designData.occupancy) * parseFloat(designData.ventilationRate) / 60; // m³/s

    const results = {
      coolingLoad: {
        total: totalCoolingLoad.toFixed(0),
        sensible: sensibleHeat.toFixed(0),
        latent: latentHeat.toFixed(0),
        perArea: (totalCoolingLoad / floorArea).toFixed(1)
      },
      airFlow: {
        supply: airFlowRate.toFixed(1),
        ventilation: ventilationAirFlow.toFixed(2)
      },
      equipment: {
        tonnage: tonnage.toFixed(1),
        recommendedTonnage: recommendedTonnage,
        numberOfUnits: Math.ceil(recommendedTonnage / 20), // Assuming 20-ton units
        efficiency: 'SEER 14' // Standard efficiency
      },
      designConditions: {
        outdoorTemp: locationData.designTemp,
        indoorTemp: designData.designTemperature,
        humidity: locationData.humidity
      },
      recommendations: generateRecommendations(totalCoolingLoad, designData, locationData)
    };

    setCalculationResults(results);
    setIsCalculating(false);
  };

  const generateRecommendations = (load, data, location) => {
    const recommendations = [];

    if (load > 100000) { // > 100kW
      recommendations.push('Consider central chilled water system for better efficiency');
      recommendations.push('Implement variable speed drives for pumps and fans');
    } else if (load > 50000) { // > 50kW
      recommendations.push('Multiple split systems or VRF system recommended');
      recommendations.push('Consider thermal storage for peak demand management');
    } else {
      recommendations.push('Split or window AC units suitable for this load');
      recommendations.push('Consider inverter technology for energy savings');
    }

    if (location.designTemp > 32) {
      recommendations.push('High ambient temperature - consider evaporative cooling assistance');
    }

    if (parseFloat(data.ceilingHeight) > 3.5) {
      recommendations.push('High ceiling - consider stratified air distribution');
    }

    recommendations.push('Install CO2 sensors for demand-controlled ventilation');
    recommendations.push('Consider heat recovery from exhaust air');

    return recommendations;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏢 HVAC Design Calculator
            <Badge variant="secondary">MS 1525:2019 Compliant</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Calculate cooling loads and design HVAC systems for Malaysian climate conditions
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="design">Design Parameters</TabsTrigger>
              <TabsTrigger value="results">Calculation Results</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="buildingType">Building Type</Label>
                    <Select
                      value={designData.buildingType}
                      onValueChange={(value) => setDesignData({ ...designData, buildingType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {buildingTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="floorArea">Floor Area (m²)</Label>
                      <Input
                        type="number"
                        value={designData.floorArea}
                        onChange={(e) => setDesignData({ ...designData, floorArea: e.target.value })}
                        placeholder="1000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ceilingHeight">Ceiling Height (m)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={designData.ceilingHeight}
                        onChange={(e) => setDesignData({ ...designData, ceilingHeight: e.target.value })}
                        placeholder="3.0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select
                      value={designData.location}
                      onValueChange={(value) => setDesignData({ ...designData, location: value })}
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
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="occupancy">Occupancy (persons)</Label>
                      <Input
                        type="number"
                        value={designData.occupancy}
                        onChange={(e) => setDesignData({ ...designData, occupancy: e.target.value })}
                        placeholder="50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="designTemperature">Design Temp (°C)</Label>
                      <Input
                        type="number"
                        value={designData.designTemperature}
                        onChange={(e) => setDesignData({ ...designData, designTemperature: e.target.value })}
                        placeholder="24"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ventilationRate">Ventilation Rate (L/s/person)</Label>
                    <Input
                      type="number"
                      value={designData.ventilationRate}
                      onChange={(e) => setDesignData({ ...designData, ventilationRate: e.target.value })}
                      placeholder="10"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Design Conditions</h4>
                    <div className="text-sm text-blue-800">
                      {locations.find(loc => loc.value === designData.location)?.label}: {locations.find(loc => loc.value === designData.location)?.designTemp}°C, {locations.find(loc => loc.value === designData.location)?.humidity}% RH
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={calculateHVAC}
                  disabled={isCalculating}
                  size="lg"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate HVAC Design'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {calculationResults ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cooling Load</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Load:</span>
                          <span className="font-mono font-semibold">{calculationResults.coolingLoad.total} W</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sensible Heat:</span>
                          <span className="font-mono">{calculationResults.coolingLoad.sensible} W</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Latent Heat:</span>
                          <span className="font-mono">{calculationResults.coolingLoad.latent} W</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Load/Area:</span>
                          <span className="font-mono">{calculationResults.coolingLoad.perArea} W/m²</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Air Flow Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Supply Air:</span>
                          <span className="font-mono font-semibold">{calculationResults.airFlow.supply} m³/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ventilation:</span>
                          <span className="font-mono">{calculationResults.airFlow.ventilation} m³/s</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          Based on ASHRAE 62.1 ventilation requirements
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Equipment Sizing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Calculated:</span>
                          <span className="font-mono font-semibold">{calculationResults.equipment.tonnage} Tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended:</span>
                          <span className="font-mono">{calculationResults.equipment.recommendedTonnage} Tons</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Units Needed:</span>
                          <span className="font-mono">{calculationResults.equipment.numberOfUnits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span className="font-mono">{calculationResults.equipment.efficiency}</span>
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
                        {calculationResults.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
                  <p className="text-gray-600">Enter design parameters and click "Calculate HVAC Design" to see results.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HVACDesignCalculator;

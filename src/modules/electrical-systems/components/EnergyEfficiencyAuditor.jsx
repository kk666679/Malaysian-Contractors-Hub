import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

const EnergyEfficiencyAuditor = () => {
  const [auditData, setAuditData] = useState({
    buildingType: 'office',
    floorArea: '1000',
    operatingHours: '12',
    electricityRate: '0.35',
    equipment: [
      { type: 'lighting', quantity: '100', power: '18', hoursPerDay: '12' },
      { type: 'aircon', quantity: '10', power: '3000', hoursPerDay: '10' },
      { type: 'computers', quantity: '50', power: '300', hoursPerDay: '8' }
    ]
  });

  const [auditResults, setAuditResults] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const buildingTypes = [
    { value: 'office', label: 'Office Building' },
    { value: 'retail', label: 'Retail/Shopping' },
    { value: 'residential', label: 'Residential' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'hospital', label: 'Hospital/Healthcare' },
    { value: 'school', label: 'School/Educational' }
  ];

  const equipmentTypes = [
    { value: 'lighting', label: 'Lighting' },
    { value: 'aircon', label: 'Air Conditioning' },
    { value: 'computers', label: 'Computers/Office Equipment' },
    { value: 'fans', label: 'Fans/Ventilation' },
    { value: 'pumps', label: 'Pumps' },
    { value: 'motors', label: 'Motors' },
    { value: 'others', label: 'Other Equipment' }
  ];

  const addEquipment = () => {
    setAuditData({
      ...auditData,
      equipment: [...auditData.equipment, { type: 'lighting', quantity: '1', power: '100', hoursPerDay: '8' }]
    });
  };

  const updateEquipment = (index, field, value) => {
    const updatedEquipment = [...auditData.equipment];
    updatedEquipment[index][field] = value;
    setAuditData({ ...auditData, equipment: updatedEquipment });
  };

  const removeEquipment = (index) => {
    const updatedEquipment = auditData.equipment.filter((_, i) => i !== index);
    setAuditData({ ...auditData, equipment: updatedEquipment });
  };

  const runAudit = async () => {
    setIsAuditing(true);

    // Simulate audit processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Calculate energy consumption and efficiency metrics
    const totalConsumption = auditData.equipment.reduce((total, eq) => {
      return total + (parseFloat(eq.quantity) * parseFloat(eq.power) * parseFloat(eq.hoursPerDay) * 30); // Monthly kWh
    }, 0);

    const monthlyCost = totalConsumption * parseFloat(auditData.electricityRate);
    const annualConsumption = totalConsumption * 12;
    const annualCost = monthlyCost * 12;

    // Calculate efficiency score based on building type benchmarks
    const benchmarkConsumption = getBenchmarkConsumption(auditData.buildingType, parseFloat(auditData.floorArea));
    const efficiencyScore = Math.min(100, Math.max(0, ((benchmarkConsumption - totalConsumption) / benchmarkConsumption) * 100 + 50));

    const results = {
      totalConsumption: totalConsumption.toFixed(0),
      monthlyCost: monthlyCost.toFixed(2),
      annualConsumption: annualConsumption.toFixed(0),
      annualCost: annualCost.toFixed(2),
      efficiencyScore: efficiencyScore.toFixed(1),
      carbonFootprint: (annualConsumption * 0.5).toFixed(1), // kg CO2 per kWh approximation
      recommendations: generateRecommendations(efficiencyScore, auditData.equipment),
      savings: calculatePotentialSavings(totalConsumption, efficiencyScore)
    };

    setAuditResults(results);
    setIsAuditing(false);
  };

  const getBenchmarkConsumption = (buildingType, floorArea) => {
    const benchmarks = {
      office: 150, // kWh/m²/year
      retail: 200,
      residential: 100,
      industrial: 300,
      hospital: 400,
      school: 120
    };
    return benchmarks[buildingType] * floorArea;
  };

  const generateRecommendations = (score, equipment) => {
    const recommendations = [];

    if (score < 60) {
      recommendations.push('Consider LED lighting upgrade - potential 40% energy savings');
      recommendations.push('Implement smart HVAC controls and scheduling');
      recommendations.push('Conduct power quality analysis and install capacitors if needed');
    }

    if (equipment.some(eq => eq.type === 'aircon' && parseFloat(eq.hoursPerDay) > 12)) {
      recommendations.push('Review air conditioning usage patterns and implement demand control');
    }

    if (equipment.some(eq => eq.type === 'computers' && parseFloat(eq.hoursPerDay) > 10)) {
      recommendations.push('Implement power management policies for office equipment');
    }

    recommendations.push('Install energy monitoring system for real-time tracking');
    recommendations.push('Consider solar PV installation for renewable energy generation');

    return recommendations;
  };

  const calculatePotentialSavings = (consumption, score) => {
    const improvementPotential = Math.max(0, 80 - score) / 100; // Up to 80% improvement potential
    const annualSavings = consumption * 12 * improvementPotential * parseFloat(auditData.electricityRate);
    const paybackPeriod = annualSavings > 0 ? (50000 / annualSavings).toFixed(1) : 'N/A'; // Assuming $50k investment

    return {
      annual: annualSavings.toFixed(0),
      percentage: (improvementPotential * 100).toFixed(0),
      paybackPeriod
    };
  };

  const getEfficiencyColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Energy Efficiency Auditor
            <Badge variant="secondary">GEMS Compliant</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Comprehensive energy audit with cost analysis and efficiency recommendations
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="buildingType">Building Type</Label>
                <Select
                  value={auditData.buildingType}
                  onValueChange={(value) => setAuditData({ ...auditData, buildingType: value })}
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
                    value={auditData.floorArea}
                    onChange={(e) => setAuditData({ ...auditData, floorArea: e.target.value })}
                    placeholder="1000"
                  />
                </div>

                <div>
                  <Label htmlFor="operatingHours">Operating Hours/Day</Label>
                  <Input
                    type="number"
                    value={auditData.operatingHours}
                    onChange={(e) => setAuditData({ ...auditData, operatingHours: e.target.value })}
                    placeholder="12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="electricityRate">Electricity Rate (RM/kWh)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={auditData.electricityRate}
                  onChange={(e) => setAuditData({ ...auditData, electricityRate: e.target.value })}
                  placeholder="0.35"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Equipment Inventory</h3>
                <Button onClick={addEquipment} size="sm">
                  Add Equipment
                </Button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {auditData.equipment.map((eq, index) => (
                  <Card key={index} className="p-3">
                    <div className="grid grid-cols-5 gap-2 items-end">
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={eq.type}
                          onValueChange={(value) => updateEquipment(index, 'type', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          value={eq.quantity}
                          onChange={(e) => updateEquipment(index, 'quantity', e.target.value)}
                          className="h-8"
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Power (W)</Label>
                        <Input
                          type="number"
                          value={eq.power}
                          onChange={(e) => updateEquipment(index, 'power', e.target.value)}
                          className="h-8"
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Hours/Day</Label>
                        <Input
                          type="number"
                          value={eq.hoursPerDay}
                          onChange={(e) => updateEquipment(index, 'hoursPerDay', e.target.value)}
                          className="h-8"
                        />
                      </div>

                      <Button
                        onClick={() => removeEquipment(index)}
                        variant="outline"
                        size="sm"
                        className="h-8"
                      >
                        ✕
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={runAudit}
              disabled={isAuditing}
              size="lg"
            >
              {isAuditing ? 'Running Energy Audit...' : 'Run Energy Audit'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {auditResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Energy Consumption</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monthly Consumption:</span>
                  <span className="font-mono font-semibold">{auditResults.totalConsumption} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Consumption:</span>
                  <span className="font-mono font-semibold">{auditResults.annualConsumption} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Cost:</span>
                  <span className="font-mono font-semibold">RM {auditResults.monthlyCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Cost:</span>
                  <span className="font-mono font-semibold">RM {auditResults.annualCost}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Efficiency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getEfficiencyColor(auditResults.efficiencyScore)}`}>
                    {auditResults.efficiencyScore}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {getEfficiencyLabel(parseFloat(auditResults.efficiencyScore))}
                  </div>
                </div>

                <Progress value={parseFloat(auditResults.efficiencyScore)} className="h-3" />

                <div className="text-center">
                  <div className="text-sm text-gray-600">Carbon Footprint</div>
                  <div className="font-semibold">{auditResults.carbonFootprint} kg CO₂/year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Potential Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Annual Savings:</span>
                  <span className="font-mono font-semibold text-green-600">
                    RM {auditResults.savings.annual}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Improvement Potential:</span>
                  <span className="font-mono font-semibold">
                    {auditResults.savings.percentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payback Period:</span>
                  <span className="font-mono font-semibold">
                    {auditResults.savings.paybackPeriod} years
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auditResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-500 mt-1">💡</span>
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

export default EnergyEfficiencyAuditor;

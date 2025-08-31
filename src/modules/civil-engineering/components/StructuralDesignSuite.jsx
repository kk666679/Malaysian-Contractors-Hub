import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const StructuralDesignSuite = () => {
  const [designData, setDesignData] = useState({
    structureType: '',
    spanLength: '',
    loadType: '',
    material: 'concrete',
    safetyFactor: 1.5
  });

  const [complianceResults, setComplianceResults] = useState(null);

  const structureTypes = [
    { value: 'beam', label: 'Beam' },
    { value: 'column', label: 'Column' },
    { value: 'slab', label: 'Slab' },
    { value: 'foundation', label: 'Foundation' }
  ];

  const loadTypes = [
    { value: 'dead', label: 'Dead Load' },
    { value: 'live', label: 'Live Load' },
    { value: 'wind', label: 'Wind Load' },
    { value: 'seismic', label: 'Seismic Load' }
  ];

  const materials = [
    { value: 'concrete', label: 'Reinforced Concrete' },
    { value: 'steel', label: 'Structural Steel' },
    { value: 'timber', label: 'Timber' },
    { value: 'composite', label: 'Composite' }
  ];

  const checkCompliance = () => {
    // Mock compliance check - in real implementation, this would integrate with
    // Malaysian standards database and perform actual calculations
    const results = {
      compliant: true,
      standards: ['MS 1183:2015', 'UBBL 1984'],
      recommendations: [
        'Increase reinforcement ratio by 15% for seismic zones',
        'Consider using higher grade concrete for improved durability'
      ],
      calculations: {
        momentCapacity: '245 kNm',
        shearCapacity: '180 kN',
        deflection: 'L/360 (Within limits)'
      }
    };
    setComplianceResults(results);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Structural Design Suite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="structureType">Structure Type</Label>
                <Select
                  value={designData.structureType}
                  onValueChange={(value) => setDesignData({ ...designData, structureType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select structure type" />
                  </SelectTrigger>
                  <SelectContent>
                    {structureTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="spanLength">Span Length (m)</Label>
                <Input
                  type="number"
                  id="spanLength"
                  value={designData.spanLength}
                  onChange={(e) => setDesignData({ ...designData, spanLength: e.target.value })}
                  placeholder="Enter span length"
                />
              </div>

              <div>
                <Label htmlFor="loadType">Load Type</Label>
                <Select
                  value={designData.loadType}
                  onValueChange={(value) => setDesignData({ ...designData, loadType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select load type" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadTypes.map((load) => (
                      <SelectItem key={load.value} value={load.value}>
                        {load.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="material">Material</Label>
                <Select
                  value={designData.material}
                  onValueChange={(value) => setDesignData({ ...designData, material: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.value} value={material.value}>
                        {material.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={checkCompliance} className="w-full">
                Check Compliance
              </Button>
            </div>

            <div className="space-y-4">
              {complianceResults && (
                <>
                  <div className={`p-4 rounded-lg ${
                    complianceResults.compliant 
                      ? 'bg-green-100 border border-green-300' 
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <h3 className="font-semibold mb-2">
                      {complianceResults.compliant ? '✓ Compliant' : '✗ Non-Compliant'}
                    </h3>
                    <p className="text-sm">
                      Design meets {complianceResults.standards.join(', ')} requirements
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Design Calculations</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Moment Capacity:</div>
                      <div className="font-mono">{complianceResults.calculations.momentCapacity}</div>
                      <div>Shear Capacity:</div>
                      <div className="font-mono">{complianceResults.calculations.shearCapacity}</div>
                      <div>Deflection:</div>
                      <div className="font-mono">{complianceResults.calculations.deflection}</div>
                    </div>
                  </div>

                  {complianceResults.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Recommendations</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {complianceResults.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Malaysian Standards Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold">MS 1183:2015</h4>
              <p className="text-sm text-gray-600">Fire precautions in building design</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold">UBBL 1984</h4>
              <p className="text-sm text-gray-600">Uniform Building By-Laws</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold">MS 1553:2018</h4>
              <p className="text-sm text-gray-600">Structural use of concrete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StructuralDesignSuite;

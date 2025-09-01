import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Calculator, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { validateEngineeringForm } from '../../../lib/formValidation';

const CivilEngineeringCalculator = () => {
  const [activeTab, setActiveTab] = useState('structural');
  const [formData, setFormData] = useState({
    concreteGrade: 'C30',
    steelGrade: 'B500',
    beamWidth: '',
    beamDepth: '',
    beamLength: '',
    reinforcement: '',
    barDiameter: '',
    loadType: 'dead',
    loadValue: ''
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const calculationTypes = [
    { id: 'structural', name: 'Structural Design', icon: Building },
    { id: 'compliance', name: 'Compliance Check', icon: CheckCircle },
    { id: 'report', name: 'Design Report', icon: FileText }
  ];

  const concreteGrades = [
    { value: 'C20', label: 'C20 (20 MPa)' },
    { value: 'C25', label: 'C25 (25 MPa)' },
    { value: 'C30', label: 'C30 (30 MPa)' },
    { value: 'C35', label: 'C35 (35 MPa)' },
    { value: 'C40', label: 'C40 (40 MPa)' }
  ];

  const steelGrades = [
    { value: 'B500', label: 'B500 (500 MPa)' },
    { value: 'B460', label: 'B460 (460 MPa)' },
    { value: 'B420', label: 'B420 (420 MPa)' }
  ];

  const loadTypes = [
    { value: 'dead', label: 'Dead Load' },
    { value: 'live', label: 'Live Load' },
    { value: 'wind', label: 'Wind Load' },
    { value: 'seismic', label: 'Seismic Load' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateStructural = async () => {
    const validationErrors = validateEngineeringForm(formData, 'structural');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/civil-engineering/calculate-capacity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          concreteGrade: formData.concreteGrade,
          steelGrade: formData.steelGrade,
          beamWidth: parseFloat(formData.beamWidth),
          beamDepth: parseFloat(formData.beamDepth),
          beamLength: parseFloat(formData.beamLength),
          reinforcement: parseInt(formData.reinforcement),
          barDiameter: parseFloat(formData.barDiameter),
          loadType: formData.loadType,
          loadValue: parseFloat(formData.loadValue)
        })
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Calculation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const checkCompliance = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/civil-engineering/check-compliance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          designType: 'building',
          location: 'Kuala Lumpur',
          standards: ['MS 1183:2015', 'UBBL 1984']
        })
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Compliance check failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    switch (activeTab) {
      case 'structural':
        calculateStructural();
        break;
      case 'compliance':
        checkCompliance();
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Civil Engineering Calculator</h2>
        <p className="text-gray-600">
          Structural design calculations compliant with Malaysian standards
        </p>
      </div>

      {/* Calculation Type Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {calculationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {type.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Design Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTab === 'structural' && (
              <>
                {/* Material Properties */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Concrete Grade
                    </label>
                    <select
                      name="concreteGrade"
                      value={formData.concreteGrade}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {concreteGrades.map(grade => (
                        <option key={grade.value} value={grade.value}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Steel Grade
                    </label>
                    <select
                      name="steelGrade"
                      value={formData.steelGrade}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {steelGrades.map(grade => (
                        <option key={grade.value} value={grade.value}>
                          {grade.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Beam Dimensions */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Width (mm) *
                    </label>
                    <input
                      type="number"
                      name="beamWidth"
                      value={formData.beamWidth}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.beamWidth ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="300"
                    />
                    {errors.beamWidth && (
                      <p className="text-red-500 text-sm mt-1">{errors.beamWidth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Depth (mm) *
                    </label>
                    <input
                      type="number"
                      name="beamDepth"
                      value={formData.beamDepth}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.beamDepth ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="600"
                    />
                    {errors.beamDepth && (
                      <p className="text-red-500 text-sm mt-1">{errors.beamDepth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Length (mm) *
                    </label>
                    <input
                      type="number"
                      name="beamLength"
                      value={formData.beamLength}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>
                </div>

                {/* Reinforcement */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Bars
                    </label>
                    <input
                      type="number"
                      name="reinforcement"
                      value={formData.reinforcement}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bar Diameter (mm)
                    </label>
                    <input
                      type="number"
                      name="barDiameter"
                      value={formData.barDiameter}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>
                </div>

                {/* Loading */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Load Type
                    </label>
                    <select
                      name="loadType"
                      value={formData.loadType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {loadTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Load Value (kN/m) *
                    </label>
                    <input
                      type="number"
                      name="loadValue"
                      value={formData.loadValue}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.loadValue ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="25"
                    />
                    {errors.loadValue && (
                      <p className="text-red-500 text-sm mt-1">{errors.loadValue}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <Button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {activeTab === 'structural' && (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Structural Capacity</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Moment Capacity:</span>
                          <span className="font-medium">{results.momentCapacity?.toFixed(2)} kNm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shear Capacity:</span>
                          <span className="font-medium">{results.shearCapacity?.toFixed(2)} kN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deflection:</span>
                          <span className="font-medium">{results.deflection?.toFixed(2)} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Utilization Ratio:</span>
                          <span className="font-medium">{results.utilizationRatio?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {results.utilizationRatio > 1.0 && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-semibold">Design Warning</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">
                          Utilization ratio exceeds 1.0. Consider increasing section size or reinforcement.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'compliance' && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Compliance Status</h4>
                    <div className="space-y-2 text-sm">
                      {results.standards?.map((standard, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{standard}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.recommendations && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Recommendations</h4>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      {results.recommendations.map((rec, index) => (
                        <li key={index}>• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Building className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p>Enter design parameters and click Calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CivilEngineeringCalculator;
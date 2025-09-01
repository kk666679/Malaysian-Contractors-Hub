import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, Cable, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { validateEngineeringForm } from '../../../lib/formValidation';

const ElectricalCalculatorForm = () => {
  const [activeTab, setActiveTab] = useState('voltage-drop');
  const [formData, setFormData] = useState({
    voltage: '',
    current: '',
    length: '',
    cableSize: '',
    cableType: 'copper',
    powerFactor: '0.85'
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const calculationTypes = [
    { id: 'voltage-drop', name: 'Voltage Drop', icon: Zap },
    { id: 'cable-sizing', name: 'Cable Sizing', icon: Cable },
    { id: 'transformer', name: 'Transformer Sizing', icon: Calculator }
  ];

  const cableTypes = [
    { value: 'copper', label: 'Copper' },
    { value: 'aluminum', label: 'Aluminum' }
  ];

  const standardCableSizes = [
    '1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240', '300'
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

  const calculateVoltageDrop = async () => {
    const validationErrors = validateEngineeringForm(formData, 'electrical');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/electrical-systems/voltage-drop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          voltage: parseFloat(formData.voltage),
          current: parseFloat(formData.current),
          length: parseFloat(formData.length),
          cableSize: formData.cableSize,
          cableType: formData.cableType,
          powerFactor: parseFloat(formData.powerFactor)
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

  const calculateCableSizing = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/electrical-systems/cable-sizing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          voltage: parseFloat(formData.voltage),
          current: parseFloat(formData.current),
          length: parseFloat(formData.length),
          voltageDropMax: 3
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

  const handleCalculate = () => {
    switch (activeTab) {
      case 'voltage-drop':
        calculateVoltageDrop();
        break;
      case 'cable-sizing':
        calculateCableSizing();
        break;
      default:
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Electrical Systems Calculator</h2>
        <p className="text-gray-600">
          Perform electrical calculations for Malaysian construction projects
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
              Input Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Voltage */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Voltage (V) *
              </label>
              <input
                type="number"
                name="voltage"
                value={formData.voltage}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.voltage ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="400"
              />
              {errors.voltage && (
                <p className="text-red-500 text-sm mt-1">{errors.voltage}</p>
              )}
            </div>

            {/* Current */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Current (A) *
              </label>
              <input
                type="number"
                name="current"
                value={formData.current}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.current ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50"
              />
              {errors.current && (
                <p className="text-red-500 text-sm mt-1">{errors.current}</p>
              )}
            </div>

            {/* Cable Length */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Cable Length (m) *
              </label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.length ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="100"
              />
              {errors.length && (
                <p className="text-red-500 text-sm mt-1">{errors.length}</p>
              )}
            </div>

            {/* Cable Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Cable Type
              </label>
              <select
                name="cableType"
                value={formData.cableType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cableTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === 'voltage-drop' && (
              <>
                {/* Cable Size */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cable Size (mm²)
                  </label>
                  <select
                    name="cableSize"
                    value={formData.cableSize}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select cable size</option>
                    {standardCableSizes.map(size => (
                      <option key={size} value={size}>
                        {size} mm²
                      </option>
                    ))}
                  </select>
                </div>

                {/* Power Factor */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Power Factor
                  </label>
                  <input
                    type="number"
                    name="powerFactor"
                    value={formData.powerFactor}
                    onChange={handleInputChange}
                    min="0"
                    max="1"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.85"
                  />
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
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {activeTab === 'voltage-drop' && (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Voltage Drop Analysis</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Voltage Drop:</span>
                          <span className="font-medium">{results.voltageDrop?.toFixed(2)} V</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Percentage Drop:</span>
                          <span className="font-medium">{results.percentageDrop?.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Power Loss:</span>
                          <span className="font-medium">{results.powerLoss?.toFixed(2)} W</span>
                        </div>
                      </div>
                    </div>

                    {results.percentageDrop > 3 && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-semibold">Warning</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">
                          Voltage drop exceeds 3% limit. Consider using larger cable size.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'cable-sizing' && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Recommended Cable Size</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Minimum Size:</span>
                        <span className="font-medium">{results.recommendedSize} mm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Capacity:</span>
                        <span className="font-medium">{results.currentCapacity} A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voltage Drop:</span>
                        <span className="font-medium">{results.voltageDrop?.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {results.compliance && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Compliance Status</h4>
                    <div className="space-y-1 text-sm">
                      {results.compliance.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p>Enter parameters and click Calculate to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElectricalCalculatorForm;
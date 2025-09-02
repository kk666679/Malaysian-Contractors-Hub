import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IoTDashboard = ({ siteId }) => {
  const [selectedSensor, setSelectedSensor] = useState('temperature');
  
  const { data: siteData } = useQuery({
    queryKey: ['iot-site', siteId],
    queryFn: () => fetch(`/api/iot/sites/${siteId}/data`).then(r => r.json()),
    refetchInterval: 30000
  });

  const { data: alerts } = useQuery({
    queryKey: ['iot-alerts', siteId],
    queryFn: () => fetch(`/api/iot/sites/${siteId}/alerts`).then(r => r.json())
  });

  const getSensorIcon = (type) => {
    const icons = {
      temperature: '🌡️',
      humidity: '💧',
      co2: '🌬️',
      noise: '🔊',
      dust: '💨'
    };
    return icons[type] || '📊';
  };

  if (!siteData) return <div>Loading IoT data...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">IoT Site Monitoring</h1>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {siteData.data?.current?.map((sensor, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow cursor-pointer"
            onClick={() => setSelectedSensor(sensor.sensorType)}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{getSensorIcon(sensor.sensorType)}</span>
              <span className={`text-sm font-medium ${
                sensor.status === 'ALERT' ? 'text-red-600' : 'text-green-600'
              }`}>
                {sensor.status}
              </span>
            </div>
            <h3 className="text-sm text-gray-600 capitalize mt-2">{sensor.sensorType}</h3>
            <p className="text-xl font-bold">{sensor.value}{sensor.unit}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Sensor Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={siteData.data?.historical?.filter(r => r.sensorType === selectedSensor) || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {alerts?.data?.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.data.slice(0, 5).map((alert, index) => (
              <div key={index} className="flex items-center p-3 bg-red-50 rounded">
                <span className="text-red-600 mr-3">⚠️</span>
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(alert.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IoTDashboard;
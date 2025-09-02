import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';

const PerformanceDiagnostics = () => {
  const [diagnosticsData, setDiagnosticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runDiagnostics = async () => {
    setIsLoading(true);

    // Simulate diagnostics data fetching
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = {
      hvacEfficiency: 85,
      systemUptime: 99.5,
      faultCount: 2,
      lastMaintenance: '2024-01-10',
      alerts: [
        { id: 1, type: 'warning', message: 'Filter replacement overdue' },
        { id: 2, type: 'info', message: 'System running at reduced capacity' }
      ]
    };

    setDiagnosticsData(data);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚙️ Performance Diagnostics
            <Badge variant="secondary">HVAC System Health</Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Monitor HVAC system performance and receive maintenance alerts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={runDiagnostics} disabled={isLoading} className="w-full">
              {isLoading ? 'Running Diagnostics...' : 'Run Diagnostics'}
            </Button>

            {diagnosticsData && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">System Efficiency</h3>
                  <Progress value={diagnosticsData.hvacEfficiency} className="h-4" />
                  <div className="text-sm text-gray-700 mt-1">{diagnosticsData.hvacEfficiency}%</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">System Uptime</h3>
                  <Progress value={diagnosticsData.systemUptime} className="h-4" />
                  <div className="text-sm text-gray-700 mt-1">{diagnosticsData.systemUptime}%</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Fault Count</h3>
                  <div className="text-xl font-bold text-red-600">{diagnosticsData.faultCount}</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Last Maintenance</h3>
                  <div>{diagnosticsData.lastMaintenance}</div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Alerts</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {diagnosticsData.alerts.map(alert => (
                      <li key={alert.id} className={`text-sm ${alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'}`}>
                        {alert.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDiagnostics;

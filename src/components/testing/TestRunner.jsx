import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Play, CheckCircle, XCircle } from 'lucide-react';

const TestRunner = () => {
  const [tests, setTests] = useState([]);
  const [running, setRunning] = useState(false);

  const testSuites = [
    {
      name: 'Authentication',
      tests: [
        { name: 'Login', endpoint: '/api/auth/login', method: 'POST' },
        { name: 'Register', endpoint: '/api/auth/register', method: 'POST' }
      ]
    },
    {
      name: 'Projects',
      tests: [
        { name: 'Get Projects', endpoint: '/api/projects', method: 'GET' },
        { name: 'Create Project', endpoint: '/api/projects', method: 'POST' }
      ]
    }
  ];

  const runTests = async () => {
    setRunning(true);
    const results = [];

    for (const suite of testSuites) {
      for (const test of suite.tests) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await fetch(test.endpoint, {
            method: test.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? `Bearer ${token}` : ''
            }
          });

          results.push({
            suite: suite.name,
            name: test.name,
            status: response.ok ? 'passed' : 'failed',
            statusCode: response.status
          });
        } catch (error) {
          results.push({
            suite: suite.name,
            name: test.name,
            status: 'error',
            error: error.message
          });
        }
      }
    }

    setTests(results);
    setRunning(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API Tests</h1>
        <Button onClick={runTests} disabled={running}>
          <Play className="h-4 w-4 mr-2" />
          {running ? 'Running...' : 'Run Tests'}
        </Button>
      </div>

      {tests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testSuites.map((suite) => (
                <div key={suite.name}>
                  <h3 className="font-semibold mb-2">{suite.name}</h3>
                  <div className="space-y-2">
                    {tests
                      .filter(test => test.suite === suite.name)
                      .map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(test.status)}
                            <span>{test.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{test.statusCode}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestRunner;
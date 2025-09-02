import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { AlertCircle, CheckCircle, Database, Key, Hash, List, Settings } from 'lucide-react';

const RedisTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Form states
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [ttl, setTtl] = useState('');
  const [hash, setHash] = useState('');
  const [field, setField] = useState('');
  const [listKey, setListKey] = useState('');
  const [listValues, setListValues] = useState('');
  const [setRedisKey, setSetRedisKey] = useState('');
  const [setMembers, setSetMembers] = useState('');
  const [zsetKey, setZsetKey] = useState('');
  const [zsetScore, setZsetScore] = useState('');
  const [zsetMember, setZsetMember] = useState('');
  const [start, setStart] = useState('0');
  const [end, setEnd] = useState('-1');

  const API_BASE = 'http://localhost:5000/api/redis';

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/test`);
      const data = await response.json();
      setConnectionStatus(data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to Redis service');
      setConnectionStatus(null);
    }
    setLoading(false);
  };

  const handleApiCall = async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (body) {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_BASE}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API call failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
    setLoading(false);
  };

  const handleSet = () => {
    if (!key || !value) {
      setError('Key and value are required');
      return;
    }
    handleApiCall('/set', 'POST', { key, value, ttl: ttl ? parseInt(ttl) : undefined });
  };

  const handleGet = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/get/${key}`);
  };

  const handleDelete = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/del/${key}`, 'DELETE');
  };

  const handleExists = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/exists/${key}`);
  };

  const handleExpire = () => {
    if (!key || !ttl) {
      setError('Key and TTL are required');
      return;
    }
    handleApiCall('/expire', 'POST', { key, ttl: parseInt(ttl) });
  };

  const handleTtl = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/ttl/${key}`);
  };

  const handleKeys = () => {
    const pattern = key || '*';
    handleApiCall(`/keys/${pattern}`);
  };

  const handleHset = () => {
    if (!hash || !field || !value) {
      setError('Hash, field, and value are required');
      return;
    }
    handleApiCall('/hset', 'POST', { hash, field, value });
  };

  const handleHget = () => {
    if (!hash || !field) {
      setError('Hash and field are required');
      return;
    }
    handleApiCall(`/hget/${hash}/${field}`);
  };

  const handleHgetall = () => {
    if (!hash) {
      setError('Hash is required');
      return;
    }
    handleApiCall(`/hgetall/${hash}`);
  };

  const handleLpush = () => {
    if (!listKey || !listValues) {
      setError('List key and values are required');
      return;
    }
    const values = listValues.split(',').map(v => v.trim());
    handleApiCall('/lpush', 'POST', { key: listKey, values });
  };

  const handleLrange = () => {
    if (!listKey) {
      setError('List key is required');
      return;
    }
    handleApiCall(`/lrange/${listKey}/${start}/${end}`);
  };

  const handleSadd = () => {
    if (!setKey || !setMembers) {
      setError('Set key and members are required');
      return;
    }
    const members = setMembers.split(',').map(m => m.trim());
    handleApiCall('/sadd', 'POST', { key: setKey, members });
  };

  const handleSmembers = () => {
    if (!setKey) {
      setError('Set key is required');
      return;
    }
    handleApiCall(`/smembers/${setKey}`);
  };

  const handleZadd = () => {
    if (!zsetKey || !zsetScore || !zsetMember) {
      setError('Sorted set key, score, and member are required');
      return;
    }
    handleApiCall('/zadd', 'POST', { key: zsetKey, score: parseFloat(zsetScore), member: zsetMember });
  };

  const handleZrange = () => {
    if (!zsetKey) {
      setError('Sorted set key is required');
      return;
    }
    handleApiCall(`/zrange/${zsetKey}/${start}/${end}?withScores=true`);
  };

  const handleIncr = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/incr/${key}`, 'POST');
  };

  const handleDecr = () => {
    if (!key) {
      setError('Key is required');
      return;
    }
    handleApiCall(`/decr/${key}`, 'POST');
  };

  const handleInfo = () => {
    handleApiCall('/info');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Redis Test Interface</h1>
          <p className="text-muted-foreground">Test Redis operations and connectivity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <Badge variant={connectionStatus?.success ? "default" : "destructive"}>
            {connectionStatus?.success ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Connection Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button onClick={testConnection} disabled={loading}>
              {loading ? 'Testing...' : 'Test Connection'}
            </Button>
            {connectionStatus && (
              <div className="flex items-center space-x-2">
                {connectionStatus.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span>{connectionStatus.message}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Display */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* String Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>String Operations</span>
            </CardTitle>
            <CardDescription>Basic key-value operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter key"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ttl">TTL (seconds, optional)</Label>
              <Input
                id="ttl"
                type="number"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                placeholder="Enter TTL"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSet} disabled={loading}>SET</Button>
              <Button onClick={handleGet} disabled={loading}>GET</Button>
              <Button onClick={handleDelete} disabled={loading} variant="destructive">DEL</Button>
              <Button onClick={handleExists} disabled={loading}>EXISTS</Button>
              <Button onClick={handleExpire} disabled={loading}>EXPIRE</Button>
              <Button onClick={handleTtl} disabled={loading}>TTL</Button>
              <Button onClick={handleKeys} disabled={loading}>KEYS</Button>
              <Button onClick={handleIncr} disabled={loading}>INCR</Button>
              <Button onClick={handleDecr} disabled={loading}>DECR</Button>
            </div>
          </CardContent>
        </Card>

        {/* Hash Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Hash className="h-5 w-5" />
              <span>Hash Operations</span>
            </CardTitle>
            <CardDescription>Hash data structure operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="hash">Hash Key</Label>
                <Input
                  id="hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="Hash key"
                />
              </div>
              <div>
                <Label htmlFor="field">Field</Label>
                <Input
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  placeholder="Field name"
                />
              </div>
              <div>
                <Label htmlFor="hash-value">Value</Label>
                <Input
                  id="hash-value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Field value"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleHset} disabled={loading}>HSET</Button>
              <Button onClick={handleHget} disabled={loading}>HGET</Button>
              <Button onClick={handleHgetall} disabled={loading}>HGETALL</Button>
            </div>
          </CardContent>
        </Card>

        {/* List Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <List className="h-5 w-5" />
              <span>List Operations</span>
            </CardTitle>
            <CardDescription>List data structure operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="list-key">List Key</Label>
              <Input
                id="list-key"
                value={listKey}
                onChange={(e) => setListKey(e.target.value)}
                placeholder="List key"
              />
            </div>
            <div>
              <Label htmlFor="list-values">Values (comma-separated)</Label>
              <Input
                id="list-values"
                value={listValues}
                onChange={(e) => setListValues(e.target.value)}
                placeholder="value1, value2, value3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Start Index</Label>
                <Input
                  id="start"
                  type="number"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="end">End Index</Label>
                <Input
                  id="end"
                  type="number"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLpush} disabled={loading}>LPUSH</Button>
              <Button onClick={handleLrange} disabled={loading}>LRANGE</Button>
            </div>
          </CardContent>
        </Card>

        {/* Set Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Set Operations</span>
            </CardTitle>
            <CardDescription>Set data structure operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="set-key">Set Key</Label>
              <Input
                id="set-key"
                value={setRedisKey}
                onChange={(e) => setSetRedisKey(e.target.value)}
                placeholder="Set key"
              />
            </div>
            <div>
              <Label htmlFor="set-members">Members (comma-separated)</Label>
              <Input
                id="set-members"
                value={setMembers}
                onChange={(e) => setSetMembers(e.target.value)}
                placeholder="member1, member2, member3"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSadd} disabled={loading}>SADD</Button>
              <Button onClick={handleSmembers} disabled={loading}>SMEMBERS</Button>
            </div>
          </CardContent>
        </Card>

        {/* Sorted Set Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Sorted Set Operations</span>
            </CardTitle>
            <CardDescription>Sorted set data structure operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="zset-key">Sorted Set Key</Label>
                <Input
                  id="zset-key"
                  value={zsetKey}
                  onChange={(e) => setZsetKey(e.target.value)}
                  placeholder="Sorted set key"
                />
              </div>
              <div>
                <Label htmlFor="zset-score">Score</Label>
                <Input
                  id="zset-score"
                  type="number"
                  step="0.1"
                  value={zsetScore}
                  onChange={(e) => setZsetScore(e.target.value)}
                  placeholder="1.0"
                />
              </div>
              <div>
                <Label htmlFor="zset-member">Member</Label>
                <Input
                  id="zset-member"
                  value={zsetMember}
                  onChange={(e) => setZsetMember(e.target.value)}
                  placeholder="Member value"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleZadd} disabled={loading}>ZADD</Button>
              <Button onClick={handleZrange} disabled={loading}>ZRANGE</Button>
            </div>
          </CardContent>
        </Card>

        {/* System Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>System Operations</span>
            </CardTitle>
            <CardDescription>Redis system and information operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleInfo} disabled={loading}>INFO</Button>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <p><strong>Note:</strong> Use these operations carefully as they can affect your Redis data.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RedisTestPage;

import { apiClient } from '../lib/apiClient';

export default function DatabaseTestPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Make API call to backend instead of direct database access
      const response = await apiClient.request('/database/test');
      setData(response);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Database Test Page</h1>

      {data.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">No data found.</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Data
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Data
            </button>
          </div>

          <div className="grid gap-4">
            {data.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">
                  {item.title || `Item ${index + 1}`}
                </h2>
                <p className="text-gray-700">
                  {item.content || JSON.stringify(item, null, 2)}
                </p>
                {item.createdAt && (
                  <p className="text-sm text-gray-500 mt-2">
                    Created: {new Date(item.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

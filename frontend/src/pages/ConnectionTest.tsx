import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TestResult {
  test: string;
  status: 'Success' | 'Failed';
  data?: any;
  error?: string;
}

const ConnectionTest: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const testConnections = async () => {
    setLoading(true);
    const testResults: TestResult[] = [];

    // Test 1: Direct connection to backend
    try {
      const response = await axios.get('http://localhost:5000/api/health');
      testResults.push({
        test: 'Direct connection to backend (http://localhost:5000/api/health)',
        status: 'Success',
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        test: 'Direct connection to backend (http://localhost:5000/api/health)',
        status: 'Failed',
        error: error.message
      });
    }

    // Test 2: Proxy connection
    try {
      const response = await axios.get('/api/health');
      testResults.push({
        test: 'Proxy connection (/api/health)',
        status: 'Success',
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        test: 'Proxy connection (/api/health)',
        status: 'Failed',
        error: error.message
      });
    }

    // Test 3: Contacts endpoint
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      testResults.push({
        test: 'Contacts endpoint (http://localhost:5000/api/contacts)',
        status: 'Success',
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        test: 'Contacts endpoint (http://localhost:5000/api/contacts)',
        status: 'Failed',
        error: error.message
      });
    }

    // Test 4: Offers endpoint
    try {
      const response = await axios.get('http://localhost:5000/api/offers');
      testResults.push({
        test: 'Offers endpoint (http://localhost:5000/api/offers)',
        status: 'Success',
        data: response.data
      });
    } catch (error: any) {
      testResults.push({
        test: 'Offers endpoint (http://localhost:5000/api/offers)',
        status: 'Failed',
        error: error.message
      });
    }

    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    testConnections();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Backend-Frontend Connection Test</h1>
      
      <button
        onClick={testConnections}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-6"
      >
        {loading ? 'Testing...' : 'Run Connection Tests'}
      </button>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`p-4 rounded border ${
              result.status === 'Success' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{result.test}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                result.status === 'Success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {result.status}
              </span>
            </div>
            
            {result.error && (
              <p className="text-sm text-red-600 mt-2">Error: {result.error}</p>
            )}
            
            {result.data && (
              <details className="mt-2">
                <summary className="text-sm text-gray-600 cursor-pointer">View Response</summary>
                <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionTest;
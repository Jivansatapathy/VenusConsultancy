// client/src/pages/TestSEOContent.jsx
// Test page for SEO Content Management
import React, { useState, useEffect } from 'react';
import { testSEOContentFrontend } from '../utils/testSEOContent';
import './TestSEOContent.css';

const TestSEOContent = () => {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);

  // Capture console logs
  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      originalLog(...args);
      setLogs(prev => [...prev, { type: 'log', message: args.join(' ') }]);
    };

    console.error = (...args) => {
      originalError(...args);
      setLogs(prev => [...prev, { type: 'error', message: args.join(' ') }]);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const runTests = async () => {
    setRunning(true);
    setLogs([]);
    setResults(null);

    try {
      const testResults = await testSEOContentFrontend();
      setResults(testResults);
    } catch (error) {
      console.error('Test execution error:', error);
    } finally {
      setRunning(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setResults(null);
  };

  return (
    <div className="test-seo-content">
      <div className="test-header">
        <h1>🧪 SEO Content Management - Frontend Test</h1>
        <p>Test the SEO content management system from the frontend</p>
      </div>

      <div className="test-controls">
        <button 
          className="btn btn-primary" 
          onClick={runTests} 
          disabled={running}
        >
          {running ? '🔄 Running Tests...' : '▶️ Run Tests'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={clearLogs}
          disabled={running}
        >
          🗑️ Clear Logs
        </button>
        <a 
          href="/admin/dashboard" 
          className="btn btn-outline"
        >
          ← Back to Admin Dashboard
        </a>
      </div>

      {results && (
        <div className="test-results">
          <h2>📊 Test Results</h2>
          <div className="results-summary">
            <div className="result-item passed">
              <span className="result-label">✅ Passed:</span>
              <span className="result-value">{results.passed}</span>
            </div>
            <div className="result-item failed">
              <span className="result-label">❌ Failed:</span>
              <span className="result-value">{results.failed}</span>
            </div>
            <div className="result-item total">
              <span className="result-label">📝 Total:</span>
              <span className="result-value">{results.tests.length}</span>
            </div>
            <div className="result-item rate">
              <span className="result-label">📈 Success Rate:</span>
              <span className="result-value">
                {((results.passed / results.tests.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="test-details">
            <h3>Test Details</h3>
            <ul className="test-list">
              {results.tests.map((test, index) => (
                <li key={index} className={test.passed ? 'test-passed' : 'test-failed'}>
                  <span className="test-icon">{test.passed ? '✅' : '❌'}</span>
                  <span className="test-name">{test.name}</span>
                  {test.message && (
                    <span className="test-message">{test.message}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="test-logs">
        <h2>📋 Console Logs</h2>
        <div className="logs-container">
          {logs.length === 0 ? (
            <p className="no-logs">No logs yet. Run tests to see output.</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className={`log-item log-${log.type}`}>
                {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="test-instructions">
        <h2>📖 Instructions</h2>
        <ol>
          <li>Make sure the backend server is running: <code>cd server && npm run dev</code></li>
          <li>Make sure you're logged in as admin</li>
          <li>Click "Run Tests" button above</li>
          <li>Review the results and logs</li>
          <li>Check the browser console (F12) for detailed logs</li>
        </ol>

        <h3>💡 Alternative: Browser Console Testing</h3>
        <p>You can also run tests directly in the browser console:</p>
        <pre>
          <code>{`// Open browser console (F12) and run:
testSEOContent()`}</code>
        </pre>
      </div>
    </div>
  );
};

export default TestSEOContent;


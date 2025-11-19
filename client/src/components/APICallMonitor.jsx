// client/src/components/APICallMonitor.jsx
// Component to monitor and display API calls for SEO content
import React, { useState, useEffect } from 'react';
import './APICallMonitor.css';

const APICallMonitor = () => {
  const [apiCalls, setApiCalls] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0 });

  useEffect(() => {
    // Listen for SEO content save events
    const handleSave = (event) => {
      const { path, value, response, duration } = event.detail;
      setApiCalls(prev => [{
        id: Date.now(),
        type: 'save',
        path,
        value: typeof value === 'string' ? value.substring(0, 30) : 'Object',
        status: 'success',
        duration: `${duration}ms`,
        timestamp: new Date().toLocaleTimeString(),
        response
      }, ...prev.slice(0, 49)]); // Keep last 50 calls
      
      setStats(prev => ({
        total: prev.total + 1,
        success: prev.success + 1,
        failed: prev.failed
      }));
    };

    const handleError = (event) => {
      const { path, error, status } = event.detail;
      setApiCalls(prev => [{
        id: Date.now(),
        type: 'save',
        path,
        value: 'N/A',
        status: 'error',
        error,
        statusCode: status,
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 49)]);
      
      setStats(prev => ({
        total: prev.total + 1,
        success: prev.success,
        failed: prev.failed + 1
      }));
    };

    window.addEventListener('seo-content-saved', handleSave);
    window.addEventListener('seo-content-error', handleError);

    return () => {
      window.removeEventListener('seo-content-saved', handleSave);
      window.removeEventListener('seo-content-error', handleError);
    };
  }, []);

  if (!isVisible) {
    return (
      <button 
        className="api-monitor-toggle"
        onClick={() => setIsVisible(true)}
        title="Show API Call Monitor"
      >
        📡 API Monitor ({stats.total})
      </button>
    );
  }

  return (
    <div className="api-monitor">
      <div className="api-monitor-header">
        <h3>📡 API Call Monitor</h3>
        <div className="api-monitor-stats">
          <span className="stat-total">Total: {stats.total}</span>
          <span className="stat-success">✅ {stats.success}</span>
          <span className="stat-failed">❌ {stats.failed}</span>
        </div>
        <button 
          className="api-monitor-close"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="api-monitor-body">
        {apiCalls.length === 0 ? (
          <div className="api-monitor-empty">
            <p>No API calls yet. Make changes to SEO content to see API calls here.</p>
            <p className="hint">💡 Open browser console (F12) for detailed logs</p>
          </div>
        ) : (
          <div className="api-calls-list">
            {apiCalls.map(call => (
              <div key={call.id} className={`api-call-item api-call-${call.status}`}>
                <div className="api-call-header">
                  <span className="api-call-status">
                    {call.status === 'success' ? '✅' : '❌'}
                  </span>
                  <span className="api-call-path">{call.path}</span>
                  <span className="api-call-time">{call.timestamp}</span>
                </div>
                <div className="api-call-details">
                  <div className="api-call-value">
                    <strong>Value:</strong> {call.value}
                  </div>
                  {call.duration && (
                    <div className="api-call-duration">
                      <strong>Duration:</strong> {call.duration}
                    </div>
                  )}
                  {call.error && (
                    <div className="api-call-error">
                      <strong>Error:</strong> {call.error}
                      {call.statusCode && ` (Status: ${call.statusCode})`}
                    </div>
                  )}
                  {call.response && (
                    <div className="api-call-response">
                      <strong>Response:</strong> {call.response.message || 'Success'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="api-monitor-footer">
        <button 
          className="api-monitor-clear"
          onClick={() => {
            setApiCalls([]);
            setStats({ total: 0, success: 0, failed: 0 });
          }}
        >
          Clear Logs
        </button>
        <div className="api-monitor-hint">
          💡 Check Network tab (F12) for full API request/response details
        </div>
      </div>
    </div>
  );
};

export default APICallMonitor;


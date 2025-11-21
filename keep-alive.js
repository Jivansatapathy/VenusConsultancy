// keep-alive.js - External script to keep Render backend alive
// Run this script on your local machine or a free service like GitHub Actions

const https = require('https');
const http = require('http');

// Configuration
const SERVER_URL = process.env.SERVER_URL || 'https://your-render-app.onrender.com';
const PING_INTERVAL = 12 * 60 * 1000; // 12 minutes (Render free tier sleeps after 15 minutes)
const ENDPOINTS = [
  '/api/health/keepalive',
  '/api/health/ping',
  '/api/health/health'
];

console.log(`🚀 Starting keep-alive service for: ${SERVER_URL}`);
console.log(`⏰ Ping interval: ${PING_INTERVAL / 1000 / 60} minutes`);

function pingServer(endpoint) {
  const url = `${SERVER_URL}${endpoint}`;
  const client = url.startsWith('https') ? https : http;
  
  return new Promise((resolve, reject) => {
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${endpoint} - Server responded: ${res.statusCode}`);
          resolve({ endpoint, status: res.statusCode, data: JSON.parse(data) });
        } else {
          console.log(`⚠️  ${endpoint} - Unexpected status: ${res.statusCode}`);
          resolve({ endpoint, status: res.statusCode, data });
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${endpoint} - Error: ${err.message}`);
      reject({ endpoint, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ ${endpoint} - Request timeout`);
      req.destroy();
      reject({ endpoint, error: 'timeout' });
    });
  });
}

async function performKeepAlive() {
  console.log(`\n🔄 Performing keep-alive at ${new Date().toISOString()}`);
  
  for (const endpoint of ENDPOINTS) {
    try {
      await pingServer(endpoint);
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(`Failed to ping ${endpoint}:`, error);
    }
  }
  
  console.log('✅ Keep-alive cycle completed\n');
}

// Initial ping
performKeepAlive();

// Set up interval
setInterval(performKeepAlive, PING_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down keep-alive service...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down keep-alive service...');
  process.exit(0);
});

/**
 * Comprehensive Test Suite for Venus Hiring Application
 * Tests the optimized bundle and lazy loading functionality
 */

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:5173',
  timeout: 10000,
  retries: 3
};

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Utility functions
function logTest(testName, status, details = '') {
  testResults.total++;
  if (status === 'PASS') {
    testResults.passed++;
    console.log(`✅ ${testName}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}: ${details}`);
  }
  testResults.details.push({ testName, status, details, timestamp: new Date() });
}

// Test 1: Build Validation
async function testBuildValidation() {
  console.log('\n🧪 Testing Build Validation...');
  
  try {
    // Test if production build works
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    const { stdout, stderr } = await execAsync('cd client && npm run build');
    
    if (stderr && stderr.includes('warning')) {
      logTest('Build Warnings Check', 'FAIL', 'Build contains warnings');
    } else {
      logTest('Build Warnings Check', 'PASS', 'No build warnings');
    }
    
    if (stdout.includes('built in')) {
      logTest('Build Completion', 'PASS', 'Build completed successfully');
    } else {
      logTest('Build Completion', 'FAIL', 'Build did not complete');
    }
    
    // Check bundle size
    const fs = require('fs');
    const path = require('path');
    const distPath = path.join(__dirname, 'client', 'dist');
    
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      const jsFiles = files.filter(f => f.endsWith('.js'));
      const cssFiles = files.filter(f => f.endsWith('.css'));
      
      logTest('Bundle Files Generated', 'PASS', `${jsFiles.length} JS files, ${cssFiles.length} CSS files`);
      
      // Check for chunk splitting
      const vendorFiles = files.filter(f => f.includes('vendor-'));
      if (vendorFiles.length > 0) {
        logTest('Chunk Splitting', 'PASS', `${vendorFiles.length} vendor chunks created`);
      } else {
        logTest('Chunk Splitting', 'FAIL', 'No vendor chunks found');
      }
    } else {
      logTest('Bundle Files Generated', 'FAIL', 'Dist directory not found');
    }
    
  } catch (error) {
    logTest('Build Validation', 'FAIL', error.message);
  }
}

// Test 2: Application Functionality
async function testApplicationFunctionality() {
  console.log('\n🧪 Testing Application Functionality...');
  
  try {
    // Test if dev server is running
    const response = await fetch(`${TEST_CONFIG.baseUrl}`);
    if (response.ok) {
      logTest('Dev Server Running', 'PASS', 'Application is accessible');
    } else {
      logTest('Dev Server Running', 'FAIL', `HTTP ${response.status}`);
    }
    
    // Test main routes
    const routes = [
      '/',
      '/services',
      '/find-jobs',
      '/contact',
      '/about',
      '/admin/login'
    ];
    
    for (const route of routes) {
      try {
        const routeResponse = await fetch(`${TEST_CONFIG.baseUrl}${route}`);
        if (routeResponse.ok) {
          logTest(`Route ${route}`, 'PASS', 'Route accessible');
        } else {
          logTest(`Route ${route}`, 'FAIL', `HTTP ${routeResponse.status}`);
        }
      } catch (error) {
        logTest(`Route ${route}`, 'FAIL', error.message);
      }
    }
    
  } catch (error) {
    logTest('Application Functionality', 'FAIL', error.message);
  }
}

// Test 3: Lazy Loading Validation
async function testLazyLoading() {
  console.log('\n🧪 Testing Lazy Loading...');
  
  try {
    // Test if lazy loading is implemented
    const fs = require('fs');
    const path = require('path');
    
    // Check App.jsx for lazy loading
    const appPath = path.join(__dirname, 'client', 'src', 'App.jsx');
    if (fs.existsSync(appPath)) {
      const appContent = fs.readFileSync(appPath, 'utf8');
      
      if (appContent.includes('lazy(') && appContent.includes('Suspense')) {
        logTest('Lazy Loading Implementation', 'PASS', 'Lazy loading implemented in App.jsx');
      } else {
        logTest('Lazy Loading Implementation', 'FAIL', 'Lazy loading not found in App.jsx');
      }
    }
    
    // Check Home.jsx for lazy loading
    const homePath = path.join(__dirname, 'client', 'src', 'pages', 'Home.jsx');
    if (fs.existsSync(homePath)) {
      const homeContent = fs.readFileSync(homePath, 'utf8');
      
      if (homeContent.includes('lazy(') && homeContent.includes('Suspense')) {
        logTest('Home Page Lazy Loading', 'PASS', 'Lazy loading implemented in Home.jsx');
      } else {
        logTest('Home Page Lazy Loading', 'FAIL', 'Lazy loading not found in Home.jsx');
      }
    }
    
  } catch (error) {
    logTest('Lazy Loading Validation', 'FAIL', error.message);
  }
}

// Test 4: Bundle Analysis
async function testBundleAnalysis() {
  console.log('\n🧪 Testing Bundle Analysis...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Check if stats.html exists
    const statsPath = path.join(__dirname, 'client', 'dist', 'stats.html');
    if (fs.existsSync(statsPath)) {
      logTest('Bundle Analyzer', 'PASS', 'stats.html generated');
    } else {
      logTest('Bundle Analyzer', 'FAIL', 'stats.html not found');
    }
    
    // Check vite.config.js for manual chunks
    const configPath = path.join(__dirname, 'client', 'vite.config.js');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      if (configContent.includes('manualChunks')) {
        logTest('Manual Chunking', 'PASS', 'Manual chunking configured');
      } else {
        logTest('Manual Chunking', 'FAIL', 'Manual chunking not configured');
      }
      
      if (configContent.includes('rollup-plugin-visualizer')) {
        logTest('Bundle Visualizer', 'PASS', 'Bundle visualizer configured');
      } else {
        logTest('Bundle Visualizer', 'FAIL', 'Bundle visualizer not configured');
      }
    }
    
  } catch (error) {
    logTest('Bundle Analysis', 'FAIL', error.message);
  }
}

// Test 5: Performance Validation
async function testPerformanceValidation() {
  console.log('\n🧪 Testing Performance Validation...');
  
  try {
    // Check if bundle size is optimized
    const fs = require('fs');
    const path = require('path');
    const distPath = path.join(__dirname, 'client', 'dist', 'assets');
    
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      const jsFiles = files.filter(f => f.endsWith('.js'));
      
      let totalSize = 0;
      let largestChunk = 0;
      
      for (const file of jsFiles) {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        totalSize += sizeKB;
        
        if (sizeKB > largestChunk) {
          largestChunk = sizeKB;
        }
      }
      
      logTest('Bundle Size Check', largestChunk < 500 ? 'PASS' : 'FAIL', 
        `Largest chunk: ${largestChunk}KB, Total: ${totalSize}KB`);
      
      // Check for vendor chunks
      const vendorFiles = files.filter(f => f.includes('vendor-'));
      if (vendorFiles.length > 0) {
        logTest('Vendor Chunking', 'PASS', `${vendorFiles.length} vendor chunks found`);
      } else {
        logTest('Vendor Chunking', 'FAIL', 'No vendor chunks found');
      }
    }
    
  } catch (error) {
    logTest('Performance Validation', 'FAIL', error.message);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Comprehensive Test Suite for Venus Hiring Application');
  console.log('=' .repeat(70));
  
  try {
    await testBuildValidation();
    await testApplicationFunctionality();
    await testLazyLoading();
    await testBundleAnalysis();
    await testPerformanceValidation();
    
    // Generate test report
    console.log('\n📊 Test Results Summary');
    console.log('=' .repeat(70));
    console.log(`Total Tests: ${testResults.total}`);
    console.log(`Passed: ${testResults.passed}`);
    console.log(`Failed: ${testResults.failed}`);
    console.log(`Success Rate: ${Math.round((testResults.passed / testResults.total) * 100)}%`);
    
    if (testResults.failed > 0) {
      console.log('\n❌ Failed Tests:');
      testResults.details
        .filter(t => t.status === 'FAIL')
        .forEach(t => console.log(`  - ${t.testName}: ${t.details}`));
    }
    
    // Save detailed results
    const fs = require('fs');
    const reportPath = path.join(__dirname, 'test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    console.log(`\n📄 Detailed results saved to: ${reportPath}`);
    
    return testResults.failed === 0;
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    return false;
  }
}

// Export for use in other modules
module.exports = {
  runAllTests,
  testBuildValidation,
  testApplicationFunctionality,
  testLazyLoading,
  testBundleAnalysis,
  testPerformanceValidation
};

// Run tests if called directly
if (require.main === module) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

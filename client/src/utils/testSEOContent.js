// client/src/utils/testSEOContent.js
// Frontend test script for SEO Content Management
// Run this in browser console or import in a test component

import API from './api.js';

export const testSEOContentFrontend = async () => {
  console.log('🧪 Testing SEO Content Management (Frontend)...');
  console.log('='.repeat(60));

  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  const logTest = (name, passed, message = '') => {
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${name}${message ? `: ${message}` : ''}`);
    results.tests.push({ name, passed, message });
    if (passed) results.passed++;
    else results.failed++;
  };

  try {
    // Test 1: Check if API is configured
    console.log('\n1️⃣  Testing API configuration...');
    try {
      const apiBase = API.defaults.baseURL;
      if (apiBase && apiBase.includes('/api')) {
        logTest('API base URL configured', true, apiBase);
      } else {
        logTest('API base URL configured', false, 'Invalid base URL');
      }
    } catch (error) {
      logTest('API base URL configured', false, error.message);
    }

    // Test 2: Check backend connection
    console.log('\n2️⃣  Testing backend connection...');
    try {
      const response = await API.get('/content');
      if (response.status === 200) {
        logTest('Backend connection', true, 'Server is reachable');
        logTest('Content endpoint accessible', true, `Found ${Object.keys(response.data?.data || {}).length} pages`);
      } else {
        logTest('Backend connection', false, `Status: ${response.status}`);
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        logTest('Backend connection', false, 'Cannot connect to server. Is backend running?');
      } else {
        logTest('Backend connection', false, error.message);
      }
    }

    // Test 3: Check authentication (if token exists)
    console.log('\n3️⃣  Testing authentication...');
    // Check for token in the correct storage key (venus_token)
    const token = localStorage.getItem('venus_token') || localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    if (token) {
      logTest('Access token found', true, 'User appears to be logged in');
      
      // Test authenticated endpoint
      try {
        const authResponse = await API.get('/content');
        logTest('Authenticated request', true, 'Can access content with token');
      } catch (error) {
        if (error.response?.status === 401) {
          logTest('Authenticated request', false, 'Token invalid or expired');
        } else {
          logTest('Authenticated request', false, error.message);
        }
      }
    } else {
      logTest('Access token found', false, 'Not logged in. Please login as admin first.');
      console.log('   💡 Login at: /admin/login');
    }

    // Test 4: Load content from backend
    console.log('\n4️⃣  Testing content loading...');
    try {
      const contentResponse = await API.get('/content');
      const content = contentResponse.data?.data || {};
      
      const hasHome = !!content.home;
      const hasMeta = !!content.meta;
      
      logTest('Content loaded from backend', true, 'Successfully fetched');
      logTest('Home page content exists', hasHome, hasHome ? 'Found' : 'Not found');
      logTest('Meta content exists', hasMeta, hasMeta ? 'Found' : 'Not found');
      
      if (hasHome) {
        const homeSections = Object.keys(content.home);
        logTest('Home page sections', true, `${homeSections.length} sections: ${homeSections.join(', ')}`);
      }
    } catch (error) {
      logTest('Content loaded from backend', false, error.message);
    }

    // Test 5: Test content save (if authenticated)
    if (token) {
      console.log('\n5️⃣  Testing content save to backend...');
      const testTimestamp = Date.now();
      const testContent = {
        greeting: `- Frontend Test ${testTimestamp} -`,
        titleLine1: "Frontend Test Title",
        titleLine2: "Frontend Test Title 2",
        subtitle: "This is a test from frontend to verify backend save",
        button1Text: "Test Button",
        button1Link: "/test",
        button2Text: "Test Button 2",
        button2Link: "/test2",
        image: null
      };

      try {
        const saveResponse = await API.post('/content/save', {
          page: 'home',
          section: 'hero',
          data: testContent
        });

        if (saveResponse.data?.success) {
          logTest('Content save to backend', true, 'Successfully saved');
          logTest('Save response structure', true, 'Response contains success flag');
          
          // Verify the save
          const verifyResponse = await API.get('/content/page/home');
          const savedHero = verifyResponse.data?.data?.hero;
          
          if (savedHero?.greeting === testContent.greeting) {
            logTest('Content persistence verified', true, 'Saved content matches');
          } else {
            logTest('Content persistence verified', false, 'Saved content does not match');
          }
        } else {
          logTest('Content save to backend', false, 'Save returned non-success');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          logTest('Content save to backend', false, 'Unauthorized - need admin login');
        } else if (error.response?.status === 403) {
          logTest('Content save to backend', false, 'Forbidden - need admin role');
        } else {
          logTest('Content save to backend', false, error.response?.data?.error || error.message);
        }
      }
    } else {
      console.log('\n5️⃣  Skipping content save test (not authenticated)');
      logTest('Content save to backend', false, 'Skipped - not authenticated');
    }

    // Test 6: Test content initialization (if authenticated)
    if (token) {
      console.log('\n6️⃣  Testing content initialization...');
      try {
        const initResponse = await API.post('/content/initialize');
        if (initResponse.data?.success) {
          logTest('Content initialization', true, 'Successfully initialized');
        } else {
          logTest('Content initialization', false, 'Initialization returned non-success');
        }
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logTest('Content initialization', false, 'Unauthorized - need admin login');
        } else {
          logTest('Content initialization', false, error.response?.data?.error || error.message);
        }
      }
    } else {
      console.log('\n6️⃣  Skipping content initialization test (not authenticated)');
      logTest('Content initialization', false, 'Skipped - not authenticated');
    }

    // Test 7: Check React Context (if available)
    console.log('\n7️⃣  Testing React Context integration...');
    try {
      // This will only work if run from within React component
      if (typeof window !== 'undefined' && window.React) {
        logTest('React available', true, 'React is loaded');
      } else {
        logTest('React available', false, 'React not detected (may be running outside React)');
      }
    } catch (error) {
      logTest('React Context integration', false, error.message);
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📝 Total:  ${results.tests.length}`);
    
    const successRate = ((results.passed / results.tests.length) * 100).toFixed(1);
    console.log(`\n📈 Success Rate: ${successRate}%`);

    if (results.failed === 0) {
      console.log('\n🎉 All tests passed!');
    } else {
      console.log('\n⚠️  Some tests failed. Check the details above.');
      console.log('\n💡 Common issues:');
      console.log('   - Backend server not running: npm run dev (in server/)');
      console.log('   - Not logged in: Go to /admin/login');
      console.log('   - Wrong role: Need admin role to save content');
    }

    console.log('\n' + '='.repeat(60));

    return results;
  } catch (error) {
    console.error('\n❌ Test suite error:', error);
    return results;
  }
};

// Auto-run if in browser console
if (typeof window !== 'undefined' && window.location) {
  // Make it available globally for console testing
  window.testSEOContent = testSEOContentFrontend;
  console.log('💡 Test function available! Run: testSEOContent()');
}

export default testSEOContentFrontend;


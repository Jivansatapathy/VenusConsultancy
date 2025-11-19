// server/src/scripts/testEndpoints.js
import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

const BASE_URL = "http://localhost:5000/api";

async function testEndpoints() {
  console.log("🧪 Testing API Endpoints...\n");

  try {
    // Test 1: Get jobs (public endpoint)
    console.log("1. Testing GET /api/jobs (public endpoint)");
    const jobsResponse = await axios.get(`${BASE_URL}/jobs`);
    console.log(`✅ Jobs endpoint working. Found ${jobsResponse.data.jobs?.length || 0} jobs`);
    
    if (jobsResponse.data.jobs?.length > 0) {
      console.log(`   Sample job: ${jobsResponse.data.jobs[0].title}`);
    }
    console.log();

    // Test 2: Test login with admin credentials
    console.log("2. Testing POST /api/auth/login (admin)");
    const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@venusconsultancy.com",
      password: process.env.SEED_ADMIN_PASSWORD || "test-password"
    });
    console.log("✅ Admin login successful");
    console.log(`   User role: ${adminLoginResponse.data.user.role}`);
    console.log(`   Access token received: ${adminLoginResponse.data.accessToken ? 'Yes' : 'No'}`);
    console.log();

    // Test 3: Test login with recruiter credentials
    console.log("3. Testing POST /api/auth/login (recruiter)");
    const recruiterLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "recruiter@venusconsultancy.com",
      password: process.env.SEED_RECRUITER_PASSWORD || "test-password"
    });
    console.log("✅ Recruiter login successful");
    console.log(`   User role: ${recruiterLoginResponse.data.user.role}`);
    console.log();

    // Test 4: Test protected endpoint with admin token
    console.log("4. Testing protected endpoint with admin token");
    const adminToken = adminLoginResponse.data.accessToken;
    const adminJobsResponse = await axios.get(`${BASE_URL}/jobs/admin/all`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log("✅ Admin protected endpoint working");
    console.log(`   Total jobs (including inactive): ${adminJobsResponse.data.length}`);
    console.log();

    // Test 5: Test applications endpoint with recruiter token
    console.log("5. Testing applications endpoint with recruiter token");
    const recruiterToken = recruiterLoginResponse.data.accessToken;
    const applicationsResponse = await axios.get(`${BASE_URL}/applications`, {
      headers: { Authorization: `Bearer ${recruiterToken}` }
    });
    console.log("✅ Applications endpoint working");
    console.log(`   Total applications: ${applicationsResponse.data.applications?.length || 0}`);
    console.log();

    console.log("🎉 All tests passed!");

  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('connect')) {
      console.error("❌ Test failed: Cannot connect to server!");
      console.error("   Make sure the server is running on http://localhost:5000");
      console.error("   Start the server with: npm run dev");
      console.error("   Then run tests in a separate terminal");
    } else if (error.response) {
      console.error("❌ Test failed:", error.response.status, error.response.statusText);
      console.error("   Response:", error.response.data);
    } else {
      console.error("❌ Test failed:", error.message);
      if (error.stack) {
        console.error("   Stack:", error.stack);
      }
    }
    process.exit(1);
  }
}

// Run tests
testEndpoints();

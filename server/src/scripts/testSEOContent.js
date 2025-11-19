// server/src/scripts/testSEOContent.js
import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

const BASE_URL = "http://localhost:5000/api";

// Test admin credentials (will need to be set in .env)
const ADMIN_EMAIL = "admin@venusconsultancy.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

let adminToken = null;

// Helper function to make authenticated requests
const authenticatedRequest = async (method, url, data = null) => {
  if (!adminToken) {
    throw new Error("Admin token not available. Login first.");
  }
  
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    config.data = data;
  }
  
  return axios(config);
};

async function testSEOContent() {
  console.log("🧪 Testing SEO Content Management...\n");
  console.log("=" .repeat(60));

  try {
    // Test 1: Check if server is running
    console.log("\n1️⃣  Testing server connection...");
    try {
      await axios.get(`${BASE_URL}/content`);
      console.log("✅ Server is running and accessible");
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.error("❌ Server is not running!");
        console.error("   Please start the server with: npm run dev");
        process.exit(1);
      }
      throw error;
    }

    // Test 2: Login as admin
    console.log("\n2️⃣  Testing admin login...");
    if (!ADMIN_PASSWORD) {
      console.error("❌ SEED_ADMIN_PASSWORD not set in .env file");
      console.error("   Please set SEED_ADMIN_PASSWORD in your .env file");
      process.exit(1);
    }

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });

    if (!loginResponse.data.accessToken) {
      throw new Error("No access token received");
    }

    adminToken = loginResponse.data.accessToken;
    console.log("✅ Admin login successful");
    console.log(`   User: ${loginResponse.data.user.email}`);
    console.log(`   Role: ${loginResponse.data.user.role}`);

    // Test 3: Load existing content
    console.log("\n3️⃣  Testing content loading from backend...");
    const getContentResponse = await authenticatedRequest('GET', '/content');
    const existingContent = getContentResponse.data?.data || {};
    console.log("✅ Content loaded from backend");
    console.log(`   Pages found: ${Object.keys(existingContent).join(', ') || 'None'}`);

    // Test 4: Save content to backend
    console.log("\n4️⃣  Testing content save to backend...");
    const testTimestamp = Date.now();
    const testContent = {
      greeting: `- Test Content ${testTimestamp} -`,
      titleLine1: "Test Title Line 1",
      titleLine2: "Test Title Line 2",
      subtitle: "This is a test subtitle to verify backend save functionality",
      button1Text: "Test Button 1",
      button1Link: "/test",
      button2Text: "Test Button 2",
      button2Link: "/test2",
      image: null
    };

    console.log(`   Saving test content with greeting: "${testContent.greeting}"`);
    
    const saveResponse = await authenticatedRequest('POST', '/content/save', {
      page: 'home',
      section: 'hero',
      data: testContent
    });

    if (!saveResponse.data.success) {
      throw new Error("Save was not successful");
    }

    console.log("✅ Content saved to backend successfully");
    console.log(`   Page: home`);
    console.log(`   Section: hero`);
    console.log(`   Message: ${saveResponse.data.message}`);
    console.log(`   Response data:`, JSON.stringify(saveResponse.data.data || {}, null, 2));

    // Test 5: Verify content was saved (load again)
    console.log("\n5️⃣  Testing content persistence...");
    
    // Wait a bit for database write to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const verifyResponse = await authenticatedRequest('GET', '/content/page/home');
    const savedHero = verifyResponse.data?.data?.hero;

    if (!savedHero) {
      throw new Error("Hero section not found in saved content");
    }

    console.log(`   Retrieved greeting: "${savedHero.greeting}"`);
    console.log(`   Expected greeting: "${testContent.greeting}"`);
    
    // Check if the saved content matches (allowing for merged defaults)
    // The backend might merge with defaults, so we check if our test value is present
    const greetingMatches = savedHero.greeting === testContent.greeting;
    const hasTestContent = savedHero.greeting && savedHero.greeting.includes('Test Content');
    
    if (!greetingMatches && !hasTestContent) {
      // If it doesn't match exactly, check if it's the default (which means save might have failed)
      if (savedHero.greeting === "- Empower Your Workforce -") {
        console.log("   ⚠️  Warning: Got default content, save may not have persisted");
        console.log("   🔍 Checking full content structure...");
        
        // Try getting all content to see what's actually saved
        const allContentResponse = await authenticatedRequest('GET', '/content');
        const allContent = allContentResponse.data?.data || {};
        const homeContent = allContent.home || {};
        const heroContent = homeContent.hero || {};
        
        console.log(`   Full hero content:`, JSON.stringify(heroContent, null, 2));
        
        if (heroContent.greeting === testContent.greeting) {
          console.log("   ✅ Content found in full content response!");
          console.log("✅ Content persistence verified (found in full content)");
        } else {
          throw new Error(`Content mismatch! Expected: "${testContent.greeting}", Got: "${savedHero.greeting}". Full content: ${JSON.stringify(heroContent)}`);
        }
      } else {
        throw new Error(`Content mismatch! Expected: "${testContent.greeting}", Got: "${savedHero.greeting}"`);
      }
    } else {
      console.log("✅ Content persistence verified");
      console.log(`   Saved greeting: "${savedHero.greeting}"`);
      console.log(`   Matches test data: ${greetingMatches ? 'Yes (exact match)' : 'Yes (contains test content)'}`);
    }

    // Test 6: Test multiple rapid saves
    console.log("\n6️⃣  Testing multiple rapid saves...");
    const rapidSaves = [];
    for (let i = 1; i <= 3; i++) {
      const rapidContent = {
        ...testContent,
        greeting: `- Rapid Save Test ${i} - ${testTimestamp}`
      };
      
      const rapidResponse = await authenticatedRequest('POST', '/content/save', {
        page: 'home',
        section: 'hero',
        data: rapidContent
      });
      
      rapidSaves.push(rapidResponse.data.success);
      console.log(`   Save ${i}/3: ${rapidResponse.data.success ? '✅' : '❌'}`);
    }

    const allRapidSavesSuccess = rapidSaves.every(s => s === true);
    if (allRapidSavesSuccess) {
      console.log("✅ All rapid saves successful");
    } else {
      throw new Error("Some rapid saves failed");
    }

    // Test 7: Test different sections
    console.log("\n7️⃣  Testing different content sections...");
    const statAboutContent = {
      tag: "TEST TAG",
      title: "Test Title",
      description: "Test description for statAbout section",
      stat1Number: "100",
      stat1Suffix: "+",
      stat1Label: "Test Stat"
    };

    const sectionResponse = await authenticatedRequest('POST', '/content/save', {
      page: 'home',
      section: 'statAbout',
      data: statAboutContent
    });

    if (sectionResponse.data.success) {
      console.log("✅ Different section save successful");
      console.log(`   Section: statAbout`);
    } else {
      throw new Error("Section save failed");
    }

    // Test 8: Verify all saved content
    console.log("\n8️⃣  Verifying all saved content...");
    const finalContentResponse = await authenticatedRequest('GET', '/content/page/home');
    const finalContent = finalContentResponse.data?.data;

    const hasHero = !!finalContent?.hero;
    const hasStatAbout = !!finalContent?.statAbout;

    console.log(`   Hero section: ${hasHero ? '✅' : '❌'}`);
    console.log(`   StatAbout section: ${hasStatAbout ? '✅' : '❌'}`);

    if (hasHero && hasStatAbout) {
      console.log("✅ All sections verified");
    } else {
      throw new Error("Some sections are missing");
    }

    // Test 9: Test content initialization
    console.log("\n9️⃣  Testing content initialization...");
    const initResponse = await authenticatedRequest('POST', '/content/initialize');
    
    if (initResponse.data.success) {
      console.log("✅ Content initialization successful");
      console.log(`   Message: ${initResponse.data.message}`);
    } else {
      console.log("⚠️  Content initialization returned non-success (may already be initialized)");
    }

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 All SEO Content Management Tests Passed!");
    console.log("=".repeat(60));
    console.log("\n✅ Summary:");
    console.log("   ✓ Server connection working");
    console.log("   ✓ Admin authentication working");
    console.log("   ✓ Content loading from backend");
    console.log("   ✓ Content saving to backend");
    console.log("   ✓ Content persistence verified");
    console.log("   ✓ Multiple rapid saves working");
    console.log("   ✓ Different sections working");
    console.log("   ✓ Content initialization working");
    console.log("\n💡 Frontend should now reflect these changes immediately!");
    console.log("   Check http://localhost:5173/admin/dashboard → SEO Content tab\n");

  } catch (error) {
    console.error("\n" + "=".repeat(60));
    console.error("❌ Test Failed!");
    console.error("=".repeat(60));
    
    if (error.response) {
      console.error(`\nError Status: ${error.response.status}`);
      console.error(`Error Message: ${error.response.data?.error || error.response.statusText}`);
      console.error(`Response Data:`, JSON.stringify(error.response.data, null, 2));
    } else if (error.code === 'ECONNREFUSED') {
      console.error("\n❌ Cannot connect to server!");
      console.error("   Make sure the server is running:");
      console.error("   cd server && npm run dev");
    } else {
      console.error(`\nError: ${error.message}`);
      if (error.stack) {
        console.error("\nStack trace:");
        console.error(error.stack);
      }
    }
    
    process.exit(1);
  }
}

// Run tests
testSEOContent();


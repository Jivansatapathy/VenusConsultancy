// Simple test script to verify login
import axios from 'axios';

async function testLogin() {
  try {
    console.log('Testing login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@venusconsultancy.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('User role:', response.data.user.role);
    console.log('Access token received:', !!response.data.accessToken);
    
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
}

testLogin();

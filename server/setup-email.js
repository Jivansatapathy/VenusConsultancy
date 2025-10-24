// Email Setup Script for Venus Hiring
// Run this script to set up your email configuration

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = `# Database Configuration
MONGO_URI=mongodb://127.0.0.1:27017/venus-hiring

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret-here
REFRESH_TOKEN_EXPIRE=30d

# Email Configuration - Zoho Mail Setup
EMAIL_SERVICE=zoho
EMAIL_USER=paresh@venushiring.com
EMAIL_PASS=your-zoho-password-here
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_SECURE=false
CONTACT_EMAIL=paresh@venushiring.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173

# Frontend serving
SERVE_CLIENT=false`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('📧 EMAIL SETUP INSTRUCTIONS:');
  console.log('');
  console.log('1. Zoho Mail Setup (Required):');
  console.log('   - Log into your Zoho Mail account: paresh@venushiring.com');
  console.log('   - Go to Settings → Security → App Passwords');
  console.log('   - Generate a new App Password for "Mail Client"');
  console.log('   - Copy the generated password (16 characters)');
  console.log('   - OR use your regular Zoho password if 2FA is disabled');
  console.log('');
  console.log('2. Update .env file:');
  console.log('   - Open server/.env file');
  console.log('   - Replace "your-zoho-password-here" with your Zoho password');
  console.log('   - Save the file');
  console.log('');
  console.log('3. Test the setup:');
  console.log('   - Run: node test-email-notifications.js');
  console.log('   - Check emails at: megan@venushiring.com, paresh@venushiring.ca, jivan@venushiring.com');
  console.log('');
  console.log('📧 Job application notifications will be sent to:');
  console.log('   - megan@venushiring.com');
  console.log('   - paresh@venushiring.ca');
  console.log('   - jivan@venushiring.com');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('');
  console.log('📝 Manual Setup:');
  console.log('Create a .env file in the server directory with the following content:');
  console.log('');
  console.log(envContent);
}

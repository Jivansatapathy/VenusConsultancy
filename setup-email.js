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

# Email Configuration - Gmail Setup
EMAIL_SERVICE=gmail
EMAIL_USER=satapathyjjivan@gmail.com
EMAIL_PASS=your-app-password-here
CONTACT_EMAIL=satapathyjjivan@gmail.com

# Frontend serving
SERVE_CLIENT=false`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('📧 EMAIL SETUP INSTRUCTIONS:');
  console.log('');
  console.log('1. Gmail Setup (Required):');
  console.log('   - Go to your Gmail account: satapathyjjivan@gmail.com');
  console.log('   - Enable 2-Factor Authentication');
  console.log('   - Go to: Google Account → Security → 2-Step Verification → App passwords');
  console.log('   - Generate a new app password for "Mail"');
  console.log('   - Copy the generated password');
  console.log('');
  console.log('2. Update .env file:');
  console.log('   - Open server/.env file');
  console.log('   - Replace "your-app-password-here" with your Gmail app password');
  console.log('   - Save the file');
  console.log('');
  console.log('3. Test the setup:');
  console.log('   - Start your server: npm run dev');
  console.log('   - Go to your contact page');
  console.log('   - Submit the contact form');
  console.log('   - Check satapathyjjivan@gmail.com for the email');
  console.log('');
  console.log('📧 All contact form emails will be sent to: satapathyjjivan@gmail.com');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('');
  console.log('📝 Manual Setup:');
  console.log('Create a .env file in the server directory with the following content:');
  console.log('');
  console.log(envContent);
}

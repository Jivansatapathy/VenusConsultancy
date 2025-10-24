// Email Debug Script for Zoho Mail
// This script will help diagnose email configuration issues

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Email Configuration Debug');
console.log('============================\n');

// Check environment variables
console.log('📋 Current Configuration:');
console.log(`EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'NOT SET'}`);
console.log(`EMAIL_USER: ${process.env.EMAIL_USER || 'NOT SET'}`);
console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? '***SET***' : 'NOT SET'}`);
console.log(`SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`);
console.log(`SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`);
console.log(`SMTP_SECURE: ${process.env.SMTP_SECURE || 'NOT SET'}\n`);

// Test different Zoho configurations
const configs = [
  {
    name: 'Zoho Mail - smtppro.zoho.in Port 465 (SSL)',
    config: {
      host: 'smtppro.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }
  },
  {
    name: 'Zoho Mail - smtp.zoho.com Port 587 (STARTTLS)',
    config: {
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }
  },
  {
    name: 'Zoho Mail - smtp.zoho.com Port 465 (SSL)',
    config: {
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }
  }
];

async function testConfig(config) {
  try {
    console.log(`🧪 Testing: ${config.name}`);
    const transporter = nodemailer.createTransport(config.config);
    
    // Test connection
    await transporter.verify();
    console.log(`✅ ${config.name} - Connection successful!\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${config.name} - Failed: ${error.message}\n`);
    return false;
  }
}

async function runDiagnostics() {
  console.log('🔧 Testing different Zoho Mail configurations...\n');
  
  let success = false;
  for (const config of configs) {
    const result = await testConfig(config);
    if (result) {
      success = true;
      console.log(`🎉 Working configuration found: ${config.name}`);
      console.log('📝 Update your .env file with these settings:');
      console.log(`SMTP_HOST=${config.config.host}`);
      console.log(`SMTP_PORT=${config.config.port}`);
      console.log(`SMTP_SECURE=${config.config.secure}`);
      break;
    }
  }
  
  if (!success) {
    console.log('❌ All configurations failed. Common issues:');
    console.log('1. Wrong email address - make sure paresh@venushiring.com is correct');
    console.log('2. Wrong password - try your Zoho account password');
    console.log('3. 2FA enabled - generate an App Password in Zoho settings');
    console.log('4. Zoho restrictions - some accounts have SMTP disabled');
    console.log('5. Network issues - check firewall/antivirus settings');
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Log into Zoho Mail web interface to verify credentials');
    console.log('2. Check if SMTP is enabled in your Zoho account');
    console.log('3. Try generating an App Password in Zoho Settings → Security');
    console.log('4. Contact Zoho support if SMTP is disabled');
  }
}

// Run diagnostics
runDiagnostics();

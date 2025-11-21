// Test script for email notifications
// Run with: node test-email-notifications.js

import { sendJobApplicationNotification, sendApplicationConfirmation } from './src/services/emailService.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Mock data for testing
const mockApplication = {
  _id: '507f1f77bcf86cd799439011',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-123-4567',
  coverMessage: 'I am very interested in this position and believe my skills align perfectly with your requirements.',
  resumeOriginalName: 'John_Doe_Resume.pdf',
  appliedAt: new Date()
};

const mockJob = {
  title: 'Senior Software Engineer',
  location: 'Toronto, ON',
  type: 'Full-Time',
  department: 'Engineering'
};

async function testEmailNotifications() {
  console.log('🧪 Testing Email Notification System...\n');

  try {
    // Test admin notification
    console.log('📧 Sending admin notification...');
    const adminResult = await sendJobApplicationNotification(mockApplication, mockJob);
    
    if (adminResult.success) {
      console.log('✅ Admin notification sent successfully!');
      console.log(`   Message ID: ${adminResult.messageId}\n`);
    } else {
      console.log('❌ Admin notification failed:', adminResult.error);
    }

    // Test applicant confirmation
    console.log('📧 Sending applicant confirmation...');
    const applicantResult = await sendApplicationConfirmation(mockApplication, mockJob);
    
    if (applicantResult.success) {
      console.log('✅ Applicant confirmation sent successfully!');
      console.log(`   Message ID: ${applicantResult.messageId}\n`);
    } else {
      console.log('❌ Applicant confirmation failed:', applicantResult.error);
    }

    console.log('🎉 Email notification test completed!');
    console.log('\n📋 Check your email inboxes:');
    console.log('   Venus Hiring Team: megan@venushiring.com, paresh@venushiring.ca, jivan@venushiring.com');
    console.log(`   Applicant Email: ${mockApplication.email}`);

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env file has correct Zoho email settings');
    console.log('2. Ensure EMAIL_USER and EMAIL_PASS are set');
    console.log('3. For Zoho Mail:');
    console.log('   - Use your regular Zoho password, OR');
    console.log('   - Generate an App Password in Zoho Settings → Security → App Passwords');
    console.log('4. Verify EMAIL_SERVICE=zoho in your .env file');
    console.log('5. Check that SMTP_HOST=smtp.zoho.com and SMTP_PORT=587');
  }
}

// Run the test
testEmailNotifications();

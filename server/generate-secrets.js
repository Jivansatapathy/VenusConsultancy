// generate-secrets.js - Generate secure secrets for your application
import crypto from 'crypto';

console.log('🔐 Generating secure secrets for your application...\n');

// Generate random secrets
const accessSecret = crypto.randomBytes(64).toString('hex');
const refreshSecret = crypto.randomBytes(64).toString('hex');

console.log('📋 Copy these values to your .env file:\n');
console.log('ACCESS_SECRET=' + accessSecret);
console.log('REFRESH_SECRET=' + refreshSecret);
console.log('\n⚠️  IMPORTANT SECURITY NOTES:');
console.log('1. These secrets are unique and secure');
console.log('2. Store them in your .env file (never commit to git)');
console.log('3. Use different secrets for development and production');
console.log('4. Rotate these secrets regularly in production');
console.log('\n🔧 Next steps:');
console.log('1. Create a .env file in the server directory');
console.log('2. Copy the template from env.example');
console.log('3. Replace the secret values with the ones above');
console.log('4. Update your MongoDB credentials');
console.log('5. Test your application');

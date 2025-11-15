// client/lib/config/index.js
// Next.js compatible config - uses process.env directly (no dotenv needed in Next.js)

// Required environment variables for production
const requiredEnvVars = [
  "ACCESS_SECRET",
  "REFRESH_SECRET", 
  "MONGO_URI",
];

// Validate required environment variables in production
if (process.env.NODE_ENV === "production") {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error("❌ CRITICAL SECURITY ERROR: Missing required environment variables in production:");
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error("\n🚨 Application will not start without these variables for security reasons.");
    console.error("Please set these environment variables in your production environment.");
    // In Next.js, we can't exit process, but we can throw
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }
}

// Export validated configuration
export const config = {
  // JWT Secrets - MUST be set in production
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  
  // Database
  MONGO_URI: process.env.MONGO_URI,
  
  // Server
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // CORS (not needed for Next.js API routes, but kept for compatibility)
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS 
    ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : ["http://localhost:3000"],  
  // Security
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  
  // Seed data
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  SEED_RECRUITER_PASSWORD: process.env.SEED_RECRUITER_PASSWORD,
  
  // Email
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SECURE: process.env.SMTP_SECURE,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  JOB_APPLICATION_EMAIL: process.env.JOB_APPLICATION_EMAIL,
  FRONTEND_URL: process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
};

// Validate JWT secrets are not using dev fallbacks in production
if (process.env.NODE_ENV === "production") {
  if (!config.ACCESS_SECRET || config.ACCESS_SECRET === "dev_access_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not properly set in production!");
    throw new Error("ACCESS_SECRET is not properly set in production!");
  }
  if (!config.REFRESH_SECRET || config.REFRESH_SECRET === "dev_refresh_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: REFRESH_SECRET is not properly set in production!");
    throw new Error("REFRESH_SECRET is not properly set in production!");
  }
}

export default config;


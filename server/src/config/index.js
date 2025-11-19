// server/src/config/index.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "../../");

dotenv.config({ path: path.join(rootDir, ".env") });

// Required environment variables for production
// Note: PORT is set automatically by Cloud Run, so it's not required here
const requiredEnvVars = [
  "ACCESS_SECRET",
  "REFRESH_SECRET", 
  "MONGO_URI"
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
    process.exit(1);
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
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // CORS
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS 
    ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : ["http://localhost:5173"],  
  // Security
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  
  // Seed data
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  SEED_RECRUITER_PASSWORD: process.env.SEED_RECRUITER_PASSWORD,
};

// Validate JWT secrets are not using dev fallbacks in production
if (process.env.NODE_ENV === "production") {
  if (!config.ACCESS_SECRET || config.ACCESS_SECRET === "dev_access_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not properly set in production!");
    process.exit(1);
  }
  if (!config.REFRESH_SECRET || config.REFRESH_SECRET === "dev_refresh_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: REFRESH_SECRET is not properly set in production!");
    process.exit(1);
  }
}

export default config;

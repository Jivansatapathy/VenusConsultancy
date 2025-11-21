// server/src/config/db.js
import mongoose from "mongoose";
import { config } from "./index.js";

// Global connection state
let isConnected = false;

const connectDB = async () => {
  // Return existing connection if already connected
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✅ MongoDB Already Connected (reusing connection)");
    return;
  }

  try {
    const uri = config.MONGO_URI;
    if (!uri) {
      console.error("❌ CRITICAL SECURITY ERROR: MONGO_URI is not configured!");
      if (process.env.NODE_ENV === "production") {
        process.exit(1);
      } else {
        console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
        const fallbackUri = "mongodb://127.0.0.1:27017/venus-hiring";
        await mongoose.connect(fallbackUri, {
          maxPoolSize: 10, // Maintain up to 10 socket connections
          serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
          socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        isConnected = true;
        console.log("✅ MongoDB Connected (development fallback)");
        return;
      }
    }
    
    await mongoose.connect(uri, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 10 seconds (increased for Cloud Run)
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      connectTimeoutMS: 10000, // Connection timeout (increased for Cloud Run)
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    isConnected = false;
    // Don't exit in production - let server start and retry
    // Cloud Run needs the server to start listening quickly
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    } else {
      console.log("🔄 Will retry MongoDB connection in background...");
      // Retry connection after 5 seconds
      setTimeout(() => {
        connectDB().catch(err => {
          console.error("❌ MongoDB retry failed:", err.message);
        });
      }, 5000);
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed through app termination');
  process.exit(0);
});

export default connectDB;

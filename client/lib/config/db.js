// client/lib/config/db.js
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
        throw new Error("MONGO_URI is required in production");
      } else {
        console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
        const fallbackUri = "mongodb://127.0.0.1:27017/venus-hiring";
        await mongoose.connect(fallbackUri, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected (development fallback)");
        return;
      }
    }
    
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    isConnected = false;
    throw err;
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

export default connectDB;


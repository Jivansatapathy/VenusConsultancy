// server/src/config/db.js
import mongoose from "mongoose";
import { config } from "./index.js";

const connectDB = async () => {
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
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected (development fallback)");
        return;
      }
    }
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;

// server/src/scripts/seedAdmin.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();
    const existing = await Admin.findOne({ email: "admin@venus.com" });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }
    const admin = new Admin({
      name: "Venus Admin",
      email: "admin@venus.com",
      password: "Admin@123", // will be hashed by pre-save hook
      role: "admin",
    });
    await admin.save();
    console.log("Seeded admin with email: admin@venus.com and password: Admin@123");
    process.exit(0);
  } catch (err) {
    console.error("Seeding admin error", err);
    process.exit(1);
  }
};

seed();

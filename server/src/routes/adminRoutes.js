import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";   // ✅ this must exist

const router = express.Router();

// Register Admin
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    
    // Name is optional, default to email username
    const adminName = name || (email ? email.split('@')[0] : "Admin User");

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Don't hash password here - the pre-save hook in Admin model will hash it
    const admin = new Admin({ 
      name: adminName,
      email, 
      password: password, // Pre-save hook will hash this automatically
      role: "admin"
    });
    await admin.save();

    res.status(201).json({ 
      message: "Admin created successfully",
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error("❌ Error in /register:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Admin (for fixing double-hashed passwords)
router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await Admin.findOneAndDelete({ email });
    
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    
    res.json({ message: "Admin deleted successfully", email });
  } catch (err) {
    console.error("❌ Error deleting admin:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login Admin (kept same as before)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

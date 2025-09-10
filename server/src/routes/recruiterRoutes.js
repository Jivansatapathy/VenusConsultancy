import express from "express";
import bcrypt from "bcryptjs";
import Recruiter from "../models/Recruiter.js";
import { authAndRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only: Create recruiter
router.post("/", authAndRole("admin"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ error: "Recruiter with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const recruiter = new Recruiter({
      name,
      email,
      password: hashedPassword,
      role: "recruiter"
    });
    
    await recruiter.save();
    res.status(201).json({ 
      _id: recruiter._id,
      name: recruiter.name,
      email: recruiter.email,
      role: recruiter.role,
      createdAt: recruiter.createdAt
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin only: Get all recruiters
router.get("/", authAndRole("admin"), async (req, res) => {
  try {
    const recruiters = await Recruiter.find().select("-password");
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin only: Update recruiter
router.put("/:id", authAndRole("admin"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    // Only hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const recruiter = await Recruiter.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    res.json(recruiter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin only: Delete recruiter
router.delete("/:id", authAndRole("admin"), async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }
    res.json({ message: "Recruiter deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

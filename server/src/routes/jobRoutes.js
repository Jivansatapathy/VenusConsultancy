import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ import middleware

const router = express.Router();

// ➕ Create Job (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📂 Get All Jobs (Public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

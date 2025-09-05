import express from "express";
import Recruiter from "../models/Recruiter.js";

const router = express.Router();

// ➕ Create recruiter
router.post("/", async (req, res) => {
  try {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📂 Get all recruiters
router.get("/", async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

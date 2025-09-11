// server/src/routes/jobRoutes.js
import express from "express";
import Job from "../models/Job.js";
import { requireAuth, requireRole, authAndRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route: Get all active jobs with search and filters
router.get("/", async (req, res) => {
  try {
    const { 
      search, 
      type, 
      location, 
      department, 
      tags, 
      page = 1, 
      limit = 10 
    } = req.query;

    let query = { isActive: true };

    // Text search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } }
      ];
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by department
    if (department) {
      query.department = { $regex: department, $options: "i" };
    }

    // Filter by tags
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagArray };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: jobs.length,
        totalJobs: total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public route: Get single job details
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, isActive: true });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin only: Create job
router.post("/", authAndRole("admin"), async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin only: Update job
router.put("/:id", authAndRole("admin"), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: new Date() }, 
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin only: Delete job
router.delete("/:id", authAndRole("admin"), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Get all jobs (including inactive)
router.get("/admin/all", authAndRole("admin", "recruiter"), async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

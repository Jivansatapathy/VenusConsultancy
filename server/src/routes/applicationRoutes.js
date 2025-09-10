// server/src/routes/applicationRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { requireAuth, requireRole, authAndRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/resumes";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Public route: Submit job application
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { jobId, name, email, phone, coverMessage } = req.body;

    // Validate required fields
    if (!jobId || !name || !email || !req.file) {
      return res.status(400).json({ 
        error: "Missing required fields: jobId, name, email, and resume are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate cover message length
    if (coverMessage && coverMessage.length > 1000) {
      return res.status(400).json({ error: "Cover message must be 1000 characters or less" });
    }

    // Check if job exists and is active
    const job = await Job.findOne({ _id: jobId, isActive: true });
    if (!job) {
      return res.status(404).json({ error: "Job not found or no longer available" });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    // Create application
    const application = new Application({
      jobId,
      name,
      email,
      phone: phone || "",
      coverMessage: coverMessage || "",
      resumePath: req.file.path,
      resumeOriginalName: req.file.originalname
    });

    await application.save();

    res.status(201).json({ 
      message: "Application submitted successfully",
      applicationId: application._id
    });
  } catch (err) {
    // Clean up uploaded file if application creation fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Get applications for a specific job
router.get("/job/:jobId", authAndRole("admin", "recruiter"), async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    let query = { jobId };
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await Application.find(query)
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: applications.length,
        totalApplications: total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Get all applications
router.get("/", authAndRole("admin", "recruiter"), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await Application.find(query)
      .populate("jobId", "title location type department")
      .sort({ appliedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: applications.length,
        totalApplications: total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Update application status and notes
router.put("/:id", authAndRole("admin", "recruiter"), async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("jobId", "title location type department");

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Download resume
router.get("/:id/resume", authAndRole("admin", "recruiter"), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (!fs.existsSync(application.resumePath)) {
      return res.status(404).json({ error: "Resume file not found" });
    }

    res.download(application.resumePath, application.resumeOriginalName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin/Recruiter: Delete application
router.delete("/:id", authAndRole("admin"), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Delete resume file
    if (fs.existsSync(application.resumePath)) {
      fs.unlinkSync(application.resumePath);
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

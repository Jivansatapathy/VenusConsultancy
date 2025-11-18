// server/src/routes/contentRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authAndRole } from "../middleware/authMiddleware.js";
import Content from "../models/Content.js";

const router = express.Router();

// Configure multer for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/images";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `content-${uniqueSuffix}${ext}`);
  }
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPG, PNG, GIF, WEBP, SVG) are allowed"), false);
  }
};

const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: imageFilter
});

// Get all content from MongoDB (public - for frontend to fetch)
router.get("/", async (req, res) => {
  try {
    // Fetch content from MongoDB database
    const content = await Content.findOne();
    if (!content || !content.data) {
      // Return empty structure if no content exists in database
      return res.json({ data: {} });
    }
    
    // Return content from database
    res.json({ data: content.data || {} });
  } catch (err) {
    console.error("Error fetching content from database:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get content by page
router.get("/page/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const content = await Content.findOne();
    if (!content || !content.data || !content.data[page]) {
      return res.json({ data: {} });
    }
    res.json({ data: content.data[page] || {} });
  } catch (err) {
    console.error("Error fetching page content:", err);
    res.status(500).json({ error: err.message });
  }
});

// Upload image (Admin only)
router.post("/upload-image", authAndRole("admin"), uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Image is saved to uploads/images folder by multer
    // Return the URL that will be stored in MongoDB database
    // Frontend will use this URL to display the image
    const imageUrl = `/api/content/uploads/images/${path.basename(req.file.filename)}`;
    
    res.json({ 
      success: true, 
      imageUrl, // This URL will be stored in database
      filename: req.file.filename,
      originalName: req.file.originalname,
      message: "Image uploaded successfully and ready to be saved to database"
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: err.message });
  }
});

// Save/Update content (Admin only) - Saves to MongoDB
router.post("/save", authAndRole("admin"), async (req, res) => {
  try {
    const { page, section, data } = req.body;

    if (!page || !section || data === undefined) {
      return res.status(400).json({ error: "Page, section, and data are required" });
    }

    // Get or create content document (only one document in collection)
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content({ data: {} });
    }

    if (!content.data) {
      content.data = {};
    }

    if (!content.data[page]) {
      content.data[page] = {};
    }

    // Update the specific section in the database
    content.data[page][section] = data;
    content.updatedAt = new Date();
    content.updatedBy = req.user?.id || null;

    // Save to MongoDB
    await content.save();

    res.json({ 
      success: true, 
      message: "Content saved to database successfully",
      data: content.data[page][section]
    });
  } catch (err) {
    console.error("Error saving content to database:", err);
    res.status(500).json({ error: err.message });
  }
});

// Save entire page content (Admin only)
router.post("/save-page", authAndRole("admin"), async (req, res) => {
  try {
    const { page, data } = req.body;

    if (!page || !data) {
      return res.status(400).json({ error: "Page and data are required" });
    }

    let content = await Content.findOne();
    
    if (!content) {
      content = new Content({ data: {} });
    }

    if (!content.data) {
      content.data = {};
    }

    // Update entire page in database
    content.data[page] = data;
    content.updatedAt = new Date();
    content.updatedBy = req.user?.id || null;

    // Save to MongoDB
    await content.save();

    res.json({ 
      success: true, 
      message: "Page content saved to database successfully",
      data: content.data[page]
    });
  } catch (err) {
    console.error("Error saving page content:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve uploaded images
router.get("/uploads/images/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), "uploads", "images", filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.sendFile(filePath);
  } catch (err) {
    console.error("Error serving image:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;


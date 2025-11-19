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
    let content = await Content.findOne();
    console.log(`[Backend] 📖 Content fetch request`);
    
    if (!content || !content.data || Object.keys(content.data).length === 0) {
      // If no content exists, return empty structure
      // Frontend will merge with defaults
      console.log(`[Backend] ⚠️  No content found in database, returning empty structure`);
      return res.json({ data: {} });
    }
    
    console.log(`[Backend] ✅ Content found in database`);
    console.log(`[Backend] 📋 Pages available:`, Object.keys(content.data).join(', '));
    console.log(`[Backend] 📋 Content preview:`, JSON.stringify(content.data).substring(0, 200) + '...');
    
    // Return content from database
    res.json({ data: content.data || {} });
  } catch (err) {
    console.error("[Backend] ❌ Error fetching content from database:", err);
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

    console.log(`[Backend] 📝 Content save request: page="${page}", section="${section}"`);
    console.log(`[Backend] 📦 Data received:`, JSON.stringify(data).substring(0, 100) + '...');

    if (!page || !section || data === undefined) {
      return res.status(400).json({ error: "Page, section, and data are required" });
    }

    // Get or create content document (only one document in collection)
    let content = await Content.findOne();
    
    if (!content) {
      content = new Content({ data: {} });
      console.log(`[Backend] ✨ Created new content document`);
    }

    if (!content.data) {
      content.data = {};
    }

    if (!content.data[page]) {
      content.data[page] = {};
    }

    // Merge new data with existing section data (don't replace entire section)
    // This preserves fields that weren't included in the update
    const existingSection = content.data[page][section] || {};
    content.data[page][section] = {
      ...existingSection,
      ...data
    };
    content.updatedAt = new Date();
    content.updatedBy = req.user?.id || null;

    // Mark the data field as modified (required for Mixed types in Mongoose)
    content.markModified('data');
    content.markModified(`data.${page}`);
    content.markModified(`data.${page}.${section}`);

    // Save to MongoDB
    await content.save();
    console.log(`[Backend] ✅ Content saved successfully to MongoDB`);
    console.log(`[Backend] 📋 Saved data preview:`, JSON.stringify(content.data[page][section]).substring(0, 150) + '...');
    
    // Verify the save by re-fetching from database
    const verifyContent = await Content.findOne();
    if (verifyContent && verifyContent.data && verifyContent.data[page] && verifyContent.data[page][section]) {
      console.log(`[Backend] ✅ Verification: Content confirmed in database`);
      console.log(`[Backend] 📋 Verified data:`, JSON.stringify(verifyContent.data[page][section]).substring(0, 150) + '...');
    } else {
      console.error(`[Backend] ⚠️  WARNING: Content not found in database after save!`);
    }

    res.json({ 
      success: true, 
      message: "Content saved to database successfully",
      data: content.data[page][section]
    });
  } catch (err) {
    console.error("[Backend] ❌ Error saving content to database:", err);
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

// Initialize base content (Admin only) - Uploads default content structure
router.post("/initialize", authAndRole("admin"), async (req, res) => {
  try {
    let content = await Content.findOne();
    
    // Base content structure
    const baseContent = {
      home: {
        hero: {
          greeting: "- Empower Your Workforce -",
          titleLine1: "Shape the Future of",
          titleLine2: "Your Organization Today",
          subtitle: "Connect with top-tier talent across the USA and discover professionals who drive growth, innovation, and success for American businesses.",
          button1Text: "Book a Consultation",
          button1Link: "/book-call",
          button2Text: "Our Services",
          button2Link: "/services",
          image: null
        },
        statAbout: {
          tag: "ABOUT VENUS HIRING",
          title: "Driving Success With An Expert Staffing",
          description: "At Venus Consultancy, we understand that the key to business success lies in having the right people on your team. That's why we're committed to connecting USA companies with top-tier talent across North America and beyond.",
          stat1Number: "77",
          stat1Suffix: "K+",
          stat1Label: "Trusted Partnerships",
          stat2Number: "98",
          stat2Suffix: "%",
          stat2Label: "Client Satisfaction",
          stat3Number: "99",
          stat3Suffix: "%",
          stat3Label: "Success Rate",
          ctaText: "JOIN OUR NETWORK",
          ctaLink: "/book-call",
          images: {
            image1: "/images/imagetrail/image1.jpg",
            image2: "/images/imagetrail/image2.jpg",
            image3: "/images/imagetrail/image3.jpg",
            image4: "/images/imagetrail/image4.jpg"
          },
          experienceNumber: "18+",
          experienceLabel: "Years Of Experience",
          teamText: "We Are Awesome Team"
        }
      },
      meta: {
        home: {
          title: "Venus Hiring - Top Talent Recruitment Services",
          description: "Connect with top-tier talent across the USA. Expert staffing solutions for American businesses.",
          keywords: "recruitment, staffing, talent acquisition, hiring, USA"
        }
      }
    };

    if (!content) {
      content = new Content({ data: baseContent });
    } else {
      // Merge base content with existing content (don't overwrite existing)
      const existingData = content.data || {};
      content.data = { ...baseContent, ...existingData };
    }
    
    content.updatedAt = new Date();
    content.updatedBy = req.user?.id || null;
    await content.save();

    res.json({ 
      success: true, 
      message: "Base content initialized successfully",
      data: content.data
    });
  } catch (err) {
    console.error("Error initializing content:", err);
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


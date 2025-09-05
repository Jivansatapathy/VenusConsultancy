import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import jobRoutes from "./routes/jobRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// API Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// Serve React Frontend (Vite build)
// ===============================

// Needed because ES Modules don't have __dirname by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Vite build output
const frontendPath = path.join(__dirname, "../../client/dist");
app.use(express.static(frontendPath));

// Catch-all route for React Router (non-API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===============================
// Start server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// server/src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";


import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// ---- Middleware ----
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

// ---- Connect to DB ----
(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Failed to connect to DB during startup:", err);
    process.exit(1);
  }
})();

// ---- API Routes ----
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/admin", adminRoutes);

// ---- Serve Frontend in production ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../client/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Venus Hiring API (dev)"));
}

// ---- Basic error handler ----
app.use((err, req, res, next) => {
  console.error("Unhandled request error:", err);
  res.status(500).json({ error: "Server error" });
});

// ---- Global process handlers (make crashes obvious) ----
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(reason);
  process.exit(1);
});

// ---- Start server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV || "development"}`);
  console.log(`CLIENT_ORIGIN=${CLIENT_ORIGIN}`);
});

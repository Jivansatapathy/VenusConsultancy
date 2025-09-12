// server/src/app.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Load environment variables first
dotenv.config();

import { config } from "./config/index.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

const app = express();

// ---- Security Middleware ----
// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for development
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes
  max: config.RATE_LIMIT_MAX_REQUESTS, // limit each IP to 200 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to API routes
app.use("/api", limiter);

// CORS with strict origin validation
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("[CORS] Request from origin:", origin);
      console.log("[CORS] Allowed origins:", config.CORS_ALLOWED_ORIGINS);
      
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("[CORS] No origin, allowing request");
        return callback(null, true);
      }
      
      if (config.CORS_ALLOWED_ORIGINS.includes(origin)) {
        console.log("[CORS] Origin allowed:", origin);
        return callback(null, true);
      }
      
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      console.log("[CORS] Origin rejected:", origin);
      return callback(new Error(msg), false);
    },
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

// Body parsing and cookie parsing with security options
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Secure cookie parser
app.use(cookieParser());

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set("trust proxy", 1);

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

// ---- Serve Frontend (guarded) ----
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../../client/dist");
const clientIndex = path.join(clientDist, "index.html");
const serveClient = process.env.SERVE_CLIENT === "true"; // default false

if (serveClient && fs.existsSync(clientIndex)) {
  app.use(express.static(clientDist));
  app.get("*", (req, res) => {
    res.sendFile(clientIndex);
  });
} else {
  // Handle root route to show message instead of error logs
  app.get("/", (req, res) => res.json({ 
    message: "Venus Hiring API running. Frontend served separately.",
    environment: config.NODE_ENV,
    timestamp: new Date().toISOString()
  }));
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
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`NODE_ENV=${config.NODE_ENV}`);
  console.log(`CLIENT_ORIGIN=${config.CLIENT_ORIGIN}`);
  console.log(`CORS_ALLOWED_ORIGINS=${config.CORS_ALLOWED_ORIGINS.join(", ")}`);
  console.log(`Rate limiting: ${config.RATE_LIMIT_MAX_REQUESTS} requests per ${config.RATE_LIMIT_WINDOW_MS / 1000 / 60} minutes`);
});

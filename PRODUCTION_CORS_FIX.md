# 🔧 Production CORS Fix - Complete Solution

## 🎯 **Issues Identified**

1. **CORS Configuration**: Current setup doesn't include your production domains
2. **Cookie Settings**: Not optimized for cross-domain (Vercel ↔ Render)
3. **Environment Variables**: Missing production domain configuration
4. **Cookie Path**: Incorrect path for refresh tokens

## ✅ **Fixed Backend Code**

### **1. Updated Environment Variables (.env)**

Add these to your Render environment variables:

```bash
# Production CORS Configuration
CORS_ALLOWED_ORIGINS=https://venushiring.com,https://www.venushiring.com,https://api.venushiring.com
FRONTEND_URL=https://venushiring.com

# Your existing variables
ACCESS_SECRET=your_secure_access_secret
REFRESH_SECRET=your_secure_refresh_secret
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

### **2. Updated server/src/config/index.js**

```javascript
// server/src/config/index.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "../../");

dotenv.config({ path: path.join(rootDir, ".env") });

// Required environment variables for production
const requiredEnvVars = [
  "ACCESS_SECRET",
  "REFRESH_SECRET", 
  "MONGO_URI",
  "PORT"
];

// Validate required environment variables in production
if (process.env.NODE_ENV === "production") {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error("❌ CRITICAL SECURITY ERROR: Missing required environment variables in production:");
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error("\n🚨 Application will not start without these variables for security reasons.");
    console.error("Please set these environment variables in your production environment.");
    process.exit(1);
  }
}

// Export validated configuration
export const config = {
  // JWT Secrets - MUST be set in production
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  
  // Database
  MONGO_URI: process.env.MONGO_URI,
  
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // CORS - Updated for production
  CLIENT_ORIGIN: process.env.FRONTEND_URL || "http://localhost:5173",
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS 
    ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
    : ["http://localhost:5173"],
  
  // Security
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  
  // Seed data
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  SEED_RECRUITER_PASSWORD: process.env.SEED_RECRUITER_PASSWORD,
};

// Validate JWT secrets are not using dev fallbacks in production
if (process.env.NODE_ENV === "production") {
  if (!config.ACCESS_SECRET || config.ACCESS_SECRET === "dev_access_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not properly set in production!");
    process.exit(1);
  }
  if (!config.REFRESH_SECRET || config.REFRESH_SECRET === "dev_refresh_secret_change_me") {
    console.error("❌ CRITICAL SECURITY ERROR: REFRESH_SECRET is not properly set in production!");
    process.exit(1);
  }
}

export default config;
```

### **3. Updated server/src/app.js**

```javascript
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
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
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

// ---- FIXED CORS Configuration ----
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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
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
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

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
```

### **4. Updated server/src/routes/authRoutes.js**

```javascript
// server/src/routes/authRoutes.js
import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/index.js";
import Admin from "../models/Admin.js";
import Recruiter from "../models/Recruiter.js";
import RefreshToken from "../models/RefreshToken.js";

const router = express.Router();

// Validate that JWT secrets are properly configured
if (!config.ACCESS_SECRET) {
  console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not configured!");
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  } else {
    console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
  }
}

if (!config.REFRESH_SECRET) {
  console.error("❌ CRITICAL SECURITY ERROR: REFRESH_SECRET is not configured!");
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  } else {
    console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
  }
}

const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || "15m";
const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_DAYS || "7", 10); // Changed to 7 days
const REFRESH_TOKEN_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

function signAccess(user) {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, config.ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });
}

function createRefreshTokenString() {
  return crypto.randomBytes(64).toString("hex");
}

router.post("/login", async (req, res) => {
  try {
    console.log("[auth] /login called");
    const { email, password } = req.body || {};
    console.log("[auth] login attempt:", { email });

    if (!email || !password) {
      console.warn("[auth] missing credentials");
      return res.status(400).json({ message: "Email and password required" });
    }

    // Try to find user in both Admin and Recruiter models
    let user = await Admin.findOne({ email });
    let userModel = "Admin";
    
    if (!user) {
      user = await Recruiter.findOne({ email });
      userModel = "Recruiter";
    }

    if (!user) {
      console.warn("[auth] user not found:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (typeof user.comparePassword !== "function") {
      console.error("[auth] comparePassword not found on model for", email);
      return res.status(500).json({ message: "Server error" });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      console.warn("[auth] invalid password for", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create tokens
    const accessToken = signAccess(user);
    const refreshString = createRefreshTokenString();
    const tokenHash = await bcrypt.hash(refreshString, 10);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MS);

    const rt = await RefreshToken.create({
      userId: user._id,
      userModel: userModel,
      tokenHash,
      ip: req.ip,
      userAgent: req.get("User-Agent") || "",
      expiresAt,
    });

    // FIXED: Production-ready cookie configuration
    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production", // true in production
      sameSite: config.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-domain
      path: "/", // Changed from "/api" to "/" for cross-domain cookies
      maxAge: REFRESH_TOKEN_MS,
      domain: config.NODE_ENV === "production" ? undefined : undefined, // Let browser handle domain
    };
    
    res.cookie("vh_rt", refreshString, cookieOptions);
    
    console.log("[auth] login success for", email, "as", user.role);
    console.log("[auth] Cookie options:", cookieOptions);
    console.log("[auth] Response headers:", res.getHeaders());
    
    return res.json({
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("[auth] login error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    console.log("[auth] /refresh called");
    console.log("[auth] Request headers:", {
      origin: req.get("origin"),
      referer: req.get("referer"),
      userAgent: req.get("user-agent"),
      cookie: req.get("cookie")
    });
    console.log("[auth] Request cookies:", req.cookies);
    
    const rt = req.cookies?.vh_rt;
    if (!rt) {
      console.warn("[auth] no refresh token cookie");
      return res.status(401).json({ message: "No refresh token" });
    }

    // simple lookup strategy (small scale)
    const records = await RefreshToken.find({ revoked: false }).sort({ createdAt: -1 }).limit(200);
    let matched = null;
    for (const r of records) {
      // eslint-disable-next-line no-await-in-loop
      if (await bcrypt.compare(rt, r.tokenHash)) {
        if (r.expiresAt < new Date()) {
          console.warn("[auth] refresh token expired for record", r._id);
          continue;
        }
        matched = r;
        break;
      }
    }

    if (!matched) {
      console.warn("[auth] no matching refresh token record");
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const Model = matched.userModel === "Recruiter" ? Recruiter : Admin;
    const user = await Model.findById(matched.userId);
    if (!user) {
      console.warn("[auth] token owner missing user");
      return res.status(401).json({ message: "Invalid token user" });
    }

    // rotate
    const newRtString = createRefreshTokenString();
    const newHash = await bcrypt.hash(newRtString, 10);
    const newRecord = await RefreshToken.create({
      userId: user._id,
      userModel: matched.userModel,
      tokenHash: newHash,
      ip: req.ip,
      userAgent: req.get("User-Agent") || "",
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_MS),
      rotatedFrom: matched._id,
    });

    matched.revoked = true;
    await matched.save();

    // FIXED: Production-ready cookie configuration
    res.cookie("vh_rt", newRtString, {
      httpOnly: true,
      secure: config.NODE_ENV === "production", // true in production
      sameSite: config.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-domain
      path: "/", // Changed from "/api" to "/" for cross-domain cookies
      maxAge: REFRESH_TOKEN_MS,
      domain: config.NODE_ENV === "production" ? undefined : undefined, // Let browser handle domain
    });

    const accessToken = signAccess(user);
    console.log("[auth] refresh success for user", user.email);
    return res.json({ 
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("[auth] refresh error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    console.log("[auth] /logout called");
    const rt = req.cookies?.vh_rt;
    if (rt) {
      const records = await RefreshToken.find({ revoked: false }).limit(200);
      for (const r of records) {
        // eslint-disable-next-line no-await-in-loop
        if (await bcrypt.compare(rt, r.tokenHash)) {
          r.revoked = true;
          await r.save();
        }
      }
    }
    // FIXED: Clear cookie with correct path
    res.clearCookie("vh_rt", { 
      path: "/", 
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax"
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[auth] logout error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
```

## 🔧 **Frontend Updates**

### **Updated client/src/utils/api.js**

```javascript
// client/src/utils/api.js
import axios from "axios";

let accessToken = null;
let isRefreshing = false;
let refreshQueue = [];

// call this from AuthContext after login
export function setAccessToken(token) {
  accessToken = token;
  // Also store in localStorage for persistence
  if (token) {
    localStorage.setItem("venus_token", token);
  }
}

// call on logout
export function clearAccessToken() {
  accessToken = null;
  // Clear from localStorage
  localStorage.removeItem("venus_token");
}

// Initialize token from localStorage on app start
export function initializeTokenFromStorage() {
  try {
    const savedToken = localStorage.getItem("venus_token");
    if (savedToken) {
      accessToken = savedToken;
      return savedToken;
    }
  } catch (error) {
    console.error("[API] Error loading token from storage:", error);
    localStorage.removeItem("venus_token");
  }
  return null;
}

function processQueue(err, token = null) {
  refreshQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  refreshQueue = [];
}

// Resolve runtime API base from environment
const RUNTIME_API =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) ||
  "https://venusconsultancy.onrender.com"; // Updated to production URL

// Ensure baseURL ends without trailing slash and points to /api
const API_BASE = RUNTIME_API.replace(/\/$/, "") + "/api";

console.log("[API] Runtime API URL:", RUNTIME_API);
console.log("[API] Final API Base:", API_BASE);

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // CRITICAL: Enable credentials for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token to outgoing requests
API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

// response interceptor: handle 401 by attempting refresh
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (!original || original._retry) return Promise.reject(error);

    if (error.response && error.response.status === 401) {
      original._retry = true;

      if (isRefreshing) {
        // queue requests while a refresh is in progress
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(API(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        // use the API instance (so baseURL and withCredentials apply)
        const resp = await API.post("/auth/refresh", {}, { withCredentials: true });
        const newAccess = resp.data?.accessToken;
        if (!newAccess) throw new Error("No access token returned from refresh");

        setAccessToken(newAccess);
        processQueue(null, newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return API(original);
      } catch (e) {
        processQueue(e, null);
        clearAccessToken();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
```

## 🚀 **Deployment Steps**

### **1. Update Render Environment Variables**
Add these to your Render dashboard:

```bash
CORS_ALLOWED_ORIGINS=https://venushiring.com,https://www.venushiring.com
FRONTEND_URL=https://venushiring.com
NODE_ENV=production
```

### **2. Update Vercel Environment Variables**
Add this to your Vercel dashboard:

```bash
VITE_API_URL=https://venusconsultancy.onrender.com
```

### **3. Deploy Changes**
1. **Backend**: Deploy the updated code to Render
2. **Frontend**: Deploy the updated code to Vercel
3. **Test**: Verify CORS errors are resolved

## 🎯 **Why These Changes Fix the Issues**

### **1. CORS Configuration**
- **Added Production Domains**: Now includes `https://venushiring.com` and `https://www.venushiring.com`
- **Credentials Enabled**: Allows cookies to be sent cross-domain
- **Proper Headers**: Includes all necessary CORS headers

### **2. Cookie Configuration**
- **SameSite: "none"**: Required for cross-domain cookies
- **Secure: true**: Required for HTTPS in production
- **Path: "/"**: Changed from "/api" to allow cookies on all routes
- **HttpOnly: true**: Security best practice

### **3. Frontend Configuration**
- **withCredentials: true**: Enables cookie sending
- **Production API URL**: Points to your Render backend
- **Proper Error Handling**: Handles CORS errors gracefully

## 🎉 **Expected Results**

After implementing these changes:
- ✅ **No CORS errors** in browser console
- ✅ **Login works** with proper cookie setting
- ✅ **Refresh tokens work** across domains
- ✅ **Logout works** with proper cookie clearing
- ✅ **All API calls work** without CORS issues

The authentication flow will now work seamlessly between your Vercel frontend and Render backend! 🚀

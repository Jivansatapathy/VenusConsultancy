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
const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_DAYS || "30", 10);
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

    res.cookie("vh_rt", refreshString, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: REFRESH_TOKEN_MS,
    });

    console.log("[auth] login success for", email, "as", user.role);
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

    res.cookie("vh_rt", newRtString, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth",
      maxAge: REFRESH_TOKEN_MS,
    });

    const accessToken = signAccess(user);
    console.log("[auth] refresh success for user", user.email);
    return res.json({ accessToken });
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
    res.clearCookie("vh_rt", { path: "/api/auth" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[auth] logout error:", err && err.stack ? err.stack : err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;

// client/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../../../../lib/config/index.js';
import Admin from '../../../../lib/models/Admin.js';
import Recruiter from '../../../../lib/models/Recruiter.js';
import RefreshToken from '../../../../lib/models/RefreshToken.js';
import connectDB from '../../../../lib/config/db.js';

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

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    // Try to find user in both Admin and Recruiter models
    let user = await Admin.findOne({ email });
    let userModel = "Admin";
    
    if (!user) {
      user = await Recruiter.findOne({ email });
      userModel = "Recruiter";
    }

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    if (typeof user.comparePassword !== "function") {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }

    const ok = await user.comparePassword(password);
    if (!ok) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // create tokens
    const accessToken = signAccess(user);
    const refreshString = createRefreshTokenString();
    const tokenHash = await bcrypt.hash(refreshString, 10);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MS);

    await RefreshToken.create({
      userId: user._id,
      userModel: userModel,
      tokenHash,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
      userAgent: request.headers.get("user-agent") || "",
      expiresAt,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MS / 1000, // Convert to seconds
    };
    
    const response = NextResponse.json({
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("vh_rt", refreshString, cookieOptions);
    
    return response;
  } catch (err) {
    console.error("[auth] login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


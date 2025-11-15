// client/app/api/auth/refresh/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../../../../lib/config/index.js';
import Admin from '../../../../lib/models/Admin.js';
import Recruiter from '../../../../lib/models/Recruiter.js';
import RefreshToken from '../../../../lib/models/RefreshToken.js';
import connectDB from '../../../../lib/config/db.js';

const REFRESH_TOKEN_DAYS = parseInt(process.env.REFRESH_TOKEN_DAYS || "30", 10);
const REFRESH_TOKEN_MS = REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000;

function signAccess(user) {
  const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || "15m";
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
    
    const rt = request.cookies.get("vh_rt")?.value;
    if (!rt) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    // simple lookup strategy (small scale)
    const records = await RefreshToken.find({ revoked: false }).sort({ createdAt: -1 }).limit(200);
    let matched = null;
    for (const r of records) {
      if (await bcrypt.compare(rt, r.tokenHash)) {
        if (r.expiresAt < new Date()) {
          continue;
        }
        matched = r;
        break;
      }
    }

    if (!matched) {
      return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }

    const Model = matched.userModel === "Recruiter" ? Recruiter : Admin;
    const user = await Model.findById(matched.userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid token user" }, { status: 401 });
    }

    // rotate
    const newRtString = createRefreshTokenString();
    const newHash = await bcrypt.hash(newRtString, 10);
    await RefreshToken.create({
      userId: user._id,
      userModel: matched.userModel,
      tokenHash: newHash,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "",
      userAgent: request.headers.get("user-agent") || "",
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_MS),
      rotatedFrom: matched._id,
    });

    matched.revoked = true;
    await matched.save();

    const accessToken = signAccess(user);
    
    const response = NextResponse.json({ 
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });

    response.cookies.set("vh_rt", newRtString, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MS / 1000,
    });

    return response;
  } catch (err) {
    console.error("[auth] refresh error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


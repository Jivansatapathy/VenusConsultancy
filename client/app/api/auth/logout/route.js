// client/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import RefreshToken from '../../../../lib/models/RefreshToken.js';
import connectDB from '../../../../lib/config/db.js';

export async function POST(request) {
  try {
    await connectDB();
    
    const rt = request.cookies.get("vh_rt")?.value;
    if (rt) {
      const records = await RefreshToken.find({ revoked: false }).limit(200);
      for (const r of records) {
        if (await bcrypt.compare(rt, r.tokenHash)) {
          r.revoked = true;
          await r.save();
        }
      }
    }
    
    const response = NextResponse.json({ ok: true });
    response.cookies.delete("vh_rt");
    
    return response;
  } catch (err) {
    console.error("[auth] logout error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


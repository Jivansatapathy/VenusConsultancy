// client/app/api/health/route.js
import { NextResponse } from 'next/server';
import { config } from '../../../lib/config/index.js';

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: "1.0.0"
  });
}


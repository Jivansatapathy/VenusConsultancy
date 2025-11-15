// client/lib/middleware/authMiddleware.js
// Next.js compatible auth middleware
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

// Validate that ACCESS_SECRET is properly configured
if (!config.ACCESS_SECRET) {
  console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not configured!");
  if (process.env.NODE_ENV === "production") {
    throw new Error("ACCESS_SECRET is required in production");
  } else {
    console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
  }
}

/**
 * Extract user from Next.js Request headers
 * Returns user payload or null
 */
export function getAuthUser(request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return null;

    const payload = jwt.verify(token, config.ACCESS_SECRET);
    return payload; // payload expected to have { id, role, ... }
  } catch (err) {
    console.error("Auth error:", err.message || err);
    return null;
  }
}

/**
 * Require authentication - returns user or throws error
 */
export function requireAuth(request) {
  const user = getAuthUser(request);
  if (!user) {
    throw new Error("Unauthorized: no token");
  }
  return user;
}

/**
 * Require one of the allowed roles
 */
export function requireRole(user, ...allowedRoles) {
  if (!user) throw new Error("Unauthorized");
  const role = user.role || "user";
  if (!allowedRoles.includes(role)) {
    throw new Error("Forbidden: insufficient role");
  }
  return user;
}

/**
 * Combined auth and role check
 */
export function authAndRole(request, ...roles) {
  const user = requireAuth(request);
  return requireRole(user, ...roles);
}

/**
 * Create Next.js Response for errors
 */
export function createErrorResponse(message, status = 401) {
  return Response.json({ message }, { status });
}

/**
 * Create Next.js Response for success
 */
export function createSuccessResponse(data, status = 200) {
  return Response.json(data, { status });
}

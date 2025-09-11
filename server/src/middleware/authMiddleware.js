// server/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

// Validate that ACCESS_SECRET is properly configured
if (!config.ACCESS_SECRET) {
  console.error("❌ CRITICAL SECURITY ERROR: ACCESS_SECRET is not configured!");
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  } else {
    console.error("🚨 Using development fallback - DO NOT USE IN PRODUCTION!");
  }
}

/**
 * verify access token and attach user payload to req.user
 */
export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized: no token" });

    const payload = jwt.verify(token, config.ACCESS_SECRET);
    req.user = payload; // payload expected to have { id, role, ... }
    return next();
  } catch (err) {
    console.error("Auth error:", err.message || err);
    return res.status(401).json({ message: "Unauthorized: invalid token" });
  }
}

/**
 * require one of the allowed roles
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const role = req.user.role || "user";
    if (allowedRoles.includes(role)) return next();
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  };
}

/**
 * Return a single middleware that runs requireAuth then role-check.
 * This is usable directly in route definitions:
 *   router.post('/', authAndRole('admin'), handler)
 */
export function authAndRole(...roles) {
  return (req, res, next) => {
    // call requireAuth; if it sends a response on error it'll return early
    requireAuth(req, res, (authErr) => {
      // If requireAuth forwarded an error via next(err), handle it
      if (authErr) return next(authErr);

      // now run role middleware
      const roleMiddleware = requireRole(...roles);
      return roleMiddleware(req, res, next);
    });
  };
}

// Default export (backwards compatibility)
const defaultExport = {
  requireAuth,
  requireRole,
  authAndRole,
};

export default defaultExport;

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
 * Validate that the authenticated user can only access their own resources
 * This prevents user impersonation by ensuring userId matches the authenticated user's ID
 */
export function requireOwnership(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: no user context" });
  }

  const { userId } = req.params;
  const { userId: bodyUserId } = req.body;
  const { userId: queryUserId } = req.query;
  
  // Check if userId is provided in params, body, or query
  const providedUserId = userId || bodyUserId || queryUserId;
  
  if (providedUserId && providedUserId !== req.user.id) {
    console.warn(`[SECURITY] User impersonation attempt detected:`, {
      authenticatedUserId: req.user.id,
      requestedUserId: providedUserId,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    return res.status(403).json({ 
      message: "Forbidden: You can only access your own resources" 
    });
  }

  return next();
}

/**
 * Enhanced middleware that validates user ownership for specific user ID parameters
 * Usage: router.get('/user/:userId', requireAuth, requireOwnershipForParam('userId'), handler)
 */
export function requireOwnershipForParam(paramName) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: no user context" });
    }

    const requestedUserId = req.params[paramName];
    
    if (requestedUserId && requestedUserId !== req.user.id) {
      console.warn(`[SECURITY] User impersonation attempt detected:`, {
        authenticatedUserId: req.user.id,
        requestedUserId: requestedUserId,
        paramName: paramName,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      return res.status(403).json({ 
        message: "Forbidden: You can only access your own resources" 
      });
    }

    return next();
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

/**
 * Enhanced middleware that combines authentication, role checking, and ownership validation
 * Usage: router.get('/user/:userId', authRoleAndOwnership('admin', 'recruiter', 'userId'), handler)
 */
export function authRoleAndOwnership(...args) {
  const roles = args.filter(arg => typeof arg === 'string' && !arg.includes('Id'));
  const paramName = args.find(arg => typeof arg === 'string' && arg.includes('Id'));
  
  return (req, res, next) => {
    // First authenticate
    requireAuth(req, res, (authErr) => {
      if (authErr) return next(authErr);

      // Then check role
      const roleMiddleware = requireRole(...roles);
      roleMiddleware(req, res, (roleErr) => {
        if (roleErr) return next(roleErr);

        // Finally check ownership if paramName is provided
        if (paramName) {
          const ownershipMiddleware = requireOwnershipForParam(paramName);
          return ownershipMiddleware(req, res, next);
        }

        return next();
      });
    });
  };
}

// Default export (backwards compatibility)
const defaultExport = {
  requireAuth,
  requireRole,
  authAndRole,
  requireOwnership,
  requireOwnershipForParam,
  authRoleAndOwnership,
};

export default defaultExport;

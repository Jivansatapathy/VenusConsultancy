# Security Middleware Guide

This guide explains how to use the enhanced authentication middleware to prevent user impersonation and implement proper authorization checks.

## Overview

The security issue mentioned in the report was about missing authorization checks that could allow user impersonation. The enhanced middleware provides several functions to prevent this:

## Available Middleware Functions

### 1. `requireOwnership`
Validates that the authenticated user can only access their own resources by checking userId in params, body, or query.

```javascript
import { requireOwnership } from "../middleware/authMiddleware.js";

// Prevents users from accessing other users' data
router.get("/user/:userId", requireAuth, requireOwnership, handler);
```

### 2. `requireOwnershipForParam(paramName)`
Validates ownership for a specific parameter name.

```javascript
import { requireOwnershipForParam } from "../middleware/authMiddleware.js";

// Ensures userId parameter matches authenticated user's ID
router.get("/user/:userId", requireAuth, requireOwnershipForParam('userId'), handler);
```

### 3. `authRoleAndOwnership(...args)`
Combines authentication, role checking, and ownership validation.

```javascript
import { authRoleAndOwnership } from "../middleware/authMiddleware.js";

// Admin/recruiter can access, but only their own data
router.get("/user/:userId", authRoleAndOwnership("admin", "recruiter", "userId"), handler);
```

## Security Features

### User Impersonation Prevention
All middleware functions include security logging to detect and prevent user impersonation attempts:

```javascript
console.warn(`[SECURITY] User impersonation attempt detected:`, {
  authenticatedUserId: req.user.id,
  requestedUserId: providedUserId,
  ip: req.ip,
  userAgent: req.get('User-Agent')
});
```

### Comprehensive Validation
The middleware checks:
- **Authentication**: User must be logged in
- **Authorization**: User must have appropriate role (if specified)
- **Ownership**: User can only access their own resources
- **Parameter validation**: Ensures userId parameters match authenticated user

## Usage Examples

### Example 1: User Profile Access
```javascript
// ❌ VULNERABLE - No authorization check
router.get("/user/:userId/profile", requireAuth, (req, res) => {
  // User could access any profile by changing userId in URL
});

// ✅ SECURE - With ownership validation
router.get("/user/:userId/profile", requireAuth, requireOwnershipForParam('userId'), (req, res) => {
  // User can only access their own profile
});
```

### Example 2: Chat Messages
```javascript
// ❌ VULNERABLE - Missing authorization
router.get("/chat/:userId/messages", requireAuth, (req, res) => {
  // User could read any user's messages
});

// ✅ SECURE - With ownership validation
router.get("/chat/:userId/messages", requireAuth, requireOwnershipForParam('userId'), (req, res) => {
  // User can only read their own messages
});
```

### Example 3: Admin Access with Ownership
```javascript
// ✅ SECURE - Admin can access all data, but regular users only their own
router.get("/admin/user/:userId", authRoleAndOwnership("admin", "recruiter", "userId"), (req, res) => {
  // Admins can access any user's data
  // Regular users can only access their own data
});
```

### Example 4: Body Parameter Validation
```javascript
// ✅ SECURE - Validates userId in request body
router.post("/send-message", requireAuth, requireOwnership, (req, res) => {
  const { userId, message } = req.body;
  // requireOwnership ensures userId matches req.user.id
});
```

## Implementation Checklist

When implementing new routes that involve user data:

- [ ] **Authentication**: Use `requireAuth` to ensure user is logged in
- [ ] **Ownership**: Use `requireOwnership` or `requireOwnershipForParam` to prevent impersonation
- [ ] **Role-based access**: Use `authRoleAndOwnership` for admin/recruiter routes
- [ ] **Parameter validation**: Ensure all userId parameters are validated
- [ ] **Body validation**: Check userId in request body if present
- [ ] **Query validation**: Validate userId in query parameters if used

## Security Best Practices

1. **Always validate user ownership** before processing requests
2. **Use parameter-specific validation** for better security
3. **Log security violations** for monitoring and alerting
4. **Combine authentication and authorization** in a single middleware when possible
5. **Test with different user IDs** to ensure impersonation is prevented

## Testing Security

To test that the security measures work:

```bash
# Test with different user IDs
curl -H "Authorization: Bearer <token>" /api/chat/user/other-user-id/messages
# Should return 403 Forbidden

curl -H "Authorization: Bearer <token>" /api/chat/user/authenticated-user-id/messages
# Should return 200 OK
```

## Migration Guide

To fix existing vulnerable routes:

1. **Identify routes** that use userId parameters
2. **Add ownership validation** using appropriate middleware
3. **Test thoroughly** to ensure functionality is preserved
4. **Update documentation** to reflect security requirements

## Example Vulnerable Code Fix

```javascript
// ❌ BEFORE - Vulnerable to user impersonation
if (userId !== req.user.id) {
  return NextResponse.json(
    { error: 'Unauthorized' }, { status: 401 }
  );
}

// ✅ AFTER - Using middleware (automatic validation)
router.get("/user/:userId", requireAuth, requireOwnershipForParam('userId'), handler);
```

The middleware approach is more secure because:
- It's applied consistently across all routes
- It includes comprehensive logging
- It prevents the need for manual validation in each route
- It's easier to maintain and update

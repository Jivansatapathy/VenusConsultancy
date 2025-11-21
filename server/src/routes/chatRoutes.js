// server/src/routes/chatRoutes.js
import express from "express";
import { requireAuth, requireOwnership, requireOwnershipForParam, authRoleAndOwnership } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example: Get chat messages for a specific user
// This route demonstrates proper authorization to prevent user impersonation
router.get("/user/:userId/messages", requireAuth, requireOwnershipForParam('userId'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    // At this point, we know:
    // 1. User is authenticated (requireAuth)
    // 2. userId matches the authenticated user's ID (requireOwnershipForParam)
    // 3. No user impersonation is possible

    // Simulate fetching messages for the authenticated user
    const messages = [
      {
        id: 1,
        userId: userId,
        message: "Hello, this is a secure message",
        timestamp: new Date().toISOString()
      }
    ];

    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: messages.length
      }
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example: Send a message (with user ID validation in body)
router.post("/send", requireAuth, requireOwnership, async (req, res) => {
  try {
    const { userId, message, recipientId } = req.body;

    // requireOwnership middleware ensures userId matches req.user.id
    // This prevents users from sending messages on behalf of other users

    if (!message || !recipientId) {
      return res.status(400).json({ error: "Message and recipientId are required" });
    }

    // Simulate sending message
    const newMessage = {
      id: Date.now(),
      senderId: userId, // This is guaranteed to be the authenticated user's ID
      recipientId,
      message,
      timestamp: new Date().toISOString()
    };

    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example: Admin/Recruiter can view all messages (with role-based access)
router.get("/admin/messages", authRoleAndOwnership("admin", "recruiter"), async (req, res) => {
  try {
    // This route is accessible only to admins and recruiters
    // No user ID validation needed as admins can see all messages
    
    const { userId, page = 1, limit = 20 } = req.query;
    
    // Simulate admin message retrieval
    const messages = [
      {
        id: 1,
        senderId: "user123",
        recipientId: "user456",
        message: "Admin can see this message",
        timestamp: new Date().toISOString()
      }
    ];

    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: messages.length
      }
    });
  } catch (err) {
    console.error("Error fetching admin messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example: Update user profile (prevents impersonation)
router.put("/user/:userId/profile", requireAuth, requireOwnershipForParam('userId'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, preferences } = req.body;

    // requireOwnershipForParam ensures userId matches req.user.id
    // This prevents users from updating other users' profiles

    // Simulate profile update
    const updatedProfile = {
      userId,
      name: name || "Updated Name",
      email: email || "updated@example.com",
      preferences: preferences || {},
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

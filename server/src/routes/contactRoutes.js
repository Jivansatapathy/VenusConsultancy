import express from 'express';
import { sendContactEmail, sendAutoReply } from '../services/emailService.js';

const router = express.Router();

// Contact form submission endpoint
router.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, source, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Validate phone format
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number.'
      });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: source || 'Not specified',
      message: message.trim()
    };

    // Send email to admin
    const emailResult = await sendContactEmail(contactData);
    
    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      });
    }

    // Send auto-reply to user (optional)
    try {
      await sendAutoReply(contactData);
    } catch (autoReplyError) {
      console.error('Auto-reply failed (non-critical):', autoReplyError);
      // Don't fail the whole request if auto-reply fails
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will contact you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

export default router;

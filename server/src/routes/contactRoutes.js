import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactEmail, sendAutoReply } from '../services/emailService.js';
import { authAndRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Test route to check email service (remove in production)
router.get('/test-email', async (req, res) => {
  try {
    console.log('Testing email service...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      source: 'Test',
      message: 'This is a test email'
    };
    
    const result = await sendContactEmail(testData);
    res.json({ 
      success: true, 
      emailResult: result,
      message: 'Email test completed' 
    });
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: 'Email test failed' 
    });
  }
});

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

    // Send email to admin (MANDATORY - form fails if email fails)
    console.log('Attempting to send contact email...');
    
    // Add timeout to prevent hanging
    const emailPromise = sendContactEmail(contactData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout after 30 seconds')), 30000)
    );
    
    let emailResult;
    try {
      emailResult = await Promise.race([emailPromise, timeoutPromise]);
      console.log('Email result:', emailResult);
    } catch (emailError) {
      console.error('Email error (timeout or service error):', emailError.message);
      return res.status(500).json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later.'
      });
    }
    
    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      });
    }

    console.log('Contact email sent successfully');

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

// Admin route: Get all contact submissions
router.get('/admin', authAndRole('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(query)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      contacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: contacts.length,
        totalContacts: total
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Admin route: Update contact status
router.patch('/admin/:id', authAndRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ contact });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ error: 'Failed to update contact status' });
  }
});

export default router;

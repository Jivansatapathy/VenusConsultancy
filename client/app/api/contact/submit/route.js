// client/app/api/contact/submit/route.js
import { NextResponse } from 'next/server';
import Contact from '../../../../lib/models/Contact.js';
import { sendContactEmail, sendAutoReply } from '../../../../lib/services/emailService.js';
import connectDB from '../../../../lib/config/db.js';

export async function POST(request) {
  try {
    await connectDB();
    
    const { name, email, phone, source, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({
        success: false,
        message: 'Please fill in all required fields.'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address.'
      }, { status: 400 });
    }

    // Validate phone format
    const phoneRegex = /^\+?[0-9\s-]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid phone number.'
      }, { status: 400 });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: source || 'Not specified',
      message: message.trim()
    };

    // Send email to admin (MANDATORY - form fails if email fails)
    const emailPromise = sendContactEmail(contactData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout after 30 seconds')), 30000)
    );
    
    let emailResult;
    try {
      emailResult = await Promise.race([emailPromise, timeoutPromise]);
    } catch (emailError) {
      console.error('Email error (timeout or service error):', emailError.message);
      return NextResponse.json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later.'
      }, { status: 500 });
    }
    
    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      return NextResponse.json({
        success: false,
        message: 'Failed to send your message. Please try again later.'
      }, { status: 500 });
    }

    // Save to database
    await Contact.create(contactData);

    // Send auto-reply to user (optional)
    try {
      await sendAutoReply(contactData);
    } catch (autoReplyError) {
      console.error('Auto-reply failed (non-critical):', autoReplyError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will contact you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    }, { status: 500 });
  }
}


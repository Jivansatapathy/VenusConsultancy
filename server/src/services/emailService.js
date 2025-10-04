import nodemailer from 'nodemailer';

// Create transporter - you'll need to configure this with your email provider
const createTransporter = () => {
  // Option 1: Gmail (recommended for testing)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });
  }

  // Option 2: Zoho Mail
  if (process.env.EMAIL_SERVICE === 'zoho') {
    return nodemailer.createTransporter({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Option 3: Custom SMTP (for production)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'satapathyjjivan@gmail.com',
      to: process.env.CONTACT_EMAIL || 'satapathyjjivan@gmail.com', // Where to receive contact forms
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone}</p>
            <p><strong>Source:</strong> ${contactData.source || 'Not specified'}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            This email was sent from the Venus Hiring contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${contactData.name}
        Email: ${contactData.email}
        Phone: ${contactData.phone}
        Source: ${contactData.source || 'Not specified'}
        
        Message:
        ${contactData.message}
        
        ---
        This email was sent from the Venus Hiring contact form.
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for contacting Venus Hiring',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Thank You for Contacting Venus Hiring!</h2>
          
          <p>Dear ${contactData.name},</p>
          
          <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone}</p>
            <p><strong>Message:</strong> ${contactData.message}</p>
          </div>
          
          <p>In the meantime, feel free to explore our services:</p>
          <ul>
            <li>Executive Search & Recruitment</li>
            <li>Talent Acquisition Solutions</li>
            <li>HR Consulting Services</li>
          </ul>
          
          <p>Best regards,<br>
          The Venus Hiring Team</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            Venus Hiring | Building Careers, Building Organizations<br>
            Phone: +647-722-0837 | Email: info@venushiring.com
          </p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return { success: false, error: error.message };
  }
};

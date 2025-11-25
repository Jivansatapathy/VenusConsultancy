import nodemailer from 'nodemailer';

// Create transporter - you'll need to configure this with your email provider
const createTransporter = () => {
  // Option 1: Gmail
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use App Password for Gmail
      }
    });
  }

  // Option 2: Zoho Mail
  if (process.env.EMAIL_SERVICE === 'zoho') {
    return nodemailer.createTransport({
      host: 'smtppro.zoho.in',
      port: 465,
      secure: true, // SSL for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Option 3: Custom SMTP (for other providers)
  return nodemailer.createTransport({
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
      to: process.env.CONTACT_EMAIL || 'paresh@venushiring.ca,info@venushiring.com,jivan@venushiring.com', // Where to receive contact forms
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

// Send notification to admin/recruiter about new job application
export const sendJobApplicationNotification = async (applicationData, jobData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'satapathyjjivan@gmail.com',
      to: process.env.JOB_APPLICATION_EMAIL || 'megan@venushiring.com, paresh@venushiring.ca, jivan@venushiring.com', // Venus Hiring team notifications
      subject: `New Job Application: ${jobData.title} - ${applicationData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
            🎯 New Job Application Received
          </h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">📋 Job Details</h3>
            <p><strong>Position:</strong> ${jobData.title}</p>
            <p><strong>Location:</strong> ${jobData.location}</p>
            <p><strong>Type:</strong> ${jobData.type}</p>
            <p><strong>Department:</strong> ${jobData.department}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">👤 Applicant Information</h3>
            <p><strong>Name:</strong> ${applicationData.name}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phone || 'Not provided'}</p>
            <p><strong>Applied At:</strong> ${new Date(applicationData.appliedAt).toLocaleString()}</p>
            <p><strong>Resume File:</strong> ${applicationData.resumeOriginalName}</p>
          </div>
          
          ${applicationData.coverMessage ? `
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">💬 Cover Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; background: #f9fafb; padding: 15px; border-radius: 6px;">${applicationData.coverMessage}</p>
          </div>
          ` : ''}
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">⚡ Action Required</h3>
            <p style="margin: 0; color: #92400e;">
              <strong>Next Steps:</strong><br>
              • Review the attached resume<br>
              • Contact the candidate within 48 hours<br>
              • Update application status in the admin dashboard
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/dashboard" 
               style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            This notification was sent from the Venus Hiring job application system.<br>
            Application ID: ${applicationData._id}
          </p>
        </div>
      `,
      text: `
        New Job Application Received
        
        Job Details:
        - Position: ${jobData.title}
        - Location: ${jobData.location}
        - Type: ${jobData.type}
        - Department: ${jobData.department}
        
        Applicant Information:
        - Name: ${applicationData.name}
        - Email: ${applicationData.email}
        - Phone: ${applicationData.phone || 'Not provided'}
        - Applied At: ${new Date(applicationData.appliedAt).toLocaleString()}
        - Resume File: ${applicationData.resumeOriginalName}
        
        ${applicationData.coverMessage ? `Cover Message:\n${applicationData.coverMessage}\n` : ''}
        
        Action Required:
        - Review the attached resume
        - Contact the candidate within 48 hours
        - Update application status in the admin dashboard
        
        View in Admin Dashboard: ${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/dashboard
        
        ---
        Application ID: ${applicationData._id}
        This notification was sent from the Venus Hiring job application system.
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Job application notification sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending job application notification:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to applicant
export const sendApplicationConfirmation = async (applicationData, jobData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'satapathyjjivan@gmail.com',
      to: applicationData.email,
      subject: `Application Confirmation - ${jobData.title} at Venus Hiring`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">✅ Application Received Successfully!</h2>
          
          <p>Dear ${applicationData.name},</p>
          
          <p>Thank you for your interest in joining our team! We have successfully received your application for the <strong>${jobData.title}</strong> position.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">📋 Application Summary</h3>
            <p><strong>Position Applied For:</strong> ${jobData.title}</p>
            <p><strong>Location:</strong> ${jobData.location}</p>
            <p><strong>Job Type:</strong> ${jobData.type}</p>
            <p><strong>Department:</strong> ${jobData.department}</p>
            <p><strong>Application Date:</strong> ${new Date(applicationData.appliedAt).toLocaleString()}</p>
            <p><strong>Resume Submitted:</strong> ${applicationData.resumeOriginalName}</p>
          </div>
          
          ${applicationData.coverMessage ? `
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Cover Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb;">${applicationData.coverMessage}</p>
          </div>
          ` : ''}
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="color: #166534; margin-top: 0;">⏰ What Happens Next?</h3>
            <ul style="color: #166534; margin: 0; padding-left: 20px;">
              <li>Our HR team will review your application within 2-3 business days</li>
              <li>If shortlisted, you'll receive a call or email for the next steps</li>
              <li>We'll keep you updated on the status of your application</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">💡 Pro Tip</h3>
            <p style="margin: 0; color: #92400e;">
              While you wait, feel free to explore other opportunities on our website or follow us on social media for company updates and career tips!
            </p>
          </div>
          
          <p>If you have any questions about your application, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          <strong>The Venus Hiring Team</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            Venus Hiring | Building Careers, Building Organizations<br>
            Phone: +647-722-0837 | Email: info@venushiring.com<br>
            Application ID: ${applicationData._id}
          </p>
        </div>
      `,
      text: `
        Application Received Successfully!
        
        Dear ${applicationData.name},
        
        Thank you for your interest in joining our team! We have successfully received your application for the ${jobData.title} position.
        
        Application Summary:
        - Position Applied For: ${jobData.title}
        - Location: ${jobData.location}
        - Job Type: ${jobData.type}
        - Department: ${jobData.department}
        - Application Date: ${new Date(applicationData.appliedAt).toLocaleString()}
        - Resume Submitted: ${applicationData.resumeOriginalName}
        
        ${applicationData.coverMessage ? `Your Cover Message:\n${applicationData.coverMessage}\n` : ''}
        
        What Happens Next?
        - Our HR team will review your application within 2-3 business days
        - If shortlisted, you'll receive a call or email for the next steps
        - We'll keep you updated on the status of your application
        
        If you have any questions about your application, please don't hesitate to contact us.
        
        Best regards,
        The Venus Hiring Team
        
        ---
        Venus Hiring | Building Careers, Building Organizations
        Phone: +647-722-0837 | Email: info@venushiring.com
        Application ID: ${applicationData._id}
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Application confirmation sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending application confirmation:', error);
    return { success: false, error: error.message };
  }
};
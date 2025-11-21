# Email Setup Guide for Contact Form

## Environment Variables Required

Add these variables to your `.env` file in the server directory:

### Option 1: Gmail (Recommended for testing)

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
CONTACT_EMAIL=info@venushiring.com
```

**Gmail Setup Steps:**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS`

### Option 2: Custom SMTP (For production)

```env
# Email Configuration
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-email-password
CONTACT_EMAIL=info@venushiring.com
```

## How It Works

1. **Contact Form Submission**: When someone submits the contact form, it sends data to `/api/contact/submit`
2. **Email to Admin**: You receive a formatted email with all contact details
3. **Auto-Reply**: The user receives an automatic thank you email
4. **Validation**: Server validates all fields before sending emails

## Email Features

- **Professional HTML formatting** for admin emails
- **Auto-reply** to users with thank you message
- **Field validation** on both client and server
- **Error handling** with user-friendly messages
- **Rate limiting** to prevent spam

## Testing

1. Start your server: `npm run dev`
2. Go to your contact page
3. Fill out and submit the form
4. Check your email for the contact form submission
5. Check the user's email for the auto-reply

## Troubleshooting

- **"Authentication failed"**: Check your email credentials
- **"Connection timeout"**: Verify SMTP settings
- **"Rate limit exceeded"**: Wait a few minutes before trying again
- **Emails not received**: Check spam folder and email provider settings

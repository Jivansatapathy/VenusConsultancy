# Venus Hiring Platform

A comprehensive job application platform built with React and Node.js that allows companies to post jobs and candidates to apply for positions. The platform includes separate dashboards for administrators and recruiters to manage jobs and applications.

## Features

### Public Features
- **Job Search & Filtering**: Browse available jobs with advanced search and filtering options
- **Job Application**: Apply for jobs with resume upload and cover message
- **Responsive Design**: Mobile-friendly interface that works on all devices

### Admin Features
- **Job Management**: Create, edit, and delete job postings
- **Recruiter Management**: Create and manage recruiter accounts
- **Application Management**: View and delete applications
- **Dashboard**: Comprehensive admin dashboard with all management tools

### Recruiter Features
- **Application Review**: View and manage job applications
- **Status Updates**: Update application status (new, shortlisted, rejected)
- **Resume Access**: Download and preview candidate resumes
- **Notes**: Add notes to applications for internal tracking

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd venus-hiring
```

### 2. Install Dependencies

Install server dependencies:
```bash
cd server
npm install
```

Install client dependencies:
```bash
cd ../client
npm install
```

### 3. Environment Configuration

**⚠️ SECURITY NOTICE: Never commit .env files to version control!**

Copy the example environment file and configure your variables:

```bash
cd server
cp .env.example .env
```

Edit the `.env` file with your actual values:

```env
# REQUIRED FOR PRODUCTION - Application will not start without these
ACCESS_SECRET=your-super-secret-access-key-here-change-this-immediately
REFRESH_SECRET=your-super-secret-refresh-key-here-change-this-immediately
MONGO_URI=mongodb://localhost:27017/venus-hiring
PORT=5000
NODE_ENV=development

# CORS and Security
CLIENT_ORIGIN=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200

# Seed Data Passwords (REQUIRED for seeding)
SEED_ADMIN_PASSWORD=your-secure-admin-password-here
SEED_RECRUITER_PASSWORD=your-secure-recruiter-password-here
```

**🔒 Generate strong secrets:**
```bash
# Generate JWT secrets
openssl rand -base64 64
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will automatically connect to the database when you start the server.

### 5. Seed the Database

**⚠️ SECURITY: Seed scripts now require explicit password configuration!**

Run the seed script to create sample data:

```bash
cd server
npm run seed
```

This will create:
- 1 Admin user: `admin@venusconsultancy.com` (password from `SEED_ADMIN_PASSWORD`)
- 1 Recruiter user: `recruiter@venusconsultancy.com` (password from `SEED_RECRUITER_PASSWORD`)
- 10 Sample job postings (no company names or salary data)

**Note:** The seed script will fail if `SEED_ADMIN_PASSWORD` and `SEED_RECRUITER_PASSWORD` are not set in your `.env` file.

### 6. Test the Application

Run the API tests to verify everything is working:

```bash
cd server
npm test
```

This will test all endpoints including login, jobs, and applications.

## Running the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Start the Production Server**:
   ```bash
   cd server
   npm start
   ```

## 🚀 Production Deployment Checklist

### Pre-Deployment Security Checks

1. **Environment Variables**:
   ```bash
   # Verify all required variables are set
   node -e "require('./server/src/config'); console.log('✅ Environment variables OK')"
   ```

2. **Security Scan**:
   ```bash
   bash scripts/scan-secrets.sh
   ```

3. **Test Application**:
   ```bash
   cd server && npm test
   cd server && npm start
   ```

### Production Environment Setup

1. **Set Environment Variables** (in your hosting platform):
   - `NODE_ENV=production`
   - `ACCESS_SECRET=<strong-random-secret>`
   - `REFRESH_SECRET=<different-strong-random-secret>`
   - `MONGO_URI=<production-database-url>`
   - `CORS_ALLOWED_ORIGINS=<your-domain>`

2. **Enable HTTPS** (required for secure cookies)

3. **Configure Firewall** (limit access to necessary ports)

4. **Set up Monitoring** (log access attempts, rate limiting)

5. **Regular Backups** (database and application state)

### Hosting Platform Examples

#### Render.com
```bash
# Set environment variables in Render dashboard
NODE_ENV=production
ACCESS_SECRET=<your-secret>
REFRESH_SECRET=<your-secret>
MONGO_URI=<your-mongodb-atlas-url>
CORS_ALLOWED_ORIGINS=https://your-app.onrender.com
```

#### Heroku
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set ACCESS_SECRET=<your-secret>
heroku config:set REFRESH_SECRET=<your-secret>
heroku config:set MONGO_URI=<your-mongodb-atlas-url>
heroku config:set CORS_ALLOWED_ORIGINS=https://your-app.herokuapp.com
```

#### AWS/GCP/Azure
- Use environment variable configuration in your deployment platform
- Ensure HTTPS is enabled
- Configure proper firewall rules
- Set up monitoring and logging

## Usage Guide

### For Job Seekers

1. **Browse Jobs**: Visit the "Find Jobs" page to see available positions
2. **Search & Filter**: Use the search bar and filters to find relevant jobs
3. **Apply for Jobs**: Click "Apply Now" on any job card to open the application modal
4. **Submit Application**: Fill out the form with your details and upload your resume

### For Administrators

1. **Login**: Go to `/admin/login` and use admin credentials
2. **Access Dashboard**: After login, you'll be redirected to the admin dashboard
3. **Manage Jobs**: Create, edit, or delete job postings
4. **Manage Recruiters**: Create new recruiter accounts
5. **View Applications**: Monitor all job applications

### For Recruiters

1. **Login**: Go to `/admin/login` and use recruiter credentials
2. **Access Dashboard**: After login, you'll be redirected to the recruiter dashboard
3. **Review Applications**: View applications for all jobs
4. **Update Status**: Change application status and add notes
5. **Download Resumes**: Access candidate resumes securely

## API Endpoints

### Public Endpoints
- `GET /api/jobs` - Get all active jobs with filtering
- `GET /api/jobs/:id` - Get specific job details
- `POST /api/applications` - Submit job application

### Admin Endpoints (Authentication Required)
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/admin/all` - Get all jobs (including inactive)
- `POST /api/recruiters` - Create recruiter
- `PUT /api/recruiters/:id` - Update recruiter
- `DELETE /api/recruiters/:id` - Delete recruiter
- `GET /api/applications` - Get all applications
- `DELETE /api/applications/:id` - Delete application

### Recruiter Endpoints (Authentication Required)
- `GET /api/applications` - Get applications
- `GET /api/applications/job/:jobId` - Get applications for specific job
- `PUT /api/applications/:id` - Update application status and notes
- `GET /api/applications/:id/resume` - Download resume

### Authentication Endpoints
- `POST /api/auth/login` - Login (admin/recruiter)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

## File Structure

```
venus-hiring/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   └── scripts/        # Utility scripts
│   ├── uploads/            # File uploads directory
│   └── package.json
└── README.md
```

## Security Features

- **🔒 JWT Authentication**: Secure token-based authentication with fail-fast validation
- **🛡️ Password Security**: bcrypt hashing with salt rounds, no plaintext storage
- **🚫 Rate Limiting**: 200 requests per 15 minutes to prevent abuse
- **🌐 CORS Protection**: Strict origin validation with allowlist
- **🍪 Secure Cookies**: httpOnly, secure, sameSite flags for production
- **📁 File Upload Security**: Restricted file types and size limits
- **🔐 Protected Routes**: Role-based access control
- **📄 Secure File Access**: Resumes only accessible to authenticated users
- **✅ Input Validation**: Client and server-side validation
- **🔍 Security Headers**: Helmet.js for comprehensive security headers
- **🚨 Secret Scanning**: Pre-commit hooks and automated security scans
- **⚡ Environment Validation**: Fail-fast configuration validation in production

## 🚨 Security Hardening

**CRITICAL:** This repository has been security-hardened. See [SECURITY_HARDENING.md](./SECURITY_HARDENING.md) for:

- ✅ Removed dev fallback secrets
- ✅ Centralized environment configuration
- ✅ Secure seed scripts with required passwords
- ✅ Comprehensive .gitignore for secrets
- ✅ Pre-commit security hooks
- ✅ Rate limiting and CORS protection
- ✅ Secure cookie configuration

**Before deploying to production:**
1. Read [SECURITY_HARDENING.md](./SECURITY_HARDENING.md)
2. Generate new secrets: `openssl rand -base64 64`
3. Set all required environment variables
4. Run security scan: `bash scripts/scan-secrets.sh`
5. Enable HTTPS and proper firewall rules

## Data Privacy

- **No Company Names**: Job postings never display company names
- **No Salary Information**: Salary data is not collected or displayed
- **Secure File Storage**: Resumes are stored securely and only accessible to authorized users
- **Data Validation**: All user inputs are validated and sanitized

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **File Upload Issues**:
   - Check that the uploads directory exists
   - Verify file size and type restrictions

3. **Authentication Issues**:
   - Ensure JWT secrets are set in .env
   - Check that cookies are enabled in your browser

4. **CORS Issues**:
   - Verify CLIENT_ORIGIN is set correctly in .env
   - Ensure frontend and backend are running on correct ports

### Getting Help

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB is running and accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team or create an issue in the repository.

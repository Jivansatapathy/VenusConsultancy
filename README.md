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

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/venus-hiring

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Server
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

### 4. Database Setup

Make sure MongoDB is running on your system. The application will automatically connect to the database when you start the server.

### 5. Seed the Database

Run the seed script to create sample data:

```bash
cd server
npm run seed
```

This will create:
- 1 Admin user: `admin@venusconsultancy.com` / `admin123`
- 1 Recruiter user: `recruiter@venusconsultancy.com` / `recruiter123`
- 10 Sample job postings

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

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **File Upload Security**: Restricted file types and size limits
- **Protected Routes**: Role-based access control
- **Secure File Access**: Resumes only accessible to authenticated users
- **Input Validation**: Client and server-side validation

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

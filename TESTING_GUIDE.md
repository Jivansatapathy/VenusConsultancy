# Testing Guide - Venus Consultancy Platform

This guide will help you test both the frontend and backend of the application.

## Prerequisites

1. **MongoDB must be running** on your system
2. **Environment variables** must be configured (see `.env` file in `server/` directory)
3. **Dependencies installed** for both frontend and backend

## Quick Start Testing

### Step 1: Start Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:5000`

**Expected output:**
```
✅ MongoDB Connected
Server running on port 5000
```

### Step 2: Start Frontend Development Server

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

**Expected output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## Backend Testing

### 1. Test API Endpoints (Automated)

Run the automated endpoint tests:

```bash
cd server
npm test
```

This will test:
- ✅ Public jobs endpoint
- ✅ Admin login
- ✅ Recruiter login
- ✅ Protected admin endpoints
- ✅ Protected recruiter endpoints

**Expected output:**
```
🧪 Testing API Endpoints...

1. Testing GET /api/jobs (public endpoint)
✅ Jobs endpoint working. Found X jobs

2. Testing POST /api/auth/login (admin)
✅ Admin login successful

3. Testing POST /api/auth/login (recruiter)
✅ Recruiter login successful

4. Testing protected endpoint with admin token
✅ Admin protected endpoint working

5. Testing applications endpoint with recruiter token
✅ Applications endpoint working

🎉 All tests passed!
```

### 2. Test Content Endpoints (Manual)

#### Test Content Initialization

```bash
# Using curl (in a new terminal)
curl -X POST http://localhost:5000/api/content/initialize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

Or use the admin panel (see Frontend Testing section).

#### Test Content Retrieval

```bash
# Get all content
curl http://localhost:5000/api/content

# Get specific page content
curl http://localhost:5000/api/content/page/home
```

### 3. Test Database Connection

Check if MongoDB connection is working:

```bash
cd server
node -e "import('./src/config/db.js').then(m => m.default().then(() => console.log('✅ DB Connected')).catch(e => console.error('❌', e)))"
```

---

## Frontend Testing

### 1. Test Public Pages

Navigate to these URLs in your browser:

- **Home Page**: http://localhost:5173/
- **Jobs Page**: http://localhost:5173/jobs
- **About Page**: http://localhost:5173/about
- **Services Page**: http://localhost:5173/services
- **Contact Page**: http://localhost:5173/contact

**What to check:**
- ✅ Pages load without errors
- ✅ Content displays correctly
- ✅ Navigation works
- ✅ Responsive design (resize browser window)

### 2. Test Admin Panel

#### Login as Admin

1. Navigate to: http://localhost:5173/admin/login
2. Use credentials:
   - **Email**: `admin@venusconsultancy.com`
   - **Password**: (from your `SEED_ADMIN_PASSWORD` in `.env`)

**What to check:**
- ✅ Login form works
- ✅ Redirects to admin dashboard after login
- ✅ Dashboard displays all tabs

#### Test SEO Content Management

1. **Navigate to SEO Content Tab**
   - Click on "SEO Content" tab in admin dashboard

2. **Initialize Base Content** (if not already done)
   - Click "Initialize Base Content" button
   - Wait for success message
   - Page will auto-refresh

3. **Edit Content**
   - Select a page (e.g., "Home Page")
   - Select a section (e.g., "Hero Section")
   - Edit any field (e.g., change "Greeting Text")
   - Changes should save automatically to database

4. **Test Image Upload**
   - Click "Upload Image" in any image field
   - Select an image file
   - Verify image uploads and displays

5. **Verify Content Persistence**
   - Make a change
   - Refresh the page
   - Verify your changes are still there

#### Test Other Admin Features

- **Jobs Management**: Create, edit, delete jobs
- **Recruiter Management**: Create, edit, delete recruiters
- **Applications**: View and manage applications
- **Bookings**: View and update booking requests

### 3. Test Recruiter Panel

1. **Login as Recruiter**
   - Navigate to: http://localhost:5173/admin/login
   - Use credentials:
     - **Email**: `recruiter@venusconsultancy.com`
     - **Password**: (from your `SEED_RECRUITER_PASSWORD` in `.env`)

2. **Test Recruiter Features**
   - View applications
   - Update application status
   - Download resumes
   - Add notes to applications

### 4. Test Job Application Flow

1. **Browse Jobs**
   - Go to http://localhost:5173/jobs
   - Search and filter jobs

2. **Apply for a Job**
   - Click "Apply Now" on any job
   - Fill out the application form
   - Upload a resume (PDF file)
   - Submit application

3. **Verify Application**
   - Login as recruiter
   - Check if application appears in recruiter dashboard

---

## SEO Content Management Testing Checklist

### ✅ Initial Setup
- [ ] Run `npm run seed:content` in server directory
- [ ] Verify base content is in database
- [ ] Check admin panel shows "SEO Content" tab

### ✅ Content Initialization
- [ ] Click "Initialize Base Content" button
- [ ] Verify success message appears
- [ ] Verify page refreshes and content loads

### ✅ Content Editing
- [ ] Edit hero section text fields
- [ ] Edit statistics numbers
- [ ] Edit service items
- [ ] Edit talent categories
- [ ] Edit blog posts
- [ ] Edit meta tags

### ✅ Image Management
- [ ] Upload image via file picker
- [ ] Enter image URL manually
- [ ] Verify images display correctly
- [ ] Check images persist after refresh

### ✅ Content Persistence
- [ ] Make changes and refresh page
- [ ] Verify changes are saved
- [ ] Check database directly (optional)

### ✅ Multi-Page Content
- [ ] Switch between different pages
- [ ] Edit content on different pages
- [ ] Verify each page's content is independent

---

## Troubleshooting

### Backend Issues

**Problem**: Server won't start
```bash
# Check MongoDB is running
mongosh  # or mongo (older versions)

# Check environment variables
cd server
cat .env  # Verify all required variables are set
```

**Problem**: Database connection error
```bash
# Verify MongoDB URI in .env
# Default: mongodb://localhost:27017/venus-hiring

# Test connection manually
mongosh mongodb://localhost:27017/venus-hiring
```

**Problem**: Port 5000 already in use
```bash
# Change PORT in .env file
PORT=5001

# Or kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:5000 | xargs kill
```

### Frontend Issues

**Problem**: Frontend won't connect to backend
```bash
# Check backend is running on port 5000
curl http://localhost:5000/api/jobs

# Check CORS settings in server/.env
CLIENT_ORIGIN=http://localhost:5173
```

**Problem**: API calls failing
- Open browser DevTools (F12)
- Check Console for errors
- Check Network tab for failed requests
- Verify API base URL in `client/src/utils/api.js`

**Problem**: Content not loading
- Check browser console for errors
- Verify content was seeded: `npm run seed:content`
- Check if admin is logged in (required for some endpoints)

### Content Management Issues

**Problem**: "Initialize Base Content" button doesn't work
- Check you're logged in as admin
- Check browser console for errors
- Verify backend is running
- Check network tab for API errors

**Problem**: Changes not saving
- Check browser console for errors
- Verify you're logged in as admin
- Check backend logs for errors
- Verify MongoDB is running

---

## Advanced Testing

### Test with Different Browsers

Test the application in:
- Chrome/Edge
- Firefox
- Safari (if on Mac)
- Mobile browsers (responsive design)

### Test API with Postman/Insomnia

1. **Import API endpoints**
   - Base URL: `http://localhost:5000/api`
   - Use Bearer token authentication for protected routes

2. **Test Content Endpoints**
   ```
   GET    /content              - Get all content
   GET    /content/page/:page   - Get page content
   POST   /content/initialize   - Initialize base content (admin)
   POST   /content/save         - Save content (admin)
   POST   /content/save-page    - Save entire page (admin)
   POST   /content/upload-image - Upload image (admin)
   ```

### Performance Testing

```bash
# Test backend response times
cd server
npm test  # Check response times in output

# Test frontend build
cd client
npm run build
npm run preview  # Test production build locally
```

---

## Testing Checklist Summary

### Backend ✅
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] API endpoints respond correctly
- [ ] Authentication works (admin & recruiter)
- [ ] Protected routes require authentication
- [ ] Content endpoints work
- [ ] File upload works

### Frontend ✅
- [ ] Application loads in browser
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Responsive design works
- [ ] Admin login works
- [ ] Recruiter login works
- [ ] Admin dashboard functional
- [ ] SEO Content Manager works
- [ ] Content editing works
- [ ] Image upload works
- [ ] Changes persist after refresh

### Integration ✅
- [ ] Frontend connects to backend
- [ ] API calls succeed
- [ ] Authentication flow works
- [ ] Content syncs between frontend and backend
- [ ] File uploads work end-to-end

---

## Next Steps

After testing:

1. **Review logs** for any warnings or errors
2. **Fix any issues** found during testing
3. **Document** any custom configurations needed
4. **Prepare for production** deployment

For production deployment, see `README.md` for deployment instructions.


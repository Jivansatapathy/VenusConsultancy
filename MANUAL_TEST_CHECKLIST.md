# Manual Test Checklist

## Prerequisites
1. Start the backend server: `cd server && npm run dev`
2. Start the frontend: `cd client && npm run dev`
3. Seed the database: `cd server && npm run seed`

## Test Cases

### 1. Public Navigation ✅
- [ ] Open the website (http://localhost:5173)
- [ ] Verify navbar shows only: Home | Services | Find Jobs | About Us | Contact Us
- [ ] Confirm NO "Shortlist" or "Venus Recruits" links are visible

### 2. Find Jobs Page ✅
- [ ] Navigate to "Find Jobs" page
- [ ] Verify at least 10 job cards are displayed
- [ ] Confirm job cards show: title, location, type, department, description, tags
- [ ] Verify NO company names or salary information is displayed
- [ ] Test search functionality with keywords
- [ ] Test filters (type, location, department, tags)
- [ ] Test pagination if more than 10 jobs exist

### 3. Job Application Modal ✅
- [ ] Click "Apply Now" on any job card
- [ ] Verify modal opens with form fields:
  - [ ] Name (required)
  - [ ] Email (required with validation)
  - [ ] Phone (optional)
  - [ ] Cover Message (optional, 1000 char limit)
  - [ ] Resume upload (required, PDF/DOC/DOCX, max 5MB)
- [ ] Test form validation:
  - [ ] Try submitting without required fields
  - [ ] Try invalid email format
  - [ ] Try cover message over 1000 characters
  - [ ] Try uploading invalid file type
  - [ ] Try uploading file over 5MB
- [ ] Submit valid application and verify success message

### 4. Admin Login & Dashboard ✅
- [ ] Navigate to login page (/admin/login)
- [ ] Verify login form is styled with project theme
- [ ] Login with admin credentials: admin@venusconsultancy.com / admin123
- [ ] Verify redirect to /admin/dashboard
- [ ] Test admin dashboard features:
  - [ ] View jobs tab (create, edit, delete jobs)
  - [ ] View recruiters tab (create, edit, delete recruiters)
  - [ ] View applications tab (view and delete applications)

### 5. Recruiter Login & Dashboard ✅
- [ ] Logout from admin account
- [ ] Login with recruiter credentials: recruiter@venusconsultancy.com / recruiter123
- [ ] Verify redirect to /recruiter/dashboard
- [ ] Test recruiter dashboard features:
  - [ ] View applications with filters
  - [ ] Update application status (new, shortlisted, rejected)
  - [ ] Add notes to applications
  - [ ] Download resumes (secure access only)

### 6. Security & Access Control ✅
- [ ] Verify resume files are only accessible when logged in
- [ ] Try accessing /admin/dashboard without login (should redirect)
- [ ] Try accessing /recruiter/dashboard without login (should redirect)
- [ ] Verify admin can access recruiter dashboard
- [ ] Verify recruiter cannot access admin-only features

### 7. API Endpoints ✅
Run the test script: `cd server && npm test`
- [ ] Verify all API tests pass
- [ ] Check console output for successful responses

## Expected Results

### Database Verification
```bash
# Check users exist
cd server && node -e "
import mongoose from 'mongoose';
import Admin from './src/models/Admin.js';
import Recruiter from './src/models/Recruiter.js';
import Job from './src/models/Job.js';

await mongoose.connect('mongodb://localhost:27017/venus-hiring');
const admins = await Admin.find();
const recruiters = await Recruiter.find();
const jobs = await Job.find({isActive: true});

console.log('Admins:', admins.length);
console.log('Recruiters:', recruiters.length);
console.log('Active Jobs:', jobs.length);
process.exit(0);
"
```

### API Response Verification
```bash
# Test jobs endpoint
curl http://localhost:5000/api/jobs/ | jq '.jobs | length'

# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@venusconsultancy.com","password":"admin123"}' | jq '.user.role'
```

## Success Criteria
- [ ] All manual tests pass
- [ ] No console errors in browser
- [ ] No server errors in terminal
- [ ] All API endpoints return expected responses
- [ ] Login works for both admin and recruiter
- [ ] Jobs are visible and filterable
- [ ] Applications can be submitted successfully
- [ ] File uploads work correctly
- [ ] Security restrictions are enforced

## Notes
- Test credentials are displayed on the login page
- All styling should match the existing project theme
- No company names or salary data should be visible anywhere
- Shortlist functionality is only available in admin/recruiter dashboards

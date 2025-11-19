# 🔧 Fix 401 Login Error

## Problem
Getting 401 error when trying to login: "invalid password"

## Root Cause
The password was being **double-hashed**:
1. Once in the route handler: `bcrypt.hash(password, 10)`
2. Again in the Admin model pre-save hook: `AdminSchema.pre("save")`

This means the stored password is hashed twice, so comparison always fails.

## Fix Applied
Removed manual password hashing from the registration route. The pre-save hook in the Admin model will handle hashing automatically.

## Steps to Fix

### 1. Redeploy Backend
```powershell
cd server
gcloud run deploy venus-backend --source . --region asia-south1 --platform managed --allow-unauthenticated --port 8080 --memory 512Mi --cpu 1 --clear-base-image
```

### 2. Delete Existing Admin (Double-Hashed)
You need to delete the existing admin account that has the double-hashed password. You can do this via MongoDB or create a script.

### 3. Create New Admin
After redeploying, create a new admin:
```powershell
.\create-admin.ps1 -Email "admin@venushiring.com" -Password "Admin123!"
```

## Alternative: Reset Password Script

If you want to keep the same email, you can create a script to reset the password directly in MongoDB, or delete and recreate the admin.

---

**After redeploying and recreating the admin, login should work!** ✅


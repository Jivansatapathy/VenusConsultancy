# 🔐 Admin Login Credentials

## Default Admin Accounts

Based on the seed scripts, there are two possible admin accounts:

### Option 1: Main Admin Account (Most Likely)
**Email:** `admin@venusconsultancy.com`  
**Password:** `admin123`

This is created by `seedData.js` using the `SEED_ADMIN_PASSWORD` from `env.yaml`.

### Option 2: Alternative Admin Account
**Email:** `admin@venus.com`  
**Password:** `Admin@123`

This is created by `seedAdmin.js` (simpler seed script).

## 🔍 How to Check Which Account Exists

### Method 1: Try Logging In
1. Go to `/admin/login` on your frontend
2. Try `admin@venusconsultancy.com` with password `admin123` first
3. If that doesn't work, try `admin@venus.com` with password `Admin@123`

### Method 2: Check MongoDB
If you have access to MongoDB, check the `admins` collection:
```javascript
db.admins.find({}, {email: 1, name: 1})
```

### Method 3: Create New Admin
If neither works, you can create a new admin via the API:

```powershell
# Register new admin
$body = @{
    email = "admin@venushiring.com"
    password = "YourSecurePassword123!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://venus-backend-841304788329.asia-south1.run.app/api/admin/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

## 🚀 Quick Login

**Most likely credentials:**
- **Email:** `admin@venusconsultancy.com`
- **Password:** `admin123`

## 📝 Notes

- Passwords are hashed in the database (you can't see the plain password)
- The password from `env.yaml` (`admin123`) is what you use to login
- If you changed `SEED_ADMIN_PASSWORD` in `env.yaml`, use that password instead

## 🔒 Security Recommendation

**Important:** Change the default password after first login!

1. Login with default credentials
2. Go to admin settings (if available)
3. Change password to a strong, unique password

---

**Try logging in with: `admin@venusconsultancy.com` / `admin123`** ✅


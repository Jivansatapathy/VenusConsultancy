# 🔧 CORS Fix for venushiring.com

## ✅ Issue Fixed

Updated CORS configuration to allow requests from `venushiring.com` (both with and without www).

## 📝 Changes Made

### Updated `env.yaml`:
```yaml
CORS_ALLOWED_ORIGINS: "https://venushiring.com,https://www.venushiring.com,https://venus-consultancy.vercel.app,http://localhost:3000,http://localhost:5173"
```

**Key changes:**
- ✅ Added `https://www.venushiring.com` (with www)
- ✅ Kept `https://venushiring.com` (without www)
- ✅ Removed old Render URL (`venusconsultancy.onrender.com`)

## 🚀 Apply the Fix

### Option 1: Using PowerShell Script (Easiest)

```powershell
cd server
.\fix-cors.ps1
```

### Option 2: Manual Update

```powershell
cd server
gcloud run services update venus-hiring-api `
    --env-vars-file env.yaml `
    --region asia-south1
```

## ✅ Verify the Fix

### 1. Check Backend Logs

After updating, check the logs to see CORS requests:

```powershell
gcloud run services logs read venus-hiring-api --region asia-south1 --limit 20
```

Look for:
```
[CORS] Request from origin: https://venushiring.com
[CORS] Origin allowed: https://venushiring.com
```

### 2. Test from Browser

1. Open `https://venushiring.com` in your browser
2. Open DevTools (F12) → Console tab
3. Check for CORS errors
4. Should see no CORS errors now ✅

### 3. Check Network Tab

1. Open DevTools (F12) → Network tab
2. Make an API request
3. Check the response headers
4. Should see: `Access-Control-Allow-Origin: https://venushiring.com`

## 🔍 Troubleshooting

### Still getting CORS errors?

1. **Check the exact origin**:
   - Open browser console
   - Look at the CORS error message
   - It will show the exact origin being rejected
   - Make sure that exact origin is in `CORS_ALLOWED_ORIGINS`

2. **Check for trailing slashes**:
   - Some browsers send `https://venushiring.com/` (with trailing slash)
   - The backend expects `https://venushiring.com` (without trailing slash)
   - The CORS check is exact match, so make sure origins match exactly

3. **Check backend logs**:
   ```powershell
   gcloud run services logs read venus-hiring-api --region asia-south1 --limit 50 | Select-String "CORS"
   ```
   - Look for `[CORS] Request from origin:` to see what origin is being sent
   - Look for `[CORS] Origin rejected:` to see what's being rejected

4. **Verify environment variables**:
   ```powershell
   gcloud run services describe venus-hiring-api --region asia-south1 --format "value(spec.template.spec.containers[0].env)" | Select-String "CORS"
   ```

### Common Issues

**Issue 1: Origin with trailing slash**
- Browser sends: `https://venushiring.com/`
- Backend expects: `https://venushiring.com`
- **Solution**: Make sure your frontend doesn't add trailing slashes to the origin

**Issue 2: www vs non-www**
- Browser might redirect from `www.venushiring.com` to `venushiring.com`
- **Solution**: Both are now in the allowed list ✅

**Issue 3: HTTP vs HTTPS**
- Make sure you're using `https://` not `http://`
- **Solution**: All origins in the list use `https://` ✅

## 📋 Current CORS Configuration

Allowed origins:
- ✅ `https://venushiring.com`
- ✅ `https://www.venushiring.com`
- ✅ `https://venus-consultancy.vercel.app`
- ✅ `http://localhost:3000` (development)
- ✅ `http://localhost:5173` (development)

## 🎯 Next Steps

1. ✅ Update Cloud Run service with new CORS config
2. ✅ Test from venushiring.com
3. ✅ Verify no CORS errors in browser console
4. ✅ Check backend logs for CORS activity

---

**After updating, CORS errors from venushiring.com should be resolved!** ✅


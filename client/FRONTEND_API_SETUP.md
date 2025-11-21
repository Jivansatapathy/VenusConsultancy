# 🌐 Frontend API Configuration Guide

Your backend is deployed at: **https://venus-backend-841304788329.asia-south1.run.app**

## ✅ Configuration Complete

The frontend is now configured to use your Cloud Run backend. Here's what was set up:

### Files Updated:
1. ✅ `client/.env` - Local development environment
2. ✅ `client/.env.production` - Production build environment
3. ✅ `client/env.example` - Template file updated
4. ✅ `client/src/utils/api.js` - Added Cloud Run URL to fallback list

## 🚀 How It Works

The frontend uses the `VITE_API_URL` environment variable to determine the API base URL:

- **Development**: Uses `http://localhost:5000` (or value from `.env`)
- **Production**: Uses value from `VITE_API_URL` environment variable

### API Base URL Structure:
```
VITE_API_URL: https://venus-backend-841304788329.asia-south1.run.app
Final API Base: https://venus-backend-841304788329.asia-south1.run.app/api
```

All API calls will go to: `https://venus-backend-841304788329.asia-south1.run.app/api/*`

## 📝 For Local Development

The `.env` file is already configured. Just run:

```bash
cd client
npm run dev
```

The frontend will automatically use the Cloud Run backend.

## 🌍 For Production Deployment

### Option 1: Vercel (Recommended)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://venus-backend-841304788329.asia-south1.run.app`
   - **Environment**: Production, Preview, Development
4. Redeploy your application

### Option 2: Netlify

1. Go to your Netlify site settings
2. Navigate to **Environment variables**
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://venus-backend-841304788329.asia-south1.run.app`
4. Redeploy your site

### Option 3: Other Platforms

Set the environment variable `VITE_API_URL` to:
```
https://venus-backend-841304788329.asia-south1.run.app
```

## 🔍 Verify Configuration

### Check in Browser Console

Open your frontend app and check the browser console. You should see:

```
[API] Runtime API URL: https://venus-backend-841304788329.asia-south1.run.app
[API] Final API Base: https://venus-backend-841304788329.asia-south1.run.app/api
```

### Test API Connection

Open browser console and run:

```javascript
// Test if API is reachable
fetch('https://venus-backend-841304788329.asia-south1.run.app/api/health/health')
  .then(r => r.json())
  .then(data => console.log('✅ API Connected:', data))
  .catch(err => console.error('❌ API Error:', err));
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "production",
  "timestamp": "...",
  "uptime": 123.45,
  "version": "1.0.0"
}
```

## 🔧 Troubleshooting

### API calls failing?

1. **Check CORS**: Make sure your backend has your frontend URL in `CORS_ALLOWED_ORIGINS`
   ```yaml
   # In server/env.yaml
   CORS_ALLOWED_ORIGINS: "https://your-frontend-domain.com,https://www.your-frontend-domain.com"
   ```

2. **Check Environment Variable**: Verify `VITE_API_URL` is set correctly
   ```bash
   # In your deployment platform, check environment variables
   echo $VITE_API_URL
   ```

3. **Check Network Tab**: Open browser DevTools → Network tab
   - Look for API requests
   - Check if they're going to the correct URL
   - Check for CORS errors

4. **Check Backend Logs**:
   ```powershell
   gcloud run services logs read venus-hiring-api --region asia-south1
   ```

### Still using old API URL?

1. **Clear browser cache**
2. **Rebuild the frontend**:
   ```bash
   cd client
   npm run build
   ```
3. **Redeploy** your frontend

## 📋 Quick Reference

### Backend URL:
```
https://venus-backend-841304788329.asia-south1.run.app
```

### API Base URL:
```
https://venus-backend-841304788329.asia-south1.run.app/api
```

### Environment Variable:
```env
VITE_API_URL=https://venus-backend-841304788329.asia-south1.run.app
```

## ✅ Checklist

- [x] `.env` file created with Cloud Run URL
- [x] `.env.production` file created
- [x] `env.example` updated
- [x] `api.js` updated with Cloud Run URL in fallback list
- [ ] Set `VITE_API_URL` in your deployment platform (Vercel/Netlify)
- [ ] Update backend CORS to allow your frontend domain
- [ ] Test API connection
- [ ] Deploy frontend

---

**🎉 Your frontend is now configured to use the Cloud Run backend!**


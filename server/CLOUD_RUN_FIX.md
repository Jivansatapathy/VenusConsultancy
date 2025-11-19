# 🔧 Cloud Run Deployment Fix

## Issue
The container failed to start and listen on port 8080 within the timeout period.

## Root Causes Fixed

### 1. ✅ PORT Environment Variable
- **Problem:** Config required PORT in production, but Cloud Run sets it automatically
- **Fix:** Removed PORT from required environment variables

### 2. ✅ MongoDB Connection Blocking Startup
- **Problem:** App waited for MongoDB connection before starting server, causing timeout
- **Fix:** Made DB connection non-blocking - server starts immediately, DB connects in background

### 3. ✅ Startup Timeout
- **Problem:** App took too long to start
- **Fix:** Server now starts listening immediately, even if DB connection is pending

## Changes Made

1. **config/index.js**
   - Removed `PORT` from required environment variables
   - Cloud Run automatically sets `PORT=8080`

2. **app.js**
   - Server starts immediately (non-blocking)
   - MongoDB connection happens in background
   - Better logging for Cloud Run

3. **config/db.js**
   - Increased connection timeout for Cloud Run
   - Don't exit process if DB connection fails in production
   - Automatic retry mechanism

4. **Dockerfile**
   - Removed healthcheck (Cloud Run handles this)

## Deployment Command

```powershell
gcloud run deploy venus-hiring-api `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --timeout 300 `
    --set-env-vars "NODE_ENV=production,MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

## Important Notes

1. **Environment Variables Required:**
   - `MONGO_URI` - MongoDB connection string
   - `ACCESS_SECRET` - JWT access token secret
   - `REFRESH_SECRET` - JWT refresh token secret
   - `CLIENT_ORIGIN` - Frontend URL
   - `CORS_ALLOWED_ORIGINS` - Frontend URL (comma-separated if multiple)
   - `NODE_ENV=production` - Already set in Dockerfile

2. **PORT is Automatic:**
   - Cloud Run sets `PORT=8080` automatically
   - Don't set PORT in environment variables

3. **MongoDB Connection:**
   - Server starts even if MongoDB connection is pending
   - Connection retries automatically
   - Make sure MongoDB Atlas allows Cloud Run IPs (use `0.0.0.0/0` for testing)

## Testing After Deployment

```powershell
# Get service URL
$url = gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'

# Test health endpoint
Invoke-WebRequest -Uri "$url/api/health/health"
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "uptime": 123.45,
  "environment": "production",
  "version": "1.0.0"
}
```

## Troubleshooting

### Still getting timeout?
1. Check logs: `gcloud run services logs read venus-hiring-api --region us-central1`
2. Verify environment variables are set correctly
3. Check MongoDB connection string is valid
4. Ensure MongoDB Atlas allows all IPs (`0.0.0.0/0`)

### MongoDB connection issues?
- Server will start even if DB fails
- Check logs for MongoDB connection errors
- Verify MONGO_URI is correct
- Check MongoDB Atlas network access settings

### Port issues?
- Cloud Run sets PORT automatically
- Don't override PORT in environment variables
- App listens on `0.0.0.0:PORT` (correct for Cloud Run)


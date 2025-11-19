# 🔧 Fix 404 Error on /api/content Endpoint

## Problem
The backend is returning 404 for `/api/content` endpoint, even though:
- ✅ Health endpoint works: `/api/health/health` returns 200
- ✅ Route is registered in `app.js`: `app.use("/api/content", contentRoutes)`
- ✅ Content routes file exists and exports properly

## Root Cause
The backend deployed on Cloud Run doesn't have the latest code with the content routes.

## Solution: Redeploy Backend

### Step 1: Deploy Updated Backend

```powershell
cd server
gcloud run deploy venus-hiring-api `
    --source . `
    --region asia-south1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1
```

### Step 2: Verify Deployment

After deployment, test the endpoint:

```powershell
# Test health endpoint
Invoke-WebRequest -Uri "https://venus-backend-841304788329.asia-south1.run.app/api/health/health"

# Test content endpoint
Invoke-WebRequest -Uri "https://venus-backend-841304788329.asia-south1.run.app/api/content"
```

Expected:
- Health: Status 200 ✅
- Content: Status 200 ✅ (or 200 with empty data if no content)

### Step 3: Update Environment Variables (if needed)

If you haven't updated environment variables yet:

```powershell
gcloud run services update venus-hiring-api `
    --env-vars-file env.yaml `
    --region asia-south1
```

## Verification

After redeploying, the test should show:
- ✅ Backend connection: Should work
- ✅ Content loaded from backend: Should work
- ✅ Content save to backend: Should work (when authenticated)

## Quick Deploy Script

You can also use the deployment script:

```powershell
cd server
.\deploy-cloud-run.ps1
```

Or the CORS fix script (which also updates env vars):

```powershell
cd server
.\fix-cors.ps1
```

## Troubleshooting

### Still getting 404 after deployment?

1. **Check if route is registered:**
   - Verify `app.use("/api/content", contentRoutes)` is in `app.js`
   - Check that `contentRoutes.js` exports the router properly

2. **Check backend logs:**
   ```powershell
   gcloud run services logs read venus-hiring-api --region asia-south1 --limit 50
   ```
   Look for route registration messages

3. **Verify file structure:**
   - Make sure `server/src/routes/contentRoutes.js` exists
   - Make sure it's imported in `server/src/app.js`

4. **Check deployment:**
   - Verify the deployment completed successfully
   - Check if there were any build errors

---

**After redeploying, the 404 error should be resolved!** ✅


# 🔄 Update Cloud Run Environment Variables

Your backend is deployed at: **https://venus-backend-841304788329.asia-south1.run.app**

Currently showing `"environment":"development"` - we need to update it to production.

## 📝 Step 1: Edit env.yaml

1. Open `server/env.yaml`
2. Replace all placeholder values with your actual values:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `ACCESS_SECRET` - Strong random secret (generate one)
   - `REFRESH_SECRET` - Strong random secret (generate one)
   - `CLIENT_ORIGIN` - Your frontend URL
   - `CORS_ALLOWED_ORIGINS` - Your frontend URL(s)
   - Email settings (if using email service)

## 🔑 Step 2: Generate Secrets (if needed)

Generate strong secrets using PowerShell:

```powershell
# Generate ACCESS_SECRET
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))

# Generate REFRESH_SECRET
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

Or using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 Step 3: Update Cloud Run Service

### Option A: Using env.yaml file (Recommended)

```powershell
cd server

# Update the service with environment variables from env.yaml
gcloud run services update venus-hiring-api `
    --env-vars-file env.yaml `
    --region asia-south1
```

### Option B: Using --set-env-vars flag

```powershell
gcloud run services update venus-hiring-api `
    --region asia-south1 `
    --set-env-vars "NODE_ENV=production,MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

### Option C: Update via Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **Cloud Run** → **venus-hiring-api**
3. Click **Edit & Deploy New Revision**
4. Go to **Variables & Secrets** tab
5. Add/Update environment variables
6. Click **Deploy**

## ✅ Step 4: Verify Update

After updating, test the service:

```powershell
# Test health endpoint
Invoke-WebRequest -Uri "https://venus-backend-841304788329.asia-south1.run.app/api/health/health"
```

Expected response should show:
```json
{
  "status": "healthy",
  "environment": "production",  // ✅ Should be "production" now
  ...
}
```

## 📋 Required Environment Variables

**Minimum required for production:**
- ✅ `NODE_ENV=production`
- ✅ `MONGO_URI` - MongoDB connection string
- ✅ `ACCESS_SECRET` - JWT access token secret
- ✅ `REFRESH_SECRET` - JWT refresh token secret
- ✅ `CLIENT_ORIGIN` - Frontend URL
- ✅ `CORS_ALLOWED_ORIGINS` - Frontend URL(s)

## 🔍 Check Current Environment Variables

```powershell
gcloud run services describe venus-hiring-api `
    --region asia-south1 `
    --format "value(spec.template.spec.containers[0].env)"
```

## 📊 View Logs

```powershell
gcloud run services logs read venus-hiring-api --region asia-south1 --limit 50
```

## 🎯 Quick Update Command

If you've already filled in `env.yaml`:

```powershell
cd server
gcloud run services update venus-hiring-api --env-vars-file env.yaml --region asia-south1
```

## ⚠️ Important Notes

1. **NODE_ENV must be "production"** - Currently showing as "development"
2. **Secrets must be strong** - Don't use default/example values
3. **MongoDB Atlas** - Make sure your MongoDB allows Cloud Run IPs (use `0.0.0.0/0` for testing)
4. **CORS** - Update with your actual frontend URL
5. **No PORT variable** - Cloud Run sets PORT automatically (8080)

## 🆘 Troubleshooting

### Service not updating?
- Check if you're in the correct project: `gcloud config get-value project`
- Verify service name: `gcloud run services list --region asia-south1`

### Still showing "development"?
- Make sure `NODE_ENV=production` is set in env.yaml
- Check logs: `gcloud run services logs read venus-hiring-api --region asia-south1`

### MongoDB connection issues?
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas Network Access allows all IPs (`0.0.0.0/0`)

---

**After updating, your service should show `"environment":"production"` ✅**


# 🚀 Deploy Backend to Google Cloud Run - Step by Step

This guide will help you deploy the Venus Hiring backend API to Google Cloud Run.

## 📋 Prerequisites

1. **Google Cloud Account** - [Sign up here](https://cloud.google.com)
2. **Google Cloud SDK** - [Install for Windows](https://cloud.google.com/sdk/docs/install-sdk#windows)
3. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas) (or use existing MongoDB)

## 🔧 Step 1: Install Google Cloud SDK (Windows)

If you haven't installed gcloud CLI:

1. Download the [Google Cloud SDK installer](https://cloud.google.com/sdk/docs/install-sdk#windows)
2. Run the installer
3. Restart PowerShell/Command Prompt
4. Verify installation:
   ```powershell
   gcloud --version
   ```

## 🔐 Step 2: Login and Setup Project

```powershell
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create venus-hiring-api --name="Venus Hiring API"

# Set the project as active
gcloud config set project venus-hiring-api

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

**Note:** If project creation fails (project ID might be taken), use a unique ID:
```powershell
gcloud projects create venus-hiring-api-2025 --name="Venus Hiring API"
gcloud config set project venus-hiring-api-2025
```

## 🗄️ Step 3: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (or use existing)
3. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
4. **Important:** In Network Access, allow all IPs (`0.0.0.0/0`) or add Cloud Run IPs

## 🔑 Step 4: Prepare Environment Variables

You'll need these environment variables. Keep them ready:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/venus-hiring?retryWrites=true&w=majority
ACCESS_SECRET=your-super-secret-access-key-here
REFRESH_SECRET=your-super-secret-refresh-key-here
CLIENT_ORIGIN=https://your-frontend-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
NODE_ENV=production
PORT=8080
```

**Generate secrets:**
```powershell
# Generate random secrets (run in PowerShell)
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes([System.Guid]::NewGuid().ToString() + [System.Guid]::NewGuid().ToString()))
```

Or use Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 Step 5: Deploy to Cloud Run

### Option A: Using PowerShell Script (Easiest)

```powershell
cd server
.\DEPLOY_WINDOWS.ps1
```

The script will:
- Check if gcloud is installed
- Login if needed
- Create/select project
- Enable APIs
- Deploy to Cloud Run

### Option B: Manual Deployment (PowerShell)

```powershell
cd server

gcloud run deploy venus-hiring-api `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --timeout 300 `
    --set-env-vars "NODE_ENV=production"
```

**Note:** Use backticks (`) for line continuation in PowerShell.

### Option C: Using Cloud Build (CI/CD)

```powershell
gcloud builds submit --config cloudbuild.yaml
```

## ⚙️ Step 6: Set Environment Variables

After deployment, set your environment variables:

```powershell
gcloud run services update venus-hiring-api `
    --region us-central1 `
    --set-env-vars "MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-access-secret,REFRESH_SECRET=your-refresh-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

**Replace:**
- `your-mongo-uri` with your MongoDB Atlas connection string
- `your-access-secret` with your generated secret
- `your-refresh-secret` with your generated secret
- `https://your-frontend.com` with your frontend URL

**Example:**
```powershell
gcloud run services update venus-hiring-api `
    --region us-central1 `
    --set-env-vars "MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/venus-hiring,ACCESS_SECRET=abc123...,REFRESH_SECRET=xyz789...,CLIENT_ORIGIN=https://venusconsultancy.com,CORS_ALLOWED_ORIGINS=https://venusconsultancy.com"
```

## 🌐 Step 7: Get Service URL

```powershell
gcloud run services describe venus-hiring-api `
    --region us-central1 `
    --format 'value(status.url)'
```

This will output something like:
```
https://venus-hiring-api-xxxxx-uc.a.run.app
```

## ✅ Step 8: Test Deployment

```powershell
# Test health endpoint
curl https://your-service-url.run.app/api/health/health
```

Or in PowerShell:
```powershell
Invoke-WebRequest -Uri "https://your-service-url.run.app/api/health/health"
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-19T...",
  "uptime": 123.45,
  "environment": "production",
  "version": "1.0.0"
}
```

## 🔄 Step 9: Update Frontend

Update your frontend `.env` or `.env.production`:

```env
VITE_API_URL=https://venus-hiring-api-xxxxx-uc.a.run.app
```

Or in your frontend code, update the API base URL.

## 📊 Step 10: Monitor Deployment

### View Logs
```powershell
gcloud run services logs read venus-hiring-api --region us-central1
```

### Check Service Status
```powershell
gcloud run services describe venus-hiring-api --region us-central1
```

### View in Console
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to "Cloud Run"
3. Click on `venus-hiring-api`
4. View logs, metrics, and settings

## 🔧 Common Issues & Solutions

### Issue 1: "Project not found"
**Solution:**
```powershell
gcloud projects list
gcloud config set project YOUR_PROJECT_ID
```

### Issue 2: "Permission denied"
**Solution:**
```powershell
gcloud auth login
gcloud auth application-default login
```

### Issue 3: "API not enabled"
**Solution:**
```powershell
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Issue 4: "MongoDB connection failed"
**Solution:**
- Check MongoDB Atlas Network Access (allow `0.0.0.0/0` for testing)
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas connection string format

### Issue 5: "CORS errors"
**Solution:**
- Update `CLIENT_ORIGIN` and `CORS_ALLOWED_ORIGINS` with your frontend URL
- Ensure no trailing slashes in URLs

### Issue 6: "Port already in use"
**Solution:**
- Cloud Run automatically handles ports
- Ensure your app listens on `process.env.PORT` (already configured)

## 💰 Cost Estimation

**Free Tier:**
- 2 million requests/month
- 360,000 GB-seconds
- 180,000 vCPU-seconds

**After Free Tier:**
- ~$0.40 per million requests
- $0.0000025 per GB-second
- $0.0000100 per vCPU-second

**Estimated monthly cost for small app:** $5-20/month

## 🎯 Next Steps

1. ✅ Set up custom domain (optional)
2. ✅ Configure Cloud Storage for file uploads (recommended)
3. ✅ Set up monitoring and alerts
4. ✅ Configure CI/CD pipeline
5. ✅ Set up backup strategy for MongoDB

## 📝 Quick Reference Commands

```powershell
# Deploy
gcloud run deploy venus-hiring-api --source . --region us-central1 --allow-unauthenticated

# Update environment variables
gcloud run services update venus-hiring-api --region us-central1 --set-env-vars "KEY=value"

# View logs
gcloud run services logs read venus-hiring-api --region us-central1

# Get service URL
gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'

# Delete service
gcloud run services delete venus-hiring-api --region us-central1
```

## 🆘 Need Help?

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Troubleshooting Guide](https://cloud.google.com/run/docs/troubleshooting)

---

**🎉 Congratulations! Your backend is now deployed to Google Cloud Run!**


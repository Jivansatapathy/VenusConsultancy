# Complete Windows Deployment Guide

## Step 1: Install Google Cloud SDK

### Option A: Download Installer (Recommended)
1. Visit: **https://cloud.google.com/sdk/docs/install-sdk#windows**
2. Download the **Windows installer** (`.exe` file)
3. Run the installer and follow the prompts
4. **Important**: Restart PowerShell after installation

### Option B: Using winget (Windows 10/11)
```powershell
winget install Google.CloudSDK
```

### Option C: Using Chocolatey (if installed)
```powershell
choco install gcloudsdk
```

### Verify Installation
```powershell
gcloud --version
```

## Step 2: Authenticate

```powershell
gcloud auth login
```

This will open a browser window for you to sign in with your Google account.

## Step 3: Create/Select Project

```powershell
# Create a new project
gcloud projects create venus-hiring-api --name="Venus Hiring API"

# Set it as active
gcloud config set project venus-hiring-api
```

Or use an existing project:
```powershell
gcloud config set project YOUR_EXISTING_PROJECT_ID
```

## Step 4: Enable Required APIs

```powershell
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Step 5: Deploy (Choose One Method)

### Method 1: Use PowerShell Script (Easiest)

```powershell
cd server
.\DEPLOY_WINDOWS.ps1
```

### Method 2: Manual Deployment

```powershell
cd server
gcloud run deploy venus-hiring-api `
    --source . `
    --region us-central1 `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1
```

**Note**: In PowerShell, use backticks (`) for line continuation, not backslashes.

## Step 6: Set Environment Variables

After deployment, configure your environment variables:

```powershell
gcloud run services update venus-hiring-api `
    --region us-central1 `
    --set-env-vars "MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

Replace:
- `your-mongo-uri` with your MongoDB Atlas connection string
- `your-secret` with your JWT secrets
- `https://your-frontend.com` with your frontend URL

## Step 7: Get Your Service URL

```powershell
gcloud run services describe venus-hiring-api `
    --region us-central1 `
    --format 'value(status.url)'
```

## Step 8: Test Deployment

```powershell
# Get the URL first
$url = gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'

# Test health endpoint
Invoke-WebRequest -Uri "$url/api/health/health"
```

Or use curl if available:
```powershell
curl https://your-service-url.run.app/api/health/health
```

## Troubleshooting

### "gcloud is not recognized"
- Restart PowerShell after installation
- Check if `C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin` is in your PATH
- Reinstall if needed

### "Permission denied" errors
- Make sure you're logged in: `gcloud auth login`
- Check you have the right project: `gcloud config get-value project`
- Verify billing is enabled for your project

### Deployment fails
- Check logs: `gcloud run services logs read venus-hiring-api --region us-central1`
- Ensure all environment variables are set
- Verify MongoDB connection string is correct

## Quick Reference

```powershell
# Login
gcloud auth login

# Set project
gcloud config set project venus-hiring-api

# Deploy
cd server
gcloud run deploy venus-hiring-api --source . --region us-central1 --platform managed --allow-unauthenticated --port 8080

# View logs
gcloud run services logs read venus-hiring-api --region us-central1

# Update environment variables
gcloud run services update venus-hiring-api --region us-central1 --set-env-vars "KEY=value"

# Get service URL
gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'
```


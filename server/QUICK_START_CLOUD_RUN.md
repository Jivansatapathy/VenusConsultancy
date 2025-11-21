# ⚡ Quick Start: Deploy to Google Cloud Run

## 🚀 Fastest Way (3 Steps)

### 1. Install & Login
```powershell
# Install Google Cloud SDK (if not installed)
# Download from: https://cloud.google.com/sdk/docs/install-sdk#windows

# Login
gcloud auth login

# Create/Select project
gcloud projects create venus-hiring-api --name="Venus Hiring API"
gcloud config set project venus-hiring-api
```

### 2. Deploy
```powershell
cd server
.\deploy-cloud-run.ps1
```

Or manually:
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

### 3. Set Environment Variables
```powershell
gcloud run services update venus-hiring-api `
    --region us-central1 `
    --set-env-vars "MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

## ✅ Done!

Get your service URL:
```powershell
gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'
```

Test it:
```powershell
curl https://your-service-url.run.app/api/health/health
```

---

**For detailed instructions, see [DEPLOY_TO_CLOUD_RUN.md](./DEPLOY_TO_CLOUD_RUN.md)**


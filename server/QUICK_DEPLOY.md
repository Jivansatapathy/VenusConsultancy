# Quick Deploy to Google Cloud Run

## Prerequisites
1. Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. Login: `gcloud auth login`
3. Create/select project: `gcloud config set project YOUR_PROJECT_ID`

## Windows PowerShell Deployment

### Option 1: Use PowerShell Script (Easiest)
```powershell
cd server
.\DEPLOY_WINDOWS.ps1
```

### Option 2: Manual Deployment (PowerShell)
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

**Note**: In PowerShell, use backticks (`) for line continuation.

## Linux/Mac Deployment

```bash
cd server
chmod +x deploy.sh
./deploy.sh
```

Or manually:

```bash
cd server
gcloud run deploy venus-hiring-api \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1
```

## Set Environment Variables

After deployment, set your environment variables:

```bash
gcloud run services update venus-hiring-api \
  --region us-central1 \
  --set-env-vars "MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

## Get Service URL

```bash
gcloud run services describe venus-hiring-api \
  --region us-central1 \
  --format 'value(status.url)'
```

## Test

```bash
curl https://your-service-url.run.app/api/health/health
```

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)


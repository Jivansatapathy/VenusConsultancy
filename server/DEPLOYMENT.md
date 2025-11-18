# Google Cloud Run Deployment Guide

This guide will help you deploy the Venus Hiring backend API to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account** - Sign up at [cloud.google.com](https://cloud.google.com)
2. **Google Cloud SDK (gcloud)** - Install from [cloud.google.com/sdk](https://cloud.google.com/sdk/docs/install)
3. **Docker** - Install from [docker.com](https://www.docker.com/get-started)
4. **Node.js** - For local testing

## Step 1: Set Up Google Cloud Project

```bash
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

## Step 2: Configure Environment Variables

Create a `.env` file in the `server` directory with all required variables:

```env
# Required
ACCESS_SECRET=your-super-secret-access-key-here
REFRESH_SECRET=your-super-secret-refresh-key-here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/venus-hiring?retryWrites=true&w=majority
PORT=8080
NODE_ENV=production

# CORS - Update with your frontend URL
CLIENT_ORIGIN=https://your-frontend-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Seed Data (if needed)
SEED_ADMIN_PASSWORD=your-secure-admin-password
SEED_RECRUITER_PASSWORD=your-secure-recruiter-password

# Email Configuration (if using email service)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Step 3: Set Up MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGO_URI` in your `.env` file
5. Whitelist Cloud Run IPs (or use 0.0.0.0/0 for development)

## Step 4: Build and Deploy

### Option A: Deploy using gcloud CLI (Recommended)

```bash
# Navigate to server directory
cd server

# Build and deploy to Cloud Run
gcloud run deploy venus-hiring-api \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-access-secret,REFRESH_SECRET=your-refresh-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

### Option B: Deploy using Docker

```bash
# Navigate to server directory
cd server

# Build Docker image
docker build -t gcr.io/venus-hiring-api/venus-hiring-api:latest .

# Tag for Container Registry
docker tag gcr.io/venus-hiring-api/venus-hiring-api:latest gcr.io/venus-hiring-api/venus-hiring-api:latest

# Push to Container Registry
docker push gcr.io/venus-hiring-api/venus-hiring-api:latest

# Deploy to Cloud Run
gcloud run deploy venus-hiring-api \
  --image gcr.io/venus-hiring-api/venus-hiring-api:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars "NODE_ENV=production,MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-access-secret,REFRESH_SECRET=your-refresh-secret"
```

### Option C: Deploy using Cloud Build (CI/CD)

```bash
# Submit build to Cloud Build
gcloud builds submit --config cloudbuild.yaml

# This will automatically build, push, and deploy
```

## Step 5: Set Environment Variables in Cloud Run

After deployment, set environment variables:

```bash
gcloud run services update venus-hiring-api \
  --region us-central1 \
  --set-env-vars "MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-access-secret,REFRESH_SECRET=your-refresh-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com"
```

Or use the Cloud Console:
1. Go to Cloud Run in Google Cloud Console
2. Click on your service
3. Click "Edit & Deploy New Revision"
4. Go to "Variables & Secrets" tab
5. Add all environment variables
6. Click "Deploy"

## Step 6: Configure CORS

Update your frontend to use the Cloud Run URL:

```javascript
// In client/.env or client/.env.production
VITE_API_URL=https://venus-hiring-api-xxxxx-uc.a.run.app
```

## Step 7: Test Deployment

```bash
# Get the service URL
gcloud run services describe venus-hiring-api --region us-central1 --format 'value(status.url)'

# Test health endpoint
curl https://your-service-url.run.app/api/health/health
```

## Important Notes

### File Storage
- Cloud Run is stateless - files uploaded to `uploads/` will be lost when container restarts
- **Solution**: Use Cloud Storage for file uploads instead of local filesystem
- Update `contentRoutes.js` and `applicationRoutes.js` to use Cloud Storage

### Persistent Storage Options
1. **Google Cloud Storage** - For resume and image uploads
2. **Cloud SQL** - If you need persistent file storage
3. **Firebase Storage** - Alternative for file storage

### Memory and CPU
- Default: 512Mi memory, 1 CPU
- Adjust based on your needs:
  ```bash
  gcloud run services update venus-hiring-api \
    --memory 1Gi \
    --cpu 2 \
    --region us-central1
  ```

### Custom Domain
```bash
# Map custom domain
gcloud run domain-mappings create \
  --service venus-hiring-api \
  --domain api.yourdomain.com \
  --region us-central1
```

## Troubleshooting

### View Logs
```bash
gcloud run services logs read venus-hiring-api --region us-central1
```

### Check Service Status
```bash
gcloud run services describe venus-hiring-api --region us-central1
```

### Common Issues

1. **Port not exposed**: Ensure app listens on `0.0.0.0` and uses `process.env.PORT`
2. **CORS errors**: Update `CORS_ALLOWED_ORIGINS` with your frontend URL
3. **Database connection**: Ensure MongoDB Atlas allows Cloud Run IPs
4. **File uploads fail**: Implement Cloud Storage for persistent file storage

## Cost Estimation

- **Free Tier**: 2 million requests/month, 360,000 GB-seconds, 180,000 vCPU-seconds
- **After Free Tier**: ~$0.40 per million requests, $0.0000025 per GB-second

## Next Steps

1. Set up Cloud Storage for file uploads
2. Configure custom domain
3. Set up monitoring and alerts
4. Configure CI/CD pipeline
5. Set up backup strategy for MongoDB


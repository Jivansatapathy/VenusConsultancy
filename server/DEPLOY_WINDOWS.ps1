# PowerShell Deployment Script for Google Cloud Run
# Run this script after installing Google Cloud SDK

Write-Host "🚀 Venus Hiring API - Google Cloud Run Deployment" -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is installed
try {
    $gcloudVersion = gcloud --version 2>&1
    Write-Host "✅ Google Cloud SDK found" -ForegroundColor Green
} catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Google Cloud SDK first:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://cloud.google.com/sdk/docs/install-sdk#windows" -ForegroundColor Yellow
    Write-Host "2. Download and run the Windows installer" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell after installation" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Check if user is logged in
Write-Host "Checking authentication status..." -ForegroundColor Cyan
$authStatus = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>&1

if (-not $authStatus) {
    Write-Host "⚠️  Not logged in. Starting login process..." -ForegroundColor Yellow
    gcloud auth login
} else {
    Write-Host "✅ Logged in as: $authStatus" -ForegroundColor Green
}

# Get or create project
Write-Host ""
Write-Host "Project Configuration:" -ForegroundColor Cyan
$currentProject = gcloud config get-value project 2>&1

if (-not $currentProject -or $currentProject -match "unset") {
    Write-Host "No project set. Creating new project..." -ForegroundColor Yellow
    $projectId = Read-Host "Enter project ID (e.g., venus-hiring-api)"
    
    # Try to create project
    gcloud projects create $projectId --name="Venus Hiring API" 2>&1 | Out-Null
    
    # Set as active project
    gcloud config set project $projectId
    Write-Host "✅ Project created and set: $projectId" -ForegroundColor Green
} else {
    Write-Host "Current project: $currentProject" -ForegroundColor Green
    $useCurrent = Read-Host "Use this project? (Y/n)"
    if ($useCurrent -eq "n" -or $useCurrent -eq "N") {
        $projectId = Read-Host "Enter project ID"
        gcloud config set project $projectId
    } else {
        $projectId = $currentProject
    }
}

# Enable required APIs
Write-Host ""
Write-Host "Enabling required APIs..." -ForegroundColor Cyan
gcloud services enable cloudbuild.googleapis.com --project=$projectId 2>&1 | Out-Null
gcloud services enable run.googleapis.com --project=$projectId 2>&1 | Out-Null
gcloud services enable containerregistry.googleapis.com --project=$projectId 2>&1 | Out-Null
Write-Host "✅ APIs enabled" -ForegroundColor Green

# Navigate to server directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Deploy to Cloud Run
Write-Host ""
Write-Host "Deploying to Cloud Run..." -ForegroundColor Cyan
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

$serviceName = "venus-hiring-api"
$region = "us-central1"

gcloud run deploy $serviceName `
    --source . `
    --region $region `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --timeout 300

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    
    # Get service URL
    $serviceUrl = gcloud run services describe $serviceName --region $region --format 'value(status.url)' 2>&1
    
    Write-Host "🌐 Service URL: $serviceUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Set environment variables:" -ForegroundColor White
    Write-Host "   gcloud run services update $serviceName --region $region --set-env-vars 'MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Test the deployment:" -ForegroundColor White
    Write-Host "   curl $serviceUrl/api/health/health" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Check the error messages above." -ForegroundColor Red
    exit 1
}


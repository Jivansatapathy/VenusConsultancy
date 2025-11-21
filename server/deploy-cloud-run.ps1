# PowerShell Script for Google Cloud Run Deployment
# This script automates the deployment process

param(
    [string]$ProjectId = "",
    [string]$Region = "us-central1",
    [string]$ServiceName = "venus-hiring-api"
)

Write-Host "🚀 Venus Hiring API - Google Cloud Run Deployment" -ForegroundColor Cyan
Write-Host ""

# Check if gcloud is installed
try {
    $gcloudVersion = gcloud --version 2>&1 | Select-Object -First 1
    Write-Host "✅ Google Cloud SDK found: $gcloudVersion" -ForegroundColor Green
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
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login failed. Please try again." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Logged in as: $authStatus" -ForegroundColor Green
}

# Get or set project
Write-Host ""
Write-Host "Project Configuration:" -ForegroundColor Cyan
$currentProject = gcloud config get-value project 2>&1

if ($ProjectId) {
    # Use provided project ID
    gcloud config set project $ProjectId
    $projectId = $ProjectId
    Write-Host "✅ Using project: $projectId" -ForegroundColor Green
} elseif (-not $currentProject -or $currentProject -match "unset") {
    Write-Host "No project set." -ForegroundColor Yellow
    $projectId = Read-Host "Enter project ID (e.g., venus-hiring-api)"
    
    # Try to set project (create if needed)
    gcloud config set project $projectId 2>&1 | Out-Null
    
    # Check if project exists, if not offer to create
    $projectExists = gcloud projects describe $projectId 2>&1
    if ($LASTEXITCODE -ne 0) {
        $create = Read-Host "Project doesn't exist. Create it? (Y/n)"
        if ($create -ne "n" -and $create -ne "N") {
            gcloud projects create $projectId --name="Venus Hiring API" 2>&1 | Out-Null
            Write-Host "✅ Project created: $projectId" -ForegroundColor Green
        } else {
            Write-Host "❌ Please create the project first or use an existing project ID" -ForegroundColor Red
            exit 1
        }
    }
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

# Check if .env file exists (for reference)
if (Test-Path ".env") {
    Write-Host ""
    Write-Host "⚠️  Found .env file. Make sure to set environment variables in Cloud Run after deployment." -ForegroundColor Yellow
}

# Deploy to Cloud Run
Write-Host ""
Write-Host "Deploying to Cloud Run..." -ForegroundColor Cyan
Write-Host "Service: $ServiceName" -ForegroundColor White
Write-Host "Region: $Region" -ForegroundColor White
Write-Host "This may take 3-5 minutes..." -ForegroundColor Yellow
Write-Host ""

gcloud run deploy $ServiceName `
    --source . `
    --region $Region `
    --platform managed `
    --allow-unauthenticated `
    --port 8080 `
    --memory 512Mi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --timeout 300 `
    --set-env-vars "NODE_ENV=production"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    
    # Get service URL
    $serviceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)' 2>&1
    
    Write-Host "🌐 Service URL: $serviceUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Set environment variables (REQUIRED):" -ForegroundColor White
    Write-Host "   gcloud run services update $ServiceName --region $Region --set-env-vars 'MONGO_URI=your-mongo-uri,ACCESS_SECRET=your-secret,REFRESH_SECRET=your-secret,CLIENT_ORIGIN=https://your-frontend.com,CORS_ALLOWED_ORIGINS=https://your-frontend.com'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Test the deployment:" -ForegroundColor White
    Write-Host "   curl $serviceUrl/api/health/health" -ForegroundColor Gray
    Write-Host "   Or: Invoke-WebRequest -Uri `"$serviceUrl/api/health/health`"" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Update frontend .env:" -ForegroundColor White
    Write-Host "   VITE_API_URL=$serviceUrl" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. View logs:" -ForegroundColor White
    Write-Host "   gcloud run services logs read $ServiceName --region $Region" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed. Check the error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- Check if you're logged in: gcloud auth login" -ForegroundColor White
    Write-Host "- Check if APIs are enabled: gcloud services list --enabled" -ForegroundColor White
    Write-Host "- Check project permissions" -ForegroundColor White
    Write-Host ""
    exit 1
}


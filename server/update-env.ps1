# PowerShell Script to Update Cloud Run Environment Variables
# This script helps you update environment variables for your Cloud Run service

param(
    [string]$ServiceName = "venus-hiring-api",
    [string]$Region = "asia-south1",
    [string]$EnvFile = "env.yaml"
)

Write-Host "🔄 Cloud Run Environment Variables Update" -ForegroundColor Cyan
Write-Host ""

# Check if env.yaml exists
if (-not (Test-Path $EnvFile)) {
    Write-Host "❌ Error: $EnvFile not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create $EnvFile first:" -ForegroundColor Yellow
    Write-Host "1. Copy env.example to env.yaml" -ForegroundColor White
    Write-Host "2. Fill in your actual values" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Check if gcloud is installed
try {
    $gcloudVersion = gcloud --version 2>&1 | Select-Object -First 1
    Write-Host "✅ Google Cloud SDK found: $gcloudVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    Write-Host "Please install Google Cloud SDK first." -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
Write-Host "Checking authentication..." -ForegroundColor Cyan
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

# Get current project
$project = gcloud config get-value project 2>&1
Write-Host "📦 Project: $project" -ForegroundColor Cyan
Write-Host "🌍 Region: $Region" -ForegroundColor Cyan
Write-Host "📝 Service: $ServiceName" -ForegroundColor Cyan
Write-Host ""

# Show current environment variables
Write-Host "Current environment variables:" -ForegroundColor Yellow
gcloud run services describe $ServiceName --region $Region --format "value(spec.template.spec.containers[0].env)" 2>&1 | Out-String
Write-Host ""

# Confirm update
$confirm = Read-Host "Do you want to update environment variables from $EnvFile? (Y/n)"
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "❌ Update cancelled." -ForegroundColor Yellow
    exit 0
}

# Update service
Write-Host ""
Write-Host "🔄 Updating environment variables..." -ForegroundColor Cyan
Write-Host "This may take a minute..." -ForegroundColor Yellow
Write-Host ""

gcloud run services update $ServiceName `
    --env-vars-file $EnvFile `
    --region $Region

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Environment variables updated successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Get service URL
    $serviceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)' 2>&1
    
    Write-Host "🌐 Service URL: $serviceUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Test the service:" -ForegroundColor White
    Write-Host "   Invoke-WebRequest -Uri `"$serviceUrl/api/health/health`"" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Check logs:" -ForegroundColor White
    Write-Host "   gcloud run services logs read $ServiceName --region $Region" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Verify environment:" -ForegroundColor White
    Write-Host "   The health endpoint should show `"environment`": `"production`"" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Update failed. Check the error messages above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "- Check if env.yaml format is correct (YAML syntax)" -ForegroundColor White
    Write-Host "- Verify all required values are filled in" -ForegroundColor White
    Write-Host "- Check if service name and region are correct" -ForegroundColor White
    Write-Host ""
    exit 1
}


# PowerShell Script to Fix CORS for venushiring.com
# This script updates the Cloud Run service with correct CORS configuration

param(
    [string]$ServiceName = "venus-hiring-api",
    [string]$Region = "asia-south1"
)

Write-Host "🔧 Fixing CORS Configuration for venushiring.com" -ForegroundColor Cyan
Write-Host ""

# Check if env.yaml exists
if (-not (Test-Path "env.yaml")) {
    Write-Host "❌ Error: env.yaml not found!" -ForegroundColor Red
    Write-Host "Please make sure you're in the server directory." -ForegroundColor Yellow
    exit 1
}

# Check if gcloud is installed
try {
    $gcloudVersion = gcloud --version 2>&1 | Select-Object -First 1
    Write-Host "✅ Google Cloud SDK found" -ForegroundColor Green
} catch {
    Write-Host "❌ Google Cloud SDK not found!" -ForegroundColor Red
    exit 1
}

# Check authentication
Write-Host "Checking authentication..." -ForegroundColor Cyan
$authStatus = gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>&1

if (-not $authStatus) {
    Write-Host "⚠️  Not logged in. Starting login..." -ForegroundColor Yellow
    gcloud auth login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Login failed." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Logged in as: $authStatus" -ForegroundColor Green
}

# Show current CORS configuration
Write-Host ""
Write-Host "Current CORS configuration:" -ForegroundColor Yellow
$currentCors = gcloud run services describe $ServiceName --region $Region --format "value(spec.template.spec.containers[0].env)" 2>&1 | Select-String "CORS_ALLOWED_ORIGINS"
if ($currentCors) {
    Write-Host $currentCors -ForegroundColor Gray
} else {
    Write-Host "  (Not found in current config)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "New CORS configuration:" -ForegroundColor Yellow
Write-Host "  - https://venushiring.com" -ForegroundColor White
Write-Host "  - https://www.venushiring.com" -ForegroundColor White
Write-Host "  - https://venus-consultancy.vercel.app" -ForegroundColor White
Write-Host "  - http://localhost:3000" -ForegroundColor White
Write-Host "  - http://localhost:5173" -ForegroundColor White
Write-Host ""

# Confirm update
$confirm = Read-Host "Update Cloud Run service with new CORS configuration? (Y/n)"
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "❌ Update cancelled." -ForegroundColor Yellow
    exit 0
}

# Update service
Write-Host ""
Write-Host "🔄 Updating Cloud Run service..." -ForegroundColor Cyan
Write-Host "This may take a minute..." -ForegroundColor Yellow
Write-Host ""

gcloud run services update $ServiceName `
    --env-vars-file env.yaml `
    --region $Region

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ CORS configuration updated successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Get service URL
    $serviceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)' 2>&1
    
    Write-Host "🌐 Service URL: $serviceUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Test CORS from venushiring.com:" -ForegroundColor White
    Write-Host "   Open browser console on venushiring.com and check for CORS errors" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Check backend logs:" -ForegroundColor White
    Write-Host "   gcloud run services logs read $ServiceName --region $Region --limit 20" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Verify CORS headers:" -ForegroundColor White
    Write-Host "   Check Network tab in browser DevTools for Access-Control-Allow-Origin header" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Update failed. Check the error messages above." -ForegroundColor Red
    exit 1
}


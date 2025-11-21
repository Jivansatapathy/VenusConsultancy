# Venus Hiring - Server Status Check
Write-Host "🔍 Checking Venus Hiring Server Status..." -ForegroundColor Cyan
Write-Host ""

# Check Backend (Port 5000)
Write-Host "📡 Backend Server (Port 5000):" -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5000" -TimeoutSec 5
    if ($backendResponse.StatusCode -eq 200) {
        Write-Host "   ✅ RUNNING - API is responding" -ForegroundColor Green
        $backendData = $backendResponse.Content | ConvertFrom-Json
        Write-Host "   📊 Environment: $($backendData.environment)" -ForegroundColor Gray
        Write-Host "   🕐 Timestamp: $($backendData.timestamp)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ NOT RUNNING - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check Frontend (Port 5173)
Write-Host "🌐 Frontend Server (Port 5173):" -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 5
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "   ✅ RUNNING - React app is serving" -ForegroundColor Green
        Write-Host "   📊 Content-Type: $($frontendResponse.Headers.'Content-Type')" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ❌ NOT RUNNING - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Check API Endpoint
Write-Host "🔐 API Authentication Test:" -ForegroundColor Yellow
try {
    $apiResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/bookings" -TimeoutSec 5
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "   ✅ WORKING - Authentication middleware is active" -ForegroundColor Green
        Write-Host "   🔒 Protected endpoint correctly requires authentication" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠️  Unexpected response: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎯 Access URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "   API Docs: http://localhost:5000/api/" -ForegroundColor White

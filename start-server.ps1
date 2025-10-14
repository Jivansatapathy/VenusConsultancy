# start-server.ps1 - Script to properly start the server
Write-Host "🛑 Stopping any existing Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "⏳ Waiting for processes to stop..." -ForegroundColor Yellow
Start-Sleep 2

Write-Host "🚀 Starting server in development mode..." -ForegroundColor Green
Set-Location server
npm run dev

# stop-server.ps1 - Script to stop all server processes
Write-Host "🛑 Stopping all Node.js processes..." -ForegroundColor Red
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "✅ All server processes stopped!" -ForegroundColor Green

# PowerShell Script to Delete Admin Account
param(
    [string]$Email = "admin@venushiring.com"
)

Write-Host "🗑️  Delete Admin Account" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will delete the admin account!" -ForegroundColor Yellow
Write-Host "  Email: $Email" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Are you sure you want to delete this admin? (yes/no)"
if ($confirm -ne "yes") {
    Write-Host "❌ Cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "💡 Note: This requires direct MongoDB access or a delete endpoint." -ForegroundColor Cyan
Write-Host "   Since we don't have a delete endpoint, you'll need to:" -ForegroundColor White
Write-Host "   1. Access MongoDB directly, OR" -ForegroundColor White
Write-Host "   2. Use a different email when creating new admin" -ForegroundColor White
Write-Host ""
Write-Host "📝 To create admin with different email:" -ForegroundColor Cyan
Write-Host '   .\create-admin.ps1 -Email "admin2@venushiring.com" -Password "Admin123!"' -ForegroundColor Yellow


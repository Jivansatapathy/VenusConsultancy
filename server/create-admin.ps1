# PowerShell Script to Create New Admin Account
param(
    [string]$Email = "",
    [string]$Password = ""
)

Write-Host "🔐 Create New Admin Account" -ForegroundColor Cyan
Write-Host ""

if (-not $Email) {
    $Email = Read-Host "Enter admin email"
}

if (-not $Password) {
    $securePassword = Read-Host "Enter admin password" -AsSecureString
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
    $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

# Get name from email if not provided
$Name = if ($Email) { $Email.Split('@')[0] } else { "Admin User" }
$Name = $Name.Substring(0,1).ToUpper() + $Name.Substring(1) + " Admin"

Write-Host ""
Write-Host "Creating admin account..." -ForegroundColor Yellow
Write-Host "  Name: $Name" -ForegroundColor Gray
Write-Host "  Email: $Email" -ForegroundColor Gray

$body = @{
    name = $Name
    email = $Email
    password = $Password
} | ConvertTo-Json

$uri = "https://venus-backend-841304788329.asia-south1.run.app/api/admin/register"

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host ""
    Write-Host "✅ Admin created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Login Credentials:" -ForegroundColor Cyan
    Write-Host "  Email: $Email" -ForegroundColor White
    Write-Host "  Password: [the password you entered]" -ForegroundColor White
    Write-Host ""
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
}
catch {
    Write-Host ""
    Write-Host "❌ Error creating admin:" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $responseBody = $reader.ReadToEnd()
        $reader.Close()
        $stream.Close()
        
        Write-Host "  Status: $statusCode" -ForegroundColor Yellow
        Write-Host "  Response: $responseBody" -ForegroundColor Yellow
        
        if ($statusCode -eq 400 -and $responseBody -like "*already exists*") {
            Write-Host ""
            Write-Host "💡 This admin email already exists. Try a different email." -ForegroundColor Cyan
        }
    }
    else {
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    exit 1
}

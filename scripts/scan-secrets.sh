#!/bin/bash

# Venus Hiring Platform - Secret Scanning Script
# This script scans the codebase for potential secrets and security issues

echo "🔍 Starting security scan for Venus Hiring Platform..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "server" ] && [ ! -d "client" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Create reports directory
mkdir -p reports

echo ""
echo "1. Scanning for .env files..."
echo "-----------------------------"

# Check for .env files
ENV_FILES=$(find . -name ".env" -not -path "./node_modules/*" -not -path "./.git/*" 2>/dev/null)
if [ -n "$ENV_FILES" ]; then
    print_error "Found .env files that should not be committed:"
    echo "$ENV_FILES"
    echo ""
    print_warning "Please ensure .env files are in .gitignore and never committed"
else
    print_status "No .env files found in repository"
fi

echo ""
echo "2. Scanning for hardcoded secrets..."
echo "-----------------------------------"

# Common secret patterns
SECRET_PATTERNS=(
    "ACCESS_SECRET.*=.*[\"'][^\"']*[\"']"
    "REFRESH_SECRET.*=.*[\"'][^\"']*[\"']"
    "MONGO_URI.*=.*[\"'][^\"']*[\"']"
    "password.*=.*[\"'][^\"']*[\"']"
    "secret.*=.*[\"'][^\"']*[\"']"
    "key.*=.*[\"'][^\"']*[\"']"
    "token.*=.*[\"'][^\"']*[\"']"
    "api_key.*=.*[\"'][^\"']*[\"']"
    "private_key.*=.*[\"'][^\"']*[\"']"
    "BEGIN.*PRIVATE.*KEY"
    "BEGIN.*RSA.*PRIVATE.*KEY"
    "AKIA[0-9A-Z]{16}"
    "aws_secret_access_key"
    "dev_access_secret_change_me"
    "dev_refresh_secret_change_me"
    "admin123"
    "recruiter123"
    "password123"
    "123456"
)

SECRETS_FOUND=false

for pattern in "${SECRET_PATTERNS[@]}"; do
    # Search for patterns, excluding node_modules, .git, and reports
    MATCHES=$(grep -r -i -E "$pattern" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=reports --exclude="*.log" 2>/dev/null || true)
    
    if [ -n "$MATCHES" ]; then
        SECRETS_FOUND=true
        print_error "Potential secret found with pattern: $pattern"
        echo "$MATCHES" | while read -r line; do
            echo "  $line"
        done
        echo ""
    fi
done

if [ "$SECRETS_FOUND" = false ]; then
    print_status "No hardcoded secrets found"
fi

echo ""
echo "3. Checking for dev fallback secrets..."
echo "--------------------------------------"

# Check for dev fallback patterns
DEV_FALLBACKS=$(grep -r -i "dev.*secret.*change.*me\|fallback.*secret\|default.*secret" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=reports 2>/dev/null || true)

if [ -n "$DEV_FALLBACKS" ]; then
    print_error "Found dev fallback secrets:"
    echo "$DEV_FALLBACKS"
    echo ""
    print_warning "These should be removed in production code"
else
    print_status "No dev fallback secrets found"
fi

echo ""
echo "4. Checking .gitignore for secret patterns..."
echo "---------------------------------------------"

if [ -f ".gitignore" ]; then
    if grep -q "\.env" .gitignore; then
        print_status ".env files are properly ignored"
    else
        print_error ".env files are NOT in .gitignore"
    fi
    
    if grep -q "\.pem\|\.key\|\.p12\|\.pfx" .gitignore; then
        print_status "Secret file patterns are properly ignored"
    else
        print_warning "Consider adding secret file patterns to .gitignore"
    fi
else
    print_error ".gitignore file not found"
fi

echo ""
echo "5. Checking for proper environment variable usage..."
echo "---------------------------------------------------"

# Check if config files use process.env properly
CONFIG_FILES=$(find . -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" | grep -E "(config|env)" | head -10)

if [ -n "$CONFIG_FILES" ]; then
    print_status "Found config files, checking environment variable usage..."
    for file in $CONFIG_FILES; do
        if grep -q "process\.env" "$file"; then
            print_status "✓ $file uses process.env"
        fi
    done
else
    print_warning "No config files found"
fi

echo ""
echo "6. Running gitleaks (if available)..."
echo "------------------------------------"

if command -v gitleaks &> /dev/null; then
    print_status "Running gitleaks scan..."
    gitleaks detect --source . --report-path reports/gitleaks-report.json --verbose
    if [ $? -eq 0 ]; then
        print_status "Gitleaks scan completed - no secrets found"
    else
        print_error "Gitleaks found potential secrets - check reports/gitleaks-report.json"
    fi
else
    print_warning "gitleaks not installed. Install with: go install github.com/zricethezav/gitleaks/v8@latest"
fi

echo ""
echo "7. Running trufflehog (if available)..."
echo "--------------------------------------"

if command -v trufflehog &> /dev/null; then
    print_status "Running trufflehog scan..."
    trufflehog filesystem --json . > reports/trufflehog-report.json 2>/dev/null
    if [ $? -eq 0 ]; then
        print_status "Trufflehog scan completed"
    else
        print_error "Trufflehog scan failed"
    fi
else
    print_warning "trufflehog not installed. Install with: go install github.com/trufflesecurity/trufflehog/v3@latest"
fi

echo ""
echo "=================================================="
echo "🔍 Security scan completed!"
echo ""
echo "📁 Reports saved in: reports/"
echo ""

# Summary
if [ "$SECRETS_FOUND" = true ]; then
    print_error "SECURITY ISSUES FOUND - Please review and fix before committing"
    exit 1
else
    print_status "No obvious security issues found"
    echo ""
    print_warning "Remember to:"
    echo "  - Never commit .env files"
    echo "  - Use strong, unique secrets in production"
    echo "  - Regularly rotate secrets"
    echo "  - Use environment variables for all sensitive data"
    echo "  - Enable 2FA on all accounts"
    echo "  - Review access logs regularly"
fi

echo ""
print_status "Security scan completed successfully!"

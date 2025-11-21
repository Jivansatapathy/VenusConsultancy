# Security Hardening Guide

## 🚨 CRITICAL SECURITY FIXES APPLIED

This document outlines the security vulnerabilities that were found and fixed in the Venus Hiring Platform, along with ongoing security measures.

## ⚠️ IMMEDIATE ACTIONS REQUIRED

### 1. Rotate All Secrets (CRITICAL)

**If this repository was ever public or shared, ALL secrets must be rotated immediately:**

```bash
# Generate new JWT secrets
openssl rand -base64 64  # Use this for ACCESS_SECRET
openssl rand -base64 64  # Use this for REFRESH_SECRET

# Generate new database passwords
openssl rand -base64 32  # Use this for database passwords
```

### 2. Update Environment Variables

Create a `.env` file in the `server/` directory with:

```env
# JWT Secrets (REQUIRED - generate new ones!)
ACCESS_SECRET=your-new-super-secret-access-key-here
REFRESH_SECRET=your-new-super-secret-refresh-key-here

# Database
MONGO_URI=mongodb://localhost:27017/venus-hiring

# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_ORIGIN=http://localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=200

# Seed Data Passwords (REQUIRED for seeding)
SEED_ADMIN_PASSWORD=your-secure-admin-password
SEED_RECRUITER_PASSWORD=your-secure-recruiter-password
```

## 🔒 Security Fixes Applied

### 1. JWT Secret Security
- ✅ **REMOVED** dev fallback secrets (`dev_access_secret_change_me`)
- ✅ **ADDED** fail-fast validation - app won't start without proper secrets in production
- ✅ **CENTRALIZED** configuration in `server/src/config/index.js`
- ✅ **VALIDATED** all JWT operations use proper secrets

### 2. Environment Variable Security
- ✅ **CREATED** centralized config with validation
- ✅ **ADDED** required environment variable checks for production
- ✅ **IMPLEMENTED** fail-fast behavior for missing critical variables
- ✅ **ADDED** `.env.example` template (never commit real `.env`)

### 3. Seed Script Security
- ✅ **REMOVED** hardcoded passwords (`admin123`, `recruiter123`)
- ✅ **REQUIRED** `SEED_ADMIN_PASSWORD` and `SEED_RECRUITER_PASSWORD` environment variables
- ✅ **IMPLEMENTED** bcrypt hashing before storing passwords
- ✅ **ADDED** validation to prevent seeding without proper configuration

### 4. Security Middleware
- ✅ **ADDED** Helmet.js for security headers
- ✅ **IMPLEMENTED** rate limiting (200 requests per 15 minutes)
- ✅ **CONFIGURED** strict CORS with origin allowlist
- ✅ **SECURED** cookies with httpOnly, secure, and sameSite flags
- ✅ **ADDED** request size limits (10MB)

### 5. Git Security
- ✅ **CREATED** comprehensive `.gitignore` for secrets
- ✅ **ADDED** pre-commit hook to prevent secret commits
- ✅ **CREATED** secret scanning script (`scripts/scan-secrets.sh`)
- ✅ **DOCUMENTED** security patterns to avoid

### 6. Password Security
- ✅ **VERIFIED** all passwords use bcrypt with salt rounds of 10
- ✅ **CONFIRMED** no plaintext password storage
- ✅ **IMPLEMENTED** secure password comparison methods

## 🛡️ Ongoing Security Measures

### Pre-commit Security Checks

The repository now includes a pre-commit hook that automatically:

1. **Blocks .env file commits**
2. **Scans for hardcoded secrets**
3. **Prevents secret file commits**
4. **Runs comprehensive security scans**

To enable the pre-commit hook:

```bash
# Make the hook executable
chmod +x .githooks/pre-commit

# Install the hook
git config core.hooksPath .githooks
```

### Secret Scanning

Run the security scan before any deployment:

```bash
# Run comprehensive security scan
bash scripts/scan-secrets.sh

# Install and run gitleaks
go install github.com/zricethezav/gitleaks/v8@latest
gitleaks detect --source . --report-path gitleaks-report.json

# Install and run trufflehog
go install github.com/trufflesecurity/trufflehog/v3@latest
trufflehog filesystem --json . > trufflehog-report.json
```

## 🚀 Production Deployment Checklist

### Before Deployment

1. **Environment Variables**
   ```bash
   # Verify all required variables are set
   node -e "require('./server/src/config'); console.log('✅ Environment variables OK')"
   ```

2. **Security Scan**
   ```bash
   bash scripts/scan-secrets.sh
   ```

3. **Test Application**
   ```bash
   cd server && npm test
   cd server && npm start
   ```

### Production Environment Setup

1. **Set Environment Variables** (in your hosting platform):
   - `NODE_ENV=production`
   - `ACCESS_SECRET=<strong-random-secret>`
   - `REFRESH_SECRET=<different-strong-random-secret>`
   - `MONGO_URI=<production-database-url>`
   - `CORS_ALLOWED_ORIGINS=<your-domain>`

2. **Enable HTTPS** (required for secure cookies)

3. **Configure Firewall** (limit access to necessary ports)

4. **Set up Monitoring** (log access attempts, rate limiting)

5. **Regular Backups** (database and application state)

## 🔄 Secret Rotation Process

### If Secrets Were Compromised

1. **Immediate Actions:**
   ```bash
   # Generate new secrets
   openssl rand -base64 64 > new_access_secret.txt
   openssl rand -base64 64 > new_refresh_secret.txt
   
   # Update environment variables
   # Deploy with new secrets
   # Invalidate all existing sessions
   ```

2. **Database Cleanup:**
   ```bash
   # Clear all refresh tokens
   # Force all users to re-authenticate
   ```

3. **Git History Cleanup** (if secrets were committed):
   ```bash
   # Clone repository
   git clone --mirror <repository-url>
   
   # Use BFG to remove secrets
   bfg --delete-files .env
   bfg --replace-text passwords.txt
   
   # Clean up
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   # Force push (WARNING: This rewrites history)
   git push --force
   ```

## 📋 Security Monitoring

### Regular Checks

1. **Weekly:**
   - Review access logs
   - Check for failed login attempts
   - Verify rate limiting is working

2. **Monthly:**
   - Rotate secrets
   - Update dependencies
   - Run security scans

3. **Quarterly:**
   - Security audit
   - Penetration testing
   - Review access controls

### Incident Response

1. **If breach detected:**
   - Immediately rotate all secrets
   - Invalidate all sessions
   - Notify affected users
   - Document incident
   - Implement additional monitoring

2. **Recovery steps:**
   - Deploy with new secrets
   - Monitor for suspicious activity
   - Update security measures
   - Conduct post-incident review

## 🔍 Security Testing

### Local Testing

```bash
# Test environment validation
NODE_ENV=production node -e "require('./server/src/config')"

# Test rate limiting
for i in {1..250}; do curl -X POST http://localhost:5000/api/auth/login; done

# Test CORS
curl -H "Origin: http://malicious-site.com" http://localhost:5000/api/jobs

# Test authentication
curl -H "Authorization: Bearer invalid-token" http://localhost:5000/api/admin/dashboard
```

### Production Testing

1. **Load Testing** (ensure rate limiting works under load)
2. **Security Scanning** (use tools like OWASP ZAP)
3. **Penetration Testing** (hire security professionals)
4. **Code Review** (regular security-focused reviews)

## 📞 Security Contacts

- **Security Issues:** [Create private issue or contact maintainers]
- **Emergency Response:** [Emergency contact information]
- **Security Updates:** [How to receive security notifications]

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [JWT Security Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

---

**Remember: Security is an ongoing process, not a one-time fix. Regular reviews and updates are essential.**

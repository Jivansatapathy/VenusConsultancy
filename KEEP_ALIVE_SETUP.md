# Keep-Alive Setup for Render Backend

This setup will keep your Render backend running continuously by pinging it every 10 minutes to prevent the 15-minute inactivity timeout.

## 🚀 Quick Setup

### Option 1: GitHub Actions (Recommended - Free)

1. **Set up GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Add a new secret named `RENDER_SERVER_URL`
   - Set the value to your Render backend URL (e.g., `https://your-app.onrender.com`)

2. **Enable the workflow:**
   - The workflow is already configured in `.github/workflows/keep-alive.yml`
   - It will automatically run every 12 minutes
   - You can also trigger it manually from the Actions tab

### Option 2: Local Machine

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variable:**
   ```bash
   export SERVER_URL=https://your-render-app.onrender.com
   ```

3. **Run the keep-alive script:**
   ```bash
   npm start
   ```

### Option 3: External Services

You can also use these free services to ping your server:

- **UptimeRobot** (Free tier: 50 monitors)
- **Pingdom** (Free tier: 1 monitor)
- **StatusCake** (Free tier: 10 monitors)

Set them to ping: `https://your-app.onrender.com/api/health/keepalive`

## 📊 Available Endpoints

Your backend now has these health check endpoints:

- `GET /api/health/health` - Full health check with server info
- `GET /api/health/ping` - Simple ping/pong response
- `GET /api/health/keepalive` - Lightweight keep-alive endpoint

## 🔧 Configuration

### Customize ping interval:
Edit `keep-alive.js` and change the `PING_INTERVAL` variable:
```javascript
const PING_INTERVAL = 12 * 60 * 1000; // 12 minutes
```

### Customize endpoints:
Edit the `ENDPOINTS` array in `keep-alive.js`:
```javascript
const ENDPOINTS = [
  '/api/health/keepalive',
  '/api/health/ping'
];
```

## 🚨 Important Notes

1. **Render Free Tier Limits:**
   - 750 hours per month
   - Sleeps after 15 minutes of inactivity
   - Takes ~30 seconds to wake up

2. **GitHub Actions Limits:**
   - 2,000 minutes per month for private repos
   - Unlimited for public repos
   - Each keep-alive run takes ~1 minute

3. **Cost Considerations:**
   - GitHub Actions: Free for public repos
   - External services: Usually free with limits
   - Local machine: Requires your computer to be on

## 🧪 Testing

Test your endpoints manually:
```bash
curl https://your-app.onrender.com/api/health/keepalive
curl https://your-app.onrender.com/api/health/ping
curl https://your-app.onrender.com/api/health/health
```

## 📈 Monitoring

The keep-alive script logs all activities:
- ✅ Successful pings
- ⚠️ Unexpected responses
- ❌ Failed requests
- ⏰ Timeouts

Check your GitHub Actions logs or console output to monitor the service.

## 🔄 Troubleshooting

1. **Server not responding:**
   - Check if your Render app is deployed
   - Verify the SERVER_URL is correct
   - Check Render logs for errors

2. **GitHub Actions failing:**
   - Ensure the secret `RENDER_SERVER_URL` is set
   - Check the Actions tab for error details
   - Verify the workflow file syntax

3. **Still sleeping:**
   - Reduce ping interval to 8-10 minutes
   - Add more endpoints to ping
   - Check if the endpoints are working

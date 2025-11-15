# 🚀 How to Start the Website

## Step-by-Step Instructions

### 1. Navigate to the Client Directory
```bash
cd client
```

### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Create Environment File
Create a file named `.env.local` in the `client` directory with your API URL:

```bash
# Windows PowerShell
New-Item -Path ".env.local" -ItemType File
```

Then add this content to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://venusconsultancy.onrender.com
```

Or if your backend is running locally:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
The website will be available at:
**http://localhost:3000**

## 🎯 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## ⚠️ Troubleshooting

### Port Already in Use?
If port 3000 is already in use, Next.js will automatically use the next available port (3001, 3002, etc.)

### Dependencies Not Installed?
Run `npm install` in the `client` directory.

### Environment Variables Not Working?
Make sure `.env.local` is in the `client` directory (not the root).

### API Connection Issues?
Check that your backend server is running and the `NEXT_PUBLIC_API_URL` in `.env.local` is correct.

## 📝 Notes

- The development server will automatically reload when you make changes
- Check the terminal for any errors
- The website will be available at `http://localhost:3000` (or the port shown in terminal)


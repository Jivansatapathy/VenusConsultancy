# Venus Hiring - Next.js Application

A modern recruitment platform built with **Next.js 14** and **React 19**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API URL:
```
NEXT_PUBLIC_API_URL=https://venusconsultancy.onrender.com
```

3. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
client/
├── app/                    # Next.js App Router
│   ├── layout.jsx        # Root layout with AuthProvider
│   ├── template.jsx      # Shared template (Navbar, Footer)
│   ├── page.jsx          # Home page (/)
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── services/         # Services page
│   ├── find-jobs/        # Find Jobs page
│   ├── book-call/        # Book Call page
│   ├── job-roles/        # Job Roles page
│   ├── hiring/           # Hiring pages
│   │   └── [jobRole]/    # Dynamic route
│   ├── service-category/ # Service category pages
│   │   └── [categoryKey]/ # Dynamic route
│   └── admin/            # Admin routes
│       ├── login/        # Admin login
│       ├── dashboard/    # Admin dashboard (protected)
│       └── post-job/     # Post job (protected)
├── src/
│   ├── components/       # React components
│   ├── context/          # Context providers (AuthContext)
│   ├── data/            # Data files
│   ├── utils/           # Utility functions (API)
│   └── styles/          # Global styles
├── public/              # Static assets
└── next.config.js       # Next.js configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 📄 Pages

All pages are in the `app/` directory:

1. `/` - Home
2. `/about` - About Us
3. `/contact` - Contact
4. `/services` - Services
5. `/find-jobs` - Find Jobs
6. `/book-call` - Book a Call
7. `/job-roles` - Job Roles
8. `/hiring/[jobRole]` - Dynamic hiring page
9. `/service-category/[categoryKey]` - Dynamic service category
10. `/admin/login` - Admin login
11. `/admin/dashboard` - Admin dashboard (protected)
12. `/recruiter/dashboard` - Recruiter dashboard (protected)
13. `/admin/post-job` - Post job (protected)

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

### Next.js Features

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ File-based routing
- ✅ Dynamic routes
- ✅ Protected routes
- ✅ API integration
- ✅ SEO optimized

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🎯 Features

- Modern Next.js 14 with App Router
- React 19
- Protected routes with authentication
- Dynamic routing
- Responsive design
- SEO optimized
- Server-side rendering

## 📝 Notes

- All pages use Next.js file-based routing
- Components are client components (marked with 'use client')
- Static assets are in `public/` directory
- CSS files are co-located with components

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Private - All rights reserved

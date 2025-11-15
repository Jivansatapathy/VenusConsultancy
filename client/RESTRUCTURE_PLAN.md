# Next.js Project Restructuring Plan

## Current Issues
- Mixed `src/` and root-level directories
- Components in `src/components/` instead of root `components/`
- Utilities scattered between `src/utils/` and `lib/`
- Not following Next.js best practices

## Target Structure (Next.js Best Practices)

```
client/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [routes]/          # Pages
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # React components (root level) ✨
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
├── lib/                   # All shared code
│   ├── db/                # Database (models, config)
│   │   ├── models/        # Mongoose models
│   │   └── config/        # DB config
│   ├── auth/              # Authentication
│   │   └── middleware/    # Auth middleware
│   ├── services/          # Services (email, etc.)
│   ├── utils/             # Frontend utilities ✨
│   ├── context/           # Context providers ✨
│   └── data/              # Data files ✨
├── public/                # Static assets
└── styles/                # Global styles ✨
```

## Migration Steps

1. ✅ Create `components/` directory
2. ✅ Move `src/components/` → `components/`
3. ✅ Move `src/utils/` → `lib/utils/`
4. ✅ Move `src/context/` → `lib/context/`
5. ✅ Move `src/data/` → `lib/data/`
6. ✅ Move `src/index.css` → `styles/globals.css`
7. ✅ Move `src/styles/` → `styles/`
8. ⚠️ Update all imports in:
   - `app/layout.jsx`
   - `app/client-layout.jsx`
   - All page files
   - All component files
   - All API routes

## Import Path Updates

### Before:
```jsx
import Navbar from '../src/components/Navbar';
import { AuthProvider } from '../src/context/AuthContext';
import '../src/index.css';
```

### After:
```jsx
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/lib/context/AuthContext';
import '@/styles/globals.css';
```

## Benefits

1. ✅ Follows Next.js conventions
2. ✅ Cleaner structure
3. ✅ Better IDE support with path aliases
4. ✅ Easier to navigate
5. ✅ More maintainable


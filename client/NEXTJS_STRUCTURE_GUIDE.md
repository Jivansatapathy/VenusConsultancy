# Next.js Project Structure - Best Practices

## Current Structure (Hybrid - Works but not ideal)

```
client/
├── app/              # ✅ Next.js App Router (correct)
│   ├── api/         # ✅ API routes (correct)
│   └── [pages]/     # ✅ Pages (correct)
├── src/             # ⚠️ Mixed with app/ (not ideal)
│   ├── components/  # Components
│   ├── context/     # Context providers
│   ├── data/        # Data files
│   └── utils/       # Frontend utilities
└── lib/             # ✅ Backend code (correct)
    ├── models/
    ├── middleware/
    └── services/
```

## Recommended Next.js Structure (Option 1: Root-level components)

```
client/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [routes]/          # Pages
│   ├── layout.jsx         # Root layout
│   └── page.jsx           # Home page
├── components/            # React components (root level)
│   ├── ui/                # Reusable UI components
│   └── [feature]/         # Feature-specific components
├── lib/                   # Shared code (backend + frontend utilities)
│   ├── db/                # Database (models, config)
│   ├── auth/              # Authentication
│   ├── utils/             # Utility functions
│   └── constants/         # Constants
└── public/                # Static assets
```

## Recommended Next.js Structure (Option 2: src directory)

```
client/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   └── [routes]/     # Pages
│   ├── components/        # React components
│   ├── lib/               # Shared utilities
│   └── styles/           # Global styles
├── lib/                   # Backend code (root level)
│   ├── models/
│   ├── middleware/
│   └── services/
└── public/                # Static assets
```

## Recommendation: Use Option 1 (Root-level components)

**Why?**
- ✅ Cleaner separation: `app/` for routing, `components/` for UI, `lib/` for logic
- ✅ More standard Next.js structure
- ✅ Easier to navigate
- ✅ Better for larger projects

**Migration Plan:**
1. Move `src/components/` → `components/`
2. Move `src/utils/` → `lib/utils/`
3. Move `src/context/` → `lib/context/`
4. Move `src/data/` → `lib/data/`
5. Keep `lib/` for backend code
6. Update all imports


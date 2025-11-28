# Services Page Components and Assets

This folder contains all the components, styles, data files, and images used in the Services page for use in another codebase.

## Structure

```
servicenew/
├── Services.jsx              # Main Services page component
├── Services.css              # Services page styles
├── components/
│   ├── FAQ.jsx               # FAQ component
│   ├── FAQ.css               # FAQ component styles
│   ├── ServicesSection.jsx    # Services section component
│   └── ServicesSection.css   # Services section styles
├── data/
│   ├── servicesConfig.js     # Services configuration data
│   └── jobRolesData.js       # Job roles data
└── images/
    ├── aboutus1.png          # Image used in services grid
    ├── aboutus3.png          # Image used in services grid
    └── iamge01.png          # Image used in services page
```

## Dependencies

The Services page uses:
- React
- React Router (for Link and useNavigate)
- lucide-react (for ChevronDown icon in FAQ)
- SEOContentContext (optional - can be removed if not using SEO content management)

## Image Paths

When using in another codebase, update the image paths in:
- `Services.jsx`: 
  - `/aboutus/aboutus1.png` → Update to your image path
  - `/aboutus/aboutus3.png` → Update to your image path
  - `/images/iamge01.png` → Update to your image path

- `servicesConfig.js`: 
  - Currently uses Unsplash URLs, update to your image paths if needed

## Usage

1. Copy the components to your project
2. Update import paths to match your project structure
3. Update image paths to match your public/assets folder structure
4. Install required dependencies (React, React Router, lucide-react)
5. Adjust styles as needed for your design system

## Notes

- The FAQ component is standalone and can be used independently
- ServicesSection component requires servicesConfig.js data file
- Services.jsx uses jobRolesData.js for service categories
- All CSS files are self-contained and can be customized


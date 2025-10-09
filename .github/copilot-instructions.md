# Zava Smart Sportswear - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites
- Node.js v18+ (tested with v20.19.5)
- npm 10+ (tested with v10.8.2)

### Bootstrap and Build Process
- `npm install` -- takes ~50 seconds. Dependencies install successfully.
- `npm run build` -- takes ~10 seconds. NEVER CANCEL builds - they complete quickly.
- `npm run lint` -- takes ~2 seconds. ESLint configuration is set up with typescript-eslint.
- `npm run optimize` -- takes ~1 second. Vite dependency optimization (automated).

### Development Server
- `npm run dev` -- starts Vite dev server on http://localhost:5000
- Hot reload works automatically for all React components
- Server starts in ~600ms

### Production Testing
- `npm run preview` -- serves production build on http://localhost:4173
- Requires `npm run build` to be run first

## Application Validation

### Manual Testing Requirements
ALWAYS manually validate the application after making changes:

1. **Navigate to Products section** - Click "Products" button to scroll to products grid
2. **Test contact form** - Fill in all required fields (Name, Email, Subject, Message)
3. **Check responsive navigation** - Verify navigation works across different sections
4. **Verify icons load** - Some Phosphor icons may show as "Question" placeholders during build

### Working User Scenarios
- **Navigation**: All navigation buttons work and scroll to appropriate sections
- **Product browsing**: Product cards display correctly with pricing and descriptions
- **Contact form**: Form accepts input in all fields with proper validation
- **Technology showcase**: Interactive technology sections display properly
- **Athlete testimonials**: Testimonial carousel functions correctly

## Build and Lint Details

### Build Warnings (Expected)
- Large chunk size warnings (>500KB) are normal for this application
- Icon proxy warnings show during build but don't fail the process
- Console warnings about Google Fonts and KV storage are expected in development

### Linting Status
- ESLint is configured with TypeScript support
- Current codebase has minor linting issues (unused variables, missing types)
- Lint errors do NOT prevent development or building
- Run `npm run lint` to see current issues

### NEVER CANCEL Commands
- `npm install` -- completes in ~50 seconds
- `npm run build` -- completes in ~10 seconds  
- `npm run lint` -- completes in ~2 seconds

All commands complete quickly. Use standard timeouts (120 seconds max).

## Technology Stack and Structure

### Core Technologies
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6.3.6
- **Styling**: Tailwind CSS 4.1.11 + GitHub Spark UI components
- **Icons**: Phosphor Icons (with proxy plugin)
- **Animations**: Framer Motion 12.6.2
- **Forms**: React Hook Form with Zod validation

### Key Directories
```
src/
├── components/           # Main application components
│   ├── Hero.tsx         # Landing page hero section
│   ├── Products.tsx     # Product showcase grid
│   ├── Technology.tsx   # Technology feature section
│   ├── Athletes.tsx     # Athlete testimonials
│   ├── About.tsx        # Company information
│   ├── Contact.tsx      # Contact form
│   └── ui/              # 45+ reusable UI components (Radix UI based)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── styles/              # CSS and theme files
```

### Configuration Files
- `vite.config.ts` - Vite build configuration with React and Tailwind plugins
- `tsconfig.json` - TypeScript configuration for ES2020 target
- `tailwind.config.js` - Tailwind CSS with custom theme variables
- `eslint.config.js` - ESLint v9 configuration for TypeScript and React
- `package.json` - Dependencies and npm scripts

## Common Development Tasks

### Making Component Changes
- All components are in `src/components/`
- UI components use GitHub Spark design system
- Test changes by running `npm run dev` and validating in browser

### Styling Updates
- Tailwind CSS classes are used throughout
- Custom theme variables defined in `tailwind.config.js`
- CSS custom properties available for colors, spacing, and border radius

### Adding Dependencies
- Use `npm install <package>` to add new dependencies
- Restart dev server after adding new dependencies
- Run `npm run build` to ensure new dependencies work in production

### Icon Usage
- Phosphor Icons are available via `@phosphor-icons/react`
- Some icons may show as "Question" placeholders due to proxy plugin
- This is normal behavior and doesn't affect functionality

## Troubleshooting

### ESLint Issues
- Minor linting warnings are present but don't prevent development
- Focus on TypeScript errors over linting warnings
- ESLint config supports React 19 and modern TypeScript

### Build Issues
- Large bundle warnings are expected for this feature-rich application
- Icon proxy warnings during build are normal
- Development console errors related to external services are expected

### Development Server Issues
- Server runs on port 5000 (not the typical 5173)
- Hot reload works automatically
- Browser console may show expected errors for external API calls

## Testing
- No automated test suite is currently configured
- Manual testing is required for all changes
- Focus on user interaction scenarios listed in "Application Validation" section

## Performance Notes
- Build output is ~512KB JavaScript + ~381KB CSS (normal for this application)
- Development server starts quickly (~600ms)
- All npm commands complete within expected timeframes
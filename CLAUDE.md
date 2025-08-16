# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based educational platform for **Centrum Kształcenia Kadr Sportowych (CKKS)** - a sports training course provider. The application features course listings, instructor profiles, blog content, and registration functionality.

### Development vs Production API Configuration

The project has different API configurations for development and production:

**Development Mode:**
- **Local API**: NestJS backend expected at `http://localhost:3001` (via `start-dev.sh`)
- **Fallback API**: External API at `https://api.ckks.pl/api` (when local unavailable)
- **Development Script**: `./start-dev.sh` starts both frontend and local API from `../ckks-api`
- **Script Features**: Port checking, parallel startup, graceful shutdown with Ctrl+C

**Production Mode:**
- **Primary API**: NestJS backend at `https://api.ckks.pl` (separate application)
- **Legacy API**: External API at `https://api.ckks.pl/api` (fallback)
- **Proxy Layer**: Next.js API routes that proxy to the appropriate backend

### News/Blog Data Integration
**CRITICAL**: The homepage news section now uses blog data from `/api/blog` as there is no dedicated news endpoint. Components like `NewsTabsNew`, `NewsItem`, and `TopSwiper` have been updated to handle both old (`tytul`, `link`, `opis`) and new (`title`, `slug`, `excerpt`, `content`) API field formats with fallbacks.

**Field Mapping for News/Blog Components:**
- **Title**: `item.title || item.tytul` 
- **Link/URL**: `item.slug || item.link`
- **Content**: `item.content || item.excerpt || item.opis`
- **Image**: `item.image || item.obrazek`

### Deployment Architecture

#### Development Environment
```
Next.js Frontend (localhost:3000)
    ↓ proxy API calls via CKKS_API_URL
NestJS API (localhost:3001) - local development API
    ↓ connect to
MySQL Database (mysql42.mydevil.net)
```

**Alternative Development Setup (when local API unavailable):**
```
Next.js Frontend (localhost:3000)
    ↓ proxy API calls
External API (https://api.ckks.pl) - production API fallback
    ↓ connect to
MySQL Database (mysql42.mydevil.net)
```

#### Production Environment (MyDevil.net)
```
Next.js Frontend (https://next.ckks.pl)
    ↓ proxy API calls
NestJS API (https://api.ckks.pl) - separate application
    ↓ connect to
MySQL Database (mysql42.mydevil.net)
```

## Development Commands

### Core Development
```bash
# Start both applications (recommended for full development)
./start-dev.sh

# OR manually start each application:

# 1. Start Next.js Frontend only (connects to external API)
npm run dev

# 2. Start local API (if available in ../ckks-api)
cd ../ckks-api && npm run start:dev

# Build for production
npm run build

# Start production server on port 4000
npm run start

# Generate static export (for deployment)
npm run prod
```

### Code Quality
```bash
# Run ESLint with auto-fix (allows up to 100 warnings)
npm run lint

# Run Jest tests
npm run test

# Run Jest in watch mode  
npm run test_watch

# Run specific test file
npm test -- --testPathPattern="components.*\.test\.js"

# Run API tests (if ../ckks-api is available)
npm run test:api

# Run all tests (frontend and API)
npm run test:all
```

## Architecture & Key Patterns

### Technology Stack
- **Next.js 13.1.6** with static export capability
- **React 18.2.0** with TypeScript (gradual adoption)
- **SCSS + Tailwind CSS** hybrid styling approach
- **Axios** for API calls with custom error handling
- **Swiper.js** for carousels, **Framer Motion** for animations

### Component Organization
```
components/
├── base/           # Reusable components (Loading, ErrorMessage, etc.)
├── cards/          # Course/blog card components  
├── gallery/        # Image gallery components
├── swipers/        # Carousel components
├── start/          # Homepage-specific components
└── [feature]/      # Feature-based organization
```

### Import Aliases
The project uses path aliases for clean imports:
```typescript
import Component from '@components/path/Component';
import { Interface } from '@interfaces/Interface';
```

### API Integration Pattern
- **Primary Pattern**: API calls proxy through `/pages/api/` routes to NestJS API (`process.env.CKKS_API_URL`)
- **Fallback Pattern**: Legacy external API calls use `process.env.API` for backward compatibility
- All API proxy files use environment variables (`${process.env.CKKS_API_URL}` or `${process.env.API}`) not hardcoded URLs
- Components use relative API calls (`/api/endpoint`) which proxy to the appropriate backend
- **Always add null checks** for API data to prevent `.map()` errors during build
- **Critical**: API proxy files must use environment variables for deployment flexibility

### NestJS API Integration
- **Location**: Separate NestJS application at `https://api.ckks.pl`
- **Endpoints**: 68 fully implemented endpoints for course management
- **Database**: MySQL with TypeORM, Polish schema and naming conventions
- **Features**: Course management, applications, email system, instructor profiles
- **Development**: Frontend connects to production API via proxy routes
- **Production**: Deployed separately via Phusion Passenger on MyDevil.net

### Styling Architecture
- **Primary**: SCSS modules with `@forward` and `@use`
- **Utility**: Tailwind CSS classes
- **Component-specific**: CSS modules with `.module.css/.scss`
- **Dynamic**: Styled-components for conditional styling

### TypeScript Usage
- **Mixed codebase**: Both `.js/.jsx` and `.ts/.tsx` files
- **Interfaces**: Well-defined in `/interfaces/` directory
- **Gradual adoption**: `strict: false` allows incremental migration

## Critical Build Considerations

### Static Export Configuration
- Configured for static hosting via `output: 'export'` in `next.config.cjs`
- Image optimization disabled with custom loader (`image-loader.js`)
- Custom image loader returns src as-is for static export compatibility
- Some pages with `getServerSideProps` cannot be statically exported

### Common Build Issues
1. **API data null checks**: Always provide default arrays/objects:
   ```typescript
   const Component = ({ items = [] }) => {
     return items && items.map(item => ...)
   }
   ```

2. **String method safety**: Check for undefined before using substring/substr:
   ```typescript
   // Good
   {item.name ? item.name.substring(0, 30) : ''}
   {item.date ? `${item.date.substr(0, 10)} ${item.date.substr(11, 5)}` : ''}
   
   // Bad - will cause errors
   {item.name.substring(0, 30)}
   ```

3. **getStaticProps error handling**: Wrap API calls in try-catch with fallbacks:
   ```typescript
   export async function getStaticProps() {
     try {
       const data = await fetchData('api/endpoint');
       return { props: { data: data || [] } };
     } catch (error) {
       return { props: { data: [] } };
     }
   }
   ```

## Deployment

### Production Deployment
- **Automatic**: Push to `main` branch triggers GitHub Actions deployment to `https://next.ckks.pl`
- **Manual**: Use GitHub Actions "Deploy using deploy.sh script" workflow
- **Local**: `npm run prod` generates static files in `/out` directory

### Deployment Process
1. Build validation (tests, linting, build) 
2. **Frontend Deployment**: Deploy Next.js static export to `public_html`
3. File transfer via SSH to `ckkspl@s42.mydevil.net`
4. Server restart: `devil www restart next.ckks.pl`
5. Health check verification
6. **Note**: API deployment is separate (not included in this repository)

### Environment Variables
- `CKKS_API_URL`: Primary API URL for proxy routes
  - Development: `http://localhost:3001` (local API)
  - Production: `https://api.ckks.pl` (external API)
- `API`: Legacy external API base URL (`https://api.ckks.pl/api`) - fallback
- `NODE_ENV`: Environment setting (`development`/`production`)
- `TAILWIND_MODE`: CSS compilation mode (`watch` for development)

### Application Startup
The project consists of two applications:

1. **Next.js Frontend** (port 3000) - **This Repository**
   - Main application interface
   - Proxy routes that forward requests to API
   - Static export capability for deployment
   - Configurable API connection via environment variables

2. **NestJS API** (port 3001) - **Separate Repository** at `../ckks-api`
   - 68 endpoints for course management  
   - MySQL database connection
   - Email system and Swagger documentation
   - Can be run locally for development or uses external API

**Quick Start Options:**

**Option 1: Full Development Environment (recommended)**
```bash
# Use the provided script to start both applications
./start-dev.sh

# Check that both are running:
# - Frontend: http://localhost:3000
# - Local API: http://localhost:3001/api/course
# - API Docs: http://localhost:3001/api/docs
```

**Option 2: Frontend Only (connects to external API)**
```bash
# Start Next.js frontend only
npm run dev

# Check application:
# - Frontend: http://localhost:3000
# - API proxy: http://localhost:3000/api/course (proxies to external API)
```

## Key Architectural Decisions

### Data Flow
- No global state management (Redux/Zustand)
- Component-level state with React hooks
- Direct API calls from components with error boundaries

### Performance Optimizations
- Dynamic imports for code splitting
- Memoized fetch functions in `/components/Helpers.ts`
- Image optimization (disabled for static export)
- Lazy loading patterns

### SEO & Routing
- File-based routing with Next.js pages
- Custom redirects configured in `next.config.cjs`
- Meta tags managed via custom `<Header>` component
- Static generation where possible

## Development Notes

### Code Conventions
- **Components**: PascalCase with TypeScript interfaces
- **Files**: kebab-case for pages, PascalCase for components
- **Styling**: BEM methodology in SCSS, utility classes with Tailwind
- **API calls**: Error handling with try-catch blocks

### Testing
- Jest configuration in `jest.config.cjs`
- Test files in `__tests__/` directory
- Component testing with React Testing Library

### Linting
- ESLint configured for mixed JS/TS environment with Next.js core-web-vitals
- Auto-fix enabled with warning tolerance (max 100)
- All ESLint rules configured as warnings (not errors) to prevent build failures
- TypeScript, React Hooks, and accessibility issues show as warnings but don't block builds
- ESLint checks run during build process but won't fail due to `|| true` in script

## Common Tasks

When working with this codebase:
1. **Check interfaces** in `/interfaces/` before creating new types
2. **Use helper functions** from `/components/Helpers.ts` for common operations
3. **Follow component patterns** in existing directories
4. **Test API integrations** with proper error handling
5. **Verify static export** builds successfully before deployment
6. **Always add null safety** for string methods (substring, substr, startsWith)
7. **Use environment variables** in API proxy files, never hardcode URLs

## Critical Patterns for Bug Prevention

### Defensive Programming Required
- **All string operations**: Check for undefined before calling methods
- **All array operations**: Provide default empty arrays (`|| []`)
- **Component rendering**: Return `null` when no data instead of empty components
- **API proxy endpoints**: Always use `${process.env.CKKS_API_URL}/endpoint` pattern for NestJS API or `${process.env.API}/endpoint` for legacy API

### Recent Common Issues Fixed
- `polishLettersToLatin()` function crashes on undefined input
- Components using `.map()` on undefined arrays during build
- String `.substring()` and `.substr()` called on undefined values
- Blog image paths generating 500 errors when image field is undefined
- API proxy files using hardcoded URLs instead of environment variables
- **MyDevil Passenger Configuration**: Fixed port binding for production deployment
- **Environment Variable Migration**: Updated all API endpoints to use `CKKS_API_URL`
- **Image Optimization**: Fixed production image loading with custom loader
- **News Display**: Fixed homepage news section to use blog data as fallback

## NestJS API Reference

### Key API Endpoints
- `GET /api/course` - All courses
- `GET /api/course/running/{count}` - Running courses
- `GET /api/course/kurs/{href}` - Course by URL slug
- `GET /api/course/kurs/{href}/terms` - Course terms
- `GET /api/instructors` - All instructors
- `POST /api/application` - Course application with email
- `GET /api/blog` - Blog posts
- `GET /api/test-email` - Test email functionality

### Database Configuration
- **Host**: mysql42.mydevil.net
- **Database**: m1336_ckks
- **Schema**: Polish naming conventions (kurs, termin, kursant)
- **SSL**: Enabled for production connections
- **Charset**: UTF8MB4 for Polish characters

### Local Development Workflow
**Full Development (with local API):**
1. **Start Both Applications**: `./start-dev.sh`
2. **Test Local API**: Visit `http://localhost:3001/api/course`
3. **Test Frontend**: Visit `http://localhost:3000`
4. **API Documentation**: `http://localhost:3001/api/docs`

**Frontend Only Development:**
1. **Start Next.js**: `npm run dev`
2. **Test Integration**: Visit `http://localhost:3000/api/course` (proxies to external API)
3. **API Documentation**: `https://api.ckks.pl/docs` (external API docs)

### Production Deployment Notes
- **MyDevil.net**: Uses Phusion Passenger for process management
- **Frontend**: Deployed as static export to `next.ckks.pl`
- **API**: Separate NestJS application at `api.ckks.pl`
- **Email System**: Integrated with course applications in API
- **Health Check**: `curl https://next.ckks.pl/api/course`

## Debugging and Troubleshooting

### Common Issues and Solutions

**Build/Export Errors:**
- Always check for undefined values before using string methods (`.substring()`, `.substr()`, `.startsWith()`)
- Add null checks for array operations (use `|| []` defaults)
- Verify API data exists before rendering components

**API Connection Issues:**
- **Local Development**: Frontend :3000 connects to local API :3001 or external API fallback
- **Production**: Frontend connects to external API at api.ckks.pl
- Check `CKKS_API_URL` environment variable points to correct API
- Verify API proxy files use environment variables, not hardcoded URLs
- **Test Local API**: `curl http://localhost:3001/api/course`
- **Test External API**: `curl https://api.ckks.pl/api/course`
- **Test Proxy Routes**: `curl http://localhost:3000/api/course`

**TypeScript/JavaScript Mixed Codebase:**
- Check file extensions when creating new components (`.tsx` vs `.jsx`)
- Use existing interfaces from `/interfaces/` directory
- Follow existing patterns in similar components

**Local API Issues (when using ./start-dev.sh):**
- Ensure `../ckks-api` directory exists with NestJS application
- Check API logs in separate terminal: `cd ../ckks-api && npm run logs` (if available)
- Verify local API database connection and environment variables
- Test individual endpoints: `curl http://localhost:3001/api/course`

**External API Issues:**
- API is managed separately from this repository
- Test individual endpoints: `curl https://api.ckks.pl/api/course`
- Contact API maintainers for server-side issues

### Development Workflow Tips
```bash
# Always run lint and tests before committing
npm run lint && npm run test

# Check static export builds successfully  
npm run build && npm run prod

# Test API integration during development
curl http://localhost:3000/api/course

# For full development with local API
./start-dev.sh

# Test both local API and proxy routes
curl http://localhost:3001/api/course  # Direct local API
curl http://localhost:3000/api/course  # Via Next.js proxy
```

## Current Repository State

### What's Included
- **Next.js Frontend**: Complete application with all components, pages, and styles
- **API Proxy Routes**: Next.js API routes in `/pages/api/` that forward to external API
- **Static Assets**: Images, fonts, and public files
- **Build Configuration**: Next.js, Tailwind, TypeScript, and deployment configs
- **Tests**: Jest setup for frontend component testing
- **Custom Image Loader**: Handles static export image optimization (`image-loader.js`)

### What's Missing  
- **NestJS API Repository**: The API source code is in a separate repository at `../ckks-api`
- **Database Setup**: Local MySQL setup for development (connects to production database by default)

### Development Notes
- **Flexible API Configuration**: Can connect to local API (via `./start-dev.sh`) or external API
- **Environment-Based Routing**: All API proxy routes use environment variables for flexible deployment
- **Dual API Support**: News/blog data integration handles both old and new API response formats
- **Static Export Ready**: Custom image loader ensures static export compatibility
- **Development Script**: `./start-dev.sh` manages both frontend and API startup automatically

## Recent Changes and Fixes
- **Image Optimization**: Fixed production image loading with custom loader (`image-loader.js`)
- **News Display**: Fixed homepage news section to use blog data as fallback
- **API Integration**: Updated components to handle both old and new API field formats
- **Environment Variables**: All API proxy routes now use `CKKS_API_URL` properly
- Fixed course content display in CourseTabs component (components/CourseTabs.tsx:131, 146, 155)
- Resolved 500 errors on course API endpoints by fixing CKKS_API_URL configuration

## Additional Notes
- **News Section Note**: "news to nie jest blog" - indicating that the current news implementation might not strictly follow traditional blog formats
- kursand_id nie moze byc auto_increment
- w katalogu ckks.edu.pl jest frontend
- w katalogu ckks-api jest API
- aplikacja w katalogu ckks.edu.pl ma byc wdrozona na produkcje mydevil.net w katalogu domains/ckks.edu.pl
# Performance Optimization Changes

**Date**: 2025-01-20
**Status**: In Progress

## Changes Being Implemented

### 1. Remove GSAP (Keep Framer Motion) ✅
- GSAP is installed but not used anywhere in the codebase
- All animations currently use Framer Motion
- Will remove from package.json

### 2. Dynamic Imports for Heavy Components
- Globe component (react-globe.gl + three.js) - Already done ✅
- Will add dynamic imports for:
  - Admin dashboard components
  - Heavy section components when appropriate

### 3. Font Optimization
- Implement next/font for better font loading
- Add font-display: swap
- Preload critical fonts

### 4. Image Blur Placeholders
- Add blur placeholders to all images for better perceived performance
- Implement blur data URL generation utility

### 5. Bundle Analyzer
- Add @next/bundle-analyzer for visibility into bundle composition

## Files to Modify

1. `package.json` - Remove GSAP, add bundle analyzer
2. `next.config.ts` - Add font optimization, bundle analyzer config
3. `src/app/layout.tsx` - Add next/font
4. Image components - Add blur placeholders where needed
5. Admin components - Add dynamic imports

## Expected Improvements

- **Bundle Size**: -50KB (removing GSAP)
- **Font Loading**: -200-400ms render blocking
- **Perceived Performance**: 20-30% improvement with blur placeholders
- **Initial JS**: -200KB with better code splitting

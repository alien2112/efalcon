# Performance Improvement Plan for Petrowebsite

**Date**: 2025-10-20
**Status**: Proposed

## Executive Summary

This document outlines comprehensive performance improvements for the Petrowebsite, targeting:
- 40-60% reduction in bundle size
- 50-70% improvement in First Contentful Paint (FCP)
- 30-50% improvement in Time to Interactive (TTI)
- 90+ Lighthouse performance score

## Current Performance Metrics (Estimated)

Based on codebase analysis:
- **Bundle Size**: ~800KB+ (with 3D libraries)
- **First Contentful Paint**: 2-3s
- **Time to Interactive**: 4-6s
- **Total Blocking Time**: High (heavy client-side JS)
- **Cumulative Layout Shift**: Good (using dimensions)

## Priority-Based Improvements

### 🔴 CRITICAL (Immediate Impact)

#### 1. Bundle Size Optimization

**Problem**: Heavy dependencies (three.js, react-globe.gl = ~500KB+)

**Solutions**:
- [ ] Implement dynamic imports for 3D globe component
- [ ] Remove redundant animation library (choose one: GSAP or Framer Motion)
- [ ] Configure proper tree-shaking for Radix UI
- [ ] Add bundle analyzer to identify bloat

**Expected Impact**: -40% bundle size (~320KB reduction)

**Implementation**:
```bash
# Phase 1: Add bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Phase 2: Dynamic imports for heavy components
# Phase 3: Remove redundant libraries
# Phase 4: Tree-shake Radix UI
```

#### 2. Server-Side Rendering (SSR) Strategy

**Problem**: All pages use 'use client', losing SSR benefits

**Solutions**:
- [ ] Convert static pages to Server Components
- [ ] Implement proper SSR/SSG split
- [ ] Add generateStaticParams for dynamic routes
- [ ] Use streaming for heavy content

**Expected Impact**: -50% FCP improvement, better SEO

**Pages to Convert**:
- About Us (mostly static)
- Services page (mostly static)
- FAQ page (fully static)
- Terms & Privacy (fully static)

#### 3. Font Optimization

**Problem**: No font optimization configured

**Solutions**:
- [ ] Use next/font for local font hosting
- [ ] Implement font subsetting
- [ ] Add font-display: swap
- [ ] Preload critical fonts

**Expected Impact**: -200-400ms render blocking time

```typescript
// next.config.ts addition
import { NextFontWithVariable } from 'next/font/google'

const inter = NextFontWithVariable({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### 🟡 HIGH PRIORITY (Significant Impact)

#### 4. Image Optimization Enhancement

**Current**: Good WebP/AVIF support
**Improvements**:
- [ ] Implement blur placeholders for better perceived performance
- [ ] Add priority loading for above-fold images
- [ ] Use CDN for GridFS images (Cloudflare Images)
- [ ] Implement responsive images with proper sizes
- [ ] Add image compression middleware

**Expected Impact**: -30% LCP improvement

**Files to modify**:
```typescript
// All Image components need:
<Image
  src={imageSrc}
  alt={alt}
  width={width}
  height={height}
  placeholder="blur"
  blurDataURL={blurDataURL}
  priority={isAboveFold}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### 5. Code Splitting Strategy

**Problem**: Monolithic client bundle

**Solutions**:
- [ ] Dynamic import for admin panel
- [ ] Route-based code splitting
- [ ] Component-level lazy loading
- [ ] Suspense boundaries

**Expected Impact**: -200KB initial bundle

```typescript
// Example dynamic imports
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <LoadingScreen />,
  ssr: false
})

const Globe = dynamic(() => import('@/components/Globe'), {
  loading: () => <GlobePlaceholder />,
  ssr: false
})
```

#### 6. Caching Enhancements

**Current**: Good HTTP caching
**Improvements**:
- [ ] Implement Service Worker for offline support
- [ ] Add runtime caching for API responses
- [ ] Implement stale-while-revalidate for all API calls
- [ ] Add cache invalidation strategy

**Expected Impact**: 90% faster repeat visits

#### 7. Database Query Optimization

**Improvements**:
- [ ] Add database indexes for common queries
- [ ] Implement query result caching (Redis)
- [ ] Optimize GridFS chunk size
- [ ] Connection pooling verification
- [ ] Implement read replicas for heavy read operations

**Expected Impact**: -50% API response time

### 🟢 MEDIUM PRIORITY (Moderate Impact)

#### 8. Compression & Minification

**Solutions**:
- [ ] Enable Brotli compression
- [ ] Minify JSON API responses
- [ ] Compress CSS (already done by Next.js)
- [ ] Remove console.logs in production

**Expected Impact**: -20% transfer size

```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

#### 9. Critical CSS Extraction

**Solutions**:
- [ ] Extract critical CSS for above-fold content
- [ ] Inline critical CSS in <head>
- [ ] Defer non-critical CSS
- [ ] Remove unused Tailwind classes

**Expected Impact**: -300ms render blocking

#### 10. Animation Performance

**Problems**: Complex gradients re-rendering

**Solutions**:
- [ ] Use CSS transforms instead of layout properties
- [ ] Implement will-change for animated elements
- [ ] Use requestAnimationFrame for JS animations
- [ ] Reduce animation complexity on mobile
- [ ] Use CSS containment

**Expected Impact**: 60fps animations, better mobile perf

```css
/* Optimize animations */
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* GPU acceleration */
  contain: layout style paint;
}
```

#### 11. API Response Optimization

**Solutions**:
- [ ] Implement GraphQL or API field filtering
- [ ] Paginate list responses
- [ ] Compress API responses
- [ ] Add response caching headers
- [ ] Implement API rate limiting

**Expected Impact**: -60% API response size

#### 12. Third-Party Script Optimization

**Solutions**:
- [ ] Use next/script with proper loading strategy
- [ ] Defer non-critical scripts
- [ ] Self-host analytics scripts
- [ ] Remove unused third-party scripts

**Expected Impact**: -500ms blocking time

### 🔵 LOW PRIORITY (Nice to Have)

#### 13. PWA Implementation

**Solutions**:
- [ ] Add service worker for offline support
- [ ] Implement app shell architecture
- [ ] Add install prompt
- [ ] Cache static assets
- [ ] Add push notifications

**Expected Impact**: Better UX, offline support

#### 14. Resource Hints

**Solutions**:
- [ ] Add preconnect for critical origins
- [ ] Implement prefetch for next pages
- [ ] Add preload for critical resources
- [ ] Use dns-prefetch for external domains

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.google.com" />
```

#### 15. Performance Monitoring

**Solutions**:
- [ ] Add Web Vitals tracking
- [ ] Implement Error Boundary for error tracking
- [ ] Add performance marks
- [ ] Set up Lighthouse CI
- [ ] Implement Real User Monitoring (RUM)

**Expected Impact**: Visibility into real-world performance

#### 16. Mobile-Specific Optimizations

**Solutions**:
- [ ] Reduce complexity for mobile viewports
- [ ] Disable expensive effects on mobile
- [ ] Optimize touch event handlers
- [ ] Reduce JavaScript execution on mobile
- [ ] Implement adaptive loading based on connection

**Expected Impact**: 2x faster on mobile devices

## Implementation Roadmap

### Week 1: Quick Wins
- [ ] Add bundle analyzer
- [ ] Implement dynamic imports for heavy components
- [ ] Add font optimization
- [ ] Enable compression
- [ ] Add blur placeholders for images

### Week 2: Major Optimizations
- [ ] Convert static pages to Server Components
- [ ] Implement proper code splitting
- [ ] Add Service Worker
- [ ] Optimize database queries
- [ ] Add performance monitoring

### Week 3: Polish & Testing
- [ ] Critical CSS extraction
- [ ] Animation optimizations
- [ ] API response optimization
- [ ] Mobile-specific optimizations
- [ ] Performance testing and tuning

### Week 4: Advanced Features
- [ ] PWA implementation
- [ ] CDN integration for images
- [ ] Advanced caching strategies
- [ ] Performance monitoring dashboard

## Measurement Plan

### Before Implementation
1. Run Lighthouse audit (all pages)
2. Measure Core Web Vitals
3. Analyze bundle size
4. Test on throttled connections
5. Mobile device testing

### After Each Phase
1. Re-run Lighthouse
2. Compare Core Web Vitals
3. Verify improvements
4. Document results

### Target Metrics

| Metric | Current | Target | Critical |
|--------|---------|--------|----------|
| Lighthouse Performance | ~60 | 90+ | 85+ |
| First Contentful Paint | 2-3s | <1.5s | <2s |
| Largest Contentful Paint | 3-4s | <2.5s | <4s |
| Time to Interactive | 4-6s | <3s | <5s |
| Total Blocking Time | High | <300ms | <600ms |
| Cumulative Layout Shift | Good | <0.1 | <0.25 |
| Bundle Size (JS) | ~800KB | <400KB | <600KB |
| Bundle Size (CSS) | ~100KB | <50KB | <80KB |

## Risk Assessment

### Low Risk
- Font optimization
- Image blur placeholders
- Compression
- Bundle analyzer

### Medium Risk
- Code splitting (may break if not tested)
- Service Worker (caching issues)
- SSR conversion (hydration issues)

### High Risk
- Removing animation libraries (breaking changes)
- Database changes (data integrity)
- Major architectural changes

## Cost-Benefit Analysis

| Optimization | Effort | Impact | ROI |
|--------------|--------|--------|-----|
| Bundle optimization | High | High | ⭐⭐⭐⭐⭐ |
| SSR strategy | High | High | ⭐⭐⭐⭐⭐ |
| Font optimization | Low | Medium | ⭐⭐⭐⭐⭐ |
| Image optimization | Medium | High | ⭐⭐⭐⭐ |
| Code splitting | Medium | High | ⭐⭐⭐⭐ |
| Service Worker | High | Medium | ⭐⭐⭐ |
| Animation optimization | Medium | Medium | ⭐⭐⭐ |
| PWA features | High | Low | ⭐⭐ |

## Tools Required

### Analysis
- Lighthouse
- WebPageTest
- Chrome DevTools
- @next/bundle-analyzer
- webpack-bundle-analyzer

### Monitoring
- Vercel Analytics
- Google Analytics 4
- Sentry (error tracking)
- Web Vitals library

### Testing
- Lighthouse CI
- Percy (visual regression)
- Jest (unit tests)
- Playwright (e2e tests)

## Success Criteria

### Must Have
- ✅ Lighthouse Performance score > 85
- ✅ LCP < 2.5s
- ✅ FCP < 1.8s
- ✅ CLS < 0.1
- ✅ Bundle size < 500KB

### Should Have
- ✅ Lighthouse Performance score > 90
- ✅ TTI < 3.5s
- ✅ TBT < 300ms
- ✅ All images optimized
- ✅ Service Worker implemented

### Nice to Have
- ✅ Lighthouse Performance score > 95
- ✅ PWA features
- ✅ Offline support
- ✅ Perfect Core Web Vitals
- ✅ Advanced monitoring

## Next Steps

1. **Get Approval**: Review this plan with stakeholders
2. **Prioritize**: Decide which optimizations to implement first
3. **Baseline**: Run comprehensive performance tests
4. **Implement**: Start with Week 1 quick wins
5. **Measure**: Track improvements after each change
6. **Iterate**: Refine based on results

## Questions to Consider

Before implementation, please answer:

1. **Budget**: What's the time/resource budget for performance work?
2. **Priority**: Which metrics matter most? (LCP, FID, CLS, Bundle Size?)
3. **Users**: What devices/connections do most users have?
4. **Analytics**: Do you have existing performance data?
5. **Breaking Changes**: Can we make breaking changes (remove libraries)?
6. **Testing**: What's the testing strategy?
7. **Rollout**: Gradual rollout or all at once?

---

**Ready to proceed?** Let me know which optimizations you'd like to tackle first, and I'll implement them immediately!

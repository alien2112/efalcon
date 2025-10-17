# Image Caching System Documentation

## Overview

This website implements a smart multi-layer caching strategy that ensures:
- Fast loading times for regular visitors through aggressive caching
- Immediate updates in the admin panel (no caching)
- Efficient bandwidth usage through cache revalidation
- CDN-compatible headers for optimal performance

## Caching Layers

### 1. Next.js Configuration (`next.config.ts`)

Route-based cache headers are defined in the Next.js configuration:

```typescript
async headers() {
  return [
    // Public images - 1 year cache
    { source: '/gallery/:path*', ... },

    // Admin routes - no cache
    { source: '/admin/:path*', ... },

    // GridFS files - 1 day cache with revalidation
    { source: '/api/gridfs/:path*', ... },
  ];
}
```

### 2. Middleware (`src/middleware.ts`)

Dynamic cache control based on request pathname:
- Intercepts all requests
- Applies appropriate cache headers
- Removes caching headers from admin routes
- Adds CDN-specific headers where needed

### 3. ETag Support (`src/app/api/gridfs/files/[id]/route.ts`)

Efficient cache revalidation:
- Generates unique ETag from file ID and upload date
- Returns 304 Not Modified when content hasn't changed
- Saves bandwidth by not re-sending unchanged files

### 4. Cache-Busting Utilities (`src/lib/cache-busting.ts`)

Tools for forcing cache invalidation when content updates:
- Version parameters on URLs
- Smart URL resolution
- CacheManager for tracking versions

## Cache Durations

| Resource Type | Browser Cache | CDN Cache | Revalidation |
|--------------|---------------|-----------|--------------|
| Public images (`/gallery`) | 1 year | 1 year | Immutable |
| Static assets (`/_next/static`) | 1 year | 1 year | Immutable |
| Next.js images (`/_next/image`) | 1 year | N/A | Immutable |
| GridFS files (`/api/gridfs`) | 1 day | 1 day | Must revalidate |
| Uploads (`/uploads`) | 1 hour | 1 day | Must revalidate, stale-while-revalidate |
| API routes (non-admin) | 60s | 5 min | Stale-while-revalidate |
| HTML pages | 1 hour | 2 hours | Stale-while-revalidate |
| Admin routes | No cache | No cache | N/A |

## How It Works

### For Public Visitors

1. **First Visit**: Images and assets are downloaded and cached for the specified duration
2. **Subsequent Visits**: Resources are served from browser cache (instant loading)
3. **After Cache Expiry**: Browser checks with server using ETag (304 if unchanged)

### For Admin Panel

1. **All Admin Routes**: Headers explicitly prevent caching
   - `Cache-Control: no-store, no-cache, must-revalidate`
   - `Pragma: no-cache`
   - `Expires: 0`
2. **Immediate Updates**: Changes made in admin panel appear immediately
3. **No ETag**: Admin routes have ETag headers removed

### For Updated Content

When an image is updated through the admin panel:

1. **Public visitors with cached version**: Continue seeing old version until cache expires
2. **Force refresh**: Use cache-busting utilities to add version parameter
3. **ETag validation**: Server returns new content when ETag doesn't match

## Using Cache-Busting Utilities

### Basic Usage

```typescript
import { addCacheBuster, resolveImageUrl } from '@/lib/cache-busting';

// Add version parameter to force refresh
const freshUrl = addCacheBuster('/api/gridfs/files/123');
// Result: /api/gridfs/files/123?v=1729180800000

// Smart resolution (auto-detects if cache-busting needed)
const smartUrl = resolveImageUrl('/api/gridfs/files/123');
```

### With CacheManager

```typescript
import { CacheManager } from '@/lib/cache-busting';

// Get versioned URL
const url = CacheManager.getVersionedUrl('/api/gridfs/files/123', 'resource-123');

// Force cache invalidation (increments version)
CacheManager.invalidate('resource-123');
const newUrl = CacheManager.getVersionedUrl('/api/gridfs/files/123', 'resource-123');
```

### In React Components

```typescript
'use client';

import { useCacheBustedUrl } from '@/lib/cache-busting';

export default function MyComponent() {
  const imageUrl = useCacheBustedUrl('/api/gridfs/files/123', true);

  return <img src={imageUrl} alt="My image" />;
}
```

## Verifying Caching

### Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check response headers:
   - Look for `Cache-Control` header
   - Look for `ETag` and `Last-Modified` headers
   - Status `304` means cache validation worked

### Testing Cache Behavior

```bash
# Check headers for public image
curl -I https://yoursite.com/gallery/image.jpg

# Check headers for admin route
curl -I https://yoursite.com/admin/services

# Check ETag validation
curl -I https://yoursite.com/api/gridfs/files/123 \
  -H "If-None-Match: previous-etag-value"
```

Expected responses:
- Public images: `Cache-Control: public, max-age=31536000, immutable`
- Admin routes: `Cache-Control: no-store, no-cache, must-revalidate`
- ETag validation: `304 Not Modified` (if unchanged)

## Best Practices

### For Developers

1. **Use appropriate URLs**:
   - Static public images: `/gallery/` (long cache)
   - Dynamic uploads: `/api/gridfs/files/` (moderate cache with revalidation)
   - Admin content: Always uses no-cache headers

2. **When updating images**:
   - Upload through admin panel (automatic handling)
   - Use cache-busting for immediate visibility if needed
   - Consider version parameters for critical updates

3. **Testing cache behavior**:
   - Test in incognito mode to verify fresh visitor experience
   - Test in regular mode to verify caching works
   - Check Network tab for cache hits

### For Content Editors

1. **After uploading new images**:
   - Changes appear immediately in admin panel
   - Public visitors see changes after cache expires (1-24 hours depending on resource)
   - For immediate updates site-wide, contact developer for cache invalidation

2. **Understanding delays**:
   - Browser cache: 1 hour to 1 year depending on resource type
   - CDN cache: Similar to browser cache
   - Admin panel: No delays, always fresh

## Troubleshooting

### Images not updating for visitors

**Cause**: Browser or CDN cache hasn't expired yet

**Solutions**:
1. Wait for cache to expire (check durations table above)
2. Use cache-busting utility to force refresh
3. Implement version tracking for critical resources

### Admin panel showing old content

**Cause**: Middleware not running or cache headers not set correctly

**Solutions**:
1. Check middleware configuration in `src/middleware.ts`
2. Verify route matches middleware matcher pattern
3. Clear browser cache and hard reload (Ctrl+Shift+R)

### 304 responses for everything

**Cause**: Working as intended - this is efficient caching

**Note**: 304 means content hasn't changed, so browser uses cached version. This saves bandwidth.

### Cache not working at all

**Possible causes**:
1. Development mode (`npm run dev`) may behave differently
2. Browser cache disabled in DevTools
3. Middleware not deployed

**Solutions**:
1. Test in production build (`npm run build && npm start`)
2. Enable cache in DevTools Network tab
3. Verify middleware is included in deployment

## Technical Details

### Cache-Control Directives

- `public`: Can be cached by browsers and CDNs
- `private`: Can only be cached by browsers (not CDNs)
- `no-store`: Don't cache at all
- `no-cache`: Cache but always revalidate
- `max-age=N`: Cache for N seconds
- `s-maxage=N`: CDN cache for N seconds (overrides max-age for CDNs)
- `must-revalidate`: Must revalidate after expiry (no stale serving)
- `stale-while-revalidate=N`: Can serve stale for N seconds while fetching fresh
- `immutable`: Content will never change (skip validation)

### ETag Generation

ETags are MD5 hashes combining:
- File ID (unique identifier)
- Upload date timestamp

This ensures:
- Same content = same ETag
- Updated content = different ETag
- Efficient comparison without downloading file

### Middleware Execution Order

1. Request comes in
2. Middleware checks pathname
3. Applies appropriate cache headers
4. Next.js processes request
5. Response sent with cache headers

## Performance Impact

### Before Caching
- Every image request downloads full file
- High bandwidth usage
- Slower page loads
- Higher server load

### After Caching
- Images cached for up to 1 year
- 304 responses instead of full downloads
- Near-instant page loads for return visitors
- Reduced server load by ~80-90%

### Measurements

Monitor these metrics:
- Time to First Byte (TTFB)
- Largest Contentful Paint (LCP)
- Cache hit ratio
- Bandwidth usage

Expected improvements:
- LCP: 50-70% faster for cached resources
- Bandwidth: 70-90% reduction for return visitors
- TTFB: Near-zero for cached resources

## Future Enhancements

Potential improvements:
1. Automatic cache invalidation on content updates
2. Service Worker for offline caching
3. Preloading critical images
4. WebP/AVIF conversion with caching
5. Edge caching with CDN integration
6. Cache warming strategies

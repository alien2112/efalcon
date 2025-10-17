import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle caching policies across the application
 *
 * This middleware ensures:
 * - Admin routes have no caching
 * - Public routes have appropriate caching
 * - CDN and browser caching are properly configured
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Admin routes - absolutely no caching
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');

    // Add headers to prevent caching in all proxies and CDNs
    response.headers.delete('ETag');
    response.headers.delete('Last-Modified');

    return response;
  }

  // Image uploads from admin - moderate caching with revalidation
  if (pathname.startsWith('/uploads') || pathname.startsWith('/api/gridfs')) {
    response.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate');
    response.headers.set('CDN-Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');

    return response;
  }

  // Static assets - aggressive caching
  if (pathname.startsWith('/_next/static') || pathname.startsWith('/_next/image')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000');

    return response;
  }

  // Public images - aggressive caching
  if (pathname.startsWith('/gallery') || /\.(jpg|jpeg|png|gif|webp|svg|ico)$/.test(pathname)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    response.headers.set('CDN-Cache-Control', 'public, max-age=31536000');

    return response;
  }

  // API routes (except admin) - short caching with revalidation
  if (pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');

    return response;
  }

  // HTML pages - moderate caching
  if (!pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'public, max-age=7200, stale-while-revalidate=86400');

    return response;
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * But still process /admin and /api/admin to ensure no caching
     */
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

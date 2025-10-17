/**
 * Cache-busting utilities for image URLs
 *
 * This module provides functions to add version parameters to image URLs
 * to force browsers and CDNs to fetch fresh versions when images are updated.
 */

/**
 * Adds a cache-busting parameter to an image URL
 * @param url - The original image URL
 * @param version - Optional version string (defaults to current timestamp)
 * @returns URL with cache-busting parameter
 */
export function addCacheBuster(url: string, version?: string | number): string {
  if (!url) return url;

  // Don't add cache buster to external URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const timestamp = version || Date.now();
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}v=${timestamp}`;
}

/**
 * Generates a version hash from file content or metadata
 * @param data - File data or metadata object
 * @returns Version hash string
 */
export function generateVersionHash(data: Buffer | string | object): string {
  const content = typeof data === 'object' ? JSON.stringify(data) : String(data);

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(36);
}

/**
 * Extracts the version parameter from a URL
 * @param url - URL with potential version parameter
 * @returns Version string or null
 */
export function extractVersion(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

/**
 * Removes cache-busting parameters from a URL
 * @param url - URL with potential cache-busting parameters
 * @returns Clean URL without version parameters
 */
export function removeCache Buster(url: string): string {
  return url.replace(/([?&])v=[^&]+(&|$)/, '$1').replace(/[?&]$/, '');
}

/**
 * Checks if a URL needs cache busting (admin uploads, gridfs files)
 * @param url - The image URL to check
 * @returns True if cache busting should be applied
 */
export function needsCacheBusting(url: string): boolean {
  if (!url) return false;

  // URLs that need cache busting
  const cacheBustPatterns = [
    '/uploads/',
    '/api/gridfs/',
    '/api/upload/',
  ];

  return cacheBustPatterns.some(pattern => url.includes(pattern));
}

/**
 * Smart image URL resolver that adds cache busting when needed
 * @param url - Original image URL
 * @param forceRefresh - Force adding a new cache buster
 * @returns Processed URL with cache buster if needed
 */
export function resolveImageUrl(url: string, forceRefresh = false): string {
  if (!url) return url;

  // Don't modify external URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Check if cache busting is needed
  if (needsCacheBusting(url)) {
    if (forceRefresh) {
      // Remove existing cache buster and add new one
      const cleanUrl = removeCacheBuster(url);
      return addCacheBuster(cleanUrl);
    } else if (!extractVersion(url)) {
      // Add cache buster if not present
      return addCacheBuster(url);
    }
  }

  return url;
}

/**
 * Cache invalidation helper for admin panel
 * Forces all cached images to refresh by incrementing version
 */
export class CacheManager {
  private static versionStore: Map<string, number> = new Map();

  /**
   * Get current version for a resource
   */
  static getVersion(resourceId: string): number {
    return this.versionStore.get(resourceId) || 1;
  }

  /**
   * Increment version for a resource (force cache invalidation)
   */
  static invalidate(resourceId: string): number {
    const currentVersion = this.getVersion(resourceId);
    const newVersion = currentVersion + 1;
    this.versionStore.set(resourceId, newVersion);
    return newVersion;
  }

  /**
   * Clear all cached versions
   */
  static clearAll(): void {
    this.versionStore.clear();
  }

  /**
   * Get versioned URL for a resource
   */
  static getVersionedUrl(url: string, resourceId?: string): string {
    if (!resourceId) {
      return resolveImageUrl(url);
    }

    const version = this.getVersion(resourceId);
    return addCacheBuster(url, version);
  }
}

/**
 * Hook-friendly cache busting for client components
 */
export function useCacheBustedUrl(url: string, forceRefresh = false): string {
  if (typeof window === 'undefined') {
    // Server-side: just resolve normally
    return resolveImageUrl(url, forceRefresh);
  }

  // Client-side: add cache buster if needed
  return resolveImageUrl(url, forceRefresh);
}

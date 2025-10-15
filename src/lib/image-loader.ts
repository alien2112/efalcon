/**
 * Custom image loader for Next.js Image component
 * Optimizes image loading and caching
 */

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export const customImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  // If it's already a GridFS URL or external URL, return as-is with params
  if (src.startsWith('http') || src.startsWith('/api/gridfs')) {
    const url = new URL(src, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    url.searchParams.set('w', width.toString());
    if (quality) {
      url.searchParams.set('q', quality.toString());
    }
    return url.toString();
  }

  // For local images, use default Next.js optimization
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
};

/**
 * Preload critical images for better performance
 */
export const preloadImage = (src: string, priority: 'high' | 'low' = 'high') => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (priority === 'high') {
    link.setAttribute('fetchpriority', 'high');
  }
  document.head.appendChild(link);
};

/**
 * Generate srcSet for responsive images
 */
export const generateSrcSet = (src: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string => {
  return widths
    .map(width => `${customImageLoader({ src, width })} ${width}w`)
    .join(', ');
};

/**
 * Check if image format is supported by browser
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
};

export const supportsAVIF = (): boolean => {
  if (typeof window === 'undefined') return false;

  const avif = new Image();
  avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  return avif.complete && avif.width > 0 && avif.height > 0;
};

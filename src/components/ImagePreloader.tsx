'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // Use requestIdleCallback for non-critical preloading to avoid blocking
    const preloadImages = () => {
      images.forEach((src, index) => {
        // Stagger preloading to avoid overwhelming the browser
        setTimeout(() => {
          // Create preload link with high priority for critical images
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.fetchPriority = index < 3 ? 'high' : 'low'; // First 3 images get high priority
          document.head.appendChild(link);

          // Also create image object for browser cache
          const img = new Image();
          img.src = src;
          img.loading = 'eager';
        }, index * 100); // Stagger by 100ms
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 2000 });
    } else {
      setTimeout(preloadImages, 100);
    }

    // Cleanup function to remove preload links
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach((link) => {
        if (images.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, [images]);

  return null; // This component doesn't render anything
}

// Critical images that should be preloaded (prioritized)
export const CRITICAL_IMAGES = [
  '/logofirstsection.webp', // Most critical - above the fold
  '/vision.webp', // Hero section
  '/vision2.webp', // Hero section
  '/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp', // Logo
  '/about%20us%20banner%20.webp',
  '/blog%20banner.webp',
  '/ourworkbanner.webp',
  '/ourservicesbanner.webp',
  '/images/14a6fa02ae183cbb256e0b4da2b46e17d3c07cee.webp', // Wave animation
];

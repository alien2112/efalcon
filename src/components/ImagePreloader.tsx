'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

export function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload critical images
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

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

// Critical images that should be preloaded
export const CRITICAL_IMAGES = [
  '/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp', // Logo
  '/vision.webp',
  '/vision2.webp',
  '/logofirstsection.webp',
  '/about%20us%20banner%20.webp',
  '/blog%20banner.webp',
  '/ourworkbanner.webp',
  '/ourservicesbanner.webp',
];

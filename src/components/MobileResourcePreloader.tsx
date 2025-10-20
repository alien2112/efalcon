'use client';

import { useEffect, useState } from 'react';

interface MobileResourcePreloaderProps {
  images: string[];
  /**
   * Delay before starting preload (ms) - helps avoid blocking critical resources
   */
  delay?: number;
  /**
   * Maximum number of images to preload simultaneously
   */
  maxConcurrent?: number;
}

export function MobileResourcePreloader({ 
  images, 
  delay = 1000, 
  maxConcurrent = 2 
}: MobileResourcePreloaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [preloadedCount, setPreloadedCount] = useState(0);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return; // Only run on mobile devices

    // Use requestIdleCallback for mobile preloading to avoid blocking
    const preloadImages = () => {
      let currentIndex = 0;
      let activePreloads = 0;

      const preloadNext = () => {
        if (currentIndex >= images.length || activePreloads >= maxConcurrent) {
          return;
        }

        const src = images[currentIndex];
        currentIndex++;
        activePreloads++;

        // Create preload link with low priority for mobile
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'low'; // Low priority for mobile
        document.head.appendChild(link);

        // Also create image object for browser cache
        const img = new Image();
        img.src = src;
        img.loading = 'lazy';

        img.onload = () => {
          activePreloads--;
          setPreloadedCount(prev => prev + 1);
          preloadNext(); // Preload next image
        };

        img.onerror = () => {
          activePreloads--;
          preloadNext(); // Continue even if one fails
        };

        // Preload next image after a short delay
        setTimeout(preloadNext, 200);
      };

      // Start preloading
      preloadNext();
    };

    // Use requestIdleCallback with longer timeout for mobile
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadImages, { timeout: 5000 });
    } else {
      setTimeout(preloadImages, delay);
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
  }, [images, isMobile, delay, maxConcurrent]);

  // Log preload progress for mobile debugging
  useEffect(() => {
    if (isMobile && preloadedCount > 0) {
      console.log(`Mobile preloaded ${preloadedCount}/${images.length} images`);
    }
  }, [preloadedCount, images.length, isMobile]);

  return null; // This component doesn't render anything
}

// Mobile-specific critical images (prioritized for mobile)
export const MOBILE_CRITICAL_IMAGES = [
  '/logofirstsection.webp', // Most critical - above the fold
  '/vision.webp', // Hero section
  '/vision2.webp', // Hero section
  // Reduced list for mobile to avoid overwhelming
];

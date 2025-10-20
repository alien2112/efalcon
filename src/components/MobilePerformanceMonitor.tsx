'use client';

import { useEffect } from 'react';

export function MobilePerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;

    if (!isMobile) return; // Only run on mobile devices

    // Mobile-specific performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log mobile performance metrics
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('Mobile LCP:', entry.startTime);
          // Alert if LCP is too slow on mobile (>2.5s)
          if (entry.startTime > 2500) {
            console.warn('Slow mobile LCP detected:', entry.startTime + 'ms');
          }
        } else if (entry.entryType === 'first-input') {
          const fid = entry.processingStart - entry.startTime;
          console.log('Mobile FID:', fid);
          // Alert if FID is too slow on mobile (>300ms)
          if (fid > 300) {
            console.warn('Slow mobile FID detected:', fid + 'ms');
          }
        } else if (entry.entryType === 'layout-shift') {
          console.log('Mobile CLS:', entry.value);
        }
      }
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // Monitor mobile-specific resource loading times
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          // More aggressive thresholds for mobile
          if (resource.duration > 2000) { // Log slow resources (>2s on mobile)
            console.warn('Slow mobile resource:', resource.name, resource.duration + 'ms');
          }
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // Resource timing not supported
    }

    // Monitor mobile-specific metrics
    const mobileMetrics = {
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      deviceMemory: (navigator as any).deviceMemory || 'unknown',
      hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };

    console.log('Mobile Performance Context:', mobileMetrics);

    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null;
}

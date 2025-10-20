'use client';

import { useEffect, useRef } from 'react';

export function ScrollOptimizer() {
  const isOptimizing = useRef(false);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Ensure smooth scrolling is enabled globally
    const enableSmoothScrolling = () => {
      // Set smooth scrolling on html element
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Ensure body has proper scroll behavior
      document.body.style.scrollBehavior = 'smooth';
      
      // Add smooth scrolling to all scrollable containers
      const scrollableElements = document.querySelectorAll('[data-scrollable], .scroll-container, .overflow-auto, .overflow-y-auto');
      scrollableElements.forEach(element => {
        (element as HTMLElement).style.scrollBehavior = 'smooth';
      });
    };

    // Optimize scroll performance
    const optimizeScrollPerformance = () => {
      // Add scroll optimization class to body during scroll
      const handleScroll = () => {
        const now = Date.now();
        
        if (!isOptimizing.current) {
          isOptimizing.current = true;
          document.body.classList.add('scroll-optimized');
        }

        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // Set timeout to remove optimization class
        scrollTimeout.current = setTimeout(() => {
          isOptimizing.current = false;
          document.body.classList.remove('scroll-optimized');
        }, 100);

        lastScrollTime.current = now;
      };

      // Use passive listeners for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        document.body.classList.remove('scroll-optimized');
      };
    };

    // Prevent scroll interference from animations
    const preventScrollInterference = () => {
      // Ensure animations don't interfere with scroll
      const animatedElements = document.querySelectorAll('.motion-div, [data-framer-motion], .animate-slide-in, .animate-slide-out');
      animatedElements.forEach(element => {
        (element as HTMLElement).style.overflow = 'visible';
        (element as HTMLElement).style.contain = 'none';
      });
    };

    // Initialize optimizations
    enableSmoothScrolling();
    const cleanupScroll = optimizeScrollPerformance();
    preventScrollInterference();

    // Re-apply optimizations when DOM changes
    const observer = new MutationObserver(() => {
      enableSmoothScrolling();
      preventScrollInterference();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Cleanup
    return () => {
      cleanupScroll();
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

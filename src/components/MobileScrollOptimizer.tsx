'use client';

import { useEffect, useRef } from 'react';

export function MobileScrollOptimizer() {
  const isMobile = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef(0);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile.current) {
      // Enhanced mobile scroll momentum
      let isScrolling = false;
      let scrollStartTime = 0;
      let scrollStartY = 0;

      const handleScrollStart = () => {
        isScrolling = true;
        scrollStartTime = Date.now();
        scrollStartY = window.scrollY;
        
        // Add momentum class for CSS optimizations
        document.body.classList.add('scrolling');
      };

      const handleScrollEnd = () => {
        isScrolling = false;
        document.body.classList.remove('scrolling');
        
        // Calculate scroll velocity for momentum
        const scrollEndTime = Date.now();
        const scrollEndY = window.scrollY;
        const scrollDuration = scrollEndTime - scrollStartTime;
        const scrollDistance = Math.abs(scrollEndY - scrollStartY);
        
        if (scrollDuration > 0) {
          scrollVelocity.current = scrollDistance / scrollDuration;
        }
      };

      const handleScroll = () => {
        const now = Date.now();
        const currentScrollY = window.scrollY;
        
        // Calculate velocity
        if (now - lastScrollTime.current > 0) {
          scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current) / (now - lastScrollTime.current);
        }
        
        lastScrollTime.current = now;
        lastScrollY.current = currentScrollY;

        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // Set new timeout for scroll end detection
        scrollTimeout.current = setTimeout(() => {
          handleScrollEnd();
        }, 150); // 150ms delay to detect scroll end

        if (!isScrolling) {
          handleScrollStart();
        }
      };

      // Add scroll event listener with passive flag for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      // Add touch event listeners for better momentum detection
      let touchStartY = 0;
      let touchStartTime = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      };
      
      const handleTouchEnd = (e: TouchEvent) => {
        if (e.changedTouches.length === 1) {
          const touchEndY = e.changedTouches[0].clientY;
          const touchEndTime = Date.now();
          const touchDistance = Math.abs(touchEndY - touchStartY);
          const touchDuration = touchEndTime - touchStartTime;
          
          if (touchDuration > 0 && touchDistance > 10) {
            // Calculate touch velocity for momentum
            const touchVelocity = touchDistance / touchDuration;
            
            // Apply momentum-based scroll behavior
            if (touchVelocity > 0.5) {
              // High velocity - enable momentum scrolling
              document.documentElement.style.scrollBehavior = 'smooth';
            } else {
              // Low velocity - use instant scrolling
              document.documentElement.style.scrollBehavior = 'auto';
            }
          }
        }
      };

      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('resize', checkMobile);
        
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        document.body.classList.remove('scrolling');
      };
    }
  }, []);

  return null; // This component doesn't render anything
}

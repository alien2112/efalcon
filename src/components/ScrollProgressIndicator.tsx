'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTime = useRef(0);
  const isMobile = useRef(false);

  // Check if device is mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    setScrollProgress(progress);
    
    // Show indicator when user starts scrolling
    setIsVisible(scrollTop > 50);
  }, []);

  useEffect(() => {
    // Initial check
    updateScrollProgress();

    // Enhanced scroll event listener with mobile-specific optimizations
    let ticking = false;
    let lastUpdateTime = 0;
    
    const handleScroll = () => {
      const now = Date.now();
      
      // Throttle more aggressively on mobile for better performance
      const throttleDelay = isMobile.current ? 16 : 8; // ~60fps on mobile, ~120fps on desktop
      
      if (!ticking && (now - lastUpdateTime) > throttleDelay) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          lastUpdateTime = now;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    const scrollOptions = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: '3px', top: '0px' }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Progress bar */}
      <div 
        className="relative h-full overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Main gradient progress bar */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#EFC132] via-[#FFD700] to-[#FFA500] transition-all duration-150 ease-out"
          style={{
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.6), 0 0 16px rgba(255, 165, 0, 0.3)',
          }}
        />
        
        {/* Animated shimmer effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: 'shimmer 2s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 via-[#FFA500]/30 to-[#FFD700]/20 blur-sm"
          style={{
            filter: 'blur(2px)',
            transform: 'scaleY(1.5)'
          }}
        />
      </div>
      
      {/* Subtle border highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent"></div>
    </div>
  );
}

// Mobile-optimized version with enhanced performance
export function MobileScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const lastUpdateTime = useRef(0);

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    setScrollProgress(progress);
    setIsVisible(scrollTop > 30);
  }, []);

  useEffect(() => {
    updateScrollProgress();

    // Enhanced mobile scroll handling with aggressive throttling
    let ticking = false;
    let lastTime = 0;
    
    const handleScroll = () => {
      const now = Date.now();
      
      // More aggressive throttling for mobile (30fps max)
      const throttleDelay = 33; // ~30fps for better battery life
      
      if (!ticking && (now - lastTime) > throttleDelay) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          lastTime = now;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listeners with capture for better mobile performance
    const scrollOptions = { passive: true, capture: false };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[60] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ height: '2px', top: '0px' }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Progress bar */}
      <div 
        className="relative h-full overflow-hidden"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Main gradient progress bar */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#EFC132] to-[#FFD700] transition-all duration-150 ease-out"
          style={{
            boxShadow: '0 0 4px rgba(255, 215, 0, 0.5)',
          }}
        />
        
        {/* Subtle shimmer */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: 'mobileShimmer 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

// Responsive wrapper that chooses the right component
export function ResponsiveScrollProgressIndicator() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileScrollProgressIndicator /> : <ScrollProgressIndicator />;
}

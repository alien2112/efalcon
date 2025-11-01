'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 300 : 400;
      setVisible(y > threshold);
    };
    
    // Check immediately
    onScroll();
    
    // Add scroll listener with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store initial position
    const startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (startPosition === 0) return; // Already at top
    
    // Cancel any existing scroll animation
    const scrollId = 'scrollToTop_' + Date.now();
    (window as any)[scrollId] = true;
    
    // Smooth scroll function that always completes
    const startTime = Date.now();
    const duration = Math.min(500, startPosition * 0.5); // Adaptive duration
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentPosition = startPosition * (1 - easeOut);
      
      window.scrollTo(0, Math.max(0, startPosition - currentPosition));
      
      if (progress < 1 && (window as any)[scrollId]) {
        requestAnimationFrame(animateScroll);
      } else {
        // Force final position to ensure we're at top
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        delete (window as any)[scrollId];
      }
    };
    
    // Start animation
    requestAnimationFrame(animateScroll);
    
    // Safety fallback - force scroll to top after max duration
    setTimeout(() => {
      if ((window as any)[scrollId]) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        delete (window as any)[scrollId];
      }
    }, duration + 100);
  };

  return (
    <div 
      className="fixed bottom-5 right-5 flex flex-col items-end gap-3 floating-actions-container"
      style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        isolation: 'isolate',
        pointerEvents: 'auto'
      }}
    >
      {/* Call Button - Always Visible */}
      <a
        href="tel:+966565145666"
        aria-label="Call us"
        className="group shadow-lg rounded-full p-1 bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] hover:brightness-110 transition-colors duration-200 w-12 h-12 md:w-12 md:h-12 flex items-center justify-center border border-white/30"
        style={{ zIndex: 10000 }}
      >
        <div className="bg-white/10 rounded-full p-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="18" 
            height="18" 
            fill="#ffffff"
            className="transition-colors duration-200"
          >
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </div>
      </a>

      {/* WhatsApp - Always Visible */}
      <a
        href="https://wa.me/966565145666"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group shadow-lg rounded-full p-1 bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] hover:brightness-110 transition-colors duration-200 w-12 h-12 md:w-12 md:h-12 flex items-center justify-center border border-white/30"
        style={{ zIndex: 10000 }}
      >
        <div className="bg-white/10 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.446-1.076-.612-1.47-.173-.389-.347-.334-.446-.34-.099-.006-.371-.05-.57-.05-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.864.997-3.838-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </div>
      </a>

      {/* Scroll to top */}
      <button
        onClick={(e) => {
          console.log('Scroll button clicked'); // Debug
          scrollTop(e);
        }}
        aria-label="Scroll to top"
        type="button"
        className={`transition-all duration-300 ${
          visible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-70 translate-y-0'
        } bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] text-white hover:from-[#FFD700] hover:to-[#EFC132] hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group shadow-2xl rounded-full w-12 h-12 flex items-center justify-center border-2 border-white cursor-pointer`}
        style={{ 
          zIndex: 10001,
          pointerEvents: 'auto',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          userSelect: 'none',
          filter: 'none !important',
          backdropFilter: 'none !important',
          WebkitBackdropFilter: 'none !important',
          opacity: visible ? 1 : 0.7,
          backgroundColor: '#EFC132',
          backgroundImage: 'linear-gradient(to right, #EFC132, #8B7A0A)',
          boxShadow: '0 10px 25px rgba(239, 193, 50, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.3)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="22" 
          height="22" 
          fill="white" 
          className="group-hover:animate-bounce drop-shadow-sm"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            stroke: 'white',
            strokeWidth: 0.5
          }}
        >
          <path d="M12 5.828l5.364 5.364-1.414 1.414L13 9.657V20h-2V9.657L8.05 12.606 6.636 11.192 12 5.828z"/>
        </svg>
      </button>
    </div>
  );
}



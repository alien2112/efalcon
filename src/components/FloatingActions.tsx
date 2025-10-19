'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const threshold = isMobile ? 40 : 150;
      setVisible(y > threshold);
    };
    updateIsMobile();
    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateIsMobile);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [isMobile]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3 pointer-events-auto floating-actions-container"
      style={{ 
        position: 'fixed',
        zIndex: 9999,
        isolation: 'isolate'
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
        onClick={scrollTop}
        aria-label="Scroll to top"
        className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] text-white hover:shadow-xl transition-all duration-300 group shadow-lg rounded-full w-10 h-10 md:w-10 md:h-10 flex items-center justify-center border border-white/30`}
        style={{ zIndex: 10000 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="group-hover:animate-bounce">
          <path d="M12 5.828l5.364 5.364-1.414 1.414L13 9.657V20h-2V9.657L8.05 12.606 6.636 11.192 12 5.828z"/>
        </svg>
      </button>
    </div>
  );
}



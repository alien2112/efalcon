'use client';

import { useState, useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface PresenceImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Specialized component for the "Our Presence Around the World" image
 * Optimized for both mobile and desktop with responsive behavior
 */
export function PresenceImage({ src, alt, className = '' }: PresenceImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/20 to-[#FFD700]/20 animate-pulse rounded-xl flex items-center justify-center">
          <div className="text-white/60 text-sm font-medium">Loading global presence map...</div>
        </div>
      )}

      {/* Optimized image with perfect aspect ratio (1123 x 793) */}
      <OptimizedImage
        src={src}
        alt={alt}
        width={1123}
        height={793}
        quality={isMobile ? 85 : 90}
        className={`w-full h-full object-contain rounded-xl transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 80vw"
        priority={true}
        onLoad={() => setIsLoaded(true)}
        // Mobile-specific optimizations
        mobileQuality={85}
      />

      {/* Responsive overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl pointer-events-none"></div>
      
      {/* Enhanced decorative elements - responsive sizing */}
      <div className={`absolute bg-white/40 rounded-full shadow-lg ${
        isMobile ? '-top-2 -right-2 w-6 h-6' : '-top-3 -right-3 w-8 h-8'
      }`}></div>
      <div className={`absolute bg-white/30 rounded-full shadow-lg ${
        isMobile ? '-bottom-2 -left-2 w-4 h-4' : '-bottom-3 -left-3 w-6 h-6'
      }`}></div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-[#EFC132]/60 rounded-full"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#FFD700]/60 rounded-full"></div>
    </div>
  );
}

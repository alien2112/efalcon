'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Generate floating particles only on the client to avoid SSR hydration mismatch
  type Particle = { left: number; top: number; delay: number; duration: number };
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on mount (client-only)
    const generated: Particle[] = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }));
    setParticles(generated);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Fade out after completion
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic feel
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-[#EFC132] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Company Logo */}
        <div className="mb-8 relative w-[200px] h-[80px] md:w-[300px] md:h-[120px]">
          <Image
            src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp"
            alt="Ebdaa Falcon Logo"
            fill
            className="object-contain animate-pulse"
            priority
            quality={90}
          />
        </div>

        {/* Company Name */}
        <div className="mb-12">
          <h1 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] md:text-[48px] text-white mb-2">
            إبداع فالكون
          </h1>
          <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[36px] text-white/90">
            EBDAA FALCON
          </h2>
        </div>

        {/* Loading Animation */}
        <div className="w-full max-w-[400px] mb-8">
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center text-white/80">
            <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px]">
              Loading...
            </span>
            <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Company Tagline */}
        <div className="mt-8 max-w-[600px]">
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-white/80 leading-relaxed">
            Driving Excellence in Energy, Logistics & Sustainability
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`
            }}
          />
        ))}
        
        {/* Subtle Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <svg viewBox="0 0 1200 120" className="w-full h-full">
            <path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="white"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

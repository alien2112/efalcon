'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface WaveAnimationProps {
  className?: string;
  onAnimationComplete?: () => void;
}

export function WaveAnimation({ className = '', onAnimationComplete }: WaveAnimationProps) {
  // ===== ANIMATION CONFIGURATION =====
  const WAVE_CONFIG = {
    speed: 0.001,           // Wave animation speed multiplier
    phases: [0.15, 0.3, 0.5, 0.7, 0.8, 0.9] // Wave phase thresholds
  };
  
  const TEXT_CONFIG = {
    speed: 0.0008,          // Text animation speed multiplier (20% slower)
    phases: [0.2, 0.4, 0.6, 0.75, 0.9, 1.0] // Text phase thresholds
  };

  // ===== MAIN ANIMATION STATE =====
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const animationProgressRef = useRef(0);
  
  // ===== WAVE ANIMATION STATE =====
  const [waveProgress, setWaveProgress] = useState(0);
  
  // ===== TEXT ANIMATION STATE =====
  const [textProgress, setTextProgress] = useState(0);

  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;
    let autoProgressInterval: NodeJS.Timeout | null = null;

    const handleScroll = (e: Event) => {
      if (!heroRef.current) return;

      // If animation is not complete, prevent actual scrolling and only update animation
      if (!animationComplete) {
        e.preventDefault();
        
        // Calculate animation progress based on scroll delta
        const deltaY = (e as WheelEvent).deltaY;
        animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + (deltaY * 0.001)));
        
        console.log(`Scroll Progress: ${animationProgressRef.current.toFixed(3)}, DeltaY: ${deltaY}`);
        setScrollProgress(animationProgressRef.current);
        
        // Update wave and text progress independently
        // Wave animation can have different timing than text
        const waveDelta = deltaY * 0.001; // Same rate as scroll progress
        const textDelta = deltaY * TEXT_CONFIG.speed;
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        
        // Check if animation is complete (reached phase 6)
        if (animationProgressRef.current >= 0.95) {
          setAnimationComplete(true);
          onAnimationComplete?.();
          // Allow one more scroll to trigger actual page scrolling
          setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent arrow keys and spacebar from scrolling during animation
      if (!animationComplete && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ')) {
        e.preventDefault();
        
        const deltaY = e.key === 'ArrowDown' || e.key === ' ' ? 100 : -100;
        animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + (deltaY * 0.001)));
        
        setScrollProgress(animationProgressRef.current);
        
        // Update wave and text progress independently
        const waveDelta = deltaY * 0.001; // Same rate as scroll progress
        const textDelta = deltaY * TEXT_CONFIG.speed;
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        
        if (animationProgressRef.current >= 0.95) {
          setAnimationComplete(true);
          onAnimationComplete?.();
          setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (!animationComplete && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!animationComplete && e.touches.length === 1) {
        e.preventDefault();
        
        const touchCurrentY = e.touches[0].clientY;
        const deltaY = touchStartY - touchCurrentY; // Inverted for natural scroll direction
        
        // Apply sensitivity multiplier for touch events - adjusted for mobile
        const sensitivity = 0.003; // Increased sensitivity for better mobile experience
        animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + (deltaY * sensitivity)));
        
        console.log(`Touch Progress: ${animationProgressRef.current.toFixed(3)}, DeltaY: ${deltaY}`);
        setScrollProgress(animationProgressRef.current);
        
        // Update wave and text progress independently
        const waveDelta = deltaY * sensitivity;
        const textDelta = deltaY * (TEXT_CONFIG.speed * 2.5); // Faster for touch
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        
        // Check if animation is complete
        if (animationProgressRef.current >= 0.95) {
          setAnimationComplete(true);
          onAnimationComplete?.();
          setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }, 100);
        }
        
        // Update touch start position for continuous tracking
        touchStartY = touchCurrentY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Add momentum for better mobile experience
      if (!animationComplete && touchStartTime > 0) {
        const touchDuration = Date.now() - touchStartTime;
        const touchDistance = Math.abs(touchStartY - e.changedTouches[0].clientY);
        
        // If it's a quick swipe, add momentum
        if (touchDuration < 300 && touchDistance > 50) {
          const momentum = touchDistance * 0.001;
          animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + momentum));
          
          setScrollProgress(animationProgressRef.current);
          setWaveProgress(prev => Math.max(0, Math.min(1, prev + momentum)));
          setTextProgress(prev => Math.max(0, Math.min(1, prev + momentum * 2)));
          
          if (animationProgressRef.current >= 0.95) {
            setAnimationComplete(true);
            onAnimationComplete?.();
            setTimeout(() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }, 100);
          }
        }
      }
    };

    // Auto-progression fallback for mobile devices
    const startAutoProgress = () => {
      if (autoProgressInterval) return;
      
      autoProgressInterval = setInterval(() => {
        if (!animationComplete && animationProgressRef.current < 0.95) {
          const autoDelta = 0.01; // Slow auto-progression
          animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + autoDelta));
          
          setScrollProgress(animationProgressRef.current);
          setWaveProgress(prev => Math.max(0, Math.min(1, prev + autoDelta)));
          setTextProgress(prev => Math.max(0, Math.min(1, prev + autoDelta * 1.2)));
          
          if (animationProgressRef.current >= 0.95) {
            setAnimationComplete(true);
            onAnimationComplete?.();
            setTimeout(() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }, 100);
          }
        }
      }, 100); // Update every 100ms
    };

    // Start auto-progression after 3 seconds if no interaction
    const autoProgressTimeout = setTimeout(() => {
      if (!animationComplete && animationProgressRef.current < 0.1) {
        startAutoProgress();
      }
    }, 3000);

    // Add event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Clean up timers
      if (autoProgressInterval) {
        clearInterval(autoProgressInterval);
      }
      clearTimeout(autoProgressTimeout);
    };
  }, [animationComplete]);

  // ===== WAVE ANIMATION FUNCTIONS =====
  const getWavePhase = () => {
    // Independent wave animation phases using configuration
    console.log(`Wave Progress: ${waveProgress.toFixed(3)}, Phases: [${WAVE_CONFIG.phases.join(', ')}]`);
    for (let i = 0; i < WAVE_CONFIG.phases.length; i++) {
      if (waveProgress < WAVE_CONFIG.phases[i]) {
        console.log(`Wave Phase: ${i + 1}, Progress: ${waveProgress.toFixed(3)}, Threshold: ${WAVE_CONFIG.phases[i]}`);
        return i + 1;
      }
    }
    console.log(`Wave Phase: ${WAVE_CONFIG.phases.length}, Progress: ${waveProgress.toFixed(3)}`);
    return WAVE_CONFIG.phases.length;
  };

  const getWaveTransform = () => {
    const phase = getWavePhase();
    
    switch (phase) {
      case 1: // Wave over text, text not visible
        return {
          x: -34,
          y: 20,
          angle: 180,
          size: 1.1,
          opacity: 1
        };
      case 2: // Wave goes down, text becomes visible
        return {
          x: -31.5,
          y: 60,
          angle: 180,
          size: 1.1 ,
          opacity: 1

        };
      case 3: // Text goes to top left, wave to bottom right
        return {
          x: -22.5,
          y: 60,
          angle: 138,
          size: 1.1,
          opacity: 1
        };
      case 4: // Wave goes to left of page
        return {
          x: -37.5,
          y: 35,
          angle: 60,
          size: 1,
          opacity: 1
        };
      case 5: // Wave returns to bottom showing trust text
        return {
            x: -33,
            y: 30,
            angle: 0,
            size: 1.1 ,
            opacity: 1
        };
      case 6: // Wave goes to right edge
        return {
          x: -10,
          y: 25,
          angle: 25,
          size: 1.1,
          opacity: 0.7
        };
      default:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1.0
        };
    }
  };

  // ===== TEXT ANIMATION FUNCTIONS =====
  const getTextPhase = () => {
    // Independent text animation phases using configuration
    for (let i = 0; i < TEXT_CONFIG.phases.length; i++) {
      if (textProgress < TEXT_CONFIG.phases[i]) {
        console.log(`Text Phase: ${i + 1}, Progress: ${textProgress.toFixed(3)}, Threshold: ${TEXT_CONFIG.phases[i]}`);
        return i + 1;
      }
    }
    console.log(`Text Phase: ${TEXT_CONFIG.phases.length}, Progress: ${textProgress.toFixed(3)}`);
    return TEXT_CONFIG.phases.length;
  };

  const getTextTransform = () => {
    const phase = getTextPhase();
    
    switch (phase) {
      case 1: // Text not visible
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 2: // Text becomes visible in center
        return {
            x: -40,
            y: -20,
            angle: 0,
            size: 0.8,
            opacity: 1.0
        };
      case 3: // Text moves to top left
        return {
            x: 0,
            y: 0,
            angle: 0,
            size: 1.0,
            opacity: 1
        };
      case 4: // Text stays in top left
        return {
            x: 0,
            y: 0,
            angle: 0,
            size: 1.2,
            opacity: 1.0
        };
      case 5: // Trust text in center
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.2,
          opacity: 1.0
        };
      case 6: // Trust text in center
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.2,
          opacity: 0.8
        };
      default:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1.0
        };
    }
  };

  const getTextContent = () => {
    const phase = getTextPhase();
    console.log(`Text Content Phase: ${phase}`);
    
    switch (phase) {
      case 1:
      case 2:
        return {
          title: "Petroleum Derivatives and Logistics Services",
          description: "Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products. We also provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.",
          showDescription: true,
          isTrustText: false
        };
      case 3:
      case 4:
      case 5:
      case 6:
        return {
          title: "TRUST US",
          description: "Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products. We also provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.",
          showDescription: true,
          isTrustText: true
        };
      default:
        return {
          title: "Petroleum Derivatives and Logistics Services",
          description: "Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products. We also provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.",
          showDescription: true,
          isTrustText: false
        };
    }
  };

  // ===== MAIN ANIMATION CONTROL =====
  const getPhase = () => {
    // Divide scroll progress into 6 phases
    if (scrollProgress < 0.15) return 1; // 0-15%
    if (scrollProgress < 0.3) return 2;  // 15-30%
    if (scrollProgress < 0.5) return 3;   // 30-50%
    if (scrollProgress < 0.7) return 4;  // 50-70%
    if (scrollProgress < 0.8) return 5;  // 70-80%
    return 6; // 80-100%
  };

  // ===== ANIMATION CALCULATIONS =====
  const textContent = getTextContent();
  const wavePhase = getWavePhase();
  const textPhase = getTextPhase();
  const waveTransform = getWaveTransform();
  const textTransform = getTextTransform();

  return (
    <div ref={heroRef} className={`relative w-full h-screen bg-[#716106] overflow-hidden ${className}`}>
      {/* Animated Wave */}
      <div 
        className="absolute top-0 left-0 w-[300%] h-[120%] transition-all duration-500 ease-out z-20"
        style={{
          transform: `translate(${waveTransform.x}%, ${waveTransform.y}%) rotate(${waveTransform.angle}deg) scale(${waveTransform.size})`,
          opacity: waveTransform.opacity
        }}
      >
        <Image
          src="/images/14a6fa02ae183cbb256e0b4da2b46e17d3c07cee.png"
          alt="Animated Wave"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text Content */}
      <div 
        className="relative z-10 h-full flex items-center justify-center max-w-[1280px] mx-auto px-4 md:px-8 transition-all duration-500 ease-out"
        style={{
          transform: `translate(${textTransform.x}%, ${textTransform.y}%) rotate(${textTransform.angle}deg) scale(${textTransform.size})`,
          opacity: textTransform.opacity
        }}
      >
        <div className="flex flex-col gap-4 items-center text-center">
          {/* Main Title */}
          <h1 
            className={`font-['Alfa_Slab_One:Regular',_sans-serif] leading-[1.2] text-white tracking-[-1.44px] max-w-[1024px] transition-all duration-500 ease-out ${
              textContent.isTrustText 
                ? 'text-[64px] md:text-[96px]' 
                : 'text-[48px] md:text-[72px]'
            }`}
          >
            {textContent.title}
          </h1>
          
          {/* Description */}
          {textContent.showDescription && (
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] leading-[1.5] text-white max-w-[768px] transition-all duration-500 ease-out">
              {textContent.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
    phases: [0.25, 0.5, 0.75, 0.9] // Wave phase thresholds - 4 phases
  };
  
  const TEXT_CONFIG = {
    speed: 0.0008,          // Text animation speed multiplier (20% slower)
    phases: [0.25, 0.5, 0.75, 0.9] // Text phase thresholds - 4 phases
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
      case 1: // Phase 1: Logo - Wave covers the logo initially
        return {
          x: -34,
          y: 20,
          angle: 180,
          size: 1.1,
          opacity: 1
        };
      case 2: // Phase 2: Logistic Image - Wave moves to reveal logistic content
        return {
          x: -31.5,
          y: 60,
          angle: 180,
          size: 1.1,
          opacity: 1
        };
      case 3: // Phase 3: Oil Station - Wave moves to show oil station content
        return {
          x: -22.5,
          y: 60,
          angle: 138,
          size: 1.1,
          opacity: 1
        };
      case 4: // Phase 4: Water Desalination - Wave moves to final position
        return {
          x: -37.5,
          y: 35,
          angle: 60,
          size: 1,
          opacity: 1
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
      case 1: // Phase 1: Logo - Text visible below logo
        return {
          x: 0,
          y: 20,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 2: // Phase 2: Logistic Image - Text becomes visible
        return {
          x: -40,
          y: -20,
          angle: 0,
          size: 0.8,
          opacity: 1.0
        };
      case 3: // Phase 3: Oil Station - Text moves to center
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 4: // Phase 4: Water Desalination - Text stays in center
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.2,
          opacity: 1.0
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
      case 1: // Phase 1: Logo
        return {
          title: "إبداع فالكون",
          subtitle: "EBDAA FALCON",
          showDescription: false,
          isTrustText: false
        };
      case 2: // Phase 2: Logistic Image
        return {
          title: "INTEGRATED LOGISTIC SOLUTION",
          description: "provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.",
          showDescription: true,
          isTrustText: false
        };
      case 3: // Phase 3: Oil Station
        return {
          title: "LEADERS IN OIL AND GAS",
          description: "Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.",
          showDescription: true,
          isTrustText: false
        };
      case 4: // Phase 4: Water Desalination
        return {
          title: "Water Desalination",
          description: "Desalination is the process of converting salt water into pure fresh water. It is suitable for drinking and daily use.",
          showDescription: true,
          isTrustText: false
        };
      default:
        return {
          title: "إبداع فالكون",
          subtitle: "EBDAA FALCON",
          showDescription: false,
          isTrustText: false
        };
    }
  };

  // ===== MAIN ANIMATION CONTROL =====
  const getPhase = () => {
    // Divide scroll progress into 4 phases
    if (scrollProgress < 0.25) return 1; // 0-25%
    if (scrollProgress < 0.5) return 2;   // 25-50%
    if (scrollProgress < 0.75) return 3; // 50-75%
    return 4; // 75-100%
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

      {/* Phase Images */}
      {textPhase >= 1 && (
        <div className="absolute inset-0 z-5 transition-all duration-500 ease-out">
          {textPhase === 1 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[600px] h-[40%] max-h-[300px]">
              <Image
                src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
                alt="Ebdaa Falcon Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          {textPhase === 2 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[60%] max-h-[400px]">
              <Image
                src="/gallery/logistic .jpg"
                alt="Logistic Image"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          )}
          {textPhase === 3 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[60%] max-h-[400px]">
              <Image
                src="/gallery/oil extraction.jpg"
                alt="Oil Station"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          )}
          {textPhase === 4 && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[60%] max-h-[400px]">
              <Image
                src="/gallery/water purification1.jpg"
                alt="Water Desalination"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      )}

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
          
          {/* Subtitle (for Phase 1) */}
          {textContent.subtitle && (
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] leading-[1.2] text-white tracking-[-1.44px] transition-all duration-500 ease-out">
              {textContent.subtitle}
            </h2>
          )}
          
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

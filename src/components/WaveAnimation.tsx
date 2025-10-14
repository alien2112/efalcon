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
    phases: [0.2, 0.4, 0.6, 0.8, 0.9] // Wave phase thresholds - 5 phases
  };
  
  const TEXT_CONFIG = {
    speed: 0.0008,          // Text animation speed multiplier (20% slower)
    phases: [0.2, 0.4, 0.6, 0.8, 0.9] // Text phase thresholds - 5 phases
  };

  const IMAGE_CONFIG = {
    speed: 0.0009,          // Image animation speed multiplier (between wave and text)
    phases: [0.2, 0.4, 0.6, 0.8, 0.9] // Image phase thresholds - 5 phases
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

  // ===== IMAGE ANIMATION STATE =====
  const [imageProgress, setImageProgress] = useState(0);
  
  // ===== RESPONSIVE STATE =====
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Determine initial device width and subscribe to resizes for responsiveness
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    let touchStartY = 0;
    let touchStartTime = 0;

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
        const imageDelta = deltaY * IMAGE_CONFIG.speed;
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        setImageProgress(prev => Math.max(0, Math.min(1, prev + imageDelta)));
        
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
        const imageDelta = deltaY * IMAGE_CONFIG.speed;
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        setImageProgress(prev => Math.max(0, Math.min(1, prev + imageDelta)));
        
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
        const imageDelta = deltaY * (IMAGE_CONFIG.speed * 2.5); // Faster for touch
        
        setWaveProgress(prev => Math.max(0, Math.min(1, prev + waveDelta)));
        setTextProgress(prev => Math.max(0, Math.min(1, prev + textDelta)));
        setImageProgress(prev => Math.max(0, Math.min(1, prev + imageDelta)));
        
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
          setImageProgress(prev => Math.max(0, Math.min(1, prev + momentum * 1.5)));
          
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

    // Auto-progression removed - animation only responds to user interaction

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
      window.removeEventListener('resize', updateIsMobile);
      
      // Clean up timers (auto-progression removed)
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
          y: -50,
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
          y: 30,
          angle: 50,
          size: 1,
          opacity: 1
        };
      case 5: // Phase 5: Extra Phase - Wave final position
        return {
          x: -37.5,
          y: 30,
          angle: 50,
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
          x: 2,
          y: 20,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 2: // Phase 2: Logistic Image - Text becomes visible
        return {
          x: 0,
          y: 10,
          angle: 0,
          size: 0.8,
          opacity: 1.0
        };
      case 3: // Phase 3: Oil Station - Text moves to center (mobile: shift right)
        return {
          x: isMobile ? 13 : -30,
          y: isMobile ? 8 :25,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 4: // Phase 4: Water Desalination - Text stays in center
        return {
          x:  isMobile ? 35 : 30,
          y: isMobile ? 20 : 30, // mobile: slightly higher
          angle: 0,
          size: 1.2,
          opacity: 1.0
        };
      case 5: // Phase 5: Extra Phase - Text final position
        return {
          x: 30,
          y: 30,
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
      case 5: // Phase 5: Extra Phase
        return {
          title: "Water Desalination",
          description: "Desalination is the process of converting salt water into pure fresh water. It is suitable for drinking and daily use.",
          showDescription: true,
          isTrustText: false
        };
      default:
        return {
        };
    }
  };

  // ===== IMAGE ANIMATION FUNCTIONS =====
  const getImagePhase = () => {
    // Independent image animation phases using configuration
    for (let i = 0; i < IMAGE_CONFIG.phases.length; i++) {
      if (imageProgress < IMAGE_CONFIG.phases[i]) {
        console.log(`Image Phase: ${i + 1}, Progress: ${imageProgress.toFixed(3)}, Threshold: ${IMAGE_CONFIG.phases[i]}`);
        return i + 1;
      }
    }
    console.log(`Image Phase: ${IMAGE_CONFIG.phases.length}, Progress: ${imageProgress.toFixed(3)}`);
    return IMAGE_CONFIG.phases.length;
  };

  const getImageTransform = () => {
    const phase = getImagePhase();
    
    switch (phase) {
      case 1: // Phase 1: Logo - Image starts small and centered
        return {
          x: 1,
          y: -10,
          scale: 0.8,
          opacity: 0.7,
          rotation: 0
        };
      case 2: // Phase 2: Logistic Image - Image grows and becomes more visible (mobile: go left)
        return {
          x: isMobile ? 0 : 30,
          y: isMobile ? 10 : 20,
          scale: 1.0,
          opacity: 1.0,
          rotation: 0
        };
      case 3: // Phase 3: Oil Station - Image slightly rotates and scales
        return {
          x: 0,
          y: 25,
          scale: 1.05,
          opacity: 1.0,
          rotation: 0
        };
      case 4: // Phase 4: Water Desalination - Image final position (mobile: higher and a little left)
        return {
          x: isMobile ? 0 : 48,
          y: isMobile ? 20 : 50,
          scale: 1.1,
          opacity: 1.0,
          rotation: 0
        };
      case 5: // Phase 5: Extra Phase - Image final position
        return {
          x: isMobile ? 0 : 48,
          y: isMobile ? 20 : 50,
          scale: 1.1,
          opacity: 1.0,
          rotation: 0
        };
      default:
        return {
          x: 0,
          y: 0,
          scale: 1.0,
          opacity: 1.0,
          rotation: 0
        };
    }
  };

  const getImageContent = () => {
    const phase = getImagePhase();
    console.log(`Image Content Phase: ${phase}`);
    
    switch (phase) {
      case 1: // Phase 1: Logo
        return {
          src: "/logofirstsection.png",
          alt: "Ebdaa Falcon Logo",
          className: "object-contain"
        };
      case 2: // Phase 2: Logistic Image
        return {
          src: "/gallery/logistic .jpg",
          alt: "Logistic Image",
          className: "object-contain rounded-lg"
        };
      case 3: // Phase 3: Oil Station
        return {
          src: "/gallery/oil extraction.jpg",
          alt: "Oil Station",
          className: "object-contain rounded-lg"
        };
      case 4: // Phase 4: Water Desalination
        return {
          src: "/gallery/water purification1.jpg",
          alt: "Water Desalination",
          className: "object-contain rounded-lg"
        };
      case 5: // Phase 5: Extra Phase
        return {
          src: "/gallery/water purification1.jpg",
          alt: "Water Desalination",
          className: "object-contain rounded-lg"
        };
      default:
        return {
          src: "/logofirstsection.png",
          alt: "Ebdaa Falcon Logo",
          className: "object-contain"
        };
    }
  };

  // ===== MAIN ANIMATION CONTROL =====
  const getPhase = () => {
    // Divide scroll progress into 5 phases
    if (scrollProgress < 0.2) return 1;  // 0-20%
    if (scrollProgress < 0.4) return 2;  // 20-40%
    if (scrollProgress < 0.6) return 3; // 40-60%
    if (scrollProgress < 0.8) return 4; // 60-80%
    return 5; // 80-100%
  };

  // ===== ANIMATION CALCULATIONS =====
  const textContent = getTextContent();
  const wavePhase = getWavePhase();
  const textPhase = getTextPhase();
  const imagePhase = getImagePhase();
  const waveTransform = getWaveTransform();
  const textTransform = getTextTransform();
  const imageTransform = getImageTransform();
  const imageContent = getImageContent();

  return (
    <div ref={heroRef} className={`relative w-full h-screen bg-[#716106] overflow-hidden ${className}`}>
      {/* Animated Wave */}
      <div 
        className={`absolute top-0 left-0 transition-all duration-500 ease-out z-20 ${isMobile ? 'w-[220%] h-[110%]' : 'w-[300%] h-[120%]'}`}
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

      {/* Animated Images */}
      <div 
        className="absolute inset-0 z-5 transition-all duration-500 ease-out"
        style={{
          transform: `translate(${imageTransform.x}%, ${imageTransform.y}%) rotate(${imageTransform.rotation}deg) scale(${imageTransform.scale})`,
          opacity: imageTransform.opacity
        }}
      >
        {/* Background Rectangle for Logo Phase */}
        {imagePhase === 1 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[84%] md:w-[80%] max-w-[800px] h-[56%] md:h-[60%] max-h-[400px] z-0">
            <Image
              src="/Rectangle 43.png"
              alt="Background Rectangle"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        
        {/* Main Image - Conditional Styling */}
        {imagePhase === 1 ? (
          // Logo Phase - No special styling
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[84%] md:w-[80%] max-w-[800px] h-[56%] md:h-[60%] max-h-[400px] z-10">
            <Image
              src={imageContent.src}
              alt={imageContent.alt}
              fill
              className={imageContent.className}
              priority
            />
          </div>
        ) : (
          // Other Phases - Apply special styling
          <div 
            className="absolute transition-all duration-500 ease-out z-10"
            style={{
              width: isMobile ? '88vw' : '706px',
              height: isMobile ? '50vw' : '241px',
              top: isMobile ? '12px' : '-70px',
              left: isMobile ? '50%' : '52px',
              transform: isMobile ? 'translateX(-50%)' : undefined,
              borderRadius: isMobile ? '24px' : '47px',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 90px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            <Image
              src={imageContent.src}
              alt={imageContent.alt}
              fill
              className={isMobile ? 'object-cover rounded-[24px]' : 'object-cover rounded-[47px]'}
              priority
            />
          </div>
        )}
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
                ? 'text-[48px] md:text-[72px]'
                : 'text-[36px] md:text-[56px]'
            }`}
          >
            {textContent.title}
          </h1>
          
          {/* Subtitle (for Phase 1) */}
          {textContent.subtitle && (
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[36px] leading-[1.2] text-white tracking-[-1.44px] transition-all duration-500 ease-out">
              {textContent.subtitle}
            </h2>
          )}
          
          {/* Description */}
          {textContent.showDescription && (
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] leading-[1.5] text-white max-w-[768px] transition-all duration-500 ease-out">
              {textContent.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

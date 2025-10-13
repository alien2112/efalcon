'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ContactHeroProps {
  onAnimationComplete?: () => void;
}

export function ContactHero({ onAnimationComplete }: ContactHeroProps) {
  
  // Animation configuration
  const ANIMATION_CONFIG = {
    speed: 0.001,
    phases: [0.15, 0.3, 0.5, 0.7, 0.8, 0.9]
  };
  
  const TEXT_CONFIG = {
    speed: 0.0008,
    phases: [0.2, 0.4, 0.6, 0.75, 0.9, 1.0]
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const animationProgressRef = useRef(0);
  
  const [waveProgress, setWaveProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (!heroRef.current) return;

      if (!animationComplete) {
        e.preventDefault();
        
        const deltaY = (e as WheelEvent).deltaY;
        animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + (deltaY * 0.001)));
        
        setScrollProgress(animationProgressRef.current);
        
        const waveDelta = deltaY * 0.001;
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!animationComplete && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ')) {
        e.preventDefault();
        
        const deltaY = e.key === 'ArrowDown' || e.key === ' ' ? 100 : -100;
        animationProgressRef.current = Math.max(0, Math.min(1, animationProgressRef.current + (deltaY * 0.001)));
        
        setScrollProgress(animationProgressRef.current);
        
        const waveDelta = deltaY * 0.001;
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

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [animationComplete]);

  const getWavePhase = () => {
    for (let i = 0; i < ANIMATION_CONFIG.phases.length; i++) {
      if (waveProgress < ANIMATION_CONFIG.phases[i]) {
        return i + 1;
      }
    }
    return ANIMATION_CONFIG.phases.length;
  };

  const getWaveTransform = () => {
    const phase = getWavePhase();
    
    switch (phase) {
      case 1:
        return {
          x: -34,
          y: 20,
          angle: 180,
          size: 1.1,
          opacity: 1
        };
      case 2:
        return {
          x: -31.5,
          y: 60,
          angle: 180,
          size: 1.1,
          opacity: 1
        };
      case 3:
        return {
          x: -22.5,
          y: 60,
          angle: 138,
          size: 1.1,
          opacity: 1
        };
      case 4:
        return {
          x: -37.5,
          y: 35,
          angle: 60,
          size: 1,
          opacity: 1
        };
      case 5:
        return {
          x: -33,
          y: 30,
          angle: 0,
          size: 1.1,
          opacity: 1
        };
      case 6:
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

  const getTextPhase = () => {
    for (let i = 0; i < TEXT_CONFIG.phases.length; i++) {
      if (textProgress < TEXT_CONFIG.phases[i]) {
        return i + 1;
      }
    }
    return TEXT_CONFIG.phases.length;
  };

  const getTextTransform = () => {
    const phase = getTextPhase();
    
    switch (phase) {
      case 1:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 2:
        return {
          x: -40,
          y: -20,
          angle: 0,
          size: 0.8,
          opacity: 1.0
        };
      case 3:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.0,
          opacity: 1
        };
      case 4:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.2,
          opacity: 1.0
        };
      case 5:
        return {
          x: 0,
          y: 0,
          angle: 0,
          size: 1.2,
          opacity: 1.0
        };
      case 6:
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
    
    switch (phase) {
      case 1:
      case 2:
        return {
          title: 'Let’s build something great together',
          subtitle: 'We’re here to discuss your needs and craft the right solution.',
          showSubtitle: true,
          isContactText: false
        };
      case 3:
      case 4:
      case 5:
      case 6:
        return {
          title: 'Contact Ebdaa Falcon',
          subtitle: 'Talk to our team about energy, logistics, and partnerships.',
          showSubtitle: true,
          isContactText: true
        };
      default:
        return {
          title: 'Let’s build something great together',
          subtitle: 'We’re here to discuss your needs and craft the right solution.',
          showSubtitle: true,
          isContactText: false
        };
    }
  };

  const textContent = getTextContent();
  const waveTransform = getWaveTransform();
  const textTransform = getTextTransform();

  return (
    <div ref={heroRef} className="relative w-full h-screen bg-[#716106] overflow-hidden">
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
              textContent.isContactText 
                ? 'text-[64px] md:text-[96px]' 
                : 'text-[48px] md:text-[72px]'
            }`}
          >
            {textContent.title}
          </h1>
          
          {/* Subtitle */}
          {textContent.showSubtitle && (
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] leading-[1.5] text-white max-w-[768px] transition-all duration-500 ease-out">
              {textContent.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

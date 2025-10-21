'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '' 
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disabled scroll-based animations for better PC scrolling experience
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start end', 'end start']
  // });

  // Static values instead of scroll-based animations
  const y = 0; // No scroll-based movement
  const x = 0; // No scroll-based movement

  return (
    <motion.div
      ref={ref}
      style={{ y, x }}
      className={`${className} ${isMobile ? 'parallax-element' : ''}`}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundSpeed?: number;
  contentSpeed?: number;
}

export function ParallaxSection({ 
  children, 
  className = '',
  backgroundSpeed = 0.3,
  contentSpeed = 0.5
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Disabled scroll-based animations for better PC scrolling experience
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start end', 'end start']
  // });

  // Static values instead of scroll-based animations
  const backgroundY = '0%'; // No scroll-based movement
  const contentY = '0%'; // No scroll-based movement

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
      <motion.div
        style={{ y: contentY }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeInOnScroll({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up'
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disabled scroll-based animations for better PC scrolling experience
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start 0.8', 'start 0.2']
  // });

  const getInitialPosition = () => {
    // Reduced movement distance for better performance
    const distance = isMobile ? 15 : 25;
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { y: 0, x: distance };
      case 'right':
        return { y: 0, x: -distance };
      default:
        return { y: distance, x: 0 };
    }
  };

  const initial = getInitialPosition();

  // Static values instead of scroll-based animations
  const opacity = 1; // Always visible
  const y = 0; // No scroll-based movement
  const x = 0; // No scroll-based movement

  // Reduce animation duration on mobile for better performance
  const mobileDuration = isMobile ? duration * 0.7 : duration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: initial.y, x: initial.x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: mobileDuration, delay }}
      className={`${className} ${isMobile ? 'parallax-element' : ''}`}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  delay?: number;
}

export function ScaleOnScroll({ 
  children, 
  className = '',
  scaleRange = [0.8, 1],
  delay = 0
}: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Disabled scroll-based animations for better PC scrolling experience
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ['start 0.8', 'start 0.2']
  // });

  // Static values instead of scroll-based animations
  const scale = 1; // Always full scale
  const opacity = 1; // Always visible

  return (
    <motion.div
      ref={ref}
      initial={{ scale: scaleRange[0], opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

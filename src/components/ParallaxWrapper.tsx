'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Reduce parallax intensity on mobile for better performance
  const mobileSpeed = isMobile ? speed * 0.3 : speed;
  const distance = 100 * mobileSpeed;
  
  const y = useTransform(scrollYProgress, [0, 1], 
    direction === 'up' ? [distance, -distance] : 
    direction === 'down' ? [-distance, distance] : [0, 0]
  );
  
  const x = useTransform(scrollYProgress, [0, 1], 
    direction === 'left' ? [distance, -distance] : 
    direction === 'right' ? [-distance, distance] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        x,
        touchAction: 'pan-y' // Enable vertical scrolling on touch devices
      }}
      className={`${className} ${isMobile ? 'parallax-element' : ''} touch-pan-y`}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', `${backgroundSpeed * 100}%`]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${contentSpeed * -100}%`]);

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  });

  const getInitialPosition = () => {
    // Reduce movement distance on mobile for better performance
    const distance = isMobile ? 25 : 50;
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

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [initial.y, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0]);

  // Reduce animation duration on mobile for better performance
  const mobileDuration = isMobile ? duration * 0.7 : duration;

  return (
    <motion.div
      ref={ref}
      style={{ 
        opacity, 
        y, 
        x,
        touchAction: 'pan-y' // Enable vertical scrolling on touch devices
      }}
      transition={{ duration: mobileDuration, delay }}
      className={`${className} ${isMobile ? 'parallax-element' : ''} touch-pan-y`}
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

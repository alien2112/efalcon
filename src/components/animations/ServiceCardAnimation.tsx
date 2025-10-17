'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface ServiceCardAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function ServiceCardAnimation({ 
  children, 
  className = '', 
  delay = 0,
  index = 0 
}: ServiceCardAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  });

  // Smooth spring animations for hover effects
  const scale = useSpring(1, { stiffness: 300, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  // Scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) / rect.width;
    const deltaY = (event.clientY - centerY) / rect.height;
    
    mouseX.set(deltaX * 20);
    mouseY.set(deltaY * -20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    y.set(-8);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ 
        opacity, 
        y: scrollY,
        scale,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay + (index * 0.1),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient border animation */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(45deg, #EFC132, #FFD700, #8B7A0A, #EFC132)',
          backgroundSize: '400% 400%',
          padding: '2px',
          borderRadius: '12px'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(239, 193, 50, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content with 3D transform */}
      <motion.div
        style={{
          rotateX: useTransform(mouseY, [-20, 20], [5, -5]),
          rotateY: useTransform(mouseX, [-20, 20], [-5, 5]),
          transformStyle: 'preserve-3d'
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface AnimatedSeparatorProps {
  className?: string;
  delay?: number;
}

export function AnimatedSeparator({ className = '', delay = 0 }: AnimatedSeparatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'start 0.2']
  });

  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-[#EFC132]/30 to-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-[#EFC132] to-[#FFD700]"
          style={{ width }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
      </div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(239, 193, 50, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(239, 193, 50, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}

interface FloatingIconProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  floatIntensity?: number;
}

export function FloatingIcon({ 
  children, 
  className = '', 
  delay = 0,
  floatIntensity = 1 
}: FloatingIconProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10 * floatIntensity, 0]
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowingBackgroundProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function GlowingBackground({ 
  children, 
  className = '', 
  intensity = 1 
}: GlowingBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(239, 193, 50, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(239, 193, 50, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(239, 193, 50, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, rgba(239, 193, 50, 0.4) 0%, transparent 70%)`,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

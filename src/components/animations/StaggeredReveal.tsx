'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggeredRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggeredReveal({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  direction = 'up'
}: StaggeredRevealProps) {
  const getInitialPosition = () => {
    const distance = 60;
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { y: 0, x: distance };
      case 'right': return { y: 0, x: -distance };
      default: return { y: distance, x: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      ...getInitialPosition(),
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticCard({
  children,
  className = '',
  intensity = 0.3
}: MagneticCardProps) {
  // Check if device supports touch
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      drag={!isTouchDevice}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={intensity}
      dragMomentum={false}
      whileDrag={{
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
}

interface PulseGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export function PulseGlow({ 
  children, 
  className = '',
  color = '#EFC132',
  intensity = 0.3
}: PulseGlowProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 20px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
          `0 0 40px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`,
          `0 0 20px ${color}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({ 
  text, 
  className = '',
  speed = 0.05,
  delay = 0
}: TypewriterTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ 
          duration: text.length * speed, 
          delay: delay + 0.5,
          ease: "easeInOut"
        }}
        className="inline-block overflow-hidden whitespace-nowrap"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

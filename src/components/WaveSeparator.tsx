'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WaveSeparatorProps {
  className?: string;
  variant?: 'wave' | 'curve' | 'angled';
  animate?: boolean;
}

export function WaveSeparator({ 
  className = '', 
  variant = 'wave',
  animate = true 
}: WaveSeparatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const waveVariants = {
    hidden: { 
      opacity: 0,
      scaleY: 0,
      transformOrigin: 'bottom'
    },
    visible: { 
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    }
  };

  const WaveSVG = () => (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EFC132" />
          <stop offset="100%" stopColor="#EFC132" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <motion.path
        d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1200,100 1200,60 L1200,120 L0,120 Z"
        fill="url(#waveGradient)"
        filter="url(#glow)"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={waveVariants}
        className="drop-shadow-lg"
      />
      
      {/* Secondary wave for depth */}
      <motion.path
        d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z"
        fill="#EFC132"
        fillOpacity="0.3"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
          ...waveVariants,
          visible: {
            ...waveVariants.visible,
            transition: {
              ...waveVariants.visible.transition,
              delay: 0.5
            }
          }
        }}
      />
    </svg>
  );

  const CurveSVG = () => (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EFC132" />
          <stop offset="100%" stopColor="#EFC132" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M0,60 Q600,0 1200,60 L1200,120 L0,120 Z"
        fill="url(#curveGradient)"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={waveVariants}
        className="drop-shadow-lg"
      />
    </svg>
  );

  const AngledSVG = () => (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="angledGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EFC132" />
          <stop offset="100%" stopColor="#EFC132" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M0,60 L600,0 L1200,60 L1200,120 L0,120 Z"
        fill="url(#angledGradient)"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={waveVariants}
        className="drop-shadow-lg"
      />
    </svg>
  );

  const renderSVG = () => {
    switch (variant) {
      case 'curve':
        return <CurveSVG />;
      case 'angled':
        return <AngledSVG />;
      default:
        return <WaveSVG />;
    }
  };

  return (
    <div className={`relative w-full h-24 md:h-32 ${className}`}>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFC132]/20 to-[#EFC132]/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      
      {/* Main separator */}
      <div className="relative z-10 h-full">
        {renderSVG()}
      </div>

      {/* Subtle animation overlay */}
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        />
      )}

      {/* Floating particles for extra dynamism */}
      {animate && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// CSS-only alternative for better performance
export function CSSWaveSeparator({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-24 md:h-32 ${className}`}>
      {/* CSS clip-path wave */}
      <div 
        className="absolute inset-0 bg-[#EFC132]"
        style={{
          clipPath: 'polygon(0 60%, 25% 40%, 50% 60%, 75% 40%, 100% 60%, 100% 100%, 0 100%)',
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFC132]/20 to-[#EFC132]/40" />
    </div>
  );
}

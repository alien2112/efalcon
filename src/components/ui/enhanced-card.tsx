'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedCardProps {
  children: ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function EnhancedCard({
  children,
  hoverable = true,
  clickable = false,
  className = '',
  onClick,
  delay = 0,
  direction = 'up'
}: EnhancedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300';
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-2' : '';
  const clickClasses = clickable ? 'cursor-pointer active:scale-95' : '';

  const getInitialAnimation = () => {
    const distance = 50;
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    const base = {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: delay * 0.1
      }
    };

    if (isHovered && hoverable) {
      return {
        ...base,
        y: -8,
        scale: 1.02,
        transition: {
          type: "spring" as const,
          stiffness: 400,
          damping: 25
        }
      };
    }

    return base;
  };

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
      initial={getInitialAnimation()}
      animate={getAnimateProps()}
      whileHover={hoverable ? { 
        scale: 1.02, 
        y: -8,
        transition: { type: "spring" as const, stiffness: 400, damping: 25 }
      } : {}}
      whileTap={clickable ? { scale: 0.95 } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Hover glow effect */}
      {hoverable && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#716106]/5 to-[#8B7A0A]/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

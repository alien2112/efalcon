'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'border-[#EFC132]',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

interface LoadingDotsProps {
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export function LoadingDots({ 
  color = 'primary', 
  className = '' 
}: LoadingDotsProps) {
  const colorClasses = {
    primary: 'bg-[#EFC132]',
    white: 'bg-white',
    gray: 'bg-gray-400'
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${colorClasses[color]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

interface LoadingPulseProps {
  className?: string;
}

export function LoadingPulse({ className = '' }: LoadingPulseProps) {
  return (
    <motion.div
      className={`bg-[#EFC132] rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function EnhancedButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  success = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}: EnhancedButtonProps) {
  const baseClasses = 'relative overflow-hidden rounded-lg font-[\'ADLaM_Display:Regular\',_sans-serif] transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-[#716106] text-white hover:bg-[#8B7A0A] hover:shadow-lg',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md',
    outline: 'border-2 border-[#716106] text-[#716106] hover:bg-[#716106] hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const getStatusClasses = () => {
    if (success) return 'bg-green-600 text-white';
    if (loading) return 'bg-[#716106] text-white';
    return '';
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${getStatusClasses()} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Ripple effect background */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative flex items-center justify-center">
        {loading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Loading...
          </>
        ) : success ? (
          <>
            <motion.svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
            Success!
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
}

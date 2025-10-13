'use client';

import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface EnhancedInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ 
    label, 
    placeholder, 
    type = 'text', 
    required = false, 
    disabled = false, 
    error, 
    success = false,
    className = '',
    value,
    onChange,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    const getInputClasses = () => {
      let classes = 'w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none resize-none';
      
      if (error) {
        classes += ' border-red-500 focus:ring-2 focus:ring-red-500/20';
      } else if (success) {
        classes += ' border-green-500 focus:ring-2 focus:ring-green-500/20';
      } else {
        classes += ' border-gray-300 focus:ring-2 focus:ring-[#716106]/20 focus:border-[#716106] hover:border-gray-400';
      }
      
      if (disabled) {
        classes += ' bg-gray-100 cursor-not-allowed';
      }
      
      return classes;
    };

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <motion.label
            className={`block text-sm font-medium transition-colors duration-300 ${
              error ? 'text-red-600' : success ? 'text-green-600' : 'text-gray-700'
            }`}
            animate={{
              color: isFocused ? '#716106' : error ? '#dc2626' : success ? '#16a34a' : '#374151'
            }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        
        <div className="relative">
          <motion.input
            ref={ref}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={getInputClasses()}
            animate={{
              scale: isFocused ? 1.02 : 1,
              boxShadow: isFocused ? '0 0 0 3px rgba(113, 97, 6, 0.1)' : '0 0 0 0px rgba(113, 97, 6, 0.1)'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            {...props}
          />
          
          {/* Focus indicator */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-[#716106] pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.95
            }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Success indicator */}
          {success && !isFocused && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </div>
        
        {error && (
          <motion.p
            className="text-sm text-red-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';

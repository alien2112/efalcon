'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InternalLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function InternalLoadingScreen({ isVisible, onComplete }: InternalLoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + Math.random() * 15;
          }
          return prev;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  useEffect(() => {
    if (progress >= 100 && onComplete) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Logo/Icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-[#EFC132] rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="w-8 h-8 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.h3
              className="text-center text-lg font-['ADLaM_Display:Regular',_sans-serif] text-gray-800 mb-4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading...
            </motion.h3>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.p
              className="text-center text-sm text-gray-600"
              key={Math.floor(progress)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.floor(progress)}%
            </motion.p>

            {/* Animated Dots */}
            <div className="flex justify-center mt-4 space-x-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-[#EFC132] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for managing internal loading state
export function useInternalLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    InternalLoadingScreen: ({ onComplete }: { onComplete?: () => void }) => (
      <InternalLoadingScreen
        isVisible={isLoading}
        onComplete={() => {
          stopLoading();
          onComplete?.();
        }}
      />
    )
  };
}

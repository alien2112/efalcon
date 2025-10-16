'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface SophisticatedLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function SophisticatedLoadingScreen({ isVisible, onComplete }: SophisticatedLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'entering' | 'loading' | 'exiting'>('entering');

  console.log('SophisticatedLoadingScreen - isVisible:', isVisible, 'phase:', phase, 'progress:', progress);

  useEffect(() => {
    if (isVisible) {
      setPhase('entering');
      setProgress(0);
      
      // Start loading phase after entrance animation
      const entranceTimer = setTimeout(() => {
        setPhase('loading');
        
        // Simulate loading progress with slower, more elegant timing
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev < 100) {
              return prev + 0.8; // Slower increments for more elegant progress
            }
            return prev;
          });
        }, 80); // Slightly slower updates for smoother animation

        return () => clearInterval(interval);
      }, 800);

      return () => clearTimeout(entranceTimer);
    }
  }, [isVisible]);

  // Remove automatic completion - let parent component handle timing
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setPhase('exiting');
    }
  }, [progress, phase]);

  // Reset state when component becomes invisible
  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setPhase('entering');
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Geometric Shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border border-white/10 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 12}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
            
            {/* Gradient Orbs */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute w-64 h-64 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${
                    i === 0 ? '#FFD700' : i === 1 ? '#FFA500' : '#EFC132'
                  } 0%, transparent 70%)`,
                  left: `${30 + i * 25}%`,
                  top: `${20 + i * 20}%`,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          {/* Main Loading Container */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ 
              scale: phase === 'exiting' ? 0.8 : 1, 
              opacity: phase === 'exiting' ? 0 : 1, 
              y: phase === 'exiting' ? -50 : 0 
            }}
            transition={{ 
              duration: phase === 'exiting' ? 0.8 : 1.2, 
              ease: "easeOut" 
            }}
          >
            {/* Logo Container with Glow Effect */}
            <motion.div
              className="relative mb-12"
              animate={{
                scale: phase === 'loading' ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: phase === 'loading' ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              {/* Glow Ring */}
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Logo */}
              <div className="relative w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                <Image
                  src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp"
                  alt="Ebdaa Falcon Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Rotating Ring */}
              <motion.div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 border-transparent"
                style={{
                  borderImage: 'linear-gradient(45deg, #FFD700, #FFA500, #EFC132, #FFD700) 1',
                  borderImageSlice: 1,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Company Name */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.h1
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-4xl md:text-5xl text-white mb-2"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                    '0 0 40px rgba(255, 215, 0, 0.6)',
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                إبداع فالكون
              </motion.h1>
              <motion.h2
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-2xl md:text-3xl text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                EBDAA FALCON
              </motion.h2>
            </motion.div>

            {/* Sophisticated Progress Indicator */}
            <motion.div
              className="w-80 max-w-sm mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Progress Bar Container */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Progress Fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#EFC132] rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress Percentage */}
              <motion.div
                className="text-center mt-4"
                key={Math.floor(progress)}
                initial={{ scale: 1.2, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-['ADLaM_Display:Regular',_sans-serif] text-lg text-white/80">
                  {Math.floor(progress)}%
                </span>
              </motion.div>
            </motion.div>

            {/* Elegant Loading Text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.p
                className="font-['ADLaM_Display:Regular',_sans-serif] text-white/60 text-sm tracking-wider"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {phase === 'entering' ? 'Initializing...' : 
                 phase === 'loading' ? 'Loading Experience...' : 
                 'Completing...'}
              </motion.p>
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut",
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

// Hook for managing sophisticated loading state
export function useSophisticatedLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    SophisticatedLoadingScreen: ({ onComplete }: { onComplete?: () => void }) => (
      <SophisticatedLoadingScreen
        isVisible={isLoading}
        onComplete={() => {
          stopLoading();
          onComplete?.();
        }}
      />
    )
  };
}

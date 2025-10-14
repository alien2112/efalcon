'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogHeroProps {
  onAnimationComplete?: () => void;
}

export function BlogHero({ onAnimationComplete }: BlogHeroProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            variants={imageVariants}
          >
            <Image
              src="/blog%20banner.jpg"
              alt="Blog Banner"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
      
      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/40" 
        variants={overlayVariants}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div variants={textVariants}>
          <motion.h1 
            className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[48px] md:text-[72px] leading-tight mb-4"
            variants={textVariants}
          >
            {t('blog.hero.title') || 'Ebdaa Falcon Blog'}
          </motion.h1>
          <motion.p 
            className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] max-w-[800px] mx-auto"
            variants={textVariants}
          >
            {t('blog.hero.subtitle') || 'News, trends, and thought leadership from our team.'}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
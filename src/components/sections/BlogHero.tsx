'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogHeroProps {
  onAnimationComplete?: () => void;
}

export function BlogHero({ onAnimationComplete }: BlogHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden">
      {/* Match Services banner structure: clip-path on image wrapper */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 reveal-clip">
            <Image
              src="/blog%20banner.jpg"
              alt="Blog Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[48px] md:text-[72px] leading-tight mb-4">
            {t('blog.hero.title') || 'Ebdaa Falcon Blog'}
          </h1>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] max-w-[800px] mx-auto">
            {t('blog.hero.subtitle') || 'News, trends, and thought leadership from our team.'}
          </p>
        </div>
      </div>
      <style jsx>{`
        .reveal-clip { 
          position:absolute; inset:0; 
          animation: clipReveal 1600ms ease-out forwards; 
          will-change: clip-path, opacity; 
        }
        @keyframes clipReveal {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(150% at 50% 50%); }
        }
      `}</style>
    </div>
  );
}
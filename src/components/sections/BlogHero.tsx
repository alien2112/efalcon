'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface BlogHeroProps {
  onAnimationComplete?: () => void;
}

export function BlogHero({ onAnimationComplete }: BlogHeroProps) {
  return (
    <div className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden">
      <Image
        src="/blog%20banner.jpg"
        alt="Blog Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[48px] md:text-[72px] leading-tight mb-4">
            Ebdaa Falcon Blog
          </h1>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] max-w-[800px] mx-auto">
            News, trends, and thought leadership from our team.
          </p>
        </div>
      </div>
    </div>
  );
}
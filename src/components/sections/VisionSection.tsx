'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

export function VisionSection() {
  const { t } = useLanguage();
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Section: OUR VISION */}
      <div className="relative py-20 md:py-32">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent"></div>
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-br-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-tr-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-tl-3xl"></div>
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <FadeInOnScroll direction="left" delay={0.2}>
              <div className="relative space-y-8">
                {/* Decorative accent line */}
                <div className="absolute -left-6 top-0 w-1 h-24 bg-gradient-to-b from-white/80 to-transparent rounded-full"></div>
                
                <div className="space-y-6">
                  <h2 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg">
                    {t('vision.title')}
                  </h2>
                  <div className="relative">
                    {/* Subtle decorative element */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-white/60 rounded-full"></div>
                    <p className="text-white text-lg md:text-xl leading-relaxed pl-6 drop-shadow-md">
                      {t('vision.leftDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
            
            {/* Right Image */}
            <ParallaxWrapper speed={0.3} direction="right">
              <div className="relative">
                {/* Enhanced image container with better shadows and borders */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.3)] border-4 border-white/30 bg-white/10 backdrop-blur-sm">
                  <Image 
                    src="/vision.webp"
                    alt="Vision 2030 and Saudi Leadership"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                    quality={85}
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/40 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/30 rounded-full"></div>
              </div>
            </ParallaxWrapper>
          </div>
        </div>
      </div>

      {/* Bottom Section: Ebdaa Falcon Company */}
      <div className="relative py-20 md:py-32">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent"></div>
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-br-3xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent rounded-tr-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/20 to-transparent rounded-tl-3xl"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <ParallaxWrapper speed={0.3} direction="left">
              <div className="relative order-2 lg:order-1">
                {/* Enhanced image container with better shadows and borders */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.3)] border-4 border-white/30 bg-white/10 backdrop-blur-sm">
                  <Image 
                    src="/vision2.webp"
                    alt="Mosaed M. Al-Jhail Chairman"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                    quality={85}
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/40 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/30 rounded-full"></div>
              </div>
            </ParallaxWrapper>
            
            {/* Right Content */}
            <FadeInOnScroll direction="right" delay={0.4}>
              <div className="relative space-y-8 order-1 lg:order-2">
                {/* Decorative accent line */}
                <div className="absolute -right-6 top-0 w-1 h-24 bg-gradient-to-b from-white/80 to-transparent rounded-full"></div>
                
                <div className="space-y-6">
                  <h2 className="font-bold text-white text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                    Ebdaa Falcon Company
                  </h2>
                  <div className="relative">
                    {/* Subtle decorative element */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-white/60 rounded-full"></div>
                    <p className="text-white text-lg md:text-xl leading-relaxed pr-6 drop-shadow-md">
                      {t('vision.rightDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

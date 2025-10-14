'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

export function VisionSection() {
  const { t } = useLanguage();
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Section: OUR VISION */}
      <div className="relative bg-[#716106] py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <FadeInOnScroll direction="left" delay={0.2}>
              <div className="space-y-6">
                <h2 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight">
                  {t('vision.title')}
                </h2>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  {t('vision.leftDescription')}
                </p>
              </div>
            </FadeInOnScroll>
            
            {/* Right Image */}
            <ParallaxWrapper speed={0.3} direction="right">
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-yellow-400">
                  <Image 
                    src="/vision.png"
                    alt="Vision 2030 and Saudi Leadership"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ParallaxWrapper>
          </div>
        </div>
      </div>

      {/* Bottom Section: Ebdaa Falcon Company */}
      <div className="relative bg-[#716106] py-20 md:py-32">
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <ParallaxWrapper speed={0.3} direction="left">
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-yellow-300">
                  <Image 
                    src="/vision2.png"
                    alt="Mosaed M. Al-Jhail Chairman"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </ParallaxWrapper>
            
            {/* Right Content */}
            <FadeInOnScroll direction="right" delay={0.4}>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="font-bold text-white text-3xl md:text-5xl lg:text-6xl leading-tight">
                  Ebdaa Falcon Company
                </h2>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  {t('vision.rightDescription')}
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

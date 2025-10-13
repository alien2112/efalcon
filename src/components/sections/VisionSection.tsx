'use client';

import Image from 'next/image';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

export function VisionSection() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Section: OUR VISION */}
      <div className="relative bg-[#716106] py-20 md:py-32 mt-16 md:mt-24">
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
                  OUR VISION
                </h2>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  My foremost goal is for our nation to be a successful model and a leader in the world at all levels, and I will work with you to achieve that. - The Custodian of the Two Holy Mosques, King Salman bin Abdulaziz Al Saud
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
                  Is a company that has been deals with international companies in the field of oil and gas, Petroleum derivatives, sea ports and logistics services. It aims reach to the highest levels of excellence And the superior service that meets your needs. Is involved in storing, transporting and trading petroleum products. It is the first company in logistics services. We represent international companies in the field of oil and gas derivatives, alternative energies and water desalination. - Mosaed M. Al-Jhail Chairman of Board & Chief Executive
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

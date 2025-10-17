'use client';

import { HeroSection } from '../sections/HeroSection';
import { VisionSection } from '../sections/VisionSection';
import { ServicesSection } from '../sections/ServicesSection';
import { WorkSection } from '../sections/WorkSection';
import { PresenceSection } from '../sections/PresenceSection';
import { HomeContactForm } from '../sections/HomeContactForm';
import { Navigation } from '../Navigation';
import { WaveSeparator } from '../WaveSeparator';
import { useLanguage } from '@/contexts/LanguageContext';

export function HomePage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Navigation currentSection="home" onNavigate={() => {}} />
      <main>
        <HeroSection />
        <WaveSeparator variant="wave" animate={true} />
        {/* Main sections with metallic golden gradient background */}
        <div
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #D4AF37 0%, #B8860B 50%, #CD853F 100%)'
          }}
        >
          {/* Metallic shimmer overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5"></div>
          </div>
          
          {/* Metallic texture pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 1px 1px, rgba(255,215,0,0.2) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px, 20px 20px, 40px 40px'
          }}></div>
          
          {/* Metallic glow effects */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent"></div>
          
          <VisionSection />
          <ServicesSection />
          <WorkSection />
          <PresenceSection />
        </div>
        {/* Contact section container background */}
        <div
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #fff9e9 0%, #f9f3df 100%)'
          }}
        >
          {/* Subtle background pattern and glow (match Contact Us page) */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 2px 2px, rgba(239,193,50,0.28) 1px, transparent 0)',
                backgroundSize: '26px 26px'
              }}
            />
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(239,193,50,0.16), rgba(239,193,50,0.0))'
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(239,193,50,0.08), rgba(255,255,255,0))'
              }}
            />
          </div>
          <HomeContactForm />
        </div>
      </main>
    </>
  );
}

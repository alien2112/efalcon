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
        <VisionSection />
        <ServicesSection />
        <WorkSection />
        <PresenceSection />
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

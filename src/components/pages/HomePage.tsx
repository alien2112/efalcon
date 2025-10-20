'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { VisionSection } from '../sections/VisionSection';
import { Navigation } from '../Navigation';
import { WaveSeparator } from '../WaveSeparator';
import { useLanguage } from '@/contexts/LanguageContext';

// Dynamic imports with loading states
const ServicesSection = dynamic(() => import('../sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="h-64 md:h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse rounded-lg" />,
  ssr: false
});

const WorkSection = dynamic(() => import('../sections/WorkSection').then(mod => ({ default: mod.WorkSection })), {
  loading: () => <div className="h-64 md:h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse rounded-lg" />,
  ssr: false
});

const PresenceSection = dynamic(() => import('../sections/PresenceSection').then(mod => ({ default: mod.PresenceSection })), {
  loading: () => <div className="h-64 md:h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse rounded-lg" />,
  ssr: false
});

const HomeContactForm = dynamic(() => import('../sections/HomeContactForm').then(mod => ({ default: mod.HomeContactForm })), {
  loading: () => <div className="h-48 md:h-64 bg-gradient-to-br from-yellow-50 to-yellow-100 animate-pulse rounded-lg" />,
  ssr: false
});

export function HomePage() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <>
      <Navigation currentSection="home" onNavigate={() => {}} />
      <main>
        <HeroSection />
        <WaveSeparator variant="wave" animate={true} />
        
        {/* Main sections with metallic golden gradient background */}
        <div
          className="relative"
          style={{
            background: 'linear-gradient(90deg, #F9F295 0%, #E0AA3E 50%, #B88A44 100%)'
          }}
        >
          {/* Metallic shimmer overlay */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5"></div>
          </div>
          
          {/* Metallic texture pattern - hidden on mobile, visible on md and up */}
          <div className="absolute inset-0 opacity-15 hidden md:block pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 1px 1px, rgba(255,215,0,0.2) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px, 20px 20px, 40px 40px'
          }}></div>
          
          {/* Metallic glow effects */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent pointer-events-none"></div>
          
          <VisionSection />
          <ServicesSection />
          <WorkSection />
          <PresenceSection />
        </div>
        
        {/* Contact section container background */}
        <div
          className="relative"
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

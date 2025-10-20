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
    <div className="home-page-wrapper">
      <Navigation currentSection="home" onNavigate={() => {}} />
      
      <main className="home-page-main">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Wave Separator */}
        <WaveSeparator variant="wave" animate={true} />
        
        {/* Main Content Sections */}
        <div className="main-sections-container">
          {/* Golden Gradient Background */}
          <div 
            className="main-sections-background"
            style={{
              background: 'linear-gradient(90deg, #F9F295 0%, #E0AA3E 50%, #B88A44 100%)'
            }}
          >
            {/* Metallic shimmer overlay */}
            <div className="shimmer-overlay">
              <div className="shimmer-gradient-1" />
              <div className="shimmer-gradient-2" />
            </div>
            
            {/* Metallic texture pattern - hidden on mobile */}
            <div 
              className="metallic-pattern hidden md:block"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at 1px 1px, rgba(255,215,0,0.2) 1px, transparent 0)
                `,
                backgroundSize: '20px 20px, 20px 20px, 40px 40px'
              }}
            />
            
            {/* Metallic glow effects */}
            <div className="glow-top" />
            <div className="glow-bottom" />
          </div>

          {/* Content Sections */}
          <div className="sections-content">
            <VisionSection />
            <ServicesSection />
            <WorkSection />
            <PresenceSection />
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section-container">
          {/* Contact Background */}
          <div 
            className="contact-background"
            style={{
              background: 'linear-gradient(180deg, #fff9e9 0%, #f9f3df 100%)'
            }}
          >
            {/* Background pattern and glow */}
            <div className="contact-decorations">
              {/* Dot pattern */}
              <div
                className="contact-dots"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(239,193,50,0.28) 1px, transparent 0)',
                  backgroundSize: '26px 26px'
                }}
              />
              
              {/* Radial glow */}
              <div
                className="contact-glow"
                style={{
                  background: 'radial-gradient(closest-side, rgba(239,193,50,0.16), rgba(239,193,50,0.0))'
                }}
              />
              
              {/* Gradient overlay */}
              <div
                className="contact-gradient"
                style={{
                  background: 'linear-gradient(180deg, rgba(239,193,50,0.08), rgba(255,255,255,0))'
                }}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-content">
            <HomeContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}

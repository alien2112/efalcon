'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { PresenceSection } from '@/components/sections/PresenceSection';
import { HomeContactForm } from '@/components/sections/HomeContactForm';
import { WaveAnimation } from '@/components/WaveAnimation';
import { GlassSeparator } from '@/components/GlassSeparator';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const presenceRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      vision: visionRef,
      services: servicesRef,
      work: workRef,
      presence: presenceRef,
      contact: contactRef
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect which section is in view (only after animation is complete)
  useEffect(() => {
    const handleScroll = () => {
      if (!animationComplete) return; // Don't update section until animation is complete
      
      const sections = [
        { name: 'hero', ref: heroRef },
        { name: 'vision', ref: visionRef },
        { name: 'services', ref: servicesRef },
        { name: 'work', ref: workRef },
        { name: 'presence', ref: presenceRef },
        { name: 'contact', ref: contactRef }
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationComplete]);

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Navigation */}
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />

      {/* Hero Section */}
      <div ref={heroRef} id="hero">
        <HeroSection onAnimationComplete={() => setAnimationComplete(true)} />
      </div>

      {/* Glass Separator */}
      <GlassSeparator />

      {/* Vision Section */}
      <div ref={visionRef} id="vision">
        <VisionSection />
      </div>

      {/* Glass Separator */}
      <GlassSeparator />

      {/* Services Section */}
      <div ref={servicesRef} id="services">
        <ServicesSection />
      </div>

      {/* Glass Separator */}
      <GlassSeparator />

      {/* Work Section */}
      <div ref={workRef} id="work">
        <WorkSection />
      </div>

      {/* Glass Separator */}
      <GlassSeparator />

      {/* Presence Section */}
      <div ref={presenceRef} id="presence">
        <PresenceSection />
      </div>

      {/* Contact Form Section */}
      <div ref={contactRef} id="contact">
        <HomeContactForm />
      </div>

    </div>
  );
}
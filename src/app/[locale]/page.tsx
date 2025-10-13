'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { VisionSection } from '@/components/sections/VisionSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WaveAnimation } from '@/components/WaveAnimation';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      vision: visionRef,
      services: servicesRef,
      work: workRef,
      about: aboutRef
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
        { name: 'about', ref: aboutRef }
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
      {/* Navigation */}
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />

      {/* Hero Section */}
      <div ref={heroRef} id="hero">
        <HeroSection onAnimationComplete={() => setAnimationComplete(true)} />
      </div>

      {/* Vision Section */}
      <div ref={visionRef} id="vision">
        <VisionSection />
      </div>

      {/* Services Section */}
      <div ref={servicesRef} id="services">
        <ServicesSection />
      </div>

      {/* Work Section */}
      <div ref={workRef} id="work">
        <WorkSection />
      </div>

      {/* About Section */}
      <div ref={aboutRef} id="about">
        <AboutSection />
      </div>

      {/* Footer */}
      <footer className="bg-[#716106] py-8 md:py-12 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="mb-6">
            <Image 
              src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
              alt="Ebdaa Falcon Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] mb-4">
            © 2025 Ebdaa Falcon. All rights reserved.
          </p>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">
            Excellence in Energy, Logistics & Sustainability
          </p>
        </div>
      </footer>
    </div>
  );
}
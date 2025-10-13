'use client';

import { Navigation } from '@/components/Navigation';
import { ContactHero } from '@/components/sections/ContactHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { ContactMap } from '@/components/sections/ContactMap';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function ContactRoute() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState('hero');

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      form: formRef,
      info: infoRef,
      map: mapRef
    };
    const targetRef = refs[section];
    if (targetRef?.current) targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!animationComplete) return;
      const sections = [
        { name: 'hero', ref: heroRef },
        { name: 'form', ref: formRef },
        { name: 'info', ref: infoRef },
        { name: 'map', ref: mapRef }
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
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />
      <div ref={heroRef} id="hero">
        <ContactHero onAnimationComplete={() => setAnimationComplete(true)} />
      </div>
      <div ref={formRef} id="form">
        <ContactForm />
      </div>
      <div ref={infoRef} id="info">
        <ContactInfo />
      </div>
      <div ref={mapRef} id="map">
        <ContactMap />
      </div>
    </div>
  );
}



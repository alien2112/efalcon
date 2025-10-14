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
        <HomeContactForm />
      </main>
    </>
  );
}

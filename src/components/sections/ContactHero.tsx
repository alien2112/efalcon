'use client';

import { useEffect } from 'react';
import { Banner } from '@/components/Banner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactHeroProps {
  onAnimationComplete?: () => void;
}

export function ContactHero({ onAnimationComplete }: ContactHeroProps) {
  const { t } = useLanguage();
  
  useEffect(() => {
    if (onAnimationComplete) onAnimationComplete();
  }, [onAnimationComplete]);

  return (
    <Banner 
      title={t('contact.hero.contactTitle') || 'Contact Us'}
      subtitle={t('contact.hero.contactSubtitle') || "We'd love to hear from you"}
      backgroundImage="/ourservicesbanner.webp"
    />
  );
}

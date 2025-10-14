'use client';

import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { AboutUsPage } from '@/components/sections/AboutUsPage';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutUsPageRoute() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <Navigation currentSection="aboutUs" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title={t('aboutUs.hero.title') || 'About Ebdaa Falcon'}
          subtitle={t('aboutUs.hero.subtitle') || 'Delivering excellence in energy, logistics and sustainable growth across the Middle East and beyond.'}
          breadcrumbs={[
            { label: t('navigation.home') || 'Home', href: '/' },
            { label: t('navigation.aboutUs') || 'About Us' }
          ]}
          backgroundImage="/about%20us%20banner%20.jpg"
        />
      </div>

      {/* About Us Page Content */}
      <AboutUsPage />
    </div>
  );
}

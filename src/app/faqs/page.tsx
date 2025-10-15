'use client';

import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FAQSection } from '@/components/sections/FAQSection';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation currentSection="faqs" onNavigate={() => {}} />
      <div className="pt-[103px]">
        <Banner
          title={t('faqs.hero.title') || 'Frequently Asked Questions'}
          subtitle={t('faqs.hero.subtitle') || 'Answers about our services, operations, and how to work with us'}
          breadcrumbs={[
            { label: t('navigation.home') || 'Home', href: '/' },
            { label: t('footer.links.faqs') || 'FAQs' }
          ]}
          backgroundImage="/ourservicesbanner.webp"
          page="faqs"
          useDynamicImages={true}
          isSlider={true}
        />

        <FAQSection />
      </div>
    </div>
  );
}





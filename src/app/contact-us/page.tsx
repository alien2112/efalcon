'use client';

import { Navigation } from '@/components/Navigation';
import { ContactHero } from '@/components/sections/ContactHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { ContactMap } from '@/components/sections/ContactMap';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactUsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="contact" onNavigate={() => {}} />
      
      {/* Contact Content */}
      <div className="pt-[103px]">
        <ContactHero />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
          </div>
        </div>
        <ContactMap />
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ContactMap() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={mapRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#EFC132] mb-4">
            {t('contact.map.title') || 'Our Location'}
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">
            {t('contact.map.subtitle') || 'Find us easily on the map below.'}
          </p>
        </div>

        {/* Map Container */}
        <div className="relative w-full">
          <div 
            className={`w-full h-[500px] md:h-[600px] bg-gray-200 rounded-lg overflow-hidden transition-all duration-1000 ${
              isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
            }`}
            style={{ minHeight: '500px' }}
          >
            {/* Real Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee2b5b5b5b5b5%3A0x3e2ee2b5b5b5b5b5!2sKing%20Fahd%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1640000000000!5m2!1sen!2ssa"
              width="100%"
              height="100%"
              style={{ 
                border: 0,
                width: '100%',
                height: '100%',
                minHeight: '500px',
                display: 'block'
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ebdaa Falcon Location - King Fahed Road, Riyadh"
            />
          </div>

          {/* Map Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 md:max-w-sm">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 border border-white/20">
              <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] md:text-[18px] text-[#EFC132] mb-3">
                {t('contact.map.contactDetails') || 'Contact Details'}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#EFC132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[13px] md:text-[14px] text-gray-600">
                    {t('contact.map.address') || 'King Fahed Road, Riyadh'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#EFC132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-['ADLaM_Display:Regular',_sans-serif] text-[13px] md:text-[14px] text-gray-600">
                    {t('contact.map.hours') || 'Sunday - Thursday: 8:00 AM - 5:00 PM'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-[#EFC132] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+966565145666"
                    className="font-['ADLaM_Display:Regular',_sans-serif] text-[13px] md:text-[14px] text-gray-600 hover:text-[#EFC132] transition-colors"
                  >
                    {t('contact.map.phone') || '+966 56 514 5666'}
                  </a>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=King+Fahd+Rd%2C+Riyadh%2C+Saudi+Arabia"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full bg-[#EFC132] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#5a4f05] transition-colors text-center block text-[13px] md:text-[14px]"
              >
                {t('contact.map.getDirections') || 'Get Directions'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

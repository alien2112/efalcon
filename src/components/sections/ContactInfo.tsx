'use client';

import { useState, useEffect, useRef } from 'react';

interface ContactInfoItem {
  id: string;
  icon: string;
  title: string;
  titleAr: string;
  value: string;
  valueAr: string;
  link?: string;
}

export function ContactInfo() {
  const [infoItems, setInfoItems] = useState<ContactInfoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const infoRef = useRef<HTMLDivElement>(null);

  const sampleInfoItems: ContactInfoItem[] = [
    {
      id: '1',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      title: 'Phone',
      titleAr: 'الهاتف',
      value: '+966 56 514 5666',
      valueAr: '+966 56 514 5666',
      link: 'tel:+966565145666'
    },
    {
      id: '2',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Email',
      titleAr: 'البريد الإلكتروني',
      value: 'info@ebdaafalcon.com',
      valueAr: 'info@ebdaafalcon.com',
      link: 'mailto:info@ebdaafalcon.com'
    },
    {
      id: '3',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Address',
      titleAr: 'العنوان',
      value: 'King Fahed Road, Riyadh',
      valueAr: 'طريق الملك فهد، الرياض'
    },
    {
      id: '4',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Business Hours',
      titleAr: 'ساعات العمل',
      value: 'Sunday - Thursday: 8:00 AM - 5:00 PM',
      valueAr: 'الأحد - الخميس: 8:00 صباحاً - 5:00 مساءً'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoItems(sampleInfoItems);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={infoRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#716106] mb-4">
            Contact Information
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">
            Reach us through the details below. We&apos;re here to help.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {infoItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#716106] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5a4f05] transition-colors duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] text-[#716106] mb-2 group-hover:text-[#5a4f05] transition-colors">
                  {item.title}
                </h3>

                {item.link ? (
                  <a
                    href={item.link}
                    className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 hover:text-[#716106] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#716106] to-[#5a4f05] rounded-lg p-8 md:p-12 text-white">
            <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] mb-4">
              Need More Details?
            </h3>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] mb-6 max-w-[600px] mx-auto">
              Call or email us and our team will assist you promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+966565145666"
                className="bg-white text-[#716106] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform"
              >
                Call Us
              </a>
              <a
                href="mailto:info@ebdaafalcon.com"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#716106] transition-colors duration-300 hover:scale-105 transform"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

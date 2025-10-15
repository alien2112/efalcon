'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  postCount: number;
  color: string;
}

export function BlogCategories() {
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const sampleCategories: Category[] = [
    {
      id: '1',
      name: 'Sustainable Energy',
      nameAr: 'الطاقة المستدامة',
      description: 'Latest developments in renewable energy and sustainability',
      descriptionAr: 'أحدث التطورات في مجال الطاقة المتجددة والاستدامة',
      postCount: 12,
      color: 'bg-green-500'
    },
    {
      id: '2',
      name: 'Logistics Services',
      nameAr: 'الخدمات اللوجستية',
      description: 'Innovation in marine and inland logistics solutions',
      descriptionAr: 'الابتكار في الحلول اللوجستية البحرية والداخلية',
      postCount: 8,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Government Policy',
      nameAr: 'السياسات الحكومية',
      description: 'Impact of government policies on energy sector',
      descriptionAr: 'تأثير السياسات الحكومية على قطاع الطاقة',
      postCount: 6,
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Water Technology',
      nameAr: 'تقنيات المياه',
      description: 'Advanced water desalination and treatment technologies',
      descriptionAr: 'تقنيات تحلية ومعالجة المياه المتطورة',
      postCount: 9,
      color: 'bg-cyan-500'
    },
    {
      id: '5',
      name: 'International Partnerships',
      nameAr: 'الشراكات الدولية',
      description: 'Global partnerships and collaborations in energy sector',
      descriptionAr: 'الشراكات والتعاون العالمي في قطاع الطاقة',
      postCount: 7,
      color: 'bg-orange-500'
    },
    {
      id: '6',
      name: 'Sustainable Transportation',
      nameAr: 'النقل المستدام',
      description: 'Future of sustainable transportation and logistics',
      descriptionAr: 'مستقبل النقل واللوجستيات المستدامة',
      postCount: 5,
      color: 'bg-teal-500'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCategories(sampleCategories);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={categoriesRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#EFC132] mb-4">{t('blog.categories.title') || 'Categories'}</h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">{t('blog.categories.subtitle') || 'Browse topics across energy, logistics, sustainability, and more.'}</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Category Icon */}
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>

                {/* Category Content */}
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] text-[#EFC132] mb-3 group-hover:text-[#5a4f05] transition-colors">
                  {language === 'ar' ? category.nameAr : category.name}
                </h3>

                <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 line-clamp-2">
                  {language === 'ar' ? category.descriptionAr : category.description}
                </p>

                {/* Post Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.postCount} {t('blog.categories.posts') || 'posts'}</span>
                  <svg className="w-5 h-5 text-[#EFC132] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#EFC132] to-[#5a4f05] rounded-lg p-8 md:p-12 text-white">
            <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] mb-4">{t('blog.categories.subscribe.title') || 'Subscribe for updates'}</h3>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] mb-6 max-w-[600px] mx-auto">{t('blog.categories.subscribe.subtitle') || 'Get the latest insights delivered to your inbox.'}</p>
            <button className="bg-white text-[#EFC132] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">{t('blog.categories.subscribe.button') || 'Subscribe'}</button>
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

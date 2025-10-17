'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { services } from '@/lib/services';
import { useLanguage } from '@/contexts/LanguageContext';

interface DynamicService {
  _id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  features: {
    en: string[];
    ar: string[];
  };
  content: {
    en: string;
    ar: string;
  };
  detailedContent: {
    en: string;
    ar: string;
  };
  galleryImages: string[];
  benefits: {
    en: string[];
    ar: string[];
  };
  category: string;
  isActive: boolean;
  order: number;
  pdfUrl?: string;
}

export default function ServiceDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams<{ slug: string }>();
  const [dynamicService, setDynamicService] = useState<DynamicService | null>(null);
  const [loading, setLoading] = useState(true);
  
  const staticService = useMemo(() => services.find(s => s.slug === params.slug), [params.slug]);

  // Fetch dynamic service if not found in static services
  useEffect(() => {
    const fetchDynamicService = async () => {
      if (staticService) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/services/${params.slug}`);
        const result = await response.json();
        if (result.success) {
          setDynamicService(result.data);
        }
      } catch (error) {
        console.error('Error fetching dynamic service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicService();
  }, [params.slug, staticService]);

  const service = staticService || dynamicService;
  const isMotorOil = service?.slug === 'engine-oils';

  if (loading) {
    return (
      <div className="size-full overflow-y-auto overflow-x-hidden">
        <Navigation currentSection="services" onNavigate={() => {}} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 text-white">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="size-full overflow-y-auto overflow-x-hidden">
        <Navigation currentSection="services" onNavigate={() => {}} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 text-white">
          <h1 className="text-2xl mb-4">{t('notFound.title') || 'Service not found'}</h1>
          <Link href="/services" className="underline">{t('notFound.goBack') || 'Back to Services'}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Hero banner using clicked service image */}
      <section className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden">
        <Image 
          src={service.imageUrl} 
          alt={service.title} 
          fill 
          className="object-cover" 
          priority 
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[40px] md:text-[64px] mb-3">
              {staticService 
                ? (t(`services.detail.${service.slug}.title`) || service.title)
                : service.title[language]
              }
            </h1>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] max-w-[900px] mx-auto">
              {staticService 
                ? (t(`services.detail.${service.slug}.summary`) || service.summary)
                : service.summary[language]
              }
            </p>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {(staticService ? service.features : service.features[language]).map((f, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-[14px] p-5 shadow-sm">
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[#EFC132] text-[18px] md:text-[20px]">
                  {staticService 
                    ? (t(`services.detail.${service.slug}.features.${f.toLowerCase().replace(/\s/g, '')}`) || f)
                    : f
                  }
                </h3>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 mt-2 text-[14px] md:text-[16px]">
                  {staticService 
                    ? `${(t(`services.detail.${service.slug}.title`) || service.title)} ${t('services.detail.includes') || 'includes'}: ${(t(`services.detail.${service.slug}.features.${f.toLowerCase().replace(/\s/g, '')}`) || f)} ${t('services.detail.asPartOf') || 'as part of our comprehensive offering'}.`
                    : `${service.title[language]} includes: ${f} as part of our comprehensive offering.`
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & details */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Detailed Content */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            <div className="md:col-span-2 bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
              <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-4">{t('services.detail.overview') || 'Overview'}</h2>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed mb-6">
                {staticService 
                  ? (t(`services.detail.${service.slug}.content`) || service.content)
                  : service.content[language]
                }
              </p>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] md:text-[24px] text-[#EFC132] mb-4">{t('services.detail.detailedInformation') || 'Detailed Information'}</h3>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed">
                {staticService 
                  ? (t(`services.detail.${service.slug}.detailedContent`) || service.detailedContent)
                  : service.detailedContent[language]
                }
              </p>
            </div>
            <aside className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-8">
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[18px] md:text-[22px] text-[#EFC132] mb-3">{t('services.detail.whyEbdaaFalcon') || 'Why Ebdaa Falcon'}</h3>
              <ul className="list-disc pl-5 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700">
                <li>{t('services.detail.whyEbdaaFalconList.experiencedOperations') || 'Experienced operations team'}</li>
                <li>{t('services.detail.whyEbdaaFalconList.safetyCompliance') || 'Safety and compliance first'}</li>
                <li>{t('services.detail.whyEbdaaFalconList.provenPartnerNetwork') || 'Proven partner network'}</li>
                <li>{t('services.detail.whyEbdaaFalconList.saudiVisionAligned') || 'Saudi Vision 2030 aligned'}</li>
              </ul>

              {(!staticService && (service as any).pdfUrl) && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const pdfUrl = (service as any).pdfUrl;
                    if (pdfUrl) {
                      window.open(pdfUrl, '_blank');
                    }
                  }}
                  className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#EFC132] text-white hover:bg-[#cda61f] transition-colors w-full text-center cursor-pointer"
                >
                  {t('common.downloadPdf') || 'Download PDF'}
                </button>
              )}
            </aside>
          </div>

          {/* Benefits Section */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10 mb-12">
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-6 text-center">{t('services.detail.keyBenefits') || 'Key Benefits'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(staticService ? service.benefits : service.benefits[language]).map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#EFC132] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">
                    {staticService 
                      ? (t(`services.detail.${service.slug}.benefits.${index}`) || benefit)
                      : benefit
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-6 text-center">{t('services.detail.serviceGallery') || 'Service Gallery'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.galleryImages.map((image, index) => (
                <div key={index} className="group relative h-[200px] md:h-[250px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image 
                    src={image} 
                    alt={`${staticService ? service.title : service.title[language]} - Image ${index + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-4 md:px-8 mt-8">
            <Link href="/services" className="text-[#EFC132] underline font-['ADLaM_Display:Regular',_sans-serif]">← {t('navigation.backToServices') || 'Back to Services'}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}



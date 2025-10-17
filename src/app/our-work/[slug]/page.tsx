'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
import { ServiceCardAnimation, AnimatedSeparator, FloatingIcon, GlowingBackground } from '@/components/animations/ServiceCardAnimation';
import { StaggeredReveal, MagneticCard, PulseGlow, TypewriterText } from '@/components/animations/StaggeredReveal';
import { useLanguage } from '@/contexts/LanguageContext';

// Work projects data - using kebab-case slugs for URLs but camelCase for translation keys
const workProjects = [
  {
    id: 'petroleumStorageFacility',
    slug: 'petroleum-storage-facility',
    translationKey: 'petroleum-storage-facility',
    imageUrl: '/gallery/oil%20extraction.webp',
    year: '2023',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/oil%20extraction.webp', '/gallery/engine%20oil%20.webp', '/gallery/engine%20oil%201%20detial.webp']
  },
  {
    id: 'tradingOperations',
    slug: 'trading-operations',
    translationKey: 'trading-operations',
    imageUrl: '/gallery/solar%20panels.webp',
    year: '2023',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/solar%20panels.webp', '/gallery/wind%20genrators.webp', '/gallery/electric.webp']
  },
  {
    id: 'refineryIntegration',
    slug: 'refinery-integration',
    translationKey: 'refinery-integration',
    imageUrl: '/gallery/wind%20genrators.webp',
    year: '2022',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/wind%20genrators.webp', '/gallery/oil%20extraction.webp', '/gallery/logistic%20.webp']
  },
  {
    id: 'marinePortExpansion',
    slug: 'marine-port-expansion',
    translationKey: 'marine-port-expansion',
    imageUrl: '/gallery/logistic%20.webp',
    year: '2023',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/logistic%20.webp', '/gallery/electric.webp', '/gallery/solar%20panels.webp']
  },
  {
    id: 'inlandTransportationNetwork',
    slug: 'inland-transportation-network',
    translationKey: 'inland-transportation-network',
    imageUrl: '/gallery/electric.webp',
    year: '2022',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/electric.webp', '/gallery/wind%20genrators.webp', '/gallery/oil%20extraction.webp']
  },
  {
    id: 'warehousingSolutions',
    slug: 'warehousing-solutions',
    translationKey: 'warehousing-solutions',
    imageUrl: '/gallery/wind%20genrators.webp',
    year: '2023',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/wind%20genrators.webp', '/gallery/logistic%20.webp', '/gallery/electric.webp']
  }
];

interface DynamicProject {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  galleryImages: string[];
  technologies: {
    en: string[];
    ar: string[];
  };
  features: {
    en: string[];
    ar: string[];
  };
  challenges: {
    en: string[];
    ar: string[];
  };
  solutions: {
    en: string[];
    ar: string[];
  };
  results: {
    en: string[];
    ar: string[];
  };
  client: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  duration: {
    en: string;
    ar: string;
  };
  budget: {
    en: string;
    ar: string;
  };
  slug: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  pdfUrl?: string;
}

export default function WorkDetailPage() {
  const { t, language } = useLanguage();
  const params = useParams<{ slug: string }>();
  const [dynamicProject, setDynamicProject] = useState<DynamicProject | null>(null);
  const [loading, setLoading] = useState(true);
  
  const staticProject = useMemo(() => workProjects.find(p => p.slug === params.slug), [params.slug]);

  useEffect(() => {
    const fetchDynamicProject = async () => {
      if (staticProject) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        const result = await response.json();
        
        if (result.success) {
          setDynamicProject(result.data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicProject();
  }, [params.slug, staticProject]);

  const project = staticProject || dynamicProject;

  if (loading) {
    return (
      <div className="size-full overflow-y-auto overflow-x-hidden">
        <Navigation currentSection="work" onNavigate={() => {}} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EFC132] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="size-full overflow-y-auto overflow-x-hidden">
        <Navigation currentSection="work" onNavigate={() => {}} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-24 text-white">
          <h1 className="text-2xl mb-4">{t('notFound.title') || 'Project not found'}</h1>
          <Link href="/our-work" className="underline">{t('notFound.goBack') || 'Back to Our Work'}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <Navigation currentSection="work" onNavigate={() => {}} />

      {/* Hero banner using project image */}
      <section className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden">
        <Image 
          src={staticProject ? staticProject.imageUrl : project.imageUrl} 
          alt={staticProject 
            ? (t(`ourWorkPage.projects.${staticProject.translationKey}.title`) || staticProject.id)
            : (project as DynamicProject).title[language as 'en' | 'ar']
          } 
          fill 
          className="object-cover" 
          priority 
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PulseGlow className="inline-block">
              <TypewriterText 
                text={staticProject 
                  ? (t(`ourWorkPage.projects.${staticProject.translationKey}.title`) || staticProject.id)
                  : (project as DynamicProject).title[language as 'en' | 'ar']
                }
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[40px] md:text-[64px] mb-3 block"
                speed={0.08}
                delay={0.5}
              />
            </PulseGlow>
            <motion.p 
              className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] max-w-[900px] mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {staticProject 
                ? (t(`ourWorkPage.projects.${staticProject.translationKey}.description`) || 'Project description not available.')
                : (project as DynamicProject).summary[language as 'en' | 'ar']
              }
            </motion.p>
            <motion.div 
              className="flex items-center justify-center gap-4 mt-4 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <span>{staticProject ? staticProject.year : (project as DynamicProject).duration[language as 'en' | 'ar']}</span>
              <span>•</span>
              <span>
                {staticProject 
                  ? (t(`ourWorkPage.projects.${staticProject.translationKey}.location`) || 'Location not specified')
                  : (project as DynamicProject).location[language as 'en' | 'ar']
                }
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key features */}
      <GlowingBackground className="bg-gray-50 py-12 md:py-16">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.3} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <StaggeredReveal direction="up" staggerDelay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {staticProject ? (
                staticProject.features.map((featureIndex) => (
                  <ServiceCardAnimation key={featureIndex} index={parseInt(featureIndex)} delay={0.1 * parseInt(featureIndex)}>
                    <MagneticCard className="bg-white border border-gray-200 rounded-[14px] p-5 shadow-sm">
                      <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[#EFC132] text-[18px] md:text-[20px] mb-2">
                        {t(`ourWorkPage.projects.${staticProject.translationKey}.features.${featureIndex}`) || `Feature ${featureIndex}`}
                      </h3>
                      <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">
                        {(t(`ourWorkPage.projects.${staticProject.translationKey}.title`) || staticProject.id)} {t('work.detail.includes') || 'includes'}: {(t(`ourWorkPage.projects.${staticProject.translationKey}.features.${featureIndex}`) || `Feature ${featureIndex}`)} {t('work.detail.asPartOf') || 'as part of our comprehensive project delivery'}.
                      </p>
                    </MagneticCard>
                  </ServiceCardAnimation>
                ))
              ) : (
                (project as DynamicProject).features[language as 'en' | 'ar'].map((feature: string, index: number) => (
                  <ServiceCardAnimation key={index} index={index} delay={0.1 * index}>
                    <MagneticCard className="bg-white border border-gray-200 rounded-[14px] p-5 shadow-sm">
                      <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[#EFC132] text-[18px] md:text-[20px] mb-2">
                        {feature}
                      </h3>
                      <p className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">
                        {(project as DynamicProject).title[language as 'en' | 'ar']} includes: {feature} as part of our comprehensive project delivery.
                      </p>
                    </MagneticCard>
                  </ServiceCardAnimation>
                ))
              )}
            </div>
          </StaggeredReveal>
        </div>
      </GlowingBackground>

      {/* Overview & details */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          {/* Detailed Content */}
          <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-[16px] p-6 md:p-10">
              <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-4">
                {t('work.detail.overview') || 'Project Overview'}
              </h2>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed mb-6">
                {staticProject 
                  ? (t(`ourWorkPage.projects.${staticProject.translationKey}.content`) || 'Project content not available.')
                  : (project as DynamicProject).description[language as 'en' | 'ar']
                }
              </p>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] md:text-[24px] text-[#EFC132] mb-4">
                {t('work.detail.detailedInformation') || 'Detailed Information'}
              </h3>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed">
                {staticProject 
                  ? (t(`ourWorkPage.projects.${staticProject.translationKey}.detailedContent`) || 'Detailed project information not available.')
                  : (project as DynamicProject).description[language as 'en' | 'ar']
                }
              </p>
            </div>
            <aside className="bg-gray-50 border border-gray-200 rounded-[16px] p-6 md:p-8">
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[18px] md:text-[22px] text-[#EFC132] mb-3">{t('work.detail.whyEbdaaFalcon') || 'Why Ebdaa Falcon'}</h3>
              <ul className="list-disc pl-5 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700">
                <li>{t('work.detail.whyEbdaaFalconList.experiencedOperations') || 'Experienced Project Management Team'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.safetyCompliance') || 'Safety & Compliance First'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.provenPartnerNetwork') || 'Proven Partner Network'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.saudiVisionAligned') || 'Aligned with Saudi Vision 2030'}</li>
              </ul>
              
              {((project as any).pdfUrl || (staticProject as any)?.downloadUrl) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const pdfUrl = (project as any).pdfUrl || (staticProject as any).downloadUrl;
                      if (pdfUrl) {
                        window.open(pdfUrl, '_blank');
                      }
                    }}
                    className="inline-flex items-center text-[#EFC132] font-medium hover:text-[#5a4f05] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('work.detail.downloadProject') || 'Download Project Details'}
                  </button>
                </div>
              )}
            </aside>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-[16px] p-6 md:p-10 mb-12">
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-6 text-center">
              {t('work.detail.keyBenefits') || 'Key Benefits'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staticProject ? (
                staticProject.benefits.map((benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#EFC132] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">
                      {t(`ourWorkPage.projects.${staticProject.translationKey}.benefits.${benefitIndex}`)}
                    </span>
                  </div>
                ))
              ) : (
                (project as DynamicProject).results[language as 'en' | 'ar'].map((result: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-[#EFC132] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">
                      {result}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-gray-50 border border-gray-200 rounded-[16px] p-6 md:p-10">
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] text-[#EFC132] mb-6 text-center">
              {t('work.detail.projectGallery') || 'Project Gallery'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(staticProject ? staticProject.galleryImages : project.galleryImages).map((image, index) => (
                <div key={index} className="group relative h-[200px] md:h-[250px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image
                    src={image}
                    alt={staticProject 
                      ? `${t(`ourWorkPage.projects.${staticProject.translationKey}.title`)} - Image ${index + 1}`
                      : `${(project as DynamicProject).title[language as 'en' | 'ar']} - Image ${index + 1}`
                    } 
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
            <Link href="/our-work" className="text-[#EFC132] underline font-['ADLaM_Display:Regular',_sans-serif]">← {t('navigation.backToOurWork') || 'Back to Our Work'}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

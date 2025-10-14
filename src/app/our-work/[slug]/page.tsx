'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// Work projects data - using kebab-case slugs for URLs but camelCase for translation keys
const workProjects = [
  {
    id: 'petroleumStorageFacility',
    slug: 'petroleum-storage-facility',
    translationKey: 'petroleum-storage-facility',
    imageUrl: '/gallery/oil%20extraction.jpg',
    downloadUrl: '/documents/petroleum-storage-project.pdf',
    year: '2023',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/oil%20extraction.jpg', '/gallery/engine%20oil%20.jpg', '/gallery/engine%20oil%201%20detial.jpg']
  },
  {
    id: 'tradingOperations',
    slug: 'trading-operations',
    translationKey: 'trading-operations',
    imageUrl: '/gallery/solar%20panels.jpg',
    downloadUrl: '/documents/trading-operations.pdf',
    year: '2023',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/solar%20panels.jpg', '/gallery/wind%20genrators.jpg', '/gallery/electric.jpg']
  },
  {
    id: 'refineryIntegration',
    slug: 'refinery-integration',
    translationKey: 'refinery-integration',
    imageUrl: '/gallery/wind%20genrators.jpg',
    downloadUrl: '/documents/refinery-integration.pdf',
    year: '2022',
    category: 'oilGasProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/wind%20genrators.jpg', '/gallery/oil%20extraction.jpg', '/gallery/logistic%20.jpg']
  },
  {
    id: 'marinePortExpansion',
    slug: 'marine-port-expansion',
    translationKey: 'marine-port-expansion',
    imageUrl: '/gallery/logistic%20.jpg',
    downloadUrl: '/documents/marine-port-expansion.pdf',
    year: '2023',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/logistic%20.jpg', '/gallery/electric.jpg', '/gallery/solar%20panels.jpg']
  },
  {
    id: 'inlandTransportationNetwork',
    slug: 'inland-transportation-network',
    translationKey: 'inland-transportation-network',
    imageUrl: '/gallery/electric.jpg',
    downloadUrl: '/documents/inland-transportation.pdf',
    year: '2022',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/electric.jpg', '/gallery/wind%20genrators.jpg', '/gallery/oil%20extraction.jpg']
  },
  {
    id: 'warehousingSolutions',
    slug: 'warehousing-solutions',
    translationKey: 'warehousing-solutions',
    imageUrl: '/gallery/wind%20genrators.jpg',
    downloadUrl: '/documents/warehousing-solutions.pdf',
    year: '2023',
    category: 'logisticsProjects',
    features: ['0', '1', '2'],
    benefits: ['0', '1', '2'],
    galleryImages: ['/gallery/wind%20genrators.jpg', '/gallery/logistic%20.jpg', '/gallery/electric.jpg']
  }
];

export default function WorkDetailPage() {
  const { t } = useLanguage();
  const params = useParams<{ slug: string }>();
  const project = useMemo(() => workProjects.find(p => p.slug === params.slug), [params.slug]);

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
        <Image src={project.imageUrl} alt={t(`ourWorkPage.projects.${project.id}.title`) || project.id} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[40px] md:text-[64px] mb-3">{t(`ourWorkPage.projects.${project.id}.title`) || project.id}</h1>
            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[18px] max-w-[900px] mx-auto">{t(`ourWorkPage.projects.${project.id}.description`) || 'Project description not available.'}</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-white/80">
              <span>{project.year}</span>
              <span>•</span>
              <span>{t(`ourWorkPage.projects.${project.id}.location`) || 'Location not specified'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {project.features.map((featureIndex) => (
              <div key={featureIndex} className="bg-white border border-gray-200 rounded-[14px] p-5 shadow-sm">
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[#716106] text-[18px] md:text-[20px]">{t(`ourWorkPage.projects.${project.translationKey}.features.${featureIndex}`) || `Feature ${featureIndex}`}</h3>
                <p className="font-['Alice:Regular',_sans-serif] text-gray-700 mt-2 text-[14px] md:text-[16px]">
                  {(t(`ourWorkPage.projects.${project.translationKey}.title`) || project.id)} {t('work.detail.includes') || 'includes'}: {(t(`ourWorkPage.projects.${project.translationKey}.features.${featureIndex}`) || `Feature ${featureIndex}`)} {t('work.detail.asPartOf') || 'as part of our comprehensive project delivery'}.
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
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-4">{t('work.detail.overview') || 'Project Overview'}</h2>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed mb-6">{t(`ourWorkPage.projects.${project.translationKey}.content`) || 'Project content not available.'}</p>
              <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] md:text-[24px] text-[#716106] mb-4">{t('work.detail.detailedInformation') || 'Detailed Information'}</h3>
              <p className="font-['Alice:Regular',_sans-serif] text-gray-800 text-[16px] md:text-[18px] leading-relaxed">{t(`ourWorkPage.projects.${project.translationKey}.detailedContent`) || 'Detailed project information not available.'}</p>
            </div>
            <aside className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-8">
              <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] md:text-[22px] text-[#716106] mb-3">{t('work.detail.whyEbdaaFalcon') || 'Why Ebdaa Falcon'}</h3>
              <ul className="list-disc pl-5 space-y-2 font-['Alice:Regular',_sans-serif] text-gray-700">
                <li>{t('work.detail.whyEbdaaFalconList.experiencedOperations') || 'Experienced Project Management Team'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.safetyCompliance') || 'Safety & Compliance First'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.provenPartnerNetwork') || 'Proven Partner Network'}</li>
                <li>{t('work.detail.whyEbdaaFalconList.saudiVisionAligned') || 'Aligned with Saudi Vision 2030'}</li>
              </ul>
              
              {project.downloadUrl && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href={project.downloadUrl}
                    download
                    className="inline-flex items-center text-[#716106] font-medium hover:text-[#5a4f05] transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('work.detail.downloadProject') || 'Download Project Details'}
                  </a>
                </div>
              )}
            </aside>
          </div>

          {/* Benefits Section */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10 mb-12">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-6 text-center">{t('work.detail.keyBenefits') || 'Key Benefits'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.benefits.map((benefitIndex) => (
                <div key={benefitIndex} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#716106] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-['Alice:Regular',_sans-serif] text-gray-700 text-[14px] md:text-[16px]">{t(`ourWorkPage.projects.${project.translationKey}.benefits.${benefitIndex}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white border border-gray-200 rounded-[16px] p-6 md:p-10">
            <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] text-[#716106] mb-6 text-center">{t('work.detail.projectGallery') || 'Project Gallery'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.galleryImages.map((image, index) => (
                <div key={index} className="group relative h-[200px] md:h-[250px] rounded-[12px] overflow-hidden border border-gray-200">
                  <Image
                    src={image}
                    alt={`${t(`ourWorkPage.projects.${project.translationKey}.title`)} - Image ${index + 1}`} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
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
            <Link href="/our-work" className="text-[#716106] underline font-['ADLaM_Display:Regular',_sans-serif]">← {t('navigation.backToOurWork') || 'Back to Our Work'}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

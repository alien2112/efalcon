'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, ArrowRight, Search } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkProject {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  downloadUrl?: string;
  year?: string;
  location?: string;
}

interface WorkCategory {
  id: string;
  name: string;
  description: string;
  projects: WorkProject[];
}

const workCategories: WorkCategory[] = [
  {
    id: 'oilGasProjects',
    name: 'oilGasProjects',
    description: 'oilGasProjects',
    projects: [
      {
        id: 'petroleumStorageFacility',
        title: 'petroleumStorageFacility',
        description: 'petroleumStorageFacility',
        category: 'oilGasProjects',
        imageUrl: '/gallery/oil%20extraction.jpg',
        downloadUrl: '/documents/petroleum-storage-project.pdf',
        year: '2023',
        location: 'petroleumStorageFacility'
      },
      {
        id: 'tradingOperations',
        title: 'tradingOperations',
        description: 'tradingOperations',
        category: 'oilGasProjects',
        imageUrl: '/gallery/solar%20panels.jpg',
        downloadUrl: '/documents/trading-operations.pdf',
        year: '2023',
        location: 'tradingOperations'
      },
      {
        id: 'refineryIntegration',
        title: 'refineryIntegration',
        description: 'refineryIntegration',
        category: 'oilGasProjects',
        imageUrl: '/gallery/wind%20genrators.jpg',
        downloadUrl: '/documents/refinery-integration.pdf',
        year: '2022',
        location: 'refineryIntegration'
      }
    ]
  },
  {
    id: 'logisticsProjects',
    name: 'logisticsProjects',
    description: 'logisticsProjects',
    projects: [
      {
        id: 'marinePortExpansion',
        title: 'marinePortExpansion',
        description: 'marinePortExpansion',
        category: 'logisticsProjects',
        imageUrl: '/gallery/logistic%20.jpg',
        downloadUrl: '/documents/marine-port-expansion.pdf',
        year: '2023',
        location: 'marinePortExpansion'
      },
      {
        id: 'inlandTransportationNetwork',
        title: 'inlandTransportationNetwork',
        description: 'inlandTransportationNetwork',
        category: 'logisticsProjects',
        imageUrl: '/gallery/electric.jpg',
        downloadUrl: '/documents/inland-transportation.pdf',
        year: '2022',
        location: 'inlandTransportationNetwork'
      },
      {
        id: 'warehousingSolutions',
        title: 'warehousingSolutions',
        description: 'warehousingSolutions',
        category: 'logisticsProjects',
        imageUrl: '/gallery/wind%20genrators.jpg',
        downloadUrl: '/documents/warehousing-solutions.pdf',
        year: '2023',
        location: 'warehousingSolutions'
      }
    ]
  }
];

const projectHighlights = [
  {
    id: 'energySectorProjects',
    title: 'energySectorProjects',
    description: 'energySectorProjects',
    imageUrl: '/gallery/oil%20extraction.jpg',
    stats: { projects: 15, countries: 8, year: '2023' }
  },
  {
    id: 'logisticsExpansion',
    title: 'logisticsExpansion',
    description: 'logisticsExpansion',
    imageUrl: '/gallery/logistic%20.jpg',
    stats: { projects: 12, countries: 6, year: '2023' }
  },
  {
    id: 'sustainabilityInitiatives',
    title: 'sustainabilityInitiatives',
    description: 'sustainabilityInitiatives',
    imageUrl: '/gallery/solar%20panels.jpg',
    stats: { projects: 8, countries: 4, year: '2023' }
  }
];

// Helper function to convert camelCase to kebab-case
const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export default function OurWorkPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('oilGasProjects');
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentCategory = workCategories.find(cat => cat.id === activeCategory);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsFormSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="work" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title={t('ourWorkPage.title') || 'Our Work'}
          subtitle={t('ourWorkPage.subtitle') || 'Ebdaa Falcon delivers excellence through strategic projects across energy, logistics, and sustainability sectors, creating lasting impact through innovative solutions and world-class execution.'}
          breadcrumbs={[
            { label: t('navigation.home') || 'Home', href: '/' },
            { label: t('navigation.ourWork') || 'Our Work' }
          ]}
          backgroundImage="/ourworkbanner.jpg"
        />
      </div>

      {/* Work Portfolio Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6 text-center">
                {t('ourWorkPage.portfolio') || 'Our Portfolio'}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
                {t('ourWorkPage.portfolioDescription') || 'We showcase our expertise through successful projects that demonstrate our commitment to excellence, innovation, and sustainable solutions across diverse industries and regions.'}
              </p>
            </div>
          </FadeInOnScroll>

          {/* Work Category Tabs */}
          <FadeInOnScroll direction="up" delay={0.4}>
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-lg p-2 flex space-x-2">
                {workCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-md font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeCategory === category.id
                        ? 'bg-[#716106] text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-[#716106] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {t(`ourWorkPage.categories.${category.id}.name`) || category.name}
                  </button>
                ))}
          </div>
        </div>
          </FadeInOnScroll>

          {/* Work Content */}
          {currentCategory && (
            <ParallaxWrapper speed={0.2} direction="up">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
                {/* Work Info */}
                <FadeInOnScroll direction="left" delay={0.6}>
                  <div className="space-y-6">
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[36px] text-[#716106]">
                      {t(`ourWorkPage.categories.${currentCategory.id}.name`) || currentCategory.name}
                    </h3>
                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                      {t(`ourWorkPage.categories.${currentCategory.id}.description`) || currentCategory.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{t('ourWorkPage.projectsCompleted') || 'Projects Completed'}:</span>
                        <span className="ml-2 font-bold text-[#716106]">
                          <AnimatedCounter end={currentCategory.projects.length} duration={2} />
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{t('ourWorkPage.activeRegions') || 'Active Regions'}:</span>
                        <span className="ml-2">{t('ourWorkPage.regions') || 'Middle East & Africa'}</span>
                      </div>
        </div>
        </div>
                </FadeInOnScroll>

                {/* Project Cards */}
                <FadeInOnScroll direction="right" delay={0.8}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCategory.projects.map((project, index) => (
                      <div
                        key={project.id} 
                        className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group block cursor-pointer ${
                          hoveredProject === project.id ? 'scale-105' : ''
                        }`}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        onClick={() => {
                          window.location.href = `/our-work/${toKebabCase(project.id)}`;
                        }}
                      >
                        <div className="relative h-48">
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className={`object-cover transition-transform duration-300 ${
                              hoveredProject === project.id ? 'scale-110' : 'group-hover:scale-105'
                            }`}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                            hoveredProject === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            hoveredProject === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur transition-all duration-300 ${
                              hoveredProject === project.id ? 'scale-110' : ''
                            }`}>
                              <Search className="text-white" size={20} strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] text-[#716106]">
                              {t(`ourWorkPage.projects.${toKebabCase(project.id)}.title`)}
                            </h4>
                            <span className={`text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 ${
                              hoveredProject === project.id ? 'bg-[#716106] text-white' : ''
                            }`}>
                              {project.year}
                            </span>
                          </div>
                          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 leading-relaxed">
                            {t(`ourWorkPage.projects.${toKebabCase(project.id)}.description`)}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">{t(`ourWorkPage.projects.${toKebabCase(project.id)}.location`)}</span>
                            {project.downloadUrl && (
                              <a
                                href={project.downloadUrl}
                                download
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.open(project.downloadUrl, '_blank');
                                }}
                                className={`inline-flex items-center transition-all duration-300 font-['ADLaM_Display:Regular',_sans-serif] text-[12px] ${
                                  hoveredProject === project.id 
                                    ? 'text-[#8B7A0A] scale-110' 
                                    : 'text-[#716106] hover:text-[#8B7A0A]'
                                }`}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                {t('ourWorkPage.details') || 'Details'}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
          </div>
                </FadeInOnScroll>
          </div>
            </ParallaxWrapper>
          )}
        </div>
      </section>

      {/* Project Highlights Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                {t('ourWorkPage.projectHighlights') || 'Project Highlights'}
              </h2>
          </div>
          </FadeInOnScroll>

          {/* Highlights Carousel */}
          <ParallaxWrapper speed={0.3} direction="up">
            <div className="relative">
              {/* Carousel Navigation */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  {projectHighlights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHighlight(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                        currentHighlight === index ? 'bg-[#716106] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
          </div>
        </div>

              {/* Highlight Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {projectHighlights.map((highlight, index) => (
                  <FadeInOnScroll key={highlight.id} direction="up" delay={0.1 * index}>
                    <div 
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        hoveredHighlight === highlight.id ? 'scale-105' : ''
                      }`}
                      onMouseEnter={() => setHoveredHighlight(highlight.id)}
                      onMouseLeave={() => setHoveredHighlight(null)}
                    >
                      <div className="relative h-48">
                        <Image
                          src={highlight.imageUrl}
                          alt={highlight.title}
                          fill
                          className={`object-cover transition-transform duration-300 ${
                            hoveredHighlight === highlight.id ? 'scale-110' : ''
                          }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                          hoveredHighlight === highlight.id ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </div>
                      <div className="p-6">
                        <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] text-[#716106] mb-3">
                          {t(`ourWorkPage.highlights.${highlight.id}.title`) || highlight.title}
                        </h3>
                        <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 leading-relaxed mb-4">
                          {t(`ourWorkPage.highlights.${highlight.id}.description`) || highlight.description}
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className={`bg-gray-50 rounded-lg p-2 transition-all duration-300 ${
                            hoveredHighlight === highlight.id ? 'bg-[#716106]/10' : ''
                          }`}>
                            <div className={`text-lg font-bold transition-colors duration-300 ${
                              hoveredHighlight === highlight.id ? 'text-[#8B7A0A]' : 'text-[#716106]'
                            }`}>
                              <AnimatedCounter end={highlight.stats.projects} duration={1.5} delay={index * 0.1} />
                            </div>
                            <div className="text-xs text-gray-600">{t('ourWorkPage.projects') || 'Projects'}</div>
                          </div>
                          <div className={`bg-gray-50 rounded-lg p-2 transition-all duration-300 ${
                            hoveredHighlight === highlight.id ? 'bg-[#716106]/10' : ''
                          }`}>
                            <div className={`text-lg font-bold transition-colors duration-300 ${
                              hoveredHighlight === highlight.id ? 'text-[#8B7A0A]' : 'text-[#716106]'
                            }`}>
                              <AnimatedCounter end={highlight.stats.countries} duration={1.5} delay={index * 0.1 + 0.2} />
                            </div>
                            <div className="text-xs text-gray-600">{t('ourWorkPage.countries') || 'Countries'}</div>
                          </div>
                          <div className={`bg-gray-50 rounded-lg p-2 transition-all duration-300 ${
                            hoveredHighlight === highlight.id ? 'bg-[#716106]/10' : ''
                          }`}>
                            <div className={`text-lg font-bold transition-colors duration-300 ${
                              hoveredHighlight === highlight.id ? 'text-[#8B7A0A]' : 'text-[#716106]'
                            }`}>
                              {highlight.stats.year}
            </div>
                            <div className="text-xs text-gray-600">{t('ourWorkPage.year') || 'Year'}</div>
            </div>
          </div>
        </div>
              </div>
                  </FadeInOnScroll>
            ))}
          </div>
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[40px] text-[#716106] mb-6">
                {t('ourWorkPage.interested') || 'Interested in Our Work?'}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600">
                {t('ourWorkPage.interestedDescription') || "Let's discuss how we can help bring your project to life with our expertise and innovative solutions."}
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.2} direction="up">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('ourWorkPage.form.projectType') || 'Project Type'}
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400">
                      <option>{t('ourWorkPage.form.options.oilGas') || 'Oil & Gas Projects'}</option>
                      <option>{t('ourWorkPage.form.options.logistics') || 'Logistics & Marine'}</option>
                      <option>{t('ourWorkPage.form.options.sustainability') || 'Sustainability Initiatives'}</option>
                      <option>{t('ourWorkPage.form.options.consultation') || 'General Consultation'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('ourWorkPage.form.name') || 'Name'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder={t('ourWorkPage.form.placeholders.name') || 'Your Name'}
                      required
                    />
      </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ourWorkPage.form.email') || 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    placeholder={t('ourWorkPage.form.placeholders.email') || 'your.email@example.com'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('ourWorkPage.form.projectDescription') || 'Project Description'}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                    placeholder={t('ourWorkPage.form.placeholders.projectDescription') || 'Please describe your project requirements...'}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className={`px-8 py-3 rounded-lg font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center ${
                      formSubmitted 
                        ? 'bg-green-600 text-white' 
                        : 'bg-[#716106] text-white hover:bg-[#8B7A0A] hover:shadow-lg'
                    }`}
                  >
                    {isFormSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t('ourWorkPage.form.sending') || 'Sending...'}
                      </>
                    ) : formSubmitted ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t('ourWorkPage.form.sent') || 'Message Sent!'}
                      </>
                    ) : (
                      <>
                        {t('ourWorkPage.form.startDiscussion') || 'Start Project Discussion'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
              </div>
              </form>
          </div>
          </ParallaxWrapper>
        </div>
      </section>
    </div>
  );
}

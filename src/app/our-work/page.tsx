'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll } from '@/components/ParallaxWrapper';
import { ServiceCardAnimation, AnimatedSeparator, FloatingIcon, GlowingBackground } from '@/components/animations/ServiceCardAnimation';
import { StaggeredReveal, MagneticCard, PulseGlow, TypewriterText } from '@/components/animations/StaggeredReveal';
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
        imageUrl: '/gallery/oil%20extraction.webp',
        year: '2023',
        location: 'petroleumStorageFacility'
      },
      {
        id: 'tradingOperations',
        title: 'tradingOperations',
        description: 'tradingOperations',
        category: 'oilGasProjects',
        imageUrl: '/gallery/solar%20panels.webp',
        year: '2023',
        location: 'tradingOperations'
      },
      {
        id: 'refineryIntegration',
        title: 'refineryIntegration',
        description: 'refineryIntegration',
        category: 'oilGasProjects',
        imageUrl: '/gallery/wind%20genrators.webp',
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
        imageUrl: '/gallery/logistic%20.webp',
        year: '2023',
        location: 'marinePortExpansion'
      },
      {
        id: 'inlandTransportationNetwork',
        title: 'inlandTransportationNetwork',
        description: 'inlandTransportationNetwork',
        category: 'logisticsProjects',
        imageUrl: '/gallery/electric.webp',
        year: '2022',
        location: 'inlandTransportationNetwork'
      },
      {
        id: 'warehousingSolutions',
        title: 'warehousingSolutions',
        description: 'warehousingSolutions',
        category: 'logisticsProjects',
        imageUrl: '/gallery/wind%20genrators.webp',
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
    imageUrl: '/gallery/oil%20extraction.webp',
    stats: { projects: 15, countries: 8, year: '2023' }
  },
  {
    id: 'logisticsExpansion',
    title: 'logisticsExpansion',
    description: 'logisticsExpansion',
    imageUrl: '/gallery/logistic%20.webp',
    stats: { projects: 12, countries: 6, year: '2023' }
  },
  {
    id: 'sustainabilityInitiatives',
    title: 'sustainabilityInitiatives',
    description: 'sustainabilityInitiatives',
    imageUrl: '/gallery/solar%20panels.webp',
    stats: { projects: 8, countries: 4, year: '2023' }
  }
];

// Helper function to convert camelCase to kebab-case
const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export default function OurWorkPage() {
  const { t, language } = useLanguage();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
          backgroundImage="/ourworkbanner.webp"
          page="work"
          useDynamicImages={true}
          isSlider={true}
        />
      </div>

      {/* Work Portfolio Section */}
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.3} />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('ourWorkPage.portfolio') || 'Our Portfolio'}
                  className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[48px] text-[#EFC132] mb-6 text-center block"
                  speed={0.08}
                  delay={0.5}
                />
              </PulseGlow>
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {t('ourWorkPage.portfolioDescription') || 'We showcase our expertise through successful projects that demonstrate our commitment to excellence, innovation, and sustainable solutions across diverse industries and regions.'}
              </motion.p>
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
                        ? 'bg-[#EFC132] text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-[#EFC132] hover:bg-white hover:shadow-md'
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
                {/* Work Info */}
                <FadeInOnScroll direction="left" delay={0.6}>
                  <div className="space-y-6">
                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[28px] md:text-[36px] text-[#EFC132]">
                      {t(`ourWorkPage.categories.${currentCategory.id}.name`) || currentCategory.name}
                    </h3>
                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                      {t(`ourWorkPage.categories.${currentCategory.id}.description`) || currentCategory.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{t('ourWorkPage.projectsCompleted') || 'Projects Completed'}:</span>
                        <span className="ml-2 font-bold text-[#EFC132]">
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
                <StaggeredReveal direction="right" staggerDelay={0.2}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCategory.projects.map((project, index) => (
                      <ServiceCardAnimation key={project.id} index={index} delay={0.8}>
                        <MagneticCard 
                          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group block cursor-pointer touch-none select-none"
                          onDragStart={(e) => e.preventDefault()}
                          onDrag={(e) => e.preventDefault()}
                          onDragEnd={(e) => e.preventDefault()}
                          style={{ touchAction: 'none' }}
                        >
                          <div
                            onClick={() => {
                              window.location.href = `/our-work/${toKebabCase(project.id)}`;
                            }}
                            onDragStart={(e) => e.preventDefault()}
                            onDrag={(e) => e.preventDefault()}
                            onDragEnd={(e) => e.preventDefault()}
                          >
                            <div className="relative h-48 touch-none select-none" onDragStart={(e) => e.preventDefault()}>
                              <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                draggable={false}
                                className="object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Floating Search Icon Overlay */}
                              <FloatingIcon 
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                delay={0.1}
                                floatIntensity={0.5}
                              >
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur">
                                  <Search className="text-white" size={20} strokeWidth={2} />
                                </div>
                              </FloatingIcon>
                            </div>
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[18px] text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300">
                                  {t(`ourWorkPage.projects.${toKebabCase(project.id)}.title`)}
                                </h4>
                                <motion.span 
                                  className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded transition-all duration-300 group-hover:bg-[#EFC132] group-hover:text-white"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {project.year}
                                </motion.span>
                              </div>
                              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 leading-relaxed">
                                {t(`ourWorkPage.projects.${toKebabCase(project.id)}.description`)}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">{t(`ourWorkPage.projects.${toKebabCase(project.id)}.location`)}</span>
                                <FloatingIcon delay={0.2} floatIntensity={0.3}>
                                  <ArrowRight className="w-4 h-4 text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300" />
                                </FloatingIcon>
                              </div>
                            </div>
                          </div>
                        </MagneticCard>
                      </ServiceCardAnimation>
                    ))}
                  </div>
                </StaggeredReveal>
          </div>
          </motion.div>
          )}
        </div>
      </GlowingBackground>

      {/* Project Highlights Section */}
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-[#EFC132]/5 via-white to-[#FFD700]/5 relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.7} />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('ourWorkPage.projectHighlights') || 'Project Highlights'}
                  className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[48px] text-[#EFC132] mb-6 block"
                  speed={0.08}
                  delay={0.5}
                />
              </PulseGlow>
            </div>
          </FadeInOnScroll>

          {/* Highlights Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Carousel Navigation */}
              <StaggeredReveal direction="up" staggerDelay={0.1}>
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    {projectHighlights.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentHighlight(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                          currentHighlight === index ? 'bg-[#EFC132] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
              </StaggeredReveal>

              {/* Highlight Cards */}
              <StaggeredReveal direction="up" staggerDelay={0.2}>
                <div className="grid md:grid-cols-3 gap-4">
                  {projectHighlights.map((highlight, index) => (
                    <ServiceCardAnimation key={highlight.id} index={index} delay={0.1 * index}>
                      <MagneticCard 
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group touch-none select-none"
                        onDragStart={(e) => e.preventDefault()}
                        onDrag={(e) => e.preventDefault()}
                        onDragEnd={(e) => e.preventDefault()}
                        style={{ touchAction: 'none' }}
                      >
                        <div 
                          className="relative h-48 touch-none select-none" 
                          onDragStart={(e) => e.preventDefault()}
                          onDrag={(e) => e.preventDefault()}
                          onDragEnd={(e) => e.preventDefault()}
                        >
                          <Image
                            src={highlight.imageUrl}
                            alt={highlight.title}
                            fill
                            draggable={false}
                            className="object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                            quality={90}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Floating Icon Overlay */}
                          <FloatingIcon 
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            delay={0.1}
                            floatIntensity={0.5}
                          >
                            <div className="w-8 h-8 bg-[#EFC132]/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                          </FloatingIcon>
                        </div>
                        <div className="p-6">
                          <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300 mb-3">
                            {t(`ourWorkPage.highlights.${highlight.id}.title`) || highlight.title}
                          </h3>
                          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 leading-relaxed mb-4">
                            {t(`ourWorkPage.highlights.${highlight.id}.description`) || highlight.description}
                          </p>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <motion.div 
                              className="bg-gray-50 rounded-lg p-2 transition-all duration-300 group-hover:bg-[#EFC132]/10"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-lg font-bold text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300">
                                <AnimatedCounter end={highlight.stats.projects} duration={1.5} delay={index * 0.1} />
                              </div>
                              <div className="text-xs text-gray-600">{t('ourWorkPage.projectsLabel') || 'Projects'}</div>
                            </motion.div>
                            <motion.div 
                              className="bg-gray-50 rounded-lg p-2 transition-all duration-300 group-hover:bg-[#EFC132]/10"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-lg font-bold text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300">
                                <AnimatedCounter end={highlight.stats.countries} duration={1.5} delay={index * 0.1 + 0.2} />
                              </div>
                              <div className="text-xs text-gray-600">{t('ourWorkPage.countries') || 'Countries'}</div>
                            </motion.div>
                            <motion.div 
                              className="bg-gray-50 rounded-lg p-2 transition-all duration-300 group-hover:bg-[#EFC132]/10"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-lg font-bold text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300">
                                {highlight.stats.year}
                              </div>
                              <div className="text-xs text-gray-600">{t('ourWorkPage.year') || 'Year'}</div>
                            </motion.div>
                          </div>
                        </div>
                      </MagneticCard>
                    </ServiceCardAnimation>
                  ))}
                </div>
              </StaggeredReveal>
            </div>
          </motion.div>
        </div>
      </GlowingBackground>

      {/* Contact Form Section */}
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.9} />
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('ourWorkPage.interested') || 'Interested in Our Work?'}
                  className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] md:text-[40px] text-[#EFC132] mb-6 block"
                  speed={0.08}
                  delay={0.3}
                />
              </PulseGlow>
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                {t('ourWorkPage.interestedDescription') || "Let's discuss how we can help bring your project to life with our expertise and innovative solutions."}
              </motion.p>
            </div>
          </FadeInOnScroll>

          <motion.div 
              className="bg-gray-50 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ourWorkPage.form.projectType') || 'Project Type'}
                      </label>
                      <motion.select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <option>{t('ourWorkPage.form.options.oilGas') || 'Oil & Gas Projects'}</option>
                        <option>{t('ourWorkPage.form.options.logistics') || 'Logistics & Marine'}</option>
                        <option>{t('ourWorkPage.form.options.sustainability') || 'Sustainability Initiatives'}</option>
                        <option>{t('ourWorkPage.form.options.consultation') || 'General Consultation'}</option>
                      </motion.select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('ourWorkPage.form.name') || 'Name'}
                      </label>
                      <motion.input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        placeholder={t('ourWorkPage.form.placeholders.name') || 'Your Name'}
                        required
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </div>
                </StaggeredReveal>
                
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('ourWorkPage.form.email') || 'Email'}
                    </label>
                    <motion.input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder={t('ourWorkPage.form.placeholders.email') || 'your.email@example.com'}
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </StaggeredReveal>
                
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('ourWorkPage.form.projectDescription') || 'Project Description'}
                    </label>
                    <motion.textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                      placeholder={t('ourWorkPage.form.placeholders.projectDescription') || 'Please describe your project requirements...'}
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </StaggeredReveal>
                
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={isFormSubmitting}
                      className={`px-8 py-3 rounded-lg font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center ${
                        formSubmitted 
                          ? 'bg-green-600 text-white' 
                          : 'bg-[#EFC132] text-white hover:bg-[#8B7A0A] hover:shadow-lg'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isFormSubmitting ? (
                        <>
                          <motion.div 
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t('ourWorkPage.form.sending') || 'Sending...'}
                        </>
                      ) : formSubmitted ? (
                        <>
                          <motion.svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </motion.svg>
                          {t('ourWorkPage.form.sent') || 'Message Sent!'}
                        </>
                      ) : (
                        <>
                          {t('ourWorkPage.form.startDiscussion') || 'Start Project Discussion'}
                          <FloatingIcon delay={0.1} floatIntensity={0.3}>
                            {language === 'ar' ? (
                              <ArrowLeft className="w-4 h-4 mr-2" />
                            ) : (
                              <ArrowRight className="w-4 h-4 ml-2" />
                            )}
                          </FloatingIcon>
                        </>
                      )}
                    </motion.button>
                  </div>
                </StaggeredReveal>
              </form>
          </motion.div>
        </div>
      </GlowingBackground>
    </div>
  );
}

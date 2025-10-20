'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll } from '@/components/ParallaxWrapper';
import { ServiceCardAnimation, AnimatedSeparator, FloatingIcon, GlowingBackground } from '@/components/animations/ServiceCardAnimation';
import { StaggeredReveal, MagneticCard, PulseGlow, TypewriterText } from '@/components/animations/StaggeredReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { services as staticServices } from '@/lib/services';

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
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

// Service categories will be defined inside the component to access translations

// Applications will be defined inside the component to access translations

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('oil-gas');
  const [currentApplication, setCurrentApplication] = useState(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredApplication, setHoveredApplication] = useState<string | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dynamicServices, setDynamicServices] = useState<DynamicService[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic services
  useEffect(() => {
    const fetchDynamicServices = async () => {
      try {
        const response = await fetch('/api/services');
        const result = await response.json();
        if (result.success) {
          setDynamicServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching dynamic services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicServices();
  }, []);

  // Define service categories with translations
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'oil-gas',
      name: t('services.categories.oilGas') || 'Oil & Gas Solutions',
      description: t('services.categories.oilGasDescription') || 'Comprehensive petroleum storage, trading, and distribution solutions with state-of-the-art facilities and strategic partnerships.',
      services: [
        {
          id: 'oil-gas-solutions',
          name: t('services.categories.oilGasServices.petroleumDerivatives') || 'Petroleum Derivatives and Logistics Services',
          description: t('services.categories.oilGasServices.petroleumDerivativesDescription') || 'Integrated solutions in storage, transportation, and trading of petroleum derivatives',
          category: 'oil-gas',
          imageUrl: '/gallery/oil%20extraction.webp'
        },
        {
          id: 'engine-oils',
          name: t('services.categories.oilGasServices.motorOils') || 'Motor Oils',
          description: t('services.categories.oilGasServices.motorOilsDescription') || 'High-quality Saudi-made motor oils engineered for durability and peak performance',
          category: 'oil-gas',
          imageUrl: '/gallery/engine%20oil1.webp'
        }
      ]
    },
    {
      id: 'logistics',
      name: t('services.categories.logistics') || 'Logistics & Marine Services',
      description: t('services.categories.logisticsDescription') || 'Integrated logistics solutions across marine ports and inland operations with comprehensive handling and distribution services.',
      services: [
        {
          id: 'logistics-marine-services',
          name: t('services.categories.logisticsServices.logisticsMarine') || 'Logistics & Marine Services',
          description: t('services.categories.logisticsServices.logisticsMarineDescription') || 'World-class logistics across marine ports and inland operations to keep supply chains moving',
          category: 'logistics',
          imageUrl: '/gallery/logistic%20.webp'
        },
        {
          id: 'renewable-energy-desalination',
          name: t('services.categories.logisticsServices.renewableEnergy') || 'Alternative Energy & Water Desalination',
          description: t('services.categories.logisticsServices.renewableEnergyDescription') || 'Sustainable solar and wind energy solutions alongside advanced water desalination systems',
          category: 'logistics',
          imageUrl: '/gallery/solar%20panels.webp'
        }
      ]
    }
  ];

  // Define applications with translations
  const applications = [
    {
      id: 'oil-gas-solutions',
      title: t('services.applications.energySector') || 'Energy Sector',
      description: t('services.applications.energySectorDescription') || 'Comprehensive energy solutions for power generation, oil refineries, and petrochemical facilities.',
      imageUrl: '/gallery/oil%20extraction.webp'
    },
    {
      id: 'logistics-marine-services',
      title: t('services.applications.industrialManufacturing') || 'Industrial Manufacturing',
      description: t('services.applications.industrialManufacturingDescription') || 'Specialized logistics and supply chain solutions for heavy manufacturing industries.',
      imageUrl: '/gallery/logistic%20.webp'
    },
    {
      id: 'renewable-energy-desalination',
      title: t('services.applications.renewableEnergy') || 'Renewable Energy',
      description: t('services.applications.renewableEnergyDescription') || 'Supporting the transition to sustainable energy with innovative logistics and storage solutions.',
      imageUrl: '/gallery/solar%20panels.webp'
    }
  ];

  const currentCategory = serviceCategories.find(cat => cat.id === activeCategory);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-x-hidden">
      {/* Navigation */}
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title={t('services.title') || 'Our Services'}
          subtitle={t('services.subtitle') || 'Ebdaa Falcon delivers comprehensive energy, logistics, and sustainability solutions with world-class service standards and strategic partnerships across multiple industries.'}
          breadcrumbs={[
            { label: t('navigation.home') || 'Home', href: '/' },
            { label: t('navigation.services') || 'Services' }
          ]}
          page="services"
          useDynamicImages={true}
          isSlider={true}
        />
        </div>

      {/* Services Section */}
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.3} />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('services.title') || 'Our Services'}
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
                {t('services.description') || 'We provide integrated solutions across oil & gas, logistics, and renewable energy sectors, delivering excellence through strategic partnerships and innovative approaches.'}
              </motion.p>
          </div>
          </FadeInOnScroll>

          {/* Service Category Tabs */}
          <FadeInOnScroll direction="up" delay={0.4}>
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-lg p-2 flex space-x-2">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-md font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeCategory === category.id
                        ? 'bg-[#EFC132] text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-[#EFC132] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                    </div>
                  </div>
          </FadeInOnScroll>

          {/* Service Content */}
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
                {/* Service Info */}
                <FadeInOnScroll direction="left" delay={0.6}>
                  <div className="space-y-6">
                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[28px] md:text-[36px] text-[#EFC132]">
                      {currentCategory.name}
                    </h3>
                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                      {currentCategory.description}
                    </p>
                    <Link
                      href={`/services/${currentCategory.id}`}
                      className="inline-flex items-center text-[#EFC132] hover:text-[#8B7A0A] transition-colors font-['ADLaM_Display:Regular',_sans-serif] text-[16px]"
                    >
                      {t('services.learnMore') || 'Learn more about'} {currentCategory.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </FadeInOnScroll>

                {/* Service Cards */}
                <StaggeredReveal direction="right" staggerDelay={0.2}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCategory.services.map((service, index) => (
                      <ServiceCardAnimation key={service.id} index={index} delay={0.8}>
                        <MagneticCard 
                          className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden group touch-pan-y select-none"
                          onDragStart={(e) => e.preventDefault()}
                          onDrag={(e) => e.preventDefault()}
                          onDragEnd={(e) => e.preventDefault()}
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                          style={{ touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                        >
                          <Link 
                            href={`/services/${service.id}`} 
                            className="block touch-none select-none"
                            onDragStart={(e) => e.preventDefault()}
                            onDrag={(e) => e.preventDefault()}
                            onDragEnd={(e) => e.preventDefault()}
                            onMouseDown={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{ touchAction: 'pan-y', userSelect: 'none' }}
                          >
                            <div 
                              className="relative h-48 overflow-hidden touch-pan-y select-none" 
                              onDragStart={(e) => e.preventDefault()}
                              onDrag={(e) => e.preventDefault()}
                              onDragEnd={(e) => e.preventDefault()}
                              onMouseDown={(e) => e.preventDefault()}
                              onContextMenu={(e) => e.preventDefault()}
                              style={{ touchAction: 'pan-y', userSelect: 'none' }}
                            >
                              <Image
                                src={service.imageUrl}
                                alt={service.name}
                                fill
                                draggable={false}
                                className="object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                                quality={90}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
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
                          </Link>
                          <div className="p-6">
                            <Link href={`/services/${service.id}`}>
                              <h4 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] mb-3 text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300 cursor-pointer">
                                {service.name}
                              </h4>
                            </Link>
                            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 leading-relaxed">
                              {service.description}
                            </p>
                            {service.downloadUrl && (
                              <motion.button
                                onClick={() => {
                                  window.open(service.downloadUrl, '_blank');
                                }}
                                className="inline-flex items-center text-[#EFC132] hover:text-[#8B7A0A] transition-all duration-300 font-['ADLaM_Display:Regular',_sans-serif] text-[14px]"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <FloatingIcon delay={0.2} floatIntensity={0.3}>
                                  <Download className="w-4 h-4 mr-2" />
                                </FloatingIcon>
                                {t('services.downloadSpecs') || 'Download Specifications'}
                              </motion.button>
                            )}
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

      {/* Dynamic Services Section */}
      {!loading && dynamicServices.length > 0 && (
        <GlowingBackground className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Animated Separator */}
          <AnimatedSeparator className="mb-8" delay={0.5} />
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeInOnScroll direction="up" delay={0.2}>
              <div className="text-center mb-12">
                <PulseGlow className="inline-block">
                  <TypewriterText 
                    text={t('services.additionalServices') || 'Additional Services'}
                    className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[48px] text-[#EFC132] mb-6 block"
                    speed={0.08}
                    delay={0.3}
                  />
                </PulseGlow>
                <motion.p 
                  className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto text-center leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  {t('services.additionalServicesDescription') || 'Explore our expanded range of specialized services designed to meet your unique requirements.'}
                </motion.p>
              </div>
            </FadeInOnScroll>

            <StaggeredReveal direction="up" staggerDelay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dynamicServices.map((service, index) => (
                  <ServiceCardAnimation key={service._id} index={index} delay={0.4}>
                    <MagneticCard 
                      className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden group touch-pan-y select-none"
                      onDragStart={(e) => e.preventDefault()}
                      onDrag={(e) => e.preventDefault()}
                      onDragEnd={(e) => e.preventDefault()}
                      onMouseDown={(e) => e.preventDefault()}
                      onContextMenu={(e) => e.preventDefault()}
                      style={{ touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                    >
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="block touch-pan-y select-none"
                        onDragStart={(e) => e.preventDefault()}
                        onDrag={(e) => e.preventDefault()}
                        onDragEnd={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ touchAction: 'pan-y', userSelect: 'none' }}
                      >
                        <div 
                          className="relative h-48 overflow-hidden touch-pan-y select-none" 
                          onDragStart={(e) => e.preventDefault()}
                          onDrag={(e) => e.preventDefault()}
                          onDragEnd={(e) => e.preventDefault()}
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                          style={{ touchAction: 'pan-y', userSelect: 'none' }}
                        >
                          <Image
                            src={service.imageUrl}
                            alt={service.title[language]}
                            fill
                            draggable={false}
                            className="object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                            quality={90}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
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
                      </Link>
                      <div className="p-6">
                        <Link href={`/services/${service.slug}`}>
                          <h4 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] mb-3 text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300 cursor-pointer">
                            {service.title[language]}
                          </h4>
                        </Link>
                        <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 leading-relaxed">
                          {service.summary[language]}
                        </p>
                        {(service as any).pdfUrl && (
                          <motion.button
                            onClick={() => {
                              const pdfUrl = (service as any).pdfUrl;
                              if (pdfUrl) {
                                window.open(pdfUrl, '_blank');
                              }
                            }}
                            className="inline-flex items-center text-[#EFC132] group-hover:text-[#8B7A0A] transition-all duration-300 font-['ADLaM_Display:Regular',_sans-serif] text-[14px] mb-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FloatingIcon delay={0.2} floatIntensity={0.3}>
                              <Download className="w-4 h-4 mr-2" />
                            </FloatingIcon>
                            {t('services.downloadSpecs') || 'Download Specifications'}
                          </motion.button>
                        )}
                        <Link href={`/services/${service.slug}`}>
                          <motion.div 
                            className="flex items-center text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300 font-['ADLaM_Display:Regular',_sans-serif] text-[14px] cursor-pointer"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {t('services.learnMore') || 'Learn More'}
                            <FloatingIcon delay={0.1} floatIntensity={0.2}>
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </FloatingIcon>
                          </motion.div>
                        </Link>
                      </div>
                    </MagneticCard>
                  </ServiceCardAnimation>
                ))}
              </div>
            </StaggeredReveal>
          </div>
        </GlowingBackground>
      )}

      {/* Applications Section */}
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-[#EFC132]/5 via-white to-[#FFD700]/5 relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.7} />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('services.whereUsed') || 'Where Are Our Services Used?'}
                  className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[48px] text-[#EFC132] mb-6 block"
                  speed={0.08}
                  delay={0.5}
                />
              </PulseGlow>
            </div>
          </FadeInOnScroll>

          {/* Application Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative">
              {/* Carousel Navigation */}
              <StaggeredReveal direction="up" staggerDelay={0.1}>
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    {applications.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentApplication(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                          currentApplication === index ? 'bg-[#EFC132] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </div>
              </StaggeredReveal>

              {/* Application Cards */}
              <StaggeredReveal direction="up" staggerDelay={0.2}>
                <div className="grid md:grid-cols-3 gap-4">
                  {applications.map((application, index) => (
                    <ServiceCardAnimation key={application.id} index={index} delay={0.1 * index}>
                      <MagneticCard 
                        className="bg-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden group block touch-pan-y select-none"
                        onDragStart={(e) => e.preventDefault()}
                        onDrag={(e) => e.preventDefault()}
                        onDragEnd={(e) => e.preventDefault()}
                        onMouseDown={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        style={{ touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                      >
                        <Link 
                          href={`/services/${application.id}`}
                          className="block touch-pan-y select-none"
                          onDragStart={(e) => e.preventDefault()}
                          onDrag={(e) => e.preventDefault()}
                          onDragEnd={(e) => e.preventDefault()}
                          onMouseDown={(e) => e.preventDefault()}
                          onContextMenu={(e) => e.preventDefault()}
                          style={{ touchAction: 'pan-y', userSelect: 'none' }}
                        >
                          <div 
                            className="relative h-48 overflow-hidden touch-pan-y select-none" 
                            onDragStart={(e) => e.preventDefault()}
                            onDrag={(e) => e.preventDefault()}
                            onDragEnd={(e) => e.preventDefault()}
                            onMouseDown={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{ touchAction: 'pan-y', userSelect: 'none' }}
                          >
                            <Image
                              src={application.imageUrl}
                              alt={application.title}
                              fill
                              draggable={false}
                              className="object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                              quality={90}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
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
                            <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[20px] mb-3 text-[#EFC132] group-hover:text-[#8B7A0A] transition-colors duration-300">
                              {application.title}
                            </h3>
                            <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 leading-relaxed">
                              {application.description}
                            </p>
                          </div>
                        </Link>
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
      <GlowingBackground className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
        {/* Animated Separator */}
        <AnimatedSeparator className="mb-8" delay={0.9} />
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <PulseGlow className="inline-block">
                <TypewriterText 
                  text={t('contact.form.title') || 'For Inquiries'}
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
                {t('contact.form.subtitle') || 'Please contact us if you need any additional information about our services.'}
              </motion.p>
            </div>
          </FadeInOnScroll>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
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
                        {t('contact.form.fields.inquiryType') || 'Select Inquiry Type'}
                      </label>
                      <motion.select 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <option>{t('contact.form.options.general') || 'General Inquiries'}</option>
                        <option>{t('contact.form.options.product') || 'Product & Sales'}</option>
                        <option>{t('contact.form.options.procurement') || 'Procurement & Contracts'}</option>
                        <option>{t('contact.form.options.media') || 'Media Relations'}</option>
                        <option>{t('contact.form.options.careers') || 'Careers'}</option>
                      </motion.select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.fields.name') || 'Name'}
                      </label>
                      <motion.input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                        placeholder={t('contact.form.placeholders.name') || 'Your Name'}
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
                      {t('contact.form.fields.email') || 'Email'}
                    </label>
                    <motion.input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder={t('contact.form.placeholders.email') || 'your.email@example.com'}
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </StaggeredReveal>
                
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.subject') || 'Subject'}
                    </label>
                    <motion.input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder={t('contact.form.placeholders.subject') || 'Message Subject'}
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </StaggeredReveal>
                
                <StaggeredReveal direction="up" staggerDelay={0.1}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.message') || 'Your Message'}
                    </label>
                    <motion.textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EFC132] focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                      placeholder={t('contact.form.placeholders.message') || 'Please describe your inquiry...'}
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
                          {t('contact.form.sending') || 'Sending...'}
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
                          {t('contact.form.sent') || 'Message Sent!'}
                        </>
                      ) : (
                        <>
                          {t('contact.form.send') || 'Send'}
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
          </motion.div>
        </div>
      </GlowingBackground>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

interface ServiceImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  slug?: string;
}

interface FeaturedService {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  summary: {
    en: string;
    ar: string;
  };
  imageUrl: string;
  slug: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

export function ServicesSection() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredServices, setFeaturedServices] = useState<FeaturedService[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fallback services
  const fallbackServices: ServiceImage[] = [
    {
      _id: '1',
      title: "Petroleum Storage & Trading",
      description: "Comprehensive storage solutions and strategic trading of petroleum products",
      imageUrl: "/gallery/oil%20extraction.webp",
      order: 1,
      isActive: true
    },
    {
      _id: '2',
      title: "Logistics Solutions",
      description: "Integrated logistics across marine ports and inland operations",
      imageUrl: "/gallery/logistic%20.webp",
      order: 2,
      isActive: true
    },
    {
      _id: '3',
      title: "International Partnerships",
      description: "Representing global partners with world-class service standards",
      imageUrl: "/gallery/solar%20panels.webp",
      order: 3,
      isActive: true
    }
  ];

  useEffect(() => {
    const fetchFeaturedServices = async () => {
      try {
        const response = await fetch('/api/services/featured');
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          setFeaturedServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching featured services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedServices();
  }, []);

  // Combine featured services with fallback services
  const services = featuredServices.length > 0 
    ? featuredServices.map(service => ({
        _id: service._id,
        title: service.title[language],
        description: service.summary[language],
        imageUrl: service.imageUrl,
        slug: service.slug,
        order: service.order,
        isActive: service.isActive
      }))
    : fallbackServices;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="relative w-full bg-[#EFC132] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[72px] leading-[1.2] text-center text-white mb-8">
            {t('services.title') || 'Our Services'}
          </h2>
        </FadeInOnScroll>

        {/* Subtitle */}
        <FadeInOnScroll direction="up" delay={0.4}>
          <p className="font-['Alegreya_Sans_SC:Regular',_sans-serif] text-[32px] md:text-[72px] leading-[1.2] text-center text-white mb-16">
            {t('services.subtitle') || 'Driving Excellence in Energy, Logistics & Sustainability'}
          </p>
        </FadeInOnScroll>

        {/* Carousel */}
        <ParallaxWrapper speed={0.2} direction="up">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-[-50px] md:left-[-100px] top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#FFD700] transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-[-50px] md:right-[-100px] top-1/2 -translate-y-1/2 z-20 text-white hover:text-[#FFD700] transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
            </button>

            {/* Images Container */}
            <div className="relative h-[400px] md:h-[492px] flex items-center justify-center">
              {/* Side images (blurred/smaller) */}
              {services.length > 0 && (
                <div className="absolute left-0 md:left-[-100px] top-1/2 -translate-y-1/2 opacity-25 rounded-[16px] shadow-[0px_4px_4px_11px_rgba(0,0,0,0.41)] w-[150px] md:w-[297px] h-[150px] md:h-[277px]">
                  <Image
                    src={services[(currentSlide - 1 + services.length) % services.length].imageUrl}
                    alt=""
                    fill
                    className="object-cover rounded-[16px] opacity-80"
                  />
                </div>
              )}

              {/* Main center image */}
              {services.length > 0 && (
                <Link href={`/services/${services[currentSlide].slug || (() => {
                  const title = services[currentSlide].title.toLowerCase();
                  if (title.includes('petroleum') || title.includes('trading')) return 'oil-gas-solutions';
                  if (title.includes('logistics')) return 'logistics-marine-services';
                  if (title.includes('international') || title.includes('renewable') || title.includes('energy')) return 'renewable-energy-desalination';
                  if (title.includes('engine') || title.includes('motor')) return 'engine-oils';
                  return encodeURIComponent(title.replace(/\s+/g,'-'));
                })()}`} className="relative z-10 rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[300px] md:w-[762px] h-[250px] md:h-[444px] block group">
                  <Image
                    src={services[currentSlide].imageUrl}
                    alt={services[currentSlide].title}
                    fill
                    className="object-cover rounded-[16px] group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute border border-[rgba(255,255,255,0.19)] border-solid inset-0 rounded-[16px] pointer-events-none" />
                </Link>
              )}

              {/* Right side image */}
              {services.length > 0 && (
                <div className="absolute right-0 md:right-[-100px] top-1/2 -translate-y-1/2 opacity-55 rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[150px] md:w-[398px] h-[150px] md:h-[324px]">
                  <Image
                    src={services[(currentSlide + 1) % services.length].imageUrl}
                    alt=""
                    fill
                    className="object-cover rounded-[16px]"
                  />
                </div>
              )}
            </div>

            {/* Service Info */}
            {services.length > 0 && (
              <div className="mt-12 text-center">
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[36px] text-white mb-4">
                  {services[currentSlide].title}
                </h3>
                <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-white max-w-[600px] mx-auto">
                  {services[currentSlide].description}
                </p>
              <div className="mt-6">
                <Link href={`/services/${services[currentSlide].slug || (() => {
                  const title = services[currentSlide].title.toLowerCase();
                  if (title.includes('petroleum') || title.includes('trading')) return 'oil-gas-solutions';
                  if (title.includes('logistics')) return 'logistics-marine-services';
                  if (title.includes('international') || title.includes('renewable') || title.includes('energy')) return 'renewable-energy-desalination';
                  if (title.includes('engine') || title.includes('motor')) return 'engine-oils';
                  return encodeURIComponent(title.replace(/\s+/g,'-'));
                })()}`} className="text-white underline hover:text-[#FFD700] transition-colors font-['ADLaM_Display:Regular',_sans-serif]">
                    Learn more →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
}

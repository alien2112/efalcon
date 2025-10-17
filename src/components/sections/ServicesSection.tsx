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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  
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
    ? featuredServices.map(service => {
        const lang: 'en' | 'ar' = language === 'ar' ? 'ar' : 'en';
        return {
          _id: service._id,
          title: service.title[lang],
          description: service.summary[lang],
          imageUrl: service.imageUrl,
          slug: service.slug,
          order: service.order,
          isActive: service.isActive
        };
      })
    : fallbackServices;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      setTouchStartX(e.touches[0].clientX);
      setTouchDeltaX(0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null && e.touches && e.touches.length > 0) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    const SWIPE_THRESHOLD = 50; // pixels
    if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
      if (touchDeltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <div className="relative w-full bg-[#EFC132] py-20 md:py-32 overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent"></div>
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(255,215,0,0.1) 1px, transparent 0)
          `,
          backgroundSize: '50px 50px, 100px 100px',
          backgroundPosition: '0 0, 25px 25px'
        }}></div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/15 to-transparent rounded-br-3xl"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/15 to-transparent rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/15 to-transparent rounded-tr-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-white/15 to-transparent rounded-tl-3xl"></div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <div className="relative text-center mb-12">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[48px] md:text-[72px] leading-[1.2] text-white mb-8 drop-shadow-lg">
              {t('services.title') || 'Our Services'}
            </h2>
          </div>
        </FadeInOnScroll>

        {/* Subtitle */}
        <FadeInOnScroll direction="up" delay={0.4}>
          <div className="relative text-center mb-20">
            {/* Subtle decorative element */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-2 h-16 bg-white/60 rounded-full"></div>
            <p className="font-['Alegreya_Sans_SC:Regular',_sans-serif] text-[32px] md:text-[72px] leading-[1.2] text-white pl-8 drop-shadow-md">
              {t('services.subtitle') || 'Driving Excellence in Energy, Logistics & Sustainability'}
            </p>
          </div>
        </FadeInOnScroll>

        {/* Carousel */}
        <ParallaxWrapper speed={0.2} direction="up">
          <div className="relative">
            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-[-60px] md:left-[-120px] top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#EFC132] transition-colors duration-300" strokeWidth={2} />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-[-60px] md:right-[-120px] top-1/2 -translate-y-1/2 z-20 h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#EFC132] transition-colors duration-300" strokeWidth={2} />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Images Container */}
            <div
              className="relative h-[400px] md:h-[492px] flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Enhanced side images (blurred/smaller) */}
              {services.length > 0 && (
                <div className="absolute left-0 md:left-[-100px] top-1/2 -translate-y-1/2 opacity-25 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] w-[150px] md:w-[297px] h-[150px] md:h-[277px] border border-white/20 bg-white/10 backdrop-blur-sm">
                  <Image
                    src={services[(currentSlide - 1 + services.length) % services.length].imageUrl}
                    alt=""
                    fill
                    className="object-cover rounded-2xl opacity-80"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              )}

              {/* Enhanced main center image */}
              {services.length > 0 && (
                <Link href={`/services/${services[currentSlide].slug || (() => {
                  const title = services[currentSlide].title.toLowerCase();
                  if (title.includes('petroleum') || title.includes('trading')) return 'oil-gas-solutions';
                  if (title.includes('logistics')) return 'logistics-marine-services';
                  if (title.includes('international') || title.includes('renewable') || title.includes('energy')) return 'renewable-energy-desalination';
                  if (title.includes('engine') || title.includes('motor')) return 'engine-oils';
                  return encodeURIComponent(title.replace(/\s+/g,'-'));
                })()}`} className="relative z-10 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.4)] w-[300px] md:w-[762px] h-[250px] md:h-[444px] block group border-4 border-white/30 bg-white/10 backdrop-blur-sm">
                  <Image
                    src={services[currentSlide].imageUrl}
                    alt={services[currentSlide].title}
                    fill
                    className="object-cover rounded-2xl group-hover:opacity-90 transition-opacity duration-300"
                  />
                  {/* Enhanced border and overlay */}
                  <div className="absolute border border-white/40 border-solid inset-0 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )}

              {/* Enhanced right side image */}
              {services.length > 0 && (
                <div className="absolute right-0 md:right-[-100px] top-1/2 -translate-y-1/2 opacity-55 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-[150px] md:w-[398px] h-[150px] md:h-[324px] border border-white/20 bg-white/10 backdrop-blur-sm">
                  <Image
                    src={services[(currentSlide + 1) % services.length].imageUrl}
                    alt=""
                    fill
                    className="object-cover rounded-2xl"
                  />
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              )}
            </div>

            {/* Enhanced Service Info */}
            {services.length > 0 && (
              <div className="mt-16 text-center">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  {/* Decorative accent line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
                  
                  <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[36px] text-white mb-6 drop-shadow-lg">
                    {services[currentSlide].title}
                  </h3>
                  <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-white max-w-[600px] mx-auto mb-8 drop-shadow-md">
                    {services[currentSlide].description}
                  </p>
                  
                  <div className="mt-8">
                    <Link href={`/services/${services[currentSlide].slug || (() => {
                      const title = services[currentSlide].title.toLowerCase();
                      if (title.includes('petroleum') || title.includes('trading')) return 'oil-gas-solutions';
                      if (title.includes('logistics')) return 'logistics-marine-services';
                      if (title.includes('international') || title.includes('renewable') || title.includes('energy')) return 'renewable-energy-desalination';
                      if (title.includes('engine') || title.includes('motor')) return 'engine-oils';
                      return encodeURIComponent(title.replace(/\s+/g,'-'));
                    })()}`} className="group inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                      <span className="font-['ADLaM_Display:Regular',_sans-serif]">Learn more</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
}

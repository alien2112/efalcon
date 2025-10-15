'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface BannerImage {
  _id: string;
  filename: string;
  contentType: string;
  metadata: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    order: number;
    isActive: boolean;
    showTitle: boolean;
    showDescription: boolean;
    page?: string;
  };
}

interface HeroSliderProps {
  onReady?: () => void;
  autoplayMs?: number;
  page?: string; // Which page this slider is for
}

export function HeroSlider({ onReady, autoplayMs = 4500, page = 'home' }: HeroSliderProps) {
  const { t, language } = useLanguage();
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default slides as fallback
  const defaultSlides = useMemo(
    () => [
      {
        src: '/gallery/logistic .webp',
        alt: 'Logistic Image',
        title: t('hero.logisticTitle') || 'INTEGRATED LOGISTIC SOLUTION',
        description: t('hero.logisticDescription') || 
          'Provide integrated logistics solutions across marine ports and inland operations, representing international partners to ensure efficiency, reliability, and world-class service standards.',
        variant: 'image' as const
      },
      {
        src: '/gallery/oil extraction.webp',
        alt: 'Oil Station',
        title: t('hero.oilTitle') || 'LEADERS IN OIL AND GAS',
        description: t('hero.oilDescription') || 
          'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.',
        variant: 'image' as const
      },
      {
        src: '/gallery/water purification1.webp',
        alt: 'Water Desalination',
        title: t('hero.waterTitle') || 'Water Desalination',
        description: t('hero.waterDescription') || 
          'Desalination is the process of converting salt water into pure fresh water. It is suitable for drinking and daily use.',
        variant: 'image' as const
      }
    ],
    [t, language]
  );

  // Fetch banner images from API
  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch('/api/gridfs/images');
        const result = await response.json();
        
        if (result.success) {
          // Filter images for the current page and sort by order
          const pageImages = result.data
            .filter((img: BannerImage) => 
              img.metadata.isActive && 
              (img.metadata.page === page || (!img.metadata.page && page === 'home'))
            )
            .sort((a: BannerImage, b: BannerImage) => 
              (a.metadata.order || 0) - (b.metadata.order || 0)
            );
          
          setBannerImages(pageImages);
        }
      } catch (error) {
        console.error('Error fetching banner images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerImages();
  }, [page]);

  // Convert banner images to slides format
  const slides = useMemo(() => {
    if (bannerImages.length > 0) {
      return bannerImages.map(img => ({
        src: `/api/gridfs/images/${img._id}`,
        alt: language === 'ar' && img.metadata.titleAr ? img.metadata.titleAr : img.metadata.title,
        title: img.metadata.title,
        titleAr: img.metadata.titleAr || '',
        description: img.metadata.description,
        descriptionAr: img.metadata.descriptionAr || '',
        showTitle: img.metadata.showTitle !== false,
        showDescription: img.metadata.showDescription !== false,
        variant: 'image' as const
      }));
    }
    return defaultSlides;
  }, [bannerImages, defaultSlides, language]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (onReady && !isLoading) onReady();
  }, [onReady, isLoading]);

  const goTo = useCallback((nextIndex: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((nextIndex + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setIndex(prev => (prev + 1) % slides.length);
    }, Math.max(autoplayMs, 7000)); // slower autoplay
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides.length, autoplayMs]);

  // Reset timer on manual navigation
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setDirection(1);
        setIndex(prev => (prev + 1) % slides.length);
      }, Math.max(autoplayMs, 7000));
    }
  }, [slides.length, autoplayMs]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-[#EFC132] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback if no slides
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-[#EFC132] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[42px] md:text-[72px] leading-tight mb-4">
            {t('hero.title') || 'Petroleum Derivatives and Logistics Services'}
          </h1>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] leading-relaxed max-w-[900px] mx-auto">
            {t('hero.description') || 'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#EFC132] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 will-change-transform ${
            i === index
              ? 'opacity-100 z-10'
              : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{
            transition: 'opacity 700ms ease-out',
          }}
        >
          <div
            className={`absolute inset-0 ${i === index ? 'animate-slide-in' : 'animate-slide-out'}`}
            style={{
              animationDuration: '700ms',
              animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            {/* Background image */}
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={'object-cover'}
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      ))}

      {/* Foreground text content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-[1024px] mx-auto">
          {/* Title / Logo variant spacing */}
          <>
            {slides[index].showTitle && (
              <h1 
                className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[42px] md:text-[72px] leading-tight mb-4"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {language === 'ar' && slides[index].titleAr 
                  ? slides[index].titleAr 
                  : slides[index].title}
              </h1>
            )}
            {slides[index].showDescription && slides[index].description && (
              <p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] leading-relaxed max-w-[900px] mx-auto"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {language === 'ar' && slides[index].descriptionAr 
                  ? slides[index].descriptionAr 
                  : slides[index].description}
              </p>
            )}
          </>
        </div>
      </div>

      {/* Simple indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              i === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        aria-label="Previous slide"
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-colors"
      >
        <span className="block h-0.5 w-4 bg-white -rotate-45 translate-x-0.5 -translate-y-[3px]" />
        <span className="block h-0.5 w-4 bg-white rotate-45 translate-x-0.5 translate-y-[3px]" />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-colors"
      >
        <span className="block h-0.5 w-4 bg-white rotate-45 -translate-x-0.5 -translate-y-[3px]" />
        <span className="block h-0.5 w-4 bg-white -rotate-45 -translate-x-0.5 translate-y-[3px]" />
      </button>
    <style jsx>{`
      @keyframes slideInLeft {
        from { transform: translateX(${direction === 1 ? '10%' : '-10%'}); opacity: 0.6; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(${direction === 1 ? '-10%' : '10%'}); opacity: 0; }
      }
      .animate-slide-in { animation-name: slideInLeft; }
      .animate-slide-out { animation-name: slideOutLeft; }
    `}</style>
    </div>
  );
}



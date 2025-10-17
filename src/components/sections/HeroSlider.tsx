'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  // Image loading handlers
  const handleImageLoad = useCallback((imageSrc: string) => {
    setImageLoadingStates(prev => ({ ...prev, [imageSrc]: false }));
    setLoadedImages(prev => new Set([...prev, imageSrc]));
  }, []);

  const handleImageStart = useCallback((imageSrc: string) => {
    setImageLoadingStates(prev => ({ ...prev, [imageSrc]: true }));
  }, []);

  // Premium Loading Components
  const ShimmerSkeleton = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132] via-[#FFD700] to-[#EFC132] overflow-hidden">
      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(255,215,0,0.2) 1px, transparent 0)
          `,
          backgroundSize: '60px 60px, 120px 120px',
          backgroundPosition: '0 0, 30px 30px'
        }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );

  const GradientPlaceholder = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132] via-[#FFD700] to-[#8B7A0A]">
      {/* Animated gradient waves */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>
    </div>
  );

  const BlurUpPlaceholder = ({ src }: { src: string }) => (
    <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132] to-[#8B7A0A]">
      {/* Low-quality blurred version */}
      <Image
        src={src}
        alt=""
        fill
        className="object-cover blur-md scale-110"
        quality={10}
        priority={false}
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/60 via-transparent to-[#8B7A0A]/60" />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
  
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
              (img.metadata.isActive !== false) && 
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

  // Show premium loading state
  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-[#EFC132] overflow-hidden">
        {/* Premium shimmer skeleton */}
        <ShimmerSkeleton />
        
        {/* Loading content overlay */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <motion.div 
            className="max-w-[1024px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced content container with subtle backdrop */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
              
              {/* Animated loading text */}
              <motion.h1 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[42px] md:text-[72px] leading-tight mb-6 drop-shadow-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {t('hero.title') || 'Petroleum Derivatives and Logistics Services'}
              </motion.h1>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Subtle decorative element */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[#EFC132] to-transparent rounded-full opacity-60"></div>
                <motion.p 
                  className="font-['ADLaM_Display:Regular',_sans-serif] text-white/95 text-[16px] md:text-[20px] leading-relaxed max-w-[900px] mx-auto pl-6 drop-shadow-md"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  {t('hero.description') || 'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.'}
                </motion.p>
              </motion.div>
              
              {/* Loading indicator */}
              <motion.div 
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white/60 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Show fallback if no slides
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-[#EFC132] overflow-hidden">
        {/* Premium gradient placeholder */}
        <GradientPlaceholder />
        
        {/* Fallback content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <motion.div 
            className="max-w-[1024px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced content container */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
              {/* Decorative accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
              
              <h1 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[42px] md:text-[72px] leading-tight mb-6 drop-shadow-lg">
                {t('hero.title') || 'Petroleum Derivatives and Logistics Services'}
              </h1>
              
              <div className="relative">
                {/* Subtle decorative element */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[#EFC132] to-transparent rounded-full opacity-60"></div>
                <p className="font-['ADLaM_Display:Regular',_sans-serif] text-white/95 text-[16px] md:text-[20px] leading-relaxed max-w-[900px] mx-auto pl-6 drop-shadow-md">
                  {t('hero.description') || 'Ebdaa Falcon is specialized in storing, transporting, and trading petroleum products.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#EFC132] overflow-hidden">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 opacity-5 z-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(255,215,0,0.1) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 80px 80px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>

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
            {/* Loading placeholder */}
            <AnimatePresence>
              {imageLoadingStates[slide.src] && (
                <motion.div
                  key={`placeholder-${slide.src}`}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlurUpPlaceholder src={slide.src} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background image with blur-up effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadedImages.has(slide.src) ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                onLoadStart={() => handleImageStart(slide.src)}
                onLoad={() => handleImageLoad(slide.src)}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </motion.div>
            
            {/* Enhanced gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/40 to-black/50" />
            {/* Subtle vignette effect */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
          </div>
        </div>
      ))}

      {/* Foreground text content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-[1024px] mx-auto">
          {/* Enhanced content container with subtle backdrop */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
            
            {/* Title / Logo variant spacing */}
            <>
              {slides[index].showTitle && (
                <h1 
                  className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[42px] md:text-[72px] leading-tight mb-6 drop-shadow-lg"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {language === 'ar' && slides[index].titleAr 
                    ? slides[index].titleAr 
                    : slides[index].title}
                </h1>
              )}
              {slides[index].showDescription && slides[index].description && (
                <div className="relative">
                  {/* Subtle decorative element */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[#EFC132] to-transparent rounded-full opacity-60"></div>
                  <p 
                    className="font-['ADLaM_Display:Regular',_sans-serif] text-white/95 text-[16px] md:text-[20px] leading-relaxed max-w-[900px] mx-auto drop-shadow-md"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {language === 'ar' && slides[index].descriptionAr 
                      ? slides[index].descriptionAr 
                      : slides[index].description}
                  </p>
                </div>
              )}
            </>
          </div>
        </div>
      </div>

      {/* Enhanced indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-4 px-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`relative h-4 w-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
              i === index 
                ? 'bg-white shadow-xl ring-2 ring-white/40' 
                : 'bg-white/60 hover:bg-white/80 hover:shadow-lg'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            title={`View slide ${i + 1}`}
          >
            {/* Active indicator glow */}
            {i === index && (
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced arrow controls */}
      <button
        aria-label="Previous slide"
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <div className="relative">
          <span className="block h-0.5 w-5 bg-white -rotate-45 translate-x-0.5 -translate-y-[3px] group-hover:bg-[#EFC132] transition-colors duration-300" />
          <span className="block h-0.5 w-5 bg-white rotate-45 translate-x-0.5 translate-y-[3px] group-hover:bg-[#EFC132] transition-colors duration-300" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <div className="relative">
          <span className="block h-0.5 w-5 bg-white rotate-45 -translate-x-0.5 -translate-y-[3px] group-hover:bg-[#EFC132] transition-colors duration-300" />
          <span className="block h-0.5 w-5 bg-white -rotate-45 -translate-x-0.5 translate-y-[3px] group-hover:bg-[#EFC132] transition-colors duration-300" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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



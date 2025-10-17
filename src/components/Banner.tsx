'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

interface BannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  backgroundImage?: string;
  page?: string; // Which page this banner is for
  useDynamicImages?: boolean; // Whether to use dynamic images from GridFS
  isSlider?: boolean; // Whether to show as a slider
}

export function Banner({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  backgroundImage = '/ourservicesbanner.webp',
  page = 'home',
  useDynamicImages = false,
  isSlider = false
}: BannerProps) {
  const { language } = useLanguage();
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      
      {/* Subtle pattern overlay - hidden on mobile, visible on md and up */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 hidden md:block" style={{
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

  // Static image arrays for different pages when slider is enabled
  const getStaticImages = (page: string) => {
    const staticImageSets: Record<string, string[]> = {
      'home': ['/ourservicesbanner.webp', '/ourworkbanner.webp', '/about us banner .webp'],
      'work': ['/ourworkbanner.webp', '/gallery/oil extraction.webp', '/gallery/logistic .webp'],
      'services': ['/ourservicesbanner.webp', '/gallery/solar panels.webp', '/gallery/wind genrators.webp'],
      'about': ['/about us banner .webp', '/vision.webp', '/vision2.webp'],
      'blog': ['/blog banner.webp', '/blog behind blog.webp']
    };
    return staticImageSets[page] || [backgroundImage];
  };

  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    // Generate particles only on client side
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, []);

  // Fetch banner images if using dynamic images
  useEffect(() => {
    if (!useDynamicImages) return;

    const fetchBannerImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gridfs/images');
        const result = await response.json();
        
        if (result.success) {
          // Filter images for the current page and sort by order
          const pageImages = result.data
            .filter((img: BannerImage) => 
              (img.metadata.isActive !== false) && 
              (img.metadata.page === page)
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
  }, [useDynamicImages, page]);

  // Get available images (dynamic or static)
  const getAvailableImages = () => {
    if (useDynamicImages && bannerImages.length > 0) {
      return bannerImages.map(img => ({
        src: `/api/gridfs/images/${img._id}`,
        alt: (language === 'ar' && img.metadata.titleAr) ? img.metadata.titleAr : (img.metadata.title || 'Banner image'),
        metadata: img.metadata
      }));
    } else if (isSlider) {
      const staticImages = getStaticImages(page);
      return staticImages.map(img => ({
        src: img,
        alt: title,
        metadata: null
      }));
    }
    return [{
      src: backgroundImage,
      alt: title || 'Banner image',
      metadata: null
    }];
  };

  const availableImages = getAvailableImages();

  // Auto-rotate through images if multiple are available and slider is enabled
  useEffect(() => {
    if (!isSlider || availableImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % availableImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [availableImages.length, isSlider]);

  // Determine which image to show
  const getCurrentImage = () => {
    return availableImages[currentImageIndex] || availableImages[0];
  };

  const currentImage = getCurrentImage();

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Premium loading state */}
        {isLoading ? (
          <ShimmerSkeleton />
        ) : (
          <>
            {/* Loading placeholder */}
            <AnimatePresence>
              {imageLoadingStates[currentImage.src] && (
                <motion.div
                  key={`placeholder-${currentImage.src}`}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlurUpPlaceholder src={currentImage.src} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background image with blur-up effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadedImages.has(currentImage.src) ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority={currentImageIndex === 0}
                onLoadStart={() => handleImageStart(currentImage.src)}
                onLoad={() => handleImageLoad(currentImage.src)}
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="100vw"
              />
            </motion.div>
          </>
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Image indicators if multiple images and slider is enabled */}
        {isSlider && availableImages.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
            <div className="flex items-center gap-3 px-2">
              {availableImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 active:scale-95 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg ring-2 ring-white/30' 
                      : 'bg-white/50 hover:bg-white/70 hover:shadow-md'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  title={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm mb-8">
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {breadcrumb.href ? (
                      <Link 
                        href={breadcrumb.href} 
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        {breadcrumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/80">{breadcrumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-white/60" />
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            {/* Dynamic Title from Banner Image */}
            {useDynamicImages && currentImage.metadata && (currentImage.metadata.showTitle !== false) && (
              <motion.h1 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[72px] text-white mb-6 leading-tight"
                style={{ y }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {language === 'ar' && currentImage.metadata.titleAr 
                  ? currentImage.metadata.titleAr 
                  : currentImage.metadata.title}
              </motion.h1>
            )}
            
            {/* Static Title (fallback) */}
            {(!useDynamicImages || !currentImage.metadata || (currentImage.metadata.showTitle === false)) && (
              <motion.h1 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[48px] md:text-[64px] lg:text-[72px] text-white mb-6 leading-tight"
                style={{ y }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {title}
              </motion.h1>
            )}
            
            {/* Dynamic Description from Banner Image */}
            {useDynamicImages && currentImage.metadata && (currentImage.metadata.showDescription !== false) && (
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[22px] text-white/90 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {language === 'ar' && currentImage.metadata.descriptionAr 
                  ? currentImage.metadata.descriptionAr 
                  : currentImage.metadata.description}
              </motion.p>
            )}
            
            {/* Static Subtitle (fallback) */}
            {(!useDynamicImages || !currentImage.metadata || (currentImage.metadata.showDescription === false)) && subtitle && (
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[22px] text-white/90 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {subtitle}
              </motion.p>
            )}

            {/* Loading indicator for image loading */}
            {imageLoadingStates[currentImage.src] && (
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
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center text-white/60 hover:text-white transition-colors cursor-pointer">
                <span className="text-sm font-['ADLaM_Display:Regular',_sans-serif] mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          </div>
          
          {/* Floating particles - only render on client */}
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.animationDelay,
                animationDuration: particle.animationDuration
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

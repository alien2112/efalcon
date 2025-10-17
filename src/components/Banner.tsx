'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
        {isLoading ? (
          <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
            <div className="text-gray-600">Loading...</div>
          </div>
        ) : (
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-cover transition-opacity duration-1000"
            priority
            quality={95}
            sizes="100vw"
          />
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

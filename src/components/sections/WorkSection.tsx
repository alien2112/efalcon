'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  slug?: string;
}

interface FeaturedProject {
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

// Simple card component without animations
function WorkCard({ item, index, isMobile }: { item: WorkImage; index: number; isMobile: boolean }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const isTouchScrolling = useRef<boolean>(false);

  // Mobile touch event handlers to distinguish between scroll and tap
  useEffect(() => {
    if (!isMobile || !linkRef.current) return;

    const linkElement = linkRef.current;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      isTouchScrolling.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchMoveY = e.touches[0].clientY;
      const deltaY = Math.abs(touchMoveY - touchStartY.current);
      
      // If moved more than 10px, consider it a scroll
      if (deltaY > 10) {
        isTouchScrolling.current = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchStartTime.current;
      
      // If was scrolling or touch was too long, don't trigger click
      if (isTouchScrolling.current || touchDuration > 500) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add passive listeners for better scroll performance
    linkElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    linkElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    linkElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      linkElement.removeEventListener('touchstart', handleTouchStart);
      linkElement.removeEventListener('touchmove', handleTouchMove);
      linkElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  // On mobile, use a simple div wrapper instead of motion.div to avoid event conflicts
  if (isMobile) {
    return (
      <div className="h-full" style={{ touchAction: 'auto', transform: 'none', transformStyle: 'flat' }}>
        <Link
          ref={linkRef}
          href={item.slug ? `/our-work/${item.slug}` : '#'}
          className="group relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm block h-full select-none"
          style={{ 
            touchAction: 'auto',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            transform: 'none',
            transformStyle: 'flat',
            backfaceVisibility: 'hidden',
            willChange: 'auto'
          } as React.CSSProperties}
        >
          {/* Thumbnail */}
          <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              draggable={false}
              className="object-cover object-top select-none pointer-events-none"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              style={{ transform: 'none' }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent opacity-80 pointer-events-none" />
          </div>

          {/* Caption strip */}
          <div className="absolute inset-x-0 bottom-0 p-0 pointer-events-none">
            <div className="bg-white/25 backdrop-blur-sm text-white px-6 py-4 md:px-8 md:py-5 border-t border-white/20">
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] md:text-[18px] tracking-wide drop-shadow-md">
                {item.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Desktop version - also simplified, no animations
  return (
    <div className="h-full">
      <Link
        href={item.slug ? `/our-work/${item.slug}` : '#'}
        className="group relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm block h-full"
        style={{ 
          touchAction: 'auto'
        } as React.CSSProperties}
      >
        {/* Thumbnail */}
        <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            draggable={false}
            className="object-cover object-top select-none"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent opacity-80" />
        </div>

        {/* Caption strip */}
        <div className="absolute inset-x-0 bottom-0 p-0">
          <div className="bg-white/25 backdrop-blur-sm text-white px-6 py-4 md:px-8 md:py-5 border-t border-white/20">
            <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] md:text-[18px] tracking-wide drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function WorkSection() {
  const { t, language } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Fallback work images
  const fallbackWorkImages: WorkImage[] = [
    {
      _id: '1',
      title: "Petroleum Products Storage",
      description: "State-of-the-art facilities for safe and efficient petroleum storage",
      imageUrl: "/gallery/oil%20extraction.webp",
      order: 1,
      isActive: true
    },
    {
      _id: '2',
      title: "Marine Port Operations",
      description: "Comprehensive port logistics and handling services",
      imageUrl: "/gallery/logistic%20.webp",
      order: 2,
      isActive: true
    },
    {
      _id: '3',
      title: "Inland Transportation",
      description: "Reliable inland logistics and distribution networks",
      imageUrl: "/gallery/electric.webp",
      order: 3,
      isActive: true
    },
    {
      _id: '4',
      title: "Trading Solutions",
      description: "Strategic petroleum products trading and market solutions",
      imageUrl: "/gallery/wind%20genrators.webp",
      order: 4,
      isActive: true
    }
  ];

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch('/api/projects/featured');
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
          setFeaturedProjects(result.data);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Combine featured projects with fallback work images
  const workImages = featuredProjects.length > 0 
    ? featuredProjects.map(project => ({
        _id: project._id,
        title: project.title[language as keyof typeof project.title],
        description: project.summary[language as keyof typeof project.summary],
        imageUrl: project.imageUrl,
        slug: project.slug,
        order: project.order,
        isActive: project.isActive
      }))
    : fallbackWorkImages;

  return (
    <div
      className="work-section-container relative w-full py-20 md:py-32"
      style={{
        touchAction: 'auto'
      } as React.CSSProperties}
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/8 to-transparent"></div>
        {/* Subtle geometric pattern - hidden on mobile, visible on md and up */}
        <div className="absolute inset-0 hidden md:block" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(255,215,0,0.1) 1px, transparent 0)
          `,
          backgroundSize: '50px 50px, 100px 100px',
          backgroundPosition: '0 0, 25px 25px'
        }}></div>
      </div>

      {/* Decorative corner accents - hidden on mobile, visible on md and up */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/15 to-transparent rounded-br-3xl hidden md:block pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/15 to-transparent rounded-bl-3xl hidden md:block pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/15 to-transparent rounded-tr-3xl hidden md:block pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-white/15 to-transparent rounded-tl-3xl hidden md:block pointer-events-none"></div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="relative text-center mb-20 pointer-events-none">
          {/* Decorative accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
          <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[56px] md:text-[96px] leading-[1.2] text-white mb-8 drop-shadow-lg">
            {t('work.title') || 'Our Work'}
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ touchAction: 'auto' }}
        >
          {workImages.map((item, index) => (
            <WorkCard key={item._id} item={item} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
}

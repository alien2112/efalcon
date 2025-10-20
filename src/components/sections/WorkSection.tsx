'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { FadeInOnScroll } from '@/components/ParallaxWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// Mobile-optimized card component that doesn't interfere with scrolling
function MobileCard({ item, index, isMobile }: { item: WorkImage; index: number; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.6']
  });

  // Only apply scroll-based animation on desktop
  const opacity = isMobile ? 1 : useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [30, 0]);

  // On mobile, use a simple div wrapper instead of motion.div to avoid event conflicts
  if (isMobile) {
    return (
      <div ref={ref} className="h-full" style={{ opacity: 1, touchAction: 'pan-y' }}>
        <Link
          href={item.slug ? `/our-work/${item.slug}` : '#'}
          className="group relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out active:scale-[0.98] block h-full"
          style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          {/* Enhanced Thumbnail */}
          <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              draggable={false}
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.1] group-hover:-translate-y-8 select-none pointer-events-none"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Enhanced sheen effect */}
            <div className="absolute -right-12 -top-12 w-64 h-64 rotate-45 bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors duration-500 pointer-events-none" />

            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {/* Enhanced Caption strip */}
          <div className="absolute inset-x-0 bottom-0 p-0 pointer-events-none">
            <div className="bg-white/25 backdrop-blur-sm text-white px-6 py-4 md:px-8 md:py-5 border-t border-white/20">
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] md:text-[18px] tracking-wide drop-shadow-md">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Enhanced Hover magnifier */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 backdrop-blur-md shadow-xl">
              <Search className="text-white" size={32} strokeWidth={2.5} />
            </div>
          </div>

          {/* Enhanced Hover border highlight */}
          <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/40 transition-all duration-500 pointer-events-none" />

          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Link>
      </div>
    );
  }

  // Desktop version with scroll animations
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Link
        href={item.slug ? `/our-work/${item.slug}` : '#'}
        className="group relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:scale-[1.02] block h-full"
      >
        {/* Enhanced Thumbnail */}
        <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            draggable={false}
            className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.1] group-hover:-translate-y-8 select-none"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Enhanced sheen effect */}
          <div className="absolute -right-12 -top-12 w-64 h-64 rotate-45 bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors duration-500" />

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Enhanced Caption strip */}
        <div className="absolute inset-x-0 bottom-0 p-0">
          <div className="bg-white/25 backdrop-blur-sm text-white px-6 py-4 md:px-8 md:py-5 border-t border-white/20">
            <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] md:text-[18px] tracking-wide drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Enhanced Hover magnifier */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 backdrop-blur-md shadow-xl">
            <Search className="text-white" size={32} strokeWidth={2.5} />
          </div>
        </div>

        {/* Enhanced Hover border highlight */}
        <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/40 transition-all duration-500" />

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </motion.div>
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
      className="work-section-container relative w-full py-20 md:py-32 overflow-y-auto"
      style={{
        touchAction: 'pan-y',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'auto'
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
        {/* Enhanced Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ touchAction: 'pan-y' }}
        >
          <div className="relative text-center mb-20 pointer-events-none">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[56px] md:text-[96px] leading-[1.2] text-white mb-8 drop-shadow-lg">
              {t('work.title') || 'Our Work'}
            </h2>
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ touchAction: 'pan-y' }}
        >
          {workImages.map((item, index) => (
            <MobileCard key={item._id} item={item} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeInOnScroll } from '@/components/ParallaxWrapper';

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

export function WorkSection() {
  const { t, language } = useLanguage();
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    <section ref={sectionRef} className="work-section-container relative w-full py-20 md:py-32">
      {/* Background pattern */}
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
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-white/15 to-transparent rounded-br-3xl hidden md:block"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/15 to-transparent rounded-bl-3xl hidden md:block"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-white/15 to-transparent rounded-tr-3xl hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-white/15 to-transparent rounded-tl-3xl hidden md:block"></div>
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Enhanced Section Title */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <div className="relative text-center mb-20">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
            <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[56px] md:text-[96px] leading-[1.2] text-white mb-8 drop-shadow-lg">
              {t('work.title') || 'Our Work'}
            </h2>
          </div>
        </FadeInOnScroll>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/*
            Mobile/tablet: horizontal scrollable grid with one item per column-sized cell
            Desktop (lg+): standard 3-column grid
          */}
          <div
            className="grid lg:grid-cols-3 lg:gap-8 gap-4 grid-flow-col lg:grid-flow-row auto-cols-[85%] sm:auto-cols-[60%] md:auto-cols-[50%] lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {workImages.map((item, index) => (
              <FadeInOnScroll key={item._id} direction="up" delay={0.1 * index}>
                <Link 
                  href={item.slug ? `/our-work/${item.slug}` : '#'}
                  className="group relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] block snap-start"
                  style={{ touchAction: 'pan-y' }}
                >
                  {/* Enhanced Thumbnail */}
                  <div 
                    className="relative w-full h-[220px] md:h-[280px]" 
                    style={{ touchAction: 'pan-y' }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      draggable={false}
                      className="object-cover object-top"
                      sizes="280px"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent"></div>
                  </div>

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/25 backdrop-blur-sm text-white px-6 py-4 border-t border-white/20">
                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] tracking-wide drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

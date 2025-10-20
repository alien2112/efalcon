'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <section className="work-section-container relative w-full py-20 md:py-32">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {workImages.map((item) => (
            <Link
              key={item._id}
              href={item.slug ? `/our-work/${item.slug}` : '#'}
              className="work-card relative block rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/20 bg-white/10 backdrop-blur-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  draggable={false}
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000CC] via-[#00000066] to-transparent"></div>
              </div>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-white/25 backdrop-blur-sm text-white px-6 py-4 md:px-8 md:py-5 border-t border-white/20">
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[16px] md:text-[18px] tracking-wide drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

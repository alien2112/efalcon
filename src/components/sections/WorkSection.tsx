'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
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
        title: project.title[language],
        description: project.summary[language],
        imageUrl: project.imageUrl,
        slug: project.slug,
        order: project.order,
        isActive: project.isActive
      }))
    : fallbackWorkImages;

  return (
    <div className="relative w-full bg-[#EFC132] py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Title */}
        <FadeInOnScroll direction="up" delay={0.2}>
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[56px] md:text-[96px] leading-[1.2] text-center text-white mb-16">
            {t('work.title') || 'Our Work'}
          </h2>
        </FadeInOnScroll>

        {/* Portfolio Grid */}
        <ParallaxWrapper speed={0.3} direction="up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {workImages.map((item, index) => (
              <FadeInOnScroll key={item._id} direction="up" delay={0.1 * index}>
                <Link 
                  href={item.slug ? `/our-work/${item.slug}` : '#'}
                  className="group relative rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-white/10 bg-black/20 transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] block"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.08] group-hover:-translate-y-6"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000B3] via-[#00000066] to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* subtle sheen */}
                    <div className="pointer-events-none absolute -right-10 -top-10 w-52 h-52 rotate-45 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors" />
                  </div>

                  {/* Caption strip */}
                  <div className="absolute inset-x-0 bottom-0 p-0">
                    <div className="bg-white/20 text-white px-4 py-3 md:px-5 md:py-3">
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] md:text-[18px] tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Hover magnifier */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur">
                      <Search className="text-white" size={28} strokeWidth={2.25} />
                    </div>
                  </div>

                  {/* Hover border highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-white/0 group-hover:border-white/25 transition-colors duration-300" />
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </ParallaxWrapper>
      </div>
    </div>
  );
}

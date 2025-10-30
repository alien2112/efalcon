'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BannerImage {
  _id: string;
  filename: string;
  contentType: string;
  metadata: {
    title: string;
    description: string;
    order: number;
    isActive: boolean;
    page?: string;
  };
}

interface BlogHeroProps {
  onAnimationComplete?: () => void;
}

export function BlogHero({ onAnimationComplete }: BlogHeroProps) {
  const { t } = useLanguage();
  const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch banner images
  useEffect(() => {
    const fetchBannerImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gridfs/images');
        const result = await response.json();
        
        if (result.success) {
          // Filter images for the blog page and sort by order
          const pageImages = result.data
            .filter((img: BannerImage) => 
              img.metadata.isActive && 
              (img.metadata.page === 'blog' || (!img.metadata.page && 'blog' === 'home'))
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
  }, []);

  // Auto-rotate through images if multiple are available
  useEffect(() => {
    if (bannerImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // Determine which image to show
  const getCurrentImage = () => {
    if (bannerImages.length > 0) {
      const currentImage = bannerImages[currentImageIndex] as any;
      const v = currentImage.uploadDate ? `?v=${new Date(currentImage.uploadDate).getTime()}` : '';
      return {
        src: `/api/gridfs/images/${currentImage._id}${v}`,
        alt: currentImage.metadata.title
      };
    }
    return {
      src: '/blog%20banner.webp',
      alt: 'Blog Banner'
    };
  };

  const currentImage = getCurrentImage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[40vh] md:h-[52vh] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            variants={imageVariants}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
      
      {/* Overlay */}
      <motion.div 
        className="absolute inset-0 bg-black/40" 
        variants={overlayVariants}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div variants={textVariants}>
          <motion.h1 
            className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-white text-[48px] md:text-[72px] leading-tight mb-4"
            variants={textVariants}
          >
            {t('blog.hero.title') || 'Ebdaa Falcon Blog'}
          </motion.h1>
          <motion.p 
            className="font-['ADLaM_Display:Regular',_sans-serif] text-white/90 text-[16px] md:text-[20px] max-w-[800px] mx-auto"
            variants={textVariants}
          >
            {t('blog.hero.subtitle') || 'News, trends, and thought leadership from our team.'}
          </motion.p>
        </motion.div>
      </div>

      {/* Image indicators if multiple images */}
      {bannerImages.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
          <div className="flex items-center gap-3 px-2">
            {bannerImages.map((_, index) => (
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
    </motion.div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { getBlurDataURL } from '@/lib/blur-placeholder';

interface MobileOptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /**
   * Whether to use blur placeholder (default: true)
   */
  useBlur?: boolean;
  /**
   * Custom blur data URL (optional, will auto-generate if not provided)
   */
  customBlurDataURL?: string;
  /**
   * Mobile-specific quality override
   */
  mobileQuality?: number;
}

/**
 * Mobile-optimized Image component with automatic blur placeholder
 * Automatically adjusts quality and loading strategy for mobile devices
 */
export function MobileOptimizedImage({
  useBlur = true,
  customBlurDataURL,
  mobileQuality = 70,
  quality = 85,
  src,
  alt,
  ...props
}: MobileOptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const blurDataURL = useBlur
    ? customBlurDataURL || getBlurDataURL(typeof src === 'string' ? src : '')
    : undefined;

  // Mobile-specific optimizations
  const optimizedProps = {
    ...props,
    quality: isMobile ? mobileQuality : quality,
    loading: isMobile ? 'lazy' : props.loading,
    sizes: isMobile ? '(max-width: 768px) 100vw, 50vw' : props.sizes,
  };

  return (
    <Image
      src={src}
      alt={alt}
      placeholder={useBlur ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      {...optimizedProps}
    />
  );
}

/**
 * Mobile Hero Image - Optimized for mobile above-the-fold images
 */
export function MobileHeroImage(props: MobileOptimizedImageProps) {
  return (
    <MobileOptimizedImage
      priority
      mobileQuality={75}
      quality={90}
      sizes="100vw"
      {...props}
    />
  );
}

/**
 * Mobile Card Image - Optimized for mobile card/thumbnail images
 */
export function MobileCardImage(props: MobileOptimizedImageProps) {
  return (
    <MobileOptimizedImage
      mobileQuality={65}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
      {...props}
    />
  );
}

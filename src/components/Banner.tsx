'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  backgroundImage?: string;
}

export function Banner({ 
  title, 
  subtitle, 
  breadcrumbs = [], 
  backgroundImage = '/ourservicesbanner.webp' 
}: BannerProps) {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
  }>>([]);

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

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Services Banner"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
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
            <motion.h1 
              className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[64px] lg:text-[72px] text-white mb-6 leading-tight"
              style={{ y }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[22px] text-white/90 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
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

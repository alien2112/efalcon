'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { BlogHero } from '@/components/sections/BlogHero';
import { BlogPosts } from '@/components/sections/BlogPosts';
import { BlogCategories } from '@/components/sections/BlogCategories';

export default function BlogPage() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      posts: postsRef,
      categories: categoriesRef
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Detect which section is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!animationComplete) return;
      
      const sections = [
        { name: 'hero', ref: heroRef },
        { name: 'posts', ref: postsRef },
        { name: 'categories', ref: categoriesRef }
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationComplete]);

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      {/* Navigation */}
      <Navigation currentSection={currentSection} onNavigate={scrollToSection} />

      {/* Blog Hero Section */}
      <div ref={heroRef} id="hero">
        <BlogHero onAnimationComplete={() => setAnimationComplete(true)} />
      </div>

      {/* Blog Posts Section */}
      <div ref={postsRef} id="posts">
        <BlogPosts />
      </div>

      {/* Blog Categories Section */}
      <div ref={categoriesRef} id="categories">
        <BlogCategories />
      </div>

      {/* Footer */}
      <footer className="bg-[#716106] py-8 md:py-12 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="mb-6">
            <Image 
              src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
              alt="Ebdaa Falcon Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] mb-4">© 2025 Ebdaa Falcon. All rights reserved.</p>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">Excellence in Energy, Logistics & Sustainability</p>
        </div>
      </footer>
    </div>
  );
}

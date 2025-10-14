'use client';

import { Navigation } from '@/components/Navigation';
import { BlogHero } from '@/components/sections/BlogHero';
import { AnimatedBlogPosts } from '@/components/sections/AnimatedBlogPosts';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="blog" onNavigate={() => {}} />
      
      {/* Blog Content */}
      <div className="pt-[103px]">
        <BlogHero />
        <AnimatedBlogPosts />
      </div>
    </div>
  );
}
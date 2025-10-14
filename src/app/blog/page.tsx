'use client';

import { Navigation } from '@/components/Navigation';
import { BlogHero } from '@/components/sections/BlogHero';
import { BlogPosts } from '@/components/sections/BlogPosts';
import { BlogCategories } from '@/components/sections/BlogCategories';
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
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <BlogPosts />
            </div>
            <div className="lg:col-span-4">
              <BlogCategories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

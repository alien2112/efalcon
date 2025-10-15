'use client';

import { Navigation } from '@/components/Navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { t } = useLanguage();
  
  // Sample blog post data (in a real app, this would come from a CMS or API)
  const blogPost = {
    id: params.slug,
    title: 'The Future of Sustainable Energy in the Middle East',
    content: `
      <p>The Middle East is undergoing a remarkable transformation in its energy sector, driven by ambitious national visions and global sustainability goals. This comprehensive analysis explores the latest developments in renewable energy and their profound impact on the region's future.</p>
      
      <h2>Renewable Energy Revolution</h2>
      <p>The region has witnessed unprecedented investment in solar and wind energy projects. Countries like Saudi Arabia, UAE, and Morocco are leading the charge with massive solar parks and wind farms that are reshaping the energy landscape.</p>
      
      <h2>Technological Innovation</h2>
      <p>Advanced technologies in energy storage, smart grids, and hydrogen production are creating new opportunities for sustainable development. These innovations are not only reducing carbon emissions but also creating new economic opportunities.</p>
      
      <h2>Economic Impact</h2>
      <p>The transition to renewable energy is creating thousands of jobs and attracting significant foreign investment. This economic transformation is diversifying economies traditionally dependent on fossil fuels.</p>
      
      <h2>Future Outlook</h2>
      <p>Looking ahead, the Middle East is positioned to become a global leader in renewable energy. With abundant solar resources and strong government support, the region is well-placed to achieve its ambitious sustainability targets.</p>
    `,
    author: 'Ebdaa Falcon Team',
    date: '2025-01-15',
    category: 'Sustainable Energy',
    imageUrl: '/images/2e61064ba29556dd56f0911170063156e2b7a103.webp',
    readTime: '5 min read',
    tags: ['renewable energy', 'sustainability', 'middle east']
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="blog" onNavigate={() => {}} />
      
      {/* Blog Post Content */}
      <div className="pt-[103px]">
        {/* Hero Section */}
        <motion.section 
          className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0">
            <Image
              src={blogPost.imageUrl}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="font-['Alfa_Slab_One:Regular',_sans-serif] text-white text-[32px] md:text-[48px] lg:text-[56px] leading-tight mb-4"
                variants={itemVariants}
              >
                {blogPost.title}
              </motion.h1>
              <motion.div 
                className="flex items-center justify-center gap-4 text-white/90 text-sm md:text-base"
                variants={itemVariants}
              >
                <span>{blogPost.author}</span>
                <span>•</span>
                <span>{formatDate(blogPost.date)}</span>
                <span>•</span>
                <span>{blogPost.readTime}</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Article Content */}
        <motion.section 
          className="py-16 md:py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Meta Information */}
            <motion.div 
              className="mb-8 pb-8 border-b border-gray-200"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#EFC132] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {blogPost.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.article 
              className="prose prose-lg max-w-none"
              variants={itemVariants}
            >
              <div 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </motion.article>

            {/* Back to Blog */}
            <motion.div 
              className="mt-12 pt-8 border-t border-gray-200"
              variants={itemVariants}
            >
              <Link 
                href="/blog"
                className="inline-flex items-center text-[#EFC132] font-medium hover:text-[#5a4f05] transition-colors"
              >
                <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

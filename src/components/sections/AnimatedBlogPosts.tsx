'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
  tags: string[];
}

export function AnimatedBlogPosts() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog/posts?limit=9');
        const json = await res.json();
        if (json.success) {
          const mapped: BlogPost[] = json.data.map((p: any) => ({
            id: p._id || p.slug,
            slug: p.slug,
            title: p.title?.en || '',
            excerpt: p.excerpt?.en || '',
            content: '',
            author: p.author?.name || 'Admin',
            date: p.publishedAt || p.createdAt || new Date().toISOString(),
            category: p.category || '',
            imageUrl: p.featuredImage || p.imageUrl || '/images/next.svg',
            readTime: `${p.readTime || 0} min read`,
            tags: Array.isArray(p.tags) ? p.tags : []
          }));
          setPosts(mapped);
        }
      } catch (e) {
        console.error('Failed to load blog posts', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + 3, posts.length));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  const imageHover = { scale: 1.1, transition: { duration: 0.4 } };

  const buttonHover = { scale: 1.05, transition: { duration: 0.2 } };
  const buttonTap = { scale: 0.95, transition: { duration: 0.1 } };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8f9fa] to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/10 via-transparent to-[#EFC132]/5"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(113, 97, 6, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 60%, rgba(113, 97, 6, 0.05) 0%, transparent 50%)`,
        }}></div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] md:text-[48px] text-[#EFC132] mb-4">
            {t('blog.posts.title') || 'Latest Articles'}
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">
            {t('blog.posts.subtitle') || 'Insights and updates from the energy and logistics sectors.'}
          </p>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts Grid */}
        <AnimatePresence>
          {!isLoading && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.slice(0, visiblePosts).map((post, index) => (
                <motion.article 
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                >
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      whileHover={imageHover}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className="bg-[#EFC132] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {post.category}
                      </span>
                    </motion.div>

                    {/* Hover Overlay Content */}
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <p className="text-sm font-medium">{post.readTime}</p>
                    </motion.div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[18px] md:text-[20px] text-[#EFC132] mb-3 line-clamp-2 group-hover:text-[#5a4f05] transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {post.title}
                    </motion.h3>

                    {/* Excerpt */}
                    <motion.p 
                      className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 line-clamp-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                    >
                      {post.excerpt}
                    </motion.p>

                    {/* Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                    >
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <motion.span 
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-[#EFC132] hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Read More Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                    >
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-[#EFC132] font-medium hover:text-[#5a4f05] transition-colors group-hover:underline"
                      >
                        {t('blog.posts.readMore') || 'Read more'}
                        <motion.svg 
                          className="ml-2 w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          variants={{
                            hover: { x: 4 },
                            initial: { x: 0 }
                          }}
                          initial="initial"
                          whileHover="hover"
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        <AnimatePresence>
          {visiblePosts < posts.length && !isLoading && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={loadMorePosts}
                className="bg-[#EFC132] text-white px-8 py-3 rounded-full font-medium hover:bg-[#5a4f05] transition-colors duration-300 shadow-lg"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                {t('blog.posts.loadMore') || 'Load more articles'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Article Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-[#EFC132] to-[#5a4f05] rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <motion.h3 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[32px] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                {t('blog.cta.title') || 'Stay Updated with Our Latest Insights'}
              </motion.h3>
              <motion.p 
                className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] mb-6 max-w-[600px] mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                {t('blog.cta.subtitle') || 'Discover the latest trends, innovations, and insights in energy and logistics sectors.'}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <Link 
                  href="/contact-us"
                  className="inline-block bg-white text-[#EFC132] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                  {t('blog.cta.button') || 'Get in Touch'}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

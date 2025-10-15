'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
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

  // Sample blog posts data
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Sustainable Energy in the Middle East',
      excerpt: 'Exploring recent developments in renewable energy and how they will shape the region\'s future.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-15',
      category: 'Sustainable Energy',
      imageUrl: '/images/2e61064ba29556dd56f0911170063156e2b7a103.webp',
      readTime: '5 min read',
      tags: ['renewable energy', 'sustainability', 'middle east']
    },
    {
      id: '2',
      title: 'Innovation in Marine Logistics Services',
      excerpt: 'How Ebdaa Falcon is developing innovative logistics solutions for marine ports.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-12',
      category: 'Logistics Services',
      imageUrl: '/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.webp',
      readTime: '7 min read',
      tags: ['logistics', 'marine ports', 'innovation']
    },
    {
      id: '3',
      title: 'Impact of Saudi Vision 2030 on the Energy Sector',
      excerpt: 'Comprehensive analysis of how Saudi Vision 2030 is shaping the future of the Kingdom\'s energy sector.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-10',
      category: 'Government Policy',
      imageUrl: '/images/665db4c10244e78f94bf59a54bb37d716103ac23.webp',
      readTime: '8 min read',
      tags: ['vision 2030', 'policy', 'energy']
    },
    {
      id: '4',
      title: 'Advanced Water Desalination Technologies',
      excerpt: 'Exploring the latest water desalination technologies and their regional applications.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-08',
      category: 'Water Technology',
      imageUrl: '/images/999718f4c2f82d26b7f5fe8222338d676599195f.webp',
      readTime: '6 min read',
      tags: ['water desalination', 'technology', 'sustainability']
    },
    {
      id: '5',
      title: 'International Partnerships in the Energy Sector',
      excerpt: 'How international partnerships enhance local companies\' capabilities in the energy sector.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-05',
      category: 'International Partnerships',
      imageUrl: '/images/de677a78167b5a290392b1d450bcb146fab1dd5e.webp',
      readTime: '9 min read',
      tags: ['partnerships', 'international', 'energy']
    },
    {
      id: '6',
      title: 'The Future of Sustainable Transportation',
      excerpt: 'Exploring developments in sustainable transportation and their impact on logistics services.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-03',
      category: 'Sustainable Transportation',
      imageUrl: '/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp',
      readTime: '7 min read',
      tags: ['transportation', 'sustainability', 'logistics']
    },
    {
      id: '7',
      title: 'Digital Transformation in Energy Infrastructure',
      excerpt: 'How digital technologies are revolutionizing energy infrastructure management and operations.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2025-01-01',
      category: 'Digital Innovation',
      imageUrl: '/images/14a6fa02ae183cbb256e0b4da2b46e17d3c07cee.webp',
      readTime: '6 min read',
      tags: ['digital transformation', 'infrastructure', 'innovation']
    },
    {
      id: '8',
      title: 'Green Hydrogen: The Next Energy Frontier',
      excerpt: 'Exploring the potential of green hydrogen as a clean energy solution for the future.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2024-12-28',
      category: 'Clean Energy',
      imageUrl: '/images/2e61064ba29556dd56f0911170063156e2b7a103.webp',
      readTime: '8 min read',
      tags: ['green hydrogen', 'clean energy', 'future']
    },
    {
      id: '9',
      title: 'Smart Port Technologies and Automation',
      excerpt: 'The role of smart technologies in modernizing port operations and logistics efficiency.',
      content: '',
      author: 'Ebdaa Falcon Team',
      date: '2024-12-25',
      category: 'Smart Technology',
      imageUrl: '/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.webp',
      readTime: '7 min read',
      tags: ['smart ports', 'automation', 'efficiency']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPosts(samplePosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
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
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

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
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#EFC132] mb-4">
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
                  whileHover="hover"
                  variants={hoverVariants}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                >
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      variants={imageVariants}
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
                      className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[18px] md:text-[20px] text-[#EFC132] mb-3 line-clamp-2 group-hover:text-[#5a4f05] transition-colors"
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
                        href={`/blog/${post.id}`}
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
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
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
                className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] md:text-[32px] mb-4"
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

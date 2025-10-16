'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export function BlogPosts() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const postsRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={postsRef} className="py-16 md:py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] md:text-[48px] text-[#EFC132] mb-4">{t('blog.posts.title') || 'Latest Articles'}</h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">{t('blog.posts.subtitle') || 'Insights and updates from the energy and logistics sectors.'}</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.slice(0, visiblePosts).map((post, index) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Post Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#EFC132] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[18px] md:text-[20px] text-[#EFC132] mb-3 line-clamp-2 group-hover:text-[#5a4f05] transition-colors">
                      {post.title}
                    </h3>

                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#EFC132] font-medium hover:text-[#5a4f05] transition-colors group-hover:underline"
                    >
                      {t('blog.posts.readMore') || 'Read more'}
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {visiblePosts < posts.length && (
              <div className="text-center">
                <button
                  onClick={loadMorePosts}
                  className="bg-[#EFC132] text-white px-8 py-3 rounded-full font-medium hover:bg-[#5a4f05] transition-colors duration-300 hover:scale-105 transform"
                >
                  {t('blog.posts.loadMore') || 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
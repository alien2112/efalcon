'use client';

import { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: BlogPost) => Promise<void>;
  post?: BlogPost | null;
  categories: BlogCategory[];
  loading: boolean;
}

export function BlogModal({ 
  isOpen, 
  onClose, 
  onSave, 
  post, 
  categories, 
  loading 
}: BlogModalProps) {
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    excerpt: { en: '', ar: '' },
    content: { en: '', ar: '' },
    author: { name: '', email: '', avatar: '' },
    category: '',
    tags: [] as string[],
    imageUrl: '',
    featuredImage: '',
    readTime: 5,
    isPublished: false,
    isFeatured: false,
    seo: {
      metaTitle: { en: '', ar: '' },
      metaDescription: { en: '', ar: '' },
      keywords: [] as string[],
      canonicalUrl: ''
    },
    internalLinks: [] as Array<{ title: string; url: string; description: string }>
  });

  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '', description: '' });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: post.tags || [],
        imageUrl: post.imageUrl,
        featuredImage: post.featuredImage || '',
        readTime: post.readTime,
        isPublished: post.isPublished,
        isFeatured: post.isFeatured,
        seo: post.seo || {
          metaTitle: { en: '', ar: '' },
          metaDescription: { en: '', ar: '' },
          keywords: [],
          canonicalUrl: ''
        },
        internalLinks: post.internalLinks || []
      });
    } else {
      // Reset form for new post
      setFormData({
        title: { en: '', ar: '' },
        excerpt: { en: '', ar: '' },
        content: { en: '', ar: '' },
        author: { name: '', email: '', avatar: '' },
        category: '',
        tags: [],
        imageUrl: '',
        featuredImage: '',
        readTime: 5,
        isPublished: false,
        isFeatured: false,
        seo: {
          metaTitle: { en: '', ar: '' },
          metaDescription: { en: '', ar: '' },
          keywords: [],
          canonicalUrl: ''
        },
        internalLinks: []
      });
    }
  }, [post, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData as BlogPost);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seo.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  const addInternalLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        internalLinks: [...prev.internalLinks, { ...newLink }]
      }));
      setNewLink({ title: '', url: '', description: '' });
    }
  };

  const removeInternalLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      internalLinks: prev.internalLinks.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {post ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        title: { ...prev.title, en: e.target.value }
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Title (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.title.ar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        title: { ...prev.title, ar: e.target.value }
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt (English) *
                    </label>
                    <textarea
                      value={formData.excerpt.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        excerpt: { ...prev.excerpt, en: e.target.value }
                      }))}
                      rows={3}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Excerpt (Arabic)
                    </label>
                    <textarea
                      value={formData.excerpt.ar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        excerpt: { ...prev.excerpt, ar: e.target.value }
                      }))}
                      rows={3}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Content (English) *
                    </label>
                    <textarea
                      value={formData.content.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        content: { ...prev.content, en: e.target.value }
                      }))}
                      rows={8}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Content (Arabic)
                    </label>
                    <textarea
                      value={formData.content.ar}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        content: { ...prev.content, ar: e.target.value }
                      }))}
                      rows={8}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Author */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      value={formData.author.name}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        author: { ...prev.author, name: e.target.value }
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Author Email *
                    </label>
                    <input
                      type="email"
                      value={formData.author.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        author: { ...prev.author, email: e.target.value }
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Featured Image URL *
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                    />
                  </div>

                  {/* Read Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.readTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, readTime: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add a tag"
                        className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                      />
                      <label htmlFor="isPublished" className="ml-2 block text-sm text-slate-900">
                        Published
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                      />
                      <label htmlFor="isFeatured" className="ml-2 block text-sm text-slate-900">
                        Featured Post
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">SEO Settings</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Meta Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.seo.metaTitle.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaTitle: { ...prev.seo.metaTitle, en: e.target.value } }
                      }))}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Meta Description (English)
                    </label>
                    <textarea
                      value={formData.seo.metaDescription.en}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        seo: { ...prev.seo, metaDescription: { ...prev.seo.metaDescription, en: e.target.value } }
                      }))}
                      rows={3}
                      className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* SEO Keywords */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SEO Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      placeholder="Add a keyword"
                      className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.seo.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="text-slate-600 hover:text-slate-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-base font-medium text-white hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {post ? 'Update Post' : 'Create Post'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}





'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Globe, 
  Eye, 
  EyeOff,
  Settings,
  FileText,
  Image,
  Link,
  Hash
} from 'lucide-react';

interface SEOSettings {
  _id?: string;
  page: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
  robots: {
    index: boolean;
    follow: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

interface SEOTabProps {
  onEditSEOSettings?: (settings: SEOSettings) => void;
}

const SEOTab: React.FC<SEOTabProps> = ({ onEditSEOSettings }) => {
  const [seoSettings, setSEOSettings] = useState<SEOSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSettings, setEditingSettings] = useState<SEOSettings | null>(null);
  const [formData, setFormData] = useState<Partial<SEOSettings>>({
    page: '',
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    structuredData: {},
    robots: { index: true, follow: true }
  });

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Us' },
    { value: 'services', label: 'Services' },
    { value: 'blog', label: 'Blog' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'our-work', label: 'Our Work' }
  ];

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const response = await fetch('/api/admin/seo');
      const data = await response.json();
      if (data.success) {
        setSEOSettings(data.data);
      }
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = editingSettings ? '/api/admin/seo' : '/api/admin/seo';
      const method = editingSettings ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(editingSettings && { _id: editingSettings._id })
        })
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchSEOSettings();
        setShowModal(false);
        setEditingSettings(null);
        setFormData({
          page: '',
          metaTitle: '',
          metaDescription: '',
          keywords: [],
          canonicalUrl: '',
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          twitterCard: 'summary_large_image',
          twitterTitle: '',
          twitterDescription: '',
          twitterImage: '',
          structuredData: {},
          robots: { index: true, follow: true }
        });
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete these SEO settings?')) return;
    
    try {
      const response = await fetch(`/api/admin/seo?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchSEOSettings();
      }
    } catch (error) {
      console.error('Error deleting SEO settings:', error);
    }
  };

  const handleEdit = (settings: SEOSettings) => {
    setEditingSettings(settings);
    setFormData(settings);
    setShowModal(true);
  };

  const filteredSettings = seoSettings.filter(settings =>
    settings.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
    settings.metaTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO Management</h2>
          <p className="text-gray-600">Manage SEO settings for all pages</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add SEO Settings
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search SEO settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* SEO Settings List */}
      <div className="grid gap-4">
        {filteredSettings.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No SEO Settings Found</h3>
            <p className="text-gray-600 mb-6">Get started by adding SEO settings for your pages</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add SEO Settings
            </button>
          </div>
        ) : (
          filteredSettings.map((settings) => (
            <motion.div
              key={settings._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {pages.find(p => p.value === settings.page)?.label || settings.page}
                      </h3>
                      <p className="text-sm text-gray-600">{settings.page}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Meta Title</label>
                      <p className="text-sm text-gray-900 mt-1">{settings.metaTitle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Meta Description</label>
                      <p className="text-sm text-gray-900 mt-1 line-clamp-2">{settings.metaDescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{settings.robots.index ? 'Indexed' : 'No Index'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link className="w-4 h-4" />
                      <span>{settings.robots.follow ? 'Follow' : 'No Follow'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      <span>{settings.keywords.length} keywords</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(settings)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(settings._id!)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingSettings ? 'Edit SEO Settings' : 'Add SEO Settings'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingSettings(null);
                    setFormData({
                      page: '',
                      metaTitle: '',
                      metaDescription: '',
                      keywords: [],
                      canonicalUrl: '',
                      ogTitle: '',
                      ogDescription: '',
                      ogImage: '',
                      twitterCard: 'summary_large_image',
                      twitterTitle: '',
                      twitterDescription: '',
                      twitterImage: '',
                      structuredData: {},
                      robots: { index: true, follow: true }
                    });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page</label>
                  <select
                    value={formData.page}
                    onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a page</option>
                    {pages.map(page => (
                      <option key={page.value} value={page.value}>{page.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                  <input
                    type="url"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Page title for search engines"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description for search engines"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={formData.keywords?.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                  })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Title</label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Title for social media sharing"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image URL</label>
                  <input
                    type="url"
                    value={formData.ogImage}
                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Description</label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description for social media sharing"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Card Type</label>
                  <select
                    value={formData.twitterCard}
                    onChange={(e) => setFormData({ ...formData, twitterCard: e.target.value as 'summary' | 'summary_large_image' })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Image URL</label>
                  <input
                    type="url"
                    value={formData.twitterImage}
                    onChange={(e) => setFormData({ ...formData, twitterImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Title</label>
                  <input
                    type="text"
                    value={formData.twitterTitle}
                    onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Title for Twitter sharing"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Description</label>
                  <input
                    type="text"
                    value={formData.twitterDescription}
                    onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description for Twitter sharing"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Robots Settings</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.robots?.index}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        robots: { ...formData.robots!, index: e.target.checked } 
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow indexing</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.robots?.follow}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        robots: { ...formData.robots!, follow: e.target.checked } 
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Allow following links</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingSettings(null);
                  setFormData({
                    page: '',
                    metaTitle: '',
                    metaDescription: '',
                    keywords: [],
                    canonicalUrl: '',
                    ogTitle: '',
                    ogDescription: '',
                    ogImage: '',
                    twitterCard: 'summary_large_image',
                    twitterTitle: '',
                    twitterDescription: '',
                    twitterImage: '',
                    structuredData: {},
                    robots: { index: true, follow: true }
                  });
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingSettings ? 'Update' : 'Create'} SEO Settings
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SEOTab;




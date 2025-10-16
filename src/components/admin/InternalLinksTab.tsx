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
  Link, 
  ExternalLink,
  Anchor,
  Eye,
  EyeOff,
  Settings,
  Filter,
  ArrowUpDown,
  MapPin,
  Target
} from 'lucide-react';

interface InternalLink {
  _id?: string;
  sourcePage: string;
  sourceElement: string;
  targetPage: string;
  targetElement?: string;
  linkText: {
    en: string;
    ar: string;
  };
  linkUrl: string;
  linkType: 'internal' | 'external' | 'anchor';
  position: {
    x: number;
    y: number;
  };
  isActive: boolean;
  priority: number;
  description?: {
    en: string;
    ar: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

interface LinkCategory {
  _id?: string;
  name: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  color: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface InternalLinksTabProps {
  onEditLink?: (link: InternalLink) => void;
}

const InternalLinksTab: React.FC<InternalLinksTabProps> = ({ onEditLink }) => {
  const [links, setLinks] = useState<InternalLink[]>([]);
  const [categories, setCategories] = useState<LinkCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState<InternalLink | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState<Partial<InternalLink>>({
    sourcePage: '',
    sourceElement: '',
    targetPage: '',
    targetElement: '',
    linkText: { en: '', ar: '' },
    linkUrl: '',
    linkType: 'internal',
    position: { x: 0, y: 0 },
    isActive: true,
    priority: 1,
    description: { en: '', ar: '' }
  });

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Us' },
    { value: 'services', label: 'Services' },
    { value: 'blog', label: 'Blog' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'our-work', label: 'Our Work' }
  ];

  const linkTypes = [
    { value: 'internal', label: 'Internal Link', icon: Link },
    { value: 'external', label: 'External Link', icon: ExternalLink },
    { value: 'anchor', label: 'Anchor Link', icon: Anchor }
  ];

  useEffect(() => {
    fetchLinks();
    fetchCategories();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/admin/internal-links');
      const data = await response.json();
      if (data.success) {
        setLinks(data.data);
      }
    } catch (error) {
      console.error('Error fetching internal links:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/link-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching link categories:', error);
    }
  };

  const handleSave = async () => {
    try {
      const url = editingLink ? '/api/admin/internal-links' : '/api/admin/internal-links';
      const method = editingLink ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...(editingLink && { _id: editingLink._id })
        })
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchLinks();
        setShowModal(false);
        setEditingLink(null);
        setFormData({
          sourcePage: '',
          sourceElement: '',
          targetPage: '',
          targetElement: '',
          linkText: { en: '', ar: '' },
          linkUrl: '',
          linkType: 'internal',
          position: { x: 0, y: 0 },
          isActive: true,
          priority: 1,
          description: { en: '', ar: '' }
        });
      }
    } catch (error) {
      console.error('Error saving internal link:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this internal link?')) return;
    
    try {
      const response = await fetch(`/api/admin/internal-links?id=${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchLinks();
      }
    } catch (error) {
      console.error('Error deleting internal link:', error);
    }
  };

  const handleEdit = (link: InternalLink) => {
    setEditingLink(link);
    setFormData(link);
    setShowModal(true);
  };

  const filteredLinks = links.filter(link => {
    if (activeFilter !== 'all' && link.sourcePage !== activeFilter) return false;
    if (searchTerm && !link.linkText.en.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !link.linkText.ar.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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
          <h2 className="text-2xl font-bold text-gray-900">Internal Links Management</h2>
          <p className="text-gray-600">Manage internal links and site navigation</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Internal Link
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by page:</span>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Pages</option>
              {pages.map(page => (
                <option key={page.value} value={page.value}>{page.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Links List */}
      <div className="grid gap-4">
        {filteredLinks.length === 0 ? (
          <div className="text-center py-12">
            <Link className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Internal Links Found</h3>
            <p className="text-gray-600 mb-6">Get started by adding internal links to improve site navigation</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Internal Link
            </button>
          </div>
        ) : (
          filteredLinks.map((link) => {
            const LinkTypeIcon = linkTypes.find(t => t.value === link.linkType)?.icon || Link;
            return (
              <motion.div
                key={link._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <LinkTypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {link.linkText.en}
                        </h3>
                        <p className="text-sm text-gray-600">{link.linkText.ar}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Source Page</label>
                        <p className="text-sm text-gray-900 mt-1 capitalize">{link.sourcePage}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Target Page</label>
                        <p className="text-sm text-gray-900 mt-1 capitalize">{link.targetPage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{link.sourceElement}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{link.targetElement || 'Page'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUpDown className="w-4 h-4" />
                        <span>Priority: {link.priority}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(link)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(link._id!)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
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
                  {editingLink ? 'Edit Internal Link' : 'Add Internal Link'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingLink(null);
                    setFormData({
                      sourcePage: '',
                      sourceElement: '',
                      targetPage: '',
                      targetElement: '',
                      linkText: { en: '', ar: '' },
                      linkUrl: '',
                      linkType: 'internal',
                      position: { x: 0, y: 0 },
                      isActive: true,
                      priority: 1,
                      description: { en: '', ar: '' }
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source Page</label>
                  <select
                    value={formData.sourcePage}
                    onChange={(e) => setFormData({ ...formData, sourcePage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select source page</option>
                    {pages.map(page => (
                      <option key={page.value} value={page.value}>{page.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Page</label>
                  <select
                    value={formData.targetPage}
                    onChange={(e) => setFormData({ ...formData, targetPage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select target page</option>
                    {pages.map(page => (
                      <option key={page.value} value={page.value}>{page.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source Element</label>
                  <input
                    type="text"
                    value={formData.sourceElement}
                    onChange={(e) => setFormData({ ...formData, sourceElement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Element ID or selector"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Element (optional)</label>
                  <input
                    type="text"
                    value={formData.targetElement}
                    onChange={(e) => setFormData({ ...formData, targetElement: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Target element ID"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Text (English)</label>
                  <input
                    type="text"
                    value={formData.linkText?.en}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      linkText: { ...formData.linkText!, en: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Link text in English"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Text (Arabic)</label>
                  <input
                    type="text"
                    value={formData.linkText?.ar}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      linkText: { ...formData.linkText!, ar: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Link text in Arabic"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                <input
                  type="url"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/page"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
                  <select
                    value={formData.linkType}
                    onChange={(e) => setFormData({ ...formData, linkType: e.target.value as 'internal' | 'external' | 'anchor' })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {linkTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
                <textarea
                  value={formData.description?.en}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    description: { ...formData.description!, en: e.target.value } 
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description in English"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Arabic)</label>
                <textarea
                  value={formData.description?.ar}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    description: { ...formData.description!, ar: e.target.value } 
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description in Arabic"
                />
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Active (visible on website)</span>
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingLink(null);
                  setFormData({
                    sourcePage: '',
                    sourceElement: '',
                    targetPage: '',
                    targetElement: '',
                    linkText: { en: '', ar: '' },
                    linkUrl: '',
                    linkType: 'internal',
                    position: { x: 0, y: 0 },
                    isActive: true,
                    priority: 1,
                    description: { en: '', ar: '' }
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
                {editingLink ? 'Update' : 'Create'} Internal Link
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InternalLinksTab;





'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Globe, FileText } from 'lucide-react';
import { Service } from '@/types/services';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => Promise<void>;
  service?: Service | null;
  categories: any[];
  loading?: boolean;
}

export function ServiceModal({ isOpen, onClose, onSave, service, categories, loading = false }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    summary: { en: '', ar: '' },
    imageUrl: '',
    pdfUrl: '',
    features: { en: [''], ar: [''] },
    content: { en: '', ar: '' },
    detailedContent: { en: '', ar: '' },
    galleryImages: [''],
    benefits: { en: [''], ar: [''] },
    category: '',
    isActive: true,
    isFeatured: false,
    order: 0
  });

  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar'>('en');
  const [errors, setErrors] = useState<any>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || { en: '', ar: '' },
        summary: service.summary || { en: '', ar: '' },
        imageUrl: service.imageUrl || '',
        pdfUrl: (service as any).pdfUrl || '',
        features: service.features || { en: [''], ar: [''] },
        content: service.content || { en: '', ar: '' },
        detailedContent: service.detailedContent || { en: '', ar: '' },
        galleryImages: service.galleryImages || [''],
        benefits: service.benefits || { en: [''], ar: [''] },
        category: service.category || '',
        isActive: service.isActive ?? true,
        isFeatured: service.isFeatured ?? false,
        order: service.order || 0
      });
    } else {
      setFormData({
        title: { en: '', ar: '' },
        summary: { en: '', ar: '' },
        imageUrl: '',
        pdfUrl: '',
        features: { en: [''], ar: [''] },
        content: { en: '', ar: '' },
        detailedContent: { en: '', ar: '' },
        galleryImages: [''],
        benefits: { en: [''], ar: [''] },
        category: '',
        isActive: true,
        isFeatured: false,
        order: 0
      });
    }
    setErrors({});
  }, [service, isOpen]);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.title.en.trim()) newErrors.titleEn = 'English title is required';
    if (!formData.title.ar.trim()) newErrors.titleAr = 'Arabic title is required';
    if (!formData.summary.en.trim()) newErrors.summaryEn = 'English summary is required';
    if (!formData.summary.ar.trim()) newErrors.summaryAr = 'Arabic summary is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Clean up empty strings from arrays
    const cleanedData = {
      ...formData,
      features: {
        en: formData.features.en.filter(f => f.trim()),
        ar: formData.features.ar.filter(f => f.trim())
      },
      benefits: {
        en: formData.benefits.en.filter(b => b.trim()),
        ar: formData.benefits.ar.filter(b => b.trim())
      },
      galleryImages: formData.galleryImages.filter(img => img.trim())
    };

    await onSave(cleanedData as Service);
  };

  const handlePdfUpload = async (file: File) => {
    try {
      setUploadingPdf(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', `${formData.title.en || file.name}`);
      fd.append('page', 'services');
      const res = await fetch('/api/gridfs/files', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, pdfUrl: result.data.url }));
      }
    } finally {
      setUploadingPdf(false);
    }
  };

  const addFeature = (lang: 'en' | 'ar') => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: [...prev.features[lang], '']
      }
    }));
  };

  const removeFeature = (lang: 'en' | 'ar', index: number) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].filter((_, i) => i !== index)
      }
    }));
  };

  const updateFeature = (lang: 'en' | 'ar', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].map((f, i) => i === index ? value : f)
      }
    }));
  };

  const addBenefit = (lang: 'en' | 'ar') => {
    setFormData(prev => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [lang]: [...prev.benefits[lang], '']
      }
    }));
  };

  const removeBenefit = (lang: 'en' | 'ar', index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [lang]: prev.benefits[lang].filter((_, i) => i !== index)
      }
    }));
  };

  const updateBenefit = (lang: 'en' | 'ar', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [lang]: prev.benefits[lang].map((b, i) => i === index ? value : b)
      }
    }));
  };

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, '']
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const updateGalleryImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.map((img, i) => i === index ? value : img)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-white px-6 pt-6 pb-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {service ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Language Tabs */}
              <div className="mt-4 flex space-x-1">
                <button
                  type="button"
                  onClick={() => setActiveLanguage('en')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeLanguage === 'en'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Globe className="w-4 h-4 mr-1 inline" />
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLanguage('ar')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeLanguage === 'ar'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Globe className="w-4 h-4 mr-1 inline" />
                  العربية
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white px-6 py-4 max-h-96 overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      value={formData.title[activeLanguage]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        title: { ...prev.title, [activeLanguage]: e.target.value }
                      }))}
                      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`title${activeLanguage === 'en' ? 'En' : 'Ar'}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={`Enter ${activeLanguage === 'en' ? 'English' : 'Arabic'} title`}
                    />
                    {errors[`title${activeLanguage === 'en' ? 'En' : 'Ar'}`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`title${activeLanguage === 'en' ? 'En' : 'Ar'}`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name.en}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Summary ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    value={formData.summary[activeLanguage]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      summary: { ...prev.summary, [activeLanguage]: e.target.value }
                    }))}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[`summary${activeLanguage === 'en' ? 'En' : 'Ar'}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={3}
                    placeholder={`Enter ${activeLanguage === 'en' ? 'English' : 'Arabic'} summary`}
                  />
                  {errors[`summary${activeLanguage === 'en' ? 'En' : 'Ar'}`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`summary${activeLanguage === 'en' ? 'En' : 'Ar'}`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter image URL"
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
                  )}
                </div>

                {/* PDF Document */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDF URL (optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, pdfUrl: e.target.value }))}
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                      placeholder="/api/gridfs/files/{id} or https://..."
                    />
                    <label className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200">
                      <Upload className="w-4 h-4 mr-2" />
                      {uploadingPdf ? 'Uploading...' : 'Upload PDF'}
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handlePdfUpload(f);
                        }}
                        disabled={uploadingPdf}
                      />
                    </label>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Features ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <button
                      type="button"
                      onClick={() => addFeature(activeLanguage)}
                      className="flex items-center px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features[activeLanguage].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(activeLanguage, index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter feature ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(activeLanguage, index)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    value={formData.content[activeLanguage]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      content: { ...prev.content, [activeLanguage]: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder={`Enter ${activeLanguage === 'en' ? 'English' : 'Arabic'} content`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Content ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    value={formData.detailedContent[activeLanguage]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      detailedContent: { ...prev.detailedContent, [activeLanguage]: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder={`Enter ${activeLanguage === 'en' ? 'English' : 'Arabic'} detailed content`}
                  />
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Benefits ({activeLanguage === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <button
                      type="button"
                      onClick={() => addBenefit(activeLanguage)}
                      className="flex items-center px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Benefit
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits[activeLanguage].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateBenefit(activeLanguage, index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter benefit ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeBenefit(activeLanguage, index)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Gallery Images
                    </label>
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="flex items-center px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Image
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.galleryImages.map((image, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => updateGalleryImage(index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter gallery image URL ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                      Active (visible on website)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                      Featured (show in home page slider)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {service ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    {service ? 'Update Service' : 'Create Service'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

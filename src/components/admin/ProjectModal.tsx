import { useState, useEffect } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { Project, ProjectCategory } from '@/types/projects';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Project) => Promise<void>;
  project?: Project | null;
  categories: ProjectCategory[];
  loading: boolean;
}

export function ProjectModal({ isOpen, onClose, onSave, project, categories, loading }: ProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    slug: '',
    title: { en: '', ar: '' },
    summary: { en: '', ar: '' },
    description: { en: '', ar: '' },
    imageUrl: '',
    galleryImages: [''],
    technologies: { en: [''], ar: [''] },
    features: { en: [''], ar: [''] },
    challenges: { en: [''], ar: [''] },
    solutions: { en: [''], ar: [''] },
    results: { en: [''], ar: [''] },
    client: { en: '', ar: '' },
    location: { en: '', ar: '' },
    duration: { en: '', ar: '' },
    budget: { en: '', ar: '' },
    category: '',
    isActive: true,
    isFeatured: false,
    order: 0
  });

  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar'>('en');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      if (project) {
        setFormData({
          slug: project.slug || '',
          title: project.title || { en: '', ar: '' },
          summary: project.summary || { en: '', ar: '' },
          description: project.description || { en: '', ar: '' },
          imageUrl: project.imageUrl || '',
          galleryImages: project.galleryImages || [''],
          technologies: project.technologies || { en: [''], ar: [''] },
          features: project.features || { en: [''], ar: [''] },
          challenges: project.challenges || { en: [''], ar: [''] },
          solutions: project.solutions || { en: [''], ar: [''] },
          results: project.results || { en: [''], ar: [''] },
          client: project.client || { en: '', ar: '' },
          location: project.location || { en: '', ar: '' },
          duration: project.duration || { en: '', ar: '' },
          budget: project.budget || { en: '', ar: '' },
          category: project.category || '',
          isActive: project.isActive ?? true,
          isFeatured: project.isFeatured ?? false,
          order: project.order || 0
        });
      } else {
        setFormData({
          slug: '',
          title: { en: '', ar: '' },
          summary: { en: '', ar: '' },
          description: { en: '', ar: '' },
          imageUrl: '',
          galleryImages: [''],
          technologies: { en: [''], ar: [''] },
          features: { en: [''], ar: [''] },
          challenges: { en: [''], ar: [''] },
          solutions: { en: [''], ar: [''] },
          results: { en: [''], ar: [''] },
          client: { en: '', ar: '' },
          location: { en: '', ar: '' },
          duration: { en: '', ar: '' },
          budget: { en: '', ar: '' },
          category: '',
          isActive: true,
          isFeatured: false,
          order: 0
        });
      }
      setErrors({});
    }
  }, [project, isOpen]);

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.title.en.trim()) {
      newErrors.titleEn = 'English title is required';
    }
    
    if (!formData.title.ar.trim()) {
      newErrors.titleAr = 'Arabic title is required';
    }
    
    if (!formData.summary.en.trim()) {
      newErrors.summaryEn = 'English summary is required';
    }
    
    if (!formData.summary.ar.trim()) {
      newErrors.summaryAr = 'Arabic summary is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onSave(formData);
  };

  const addArrayItem = (field: string, language: 'en' | 'ar') => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof Project] as any,
        [language]: [...(prev[field as keyof Project] as any)[language], '']
      }
    }));
  };

  const removeArrayItem = (field: string, language: 'en' | 'ar', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof Project] as any,
        [language]: (prev[field as keyof Project] as any)[language].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateArrayItem = (field: string, language: 'en' | 'ar', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field as keyof Project] as any,
        [language]: (prev[field as keyof Project] as any)[language].map((item: any, i: number) => 
          i === index ? value : item
        )
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveLanguage('en')}
            className={`px-4 py-2 font-medium ${
              activeLanguage === 'en'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage('ar')}
            className={`px-4 py-2 font-medium ${
              activeLanguage === 'ar'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Arabic
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL-friendly name)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="project-slug"
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name[activeLanguage]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter title in ${activeLanguage === 'en' ? 'English' : 'Arabic'}`}
            />
            {errors[`title${activeLanguage === 'en' ? 'En' : 'Ar'}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`title${activeLanguage === 'en' ? 'En' : 'Ar'}`]}</p>
            )}
          </div>

          {/* Summary */}
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
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter summary in ${activeLanguage === 'en' ? 'English' : 'Arabic'}`}
            />
            {errors[`summary${activeLanguage === 'en' ? 'En' : 'Ar'}`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`summary${activeLanguage === 'en' ? 'En' : 'Ar'}`]}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            <textarea
              value={formData.description[activeLanguage]}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, [activeLanguage]: e.target.value }
              }))}
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter description in ${activeLanguage === 'en' ? 'English' : 'Arabic'}`}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images
            </label>
            {formData.galleryImages.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => updateGalleryImage(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/gallery-image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGalleryImage}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Gallery Image
            </button>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client ({activeLanguage === 'en' ? 'English' : 'Arabic'})
              </label>
              <input
                type="text"
                value={formData.client[activeLanguage]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  client: { ...prev.client, [activeLanguage]: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location ({activeLanguage === 'en' ? 'English' : 'Arabic'})
              </label>
              <input
                type="text"
                value={formData.location[activeLanguage]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, [activeLanguage]: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration ({activeLanguage === 'en' ? 'English' : 'Arabic'})
              </label>
              <input
                type="text"
                value={formData.duration[activeLanguage]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  duration: { ...prev.duration, [activeLanguage]: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget ({activeLanguage === 'en' ? 'English' : 'Arabic'})
              </label>
              <input
                type="text"
                value={formData.budget[activeLanguage]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, [activeLanguage]: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            {formData.technologies[activeLanguage].map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateArrayItem('technologies', activeLanguage, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter technology ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('technologies', activeLanguage, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('technologies', activeLanguage)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Technology
            </button>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            {formData.features[activeLanguage].map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateArrayItem('features', activeLanguage, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter feature ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('features', activeLanguage, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('features', activeLanguage)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Feature
            </button>
          </div>

          {/* Challenges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenges ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            {formData.challenges[activeLanguage].map((challenge, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => updateArrayItem('challenges', activeLanguage, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter challenge ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('challenges', activeLanguage, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('challenges', activeLanguage)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Challenge
            </button>
          </div>

          {/* Solutions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solutions ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            {formData.solutions[activeLanguage].map((solution, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={solution}
                  onChange={(e) => updateArrayItem('solutions', activeLanguage, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter solution ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('solutions', activeLanguage, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('solutions', activeLanguage)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Solution
            </button>
          </div>

          {/* Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Results ({activeLanguage === 'en' ? 'English' : 'Arabic'})
            </label>
            {formData.results[activeLanguage].map((result, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={result}
                  onChange={(e) => updateArrayItem('results', activeLanguage, index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter result ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('results', activeLanguage, index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('results', activeLanguage)}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-600 rounded-md"
            >
              Add Result
            </button>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
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
                Featured (show in home page)
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {project ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </div>
    </div>
  );
}




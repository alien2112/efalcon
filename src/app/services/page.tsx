'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
import { useLanguage } from '@/contexts/LanguageContext';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  downloadUrl?: string;
  imageUrl: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

// Service categories will be defined inside the component to access translations

// Applications will be defined inside the component to access translations

export default function ServicesPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('oil-gas');
  const [currentApplication, setCurrentApplication] = useState(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredApplication, setHoveredApplication] = useState<string | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Define service categories with translations
  const serviceCategories: ServiceCategory[] = [
    {
      id: 'oil-gas',
      name: t('services.categories.oilGas') || 'Oil & Gas Solutions',
      description: t('services.categories.oilGasDescription') || 'Comprehensive petroleum storage, trading, and distribution solutions with state-of-the-art facilities and strategic partnerships.',
      services: [
        {
          id: 'oil-gas-solutions',
          name: t('services.categories.oilGasServices.petroleumDerivatives') || 'Petroleum Derivatives and Logistics Services',
          description: t('services.categories.oilGasServices.petroleumDerivativesDescription') || 'Integrated solutions in storage, transportation, and trading of petroleum derivatives',
          category: 'oil-gas',
          downloadUrl: '/documents/petroleum-storage.pdf',
          imageUrl: '/gallery/oil%20extraction.webp'
        },
        {
          id: 'engine-oils',
          name: t('services.categories.oilGasServices.motorOils') || 'Motor Oils',
          description: t('services.categories.oilGasServices.motorOilsDescription') || 'High-quality Saudi-made motor oils engineered for durability and peak performance',
          category: 'oil-gas',
          downloadUrl: '/documents/motor-oils.pdf',
          imageUrl: '/gallery/engine%20oil1.webp'
        }
      ]
    },
    {
      id: 'logistics',
      name: t('services.categories.logistics') || 'Logistics & Marine Services',
      description: t('services.categories.logisticsDescription') || 'Integrated logistics solutions across marine ports and inland operations with comprehensive handling and distribution services.',
      services: [
        {
          id: 'logistics-marine-services',
          name: t('services.categories.logisticsServices.logisticsMarine') || 'Logistics & Marine Services',
          description: t('services.categories.logisticsServices.logisticsMarineDescription') || 'World-class logistics across marine ports and inland operations to keep supply chains moving',
          category: 'logistics',
          downloadUrl: '/documents/logistics-services.pdf',
          imageUrl: '/gallery/logistic%20.webp'
        },
        {
          id: 'renewable-energy-desalination',
          name: t('services.categories.logisticsServices.renewableEnergy') || 'Alternative Energy & Water Desalination',
          description: t('services.categories.logisticsServices.renewableEnergyDescription') || 'Sustainable solar and wind energy solutions alongside advanced water desalination systems',
          category: 'logistics',
          downloadUrl: '/documents/renewable-energy.pdf',
          imageUrl: '/gallery/solar%20panels.webp'
        }
      ]
    }
  ];

  // Define applications with translations
  const applications = [
    {
      id: 'oil-gas-solutions',
      title: t('services.applications.energySector') || 'Energy Sector',
      description: t('services.applications.energySectorDescription') || 'Comprehensive energy solutions for power generation, oil refineries, and petrochemical facilities.',
      imageUrl: '/gallery/oil%20extraction.webp'
    },
    {
      id: 'logistics-marine-services',
      title: t('services.applications.industrialManufacturing') || 'Industrial Manufacturing',
      description: t('services.applications.industrialManufacturingDescription') || 'Specialized logistics and supply chain solutions for heavy manufacturing industries.',
      imageUrl: '/gallery/logistic%20.webp'
    },
    {
      id: 'renewable-energy-desalination',
      title: t('services.applications.renewableEnergy') || 'Renewable Energy',
      description: t('services.applications.renewableEnergyDescription') || 'Supporting the transition to sustainable energy with innovative logistics and storage solutions.',
      imageUrl: '/gallery/solar%20panels.webp'
    }
  ];

  const currentCategory = serviceCategories.find(cat => cat.id === activeCategory);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsFormSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Navigation */}
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title={t('services.title') || 'Our Services'}
          subtitle={t('services.subtitle') || 'Ebdaa Falcon delivers comprehensive energy, logistics, and sustainability solutions with world-class service standards and strategic partnerships across multiple industries.'}
          breadcrumbs={[
            { label: t('navigation.home') || 'Home', href: '/' },
            { label: t('navigation.services') || 'Services' }
          ]}
        />
        </div>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#716106]/10 via-transparent to-[#716106]/5"></div>
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(113, 97, 6, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 40% 60%, rgba(113, 97, 6, 0.05) 0%, transparent 50%)`,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6 text-center">
                {t('services.title') || 'Our Services'}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
                {t('services.description') || 'We provide integrated solutions across oil & gas, logistics, and renewable energy sectors, delivering excellence through strategic partnerships and innovative approaches.'}
              </p>
          </div>
          </FadeInOnScroll>

          {/* Service Category Tabs */}
          <FadeInOnScroll direction="up" delay={0.4}>
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-lg p-2 flex space-x-2">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-md font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeCategory === category.id
                        ? 'bg-[#716106] text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-[#716106] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                    </div>
                  </div>
          </FadeInOnScroll>

          {/* Service Content */}
          {currentCategory && (
            <ParallaxWrapper speed={0.2} direction="up">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-start">
                {/* Service Info */}
                <FadeInOnScroll direction="left" delay={0.6}>
                  <div className="space-y-6">
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[36px] text-[#716106]">
                      {currentCategory.name}
                    </h3>
                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                      {currentCategory.description}
                    </p>
                    <Link
                      href={`/services/${currentCategory.id}`}
                      className="inline-flex items-center text-[#716106] hover:text-[#8B7A0A] transition-colors font-['ADLaM_Display:Regular',_sans-serif] text-[16px]"
                    >
                      {t('services.learnMore') || 'Learn more about'} {currentCategory.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </FadeInOnScroll>

                {/* Service Cards */}
                <FadeInOnScroll direction="right" delay={0.8}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCategory.services.map((service, index) => (
                      <Link 
                        href={`/services/${service.id}`}
                        key={service.id} 
                        className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group block ${
                          hoveredService === service.id ? 'scale-[1.02] shadow-2xl' : ''
                        }`}
                        onMouseEnter={() => setHoveredService(service.id)}
                        onMouseLeave={() => setHoveredService(null)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            className={`object-cover transition-transform duration-300 ${
                              hoveredService === service.id ? 'scale-110' : 'group-hover:scale-105'
                            }`}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
                            hoveredService === service.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                        </div>
                        <div className="p-6">
                          <h4 className={`font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] mb-3 transition-colors duration-300 ${
                            hoveredService === service.id ? 'text-[#8B7A0A]' : 'text-[#716106]'
                          }`}>
                            {service.name}
                          </h4>
                          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                          </p>
                          {service.downloadUrl && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(service.downloadUrl, '_blank');
                              }}
                              className={`inline-flex items-center transition-all duration-300 transform hover:scale-105 font-['ADLaM_Display:Regular',_sans-serif] text-[14px] ${
                                hoveredService === service.id 
                                  ? 'text-[#8B7A0A] scale-105' 
                                  : 'text-[#716106] hover:text-[#8B7A0A]'
                              }`}
                            >
                              <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                              {t('services.downloadSpecs') || 'Download Specifications'}
                            </button>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </FadeInOnScroll>
              </div>
            </ParallaxWrapper>
          )}
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#716106]/5 via-white to-[#FFD700]/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#716106]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-bl from-[#FFD700]/20 to-transparent rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-tr from-[#716106]/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                {t('services.whereUsed') || 'Where Are Our Services Used?'}
              </h2>
            </div>
          </FadeInOnScroll>

          {/* Application Carousel */}
          <ParallaxWrapper speed={0.3} direction="up">
            <div className="relative">
              {/* Carousel Navigation */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  {applications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentApplication(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                        currentApplication === index ? 'bg-[#716106] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Application Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {applications.map((application, index) => (
                  <FadeInOnScroll key={application.id} direction="up" delay={0.1 * index}>
                    <Link 
                      href={`/services/${application.id}`}
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group block ${
                        hoveredApplication === application.id ? 'scale-[1.02] shadow-2xl' : ''
                      }`}
                      onMouseEnter={() => setHoveredApplication(application.id)}
                      onMouseLeave={() => setHoveredApplication(null)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={application.imageUrl}
                          alt={application.title}
                          fill
                          className={`object-cover transition-transform duration-300 ${
                            hoveredApplication === application.id ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
                          hoveredApplication === application.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                      <div className="p-6">
                        <h3 className={`font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] mb-3 transition-colors duration-300 ${
                          hoveredApplication === application.id ? 'text-[#8B7A0A]' : 'text-[#716106]'
                        }`}>
                          {application.title}
                        </h3>
                        <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 leading-relaxed">
                          {application.description}
                        </p>
                      </div>
                    </Link>
                  </FadeInOnScroll>
            ))}
          </div>
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#716106]/5 via-transparent to-[#FFD700]/5"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(113, 97, 6, 0.08) 0%, transparent 50%),
                             radial-gradient(circle at 70% 70%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[40px] text-[#716106] mb-6">
                {t('contact.form.title') || 'For Inquiries'}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600">
                {t('contact.form.subtitle') || 'Please contact us if you need any additional information about our services.'}
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.2} direction="up">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.inquiryType') || 'Select Inquiry Type'}
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400">
                      <option>{t('contact.form.options.general') || 'General Inquiries'}</option>
                      <option>{t('contact.form.options.product') || 'Product & Sales'}</option>
                      <option>{t('contact.form.options.procurement') || 'Procurement & Contracts'}</option>
                      <option>{t('contact.form.options.media') || 'Media Relations'}</option>
                      <option>{t('contact.form.options.careers') || 'Careers'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.fields.name') || 'Name'}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder={t('contact.form.placeholders.name') || 'Your Name'}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fields.email') || 'Email'}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    placeholder={t('contact.form.placeholders.email') || 'your.email@example.com'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fields.subject') || 'Subject'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    placeholder={t('contact.form.placeholders.subject') || 'Message Subject'}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fields.message') || 'Your Message'}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                    placeholder={t('contact.form.placeholders.message') || 'Please describe your inquiry...'}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className={`px-8 py-3 rounded-lg font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center ${
                      formSubmitted 
                        ? 'bg-green-600 text-white' 
                        : 'bg-[#716106] text-white hover:bg-[#8B7A0A] hover:shadow-lg'
                    }`}
                  >
                    {isFormSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t('contact.form.sending') || 'Sending...'}
                      </>
                    ) : formSubmitted ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t('contact.form.sent') || 'Message Sent!'}
                      </>
                    ) : (
                      <>
                        {t('contact.form.send') || 'Send'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
          </div>
          </ParallaxWrapper>
        </div>
      </section>
    </div>
  );
}
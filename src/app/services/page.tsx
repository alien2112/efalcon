'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Download, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';

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

const serviceCategories: ServiceCategory[] = [
  {
    id: 'oil-gas',
    name: 'Oil & Gas Solutions',
    description: 'Comprehensive petroleum storage, trading, and distribution solutions with state-of-the-art facilities and strategic partnerships.',
    services: [
      {
        id: 'petroleum-storage',
        name: 'Petroleum Storage',
        description: 'Advanced storage facilities for crude oil and refined products',
        category: 'oil-gas',
        downloadUrl: '/documents/petroleum-storage.pdf',
        imageUrl: '/gallery/oil%20extraction.jpg'
      },
      {
        id: 'trading-solutions',
        name: 'Trading Solutions',
        description: 'Strategic petroleum products trading and market solutions',
        category: 'oil-gas',
        downloadUrl: '/documents/trading-solutions.pdf',
        imageUrl: '/gallery/solar%20panels.jpg'
      },
      {
        id: 'refined-products',
        name: 'Refined Products',
        description: 'High-quality refined petroleum products and derivatives',
        category: 'oil-gas',
        downloadUrl: '/documents/refined-products.pdf',
        imageUrl: '/gallery/wind%20genrators.jpg'
      }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Marine Services',
    description: 'Integrated logistics solutions across marine ports and inland operations with comprehensive handling and distribution services.',
    services: [
      {
        id: 'marine-operations',
        name: 'Marine Operations',
        description: 'Comprehensive port logistics and handling services',
        category: 'logistics',
        downloadUrl: '/documents/marine-operations.pdf',
        imageUrl: '/gallery/logistic%20.jpg'
      },
      {
        id: 'inland-transportation',
        name: 'Inland Transportation',
        description: 'Reliable inland logistics and distribution networks',
        category: 'logistics',
        downloadUrl: '/documents/inland-transportation.pdf',
        imageUrl: '/gallery/electric.jpg'
      },
      {
        id: 'warehousing',
        name: 'Warehousing Solutions',
        description: 'Modern warehousing and storage facilities',
        category: 'logistics',
        downloadUrl: '/documents/warehousing.pdf',
        imageUrl: '/gallery/wind%20genrators.jpg'
      }
    ]
  }
];

const applications = [
  {
    id: 'energy-sector',
    title: 'Energy Sector',
    description: 'Comprehensive energy solutions for power generation, oil refineries, and petrochemical facilities.',
    imageUrl: '/gallery/oil%20extraction.jpg'
  },
  {
    id: 'industrial-manufacturing',
    title: 'Industrial Manufacturing',
    description: 'Specialized logistics and supply chain solutions for heavy manufacturing industries.',
    imageUrl: '/gallery/logistic%20.jpg'
  },
  {
    id: 'renewable-energy',
    title: 'Renewable Energy',
    description: 'Supporting the transition to sustainable energy with innovative logistics and storage solutions.',
    imageUrl: '/gallery/solar%20panels.jpg'
  }
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('oil-gas');
  const [currentApplication, setCurrentApplication] = useState(0);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [hoveredApplication, setHoveredApplication] = useState<string | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="services" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title="Our Services"
          subtitle="Ebdaa Falcon delivers comprehensive energy, logistics, and sustainability solutions with world-class service standards and strategic partnerships across multiple industries."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Services' }
          ]}
        />
        </div>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6 text-center">
                Our Services
            </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
                We provide integrated solutions across oil & gas, logistics, and renewable energy sectors, 
                delivering excellence through strategic partnerships and innovative approaches.
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
              <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
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
                      Learn more about {currentCategory.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </FadeInOnScroll>

                {/* Service Cards */}
                <FadeInOnScroll direction="right" delay={0.8}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentCategory.services.map((service, index) => (
                      <div 
                        key={service.id} 
                        className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
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
                            <a
                              href={service.downloadUrl}
                              download
                              className={`inline-flex items-center transition-all duration-300 transform hover:scale-105 font-['ADLaM_Display:Regular',_sans-serif] text-[14px] ${
                                hoveredService === service.id 
                                  ? 'text-[#8B7A0A] scale-105' 
                                  : 'text-[#716106] hover:text-[#8B7A0A]'
                              }`}
                            >
                              <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                              Download Specifications
                            </a>
                          )}
                  </div>
                </div>
                    ))}
                  </div>
                </FadeInOnScroll>
              </div>
            </ParallaxWrapper>
          )}
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                Where Are Our Services Used?
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
              <div className="grid md:grid-cols-3 gap-8">
                {applications.map((application, index) => (
                  <FadeInOnScroll key={application.id} direction="up" delay={0.1 * index}>
                    <div 
                      className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
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
                    </div>
                  </FadeInOnScroll>
            ))}
          </div>
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[40px] text-[#716106] mb-6">
                For Inquiries
          </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600">
                Please contact us if you need any additional information about our services.
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.2} direction="up">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Inquiry Type
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400">
                      <option>General Inquiries</option>
                      <option>Product & Sales</option>
                      <option>Procurement & Contracts</option>
                      <option>Media Relations</option>
                      <option>Careers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                    placeholder="Message Subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-all duration-300 hover:border-gray-400 resize-none"
                    placeholder="Please describe your inquiry..."
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
                        Sending...
                      </>
                    ) : formSubmitted ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send
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
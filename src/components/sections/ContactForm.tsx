'use client';

import { useState, useRef } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const services = [
    { value: 'petroleum-storage', label: 'Petroleum Storage' },
    { value: 'logistics', label: 'Logistics Services' },
    { value: 'marine-ports', label: 'Marine Ports' },
    { value: 'water-desalination', label: 'Water Desalination' },
    { value: 'alternative-energy', label: 'Alternative Energy' },
    { value: 'partnerships', label: 'International Partnerships' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        service: ''
      });
    }, 3000);
  };

  return (
    <section ref={formRef} className="py-16 md:py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[48px] text-[#716106] mb-4">
            Get in Touch
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[20px] text-gray-600 max-w-[768px] mx-auto">
            We&apos;d love to hear about your project. Fill out the form and our team will contact you shortly.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[24px] text-[#716106] mb-2">
                  Message Sent Successfully
                </h3>
                <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] text-gray-600">
                  Thank you for contacting us. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Phone and Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                      placeholder="+966 11 123 4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#716106] focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#716106] text-white px-8 py-4 rounded-full font-medium hover:bg-[#5a4f05] transition-colors duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

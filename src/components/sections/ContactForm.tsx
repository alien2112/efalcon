'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Building, MessageSquare, FileText } from 'lucide-react';

export function ContactForm() {
  const { t, language } = useLanguage();
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const services = [
    { value: 'petroleum-storage', label: t('services.defaultServices.petroleumStorage.title') || 'Petroleum Storage', icon: '🛢️' },
    { value: 'logistics', label: t('services.defaultServices.logisticsSolutions.title') || 'Logistics Services', icon: '🚛' },
    { value: 'marine-ports', label: t('contact.form.options.marinePorts') || 'Marine Ports', icon: '🚢' },
    { value: 'water-desalination', label: t('contact.form.options.waterDesalination') || 'Water Desalination', icon: '💧' },
    { value: 'alternative-energy', label: t('contact.form.options.alternativeEnergy') || 'Alternative Energy', icon: '⚡' },
    { value: 'partnerships', label: t('services.defaultServices.internationalPartnerships.title') || 'International Partnerships', icon: '🤝' }
  ];

  const formFields = [
    {
      name: 'name',
      label: t('contact.form.fields.name') || 'Name',
      placeholder: t('contact.form.placeholders.name') || 'Your full name',
      icon: User,
      required: true,
      type: 'text'
    },
    {
      name: 'email',
      label: t('contact.form.fields.email') || 'Email',
      placeholder: t('contact.form.placeholders.email') || 'you@example.com',
      icon: Mail,
      required: true,
      type: 'email'
    },
    {
      name: 'phone',
      label: t('contact.form.fields.phone') || 'Phone',
      placeholder: '+966 11 123 4567',
      icon: Phone,
      required: false,
      type: 'tel'
    },
    {
      name: 'company',
      label: t('contact.form.fields.company') || 'Company',
      placeholder: t('contact.form.placeholders.company') || 'Company name',
      icon: Building,
      required: false,
      type: 'text'
    },
    {
      name: 'subject',
      label: t('contact.form.fields.subject') || 'Subject',
      placeholder: t('contact.form.placeholders.subject') || 'How can we help?',
      icon: FileText,
      required: true,
      type: 'text'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.validation.nameRequired') || 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.validation.emailRequired') || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.validation.emailInvalid') || 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.validation.subjectRequired') || 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.validation.messageRequired') || 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }, 5000);
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={formRef}
      className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-20 px-8"
          >
            <motion.div 
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h3 
              className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] text-[#EFC132] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('contact.form.success.title') || 'Message Sent Successfully!'}
            </motion.h3>
            <motion.p 
              className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] text-gray-600 max-w-md mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('contact.form.success.message') || "Thank you for contacting us. We'll get back to you shortly."}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12"
          >
            {/* Form Header */}
            <motion.div 
              className={`text-center mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}
              variants={itemVariants}
            >
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[40px] text-[#EFC132] mb-4">
                {t('contact.form.title') || 'Get in Touch'}
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {t('contact.form.subtitle') || "We'd love to hear about your project. Fill out the form and our team will contact you shortly."}
              </p>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-8"
              variants={containerVariants}
            >
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <label htmlFor={field.name} className={`block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-semibold text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <div className="flex items-center gap-2">
                        <field.icon className="w-4 h-4 text-[#EFC132]" />
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required={field.required}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#EFC132]/20 focus:border-[#EFC132] transition-all duration-300 bg-gray-50 hover:bg-white ${language === 'ar' ? 'text-right' : 'text-left'} ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-gray-200'} ${focusedField === field.name ? 'ring-4 ring-[#EFC132]/20 border-[#EFC132]' : ''}`}
                        placeholder={field.placeholder}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <AnimatePresence>
                        {errors[field.name] && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors[field.name]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Service Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="service" className={`block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-semibold text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#EFC132]" />
                    {t('contact.form.fields.service') || 'Service'}
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#EFC132]/20 focus:border-[#EFC132] transition-all duration-300 bg-gray-50 hover:bg-white ${language === 'ar' ? 'text-right' : 'text-left'} border-gray-200 appearance-none cursor-pointer`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('contact.form.placeholders.service') || 'Select a service'}</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.icon} {service.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="message" className={`block font-['ADLaM_Display:Regular',_sans-serif] text-[14px] font-semibold text-gray-700 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#EFC132]" />
                    {t('contact.form.fields.message') || 'Message'} <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-[#EFC132]/20 focus:border-[#EFC132] transition-all duration-300 bg-gray-50 hover:bg-white resize-none ${language === 'ar' ? 'text-right' : 'text-left'} ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200'} ${focusedField === 'message' ? 'ring-4 ring-[#EFC132]/20 border-[#EFC132]' : ''}`}
                    placeholder={t('contact.form.placeholders.message') || 'Tell us about your project...'}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                className="text-center pt-6"
                variants={itemVariants}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] text-white px-16 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B7A0A] to-[#EFC132] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {t('contact.form.submitting') || 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        {t('contact.form.submit') || 'Send Message'}
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
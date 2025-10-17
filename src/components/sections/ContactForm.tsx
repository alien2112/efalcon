'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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
  
  // Floating background elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2
  }));

  const services = [
    { value: 'petroleum-storage', label: t('services.defaultServices.petroleumStorage.title') || 'Petroleum Storage', icon: '' },
    { value: 'logistics', label: t('services.defaultServices.logisticsSolutions.title') || 'Logistics Services', icon: '' },
    { value: 'marine-ports', label: t('contact.form.options.marinePorts') || 'Marine Ports', icon: '' },
    { value: 'water-desalination', label: t('contact.form.options.waterDesalination') || 'Water Desalination', icon: '' },
    { value: 'alternative-energy', label: t('contact.form.options.alternativeEnergy') || 'Alternative Energy', icon: '' },
    { value: 'partnerships', label: t('services.defaultServices.internationalPartnerships.title') || 'International Partnerships', icon: '' }
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
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={formRef}
      className="relative bg-gradient-to-br from-white via-blue-50/30 to-amber-50/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200/50 overflow-hidden backdrop-blur-sm"
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        shadow: "0 30px 80px rgba(0, 0, 0, 0.2)",
        scale: 1.005
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Multi-layered Background Design */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/5 via-transparent to-blue-500/5" />

        {/* Geometric pattern layer */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(30deg, transparent 48%, rgba(239, 193, 50, 0.05) 49%, rgba(239, 193, 50, 0.05) 51%, transparent 52%),
            linear-gradient(150deg, transparent 48%, rgba(59, 130, 246, 0.04) 49%, rgba(59, 130, 246, 0.04) 51%, transparent 52%)
          `,
          backgroundSize: '80px 80px'
        }} />

        {/* Soft wave shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#EFC132]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-300/5 to-orange-300/5 rounded-full blur-2xl" />

        {/* Floating decorative orbs */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-r from-[#EFC132]/15 to-[#8B7A0A]/15 blur-xl"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}rem`,
              height: `${element.size}rem`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: element.delay,
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#EFC132]/20 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-blue-400/20 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-amber-400/20 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#EFC132]/20 rounded-br-3xl" />

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(239, 193, 50, 0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />

        {/* Decorative contact icons scattered in background */}
        <motion.div
          className="absolute top-12 right-16 opacity-10"
          animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mail className="w-16 h-16 text-[#EFC132]" />
        </motion.div>
        <motion.div
          className="absolute bottom-24 left-12 opacity-10"
          animate={{ rotate: [0, -5, 0], y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Phone className="w-14 h-14 text-blue-500" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-8 opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <MessageSquare className="w-12 h-12 text-amber-500" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-12 opacity-10"
          animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Send className="w-10 h-10 text-[#8B7A0A]" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative text-center py-20 px-8 z-10"
          >
            <motion.div 
              className="relative w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 200,
                damping: 15
              }}
            >
              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-green-400"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-300"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              />
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>
            <motion.h3 
              className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] text-[#EFC132] mb-6"
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
            className="relative p-8 md:p-12 backdrop-blur-sm bg-white/40 z-10"
          >
            {/* Form Header */}
            <motion.div
              className={`text-center mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}
              variants={itemVariants}
            >
              <motion.h2
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[32px] md:text-[40px] text-[#EFC132] mb-4 drop-shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {t('contact.form.title') || 'Get in Touch'}
              </motion.h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-700 max-w-2xl mx-auto leading-relaxed">
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
                    <div className="relative group">
                      {/* Gradient glow effect on focus */}
                      <motion.div
                        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                        animate={{
                          opacity: focusedField === field.name ? 1 : 0,
                          scale: focusedField === field.name ? 1.02 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: 'linear-gradient(135deg, #EFC132, #8B7A0A)',
                          filter: 'blur(8px)'
                        }}
                      />
                      
                      <motion.input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        required={field.required}
                        className={`relative w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white/80 hover:bg-white focus:bg-white focus:outline-none shadow-sm hover:shadow-md ${language === 'ar' ? 'text-right' : 'text-left'} ${errors[field.name] ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-gray-200/80 focus:border-[#EFC132] focus:ring-4 focus:ring-[#EFC132]/20'} ${focusedField === field.name ? 'shadow-lg shadow-[#EFC132]/30' : ''}`}
                        placeholder={field.placeholder}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
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
                <div className="relative group">
                  {/* Gradient glow effect on focus */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                    animate={{
                      opacity: focusedField === 'service' ? 1 : 0,
                      scale: focusedField === 'service' ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'linear-gradient(135deg, #EFC132, #8B7A0A)',
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  <motion.select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className={`relative w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white/80 hover:bg-white focus:bg-white focus:outline-none shadow-sm hover:shadow-md ${language === 'ar' ? 'text-right' : 'text-left'} border-gray-200/80 focus:border-[#EFC132] focus:ring-4 focus:ring-[#EFC132]/20 appearance-none cursor-pointer ${focusedField === 'service' ? 'shadow-lg shadow-[#EFC132]/30' : ''}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option value="">{t('contact.form.placeholders.service') || 'Select a service'}</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </motion.select>
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
                <div className="relative group">
                  {/* Gradient glow effect on focus */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                    animate={{
                      opacity: focusedField === 'message' ? 1 : 0,
                      scale: focusedField === 'message' ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'linear-gradient(135deg, #EFC132, #8B7A0A)',
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className={`relative w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-white/80 hover:bg-white focus:bg-white focus:outline-none resize-none shadow-sm hover:shadow-md ${language === 'ar' ? 'text-right' : 'text-left'} ${errors.message ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-gray-200/80 focus:border-[#EFC132] focus:ring-4 focus:ring-[#EFC132]/20'} ${focusedField === 'message' ? 'shadow-lg shadow-[#EFC132]/30' : ''}`}
                    placeholder={t('contact.form.placeholders.message') || 'Tell us about your project...'}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
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
                  className="group relative bg-gradient-to-r from-[#EFC132] to-[#8B7A0A] text-white px-16 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 20px 40px -12px rgba(239, 193, 50, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                >
                  {/* Animated background gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#8B7A0A] to-[#EFC132] opacity-0"
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
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
                        <motion.div
                          whileHover={{ x: 3, rotate: 15 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
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
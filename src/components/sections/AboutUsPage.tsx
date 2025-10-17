'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlobalPresenceGlobe } from './GlobalPresenceGlobe';
import { useLanguage } from '@/contexts/LanguageContext';

// Achievement Card Component with Number Animation
function AchievementCard({ 
  icon, 
  endValue, 
  suffix = '', 
  label, 
  description, 
  delay = 0 
}: {
  icon: React.ReactNode;
  endValue: number;
  suffix?: string;
  label: string;
  description: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / 2000, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(endValue * easeOutQuart);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      }}
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
      
      <motion.div 
        className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      
      <motion.h3 
        className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[44px] text-[#EFC132] mb-3 relative"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: delay, duration: 0.5, type: "spring" }}
      >
        {count}{suffix}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
      </motion.h3>
      
      <h4 className="font-['Alice:Regular',_sans-serif] font-semibold text-[18px] md:text-[20px] text-gray-800 mb-3">
        {label}
      </h4>
      <p className="font-['Alice:Regular',_sans-serif] text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export function AboutUsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('mission');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const tabVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Our Story Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-[#EFC132]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-bl from-[#FFD700]/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center relative z-10">
          {/* Section Title with Decorative Elements */}
          <div className="relative mb-8">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#EFC132] to-transparent rounded-full"></div>
            <motion.h2 
              className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-4 relative"
              variants={itemVariants}
            >
              {t('aboutUs.ourStory.title') || 'Our Story'}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
            </motion.h2>
          </div>
          
          <motion.p 
            className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 max-w-[900px] mx-auto mb-16 leading-relaxed"
            variants={itemVariants}
          >
            {t('aboutUs.ourStory.description') || 'Founded with a vision to revolutionize energy and logistics services, Ebdaa Falcon has grown into a trusted partner for companies worldwide, delivering innovative solutions and exceptional service quality.'}
          </motion.p>

          {/* Enhanced Tabs for Mission and Vision */}
          <motion.div 
            className="flex justify-center mb-20"
            variants={containerVariants}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50">
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => setActiveTab('mission')}
                  className={`px-8 py-4 rounded-xl font-['Alice:Regular',_sans-serif] font-semibold text-[16px] transition-all duration-300 relative ${
                    activeTab === 'mission' 
                      ? 'bg-[#EFC132] text-white shadow-lg' 
                      : 'text-gray-700 hover:text-[#EFC132] hover:bg-gray-50'
                  }`}
                  variants={tabVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('aboutUs.ourStory.tabs.mission') || 'Mission'}
                  {activeTab === 'mission' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"></div>
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('vision')}
                  className={`px-8 py-4 rounded-xl font-['Alice:Regular',_sans-serif] font-semibold text-[16px] transition-all duration-300 relative ${
                    activeTab === 'vision' 
                      ? 'bg-[#EFC132] text-white shadow-lg' 
                      : 'text-gray-700 hover:text-[#EFC132] hover:bg-gray-50'
                  }`}
                  variants={tabVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('aboutUs.ourStory.tabs.vision') || 'Vision'}
                  {activeTab === 'vision' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full"></div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Content based on active tab */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-[1000px] mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200/50 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              {activeTab === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative z-10"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[28px] md:text-[36px] text-[#EFC132]">
                      {t('aboutUs.ourStory.mission.title') || 'Our Mission'}
                    </h3>
                  </div>
                  <div className="border-l-4 border-[#EFC132]/30 pl-6">
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-700 leading-relaxed">
                      {t('aboutUs.ourStory.mission.description') || 'Our mission is to provide superior, integrated services that meet the evolving needs of our clients. We are a premier provider of logistics services and a representative for global companies in petroleum derivatives, alternative energies, and water desalination.'}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative z-10"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[28px] md:text-[36px] text-[#EFC132]">
                      {t('aboutUs.ourStory.vision.title') || 'Our Vision'}
                    </h3>
                  </div>
                  <div className="border-l-4 border-[#EFC132]/30 pl-6">
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-700 leading-relaxed">
                      {t('aboutUs.ourStory.vision.description') || 'Inspired by the ambition of Saudi Vision 2030, Ebdaa Falcon is dedicated to pioneering integrated solutions in energy and logistics, driving progress, and building a sustainable future.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Company Overview Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(239, 193, 50, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          }}></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Enhanced Text Content */}
            <motion.div variants={itemVariants} className="relative">
              {/* Decorative accent line */}
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-[#EFC132] to-[#FFD700] rounded-full"></div>
              
              <motion.h2 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-8 relative"
                variants={itemVariants}
              >
                {t('aboutUs.companyOverview.title') || 'Company Overview'}
                <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-full"></div>
              </motion.h2>
              
              <div className="space-y-6">
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm"
                  variants={itemVariants}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-700 leading-relaxed">
                      {t('aboutUs.companyOverview.paragraph1') || 'Ebdaa Falcon is a company that deals with international companies in the field of oil and gas, petroleum derivatives, sea ports and logistics services. We aim to reach the highest levels of excellence and superior service that meets your needs.'}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm"
                  variants={itemVariants}
                >
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-700 leading-relaxed">
                      {t('aboutUs.companyOverview.paragraph2') || 'We are involved in storing, transporting and trading petroleum products. We represent international companies in the field of oil and gas derivatives, alternative energies and water desalination.'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Image with Vision 2030 Overlay */}
            <motion.div 
              className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/vision.webp"
                alt="Saudi Vision 2030 Leaders"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              
              {/* Enhanced overlay with gradient background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <motion.div 
                className="absolute bottom-6 left-6 w-auto max-w-[300px] bg-white/90 backdrop-blur-sm text-gray-800 p-6 rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <motion.p 
                    className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-lg md:text-xl text-[#EFC132]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    VISION رؤية
                  </motion.p>
                </div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  <motion.p 
                    className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-3xl md:text-4xl text-[#EFC132] mb-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                  >
                    2030
                  </motion.p>
                  <motion.p 
                    className="font-['Alice:Regular',_sans-serif] text-sm md:text-base text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    المملكة العربية السعودية
                  </motion.p>
                  <motion.p 
                    className="font-['Alice:Regular',_sans-serif] text-sm md:text-base text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                  >
                    KINGDOM OF SAUDI ARABIA
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Leadership Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-bl from-[#EFC132]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tr from-[#FFD700]/15 to-transparent rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Enhanced Image */}
            <motion.div 
              className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 order-2 md:order-1"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/vision2.webp"
                alt="Mosaed M. Al-Jhail Chairman"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </motion.div>

            {/* Enhanced Text Content */}
            <motion.div variants={itemVariants} className="order-1 md:order-2 relative">
              {/* Decorative accent line */}
              <div className="absolute -right-4 top-0 w-1 h-16 bg-gradient-to-b from-[#EFC132] to-[#FFD700] rounded-full"></div>
              
              <motion.h2 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-8 relative"
                variants={itemVariants}
              >
                {t('aboutUs.leadership.title') || 'Leadership'}
                <div className="absolute -bottom-2 right-0 w-20 h-0.5 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-full"></div>
              </motion.h2>
              
              <motion.p 
                className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-700 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                {t('aboutUs.leadership.description') || 'Our leadership team brings decades of experience across energy, logistics, and finance.'}
              </motion.p>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 relative overflow-hidden"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
                  
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132] mb-2">
                        {t('aboutUs.leadership.ceo.title') || 'Chief Executive Officer'}
                      </h3>
                      <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        {t('aboutUs.leadership.ceo.description') || 'Leading with vision, integrity, and operational excellence.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Our Achievements Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/10 via-transparent to-[#EFC132]/5"></div>
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(113, 97, 6, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          }}></div>
        </div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div 
            className="text-center mb-20"
            variants={itemVariants}
          >
            <div className="relative mb-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#EFC132] to-transparent rounded-full"></div>
              <motion.h2 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-4 relative"
                variants={itemVariants}
              >
                {t('aboutUs.achievements.title') || 'Our Achievements'}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </motion.h2>
            </div>
            <motion.p 
              className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 max-w-[900px] mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {t('aboutUs.achievements.subtitle') || 'Numbers that reflect our commitment to excellence and growth in the energy and logistics sectors.'}
            </motion.p>
          </motion.div>

          {/* Achievement Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {/* Countries Served */}
            <AchievementCard
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              endValue={11}
              suffix="+"
              label={t('aboutUs.achievements.stats.countriesServed.label') || 'Countries Served'}
              description={t('aboutUs.achievements.stats.countriesServed.description') || 'Active presence across multiple continents'}
              delay={0.5}
            />

            {/* Projects Completed */}
            <AchievementCard
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
              endValue={150}
              suffix="+"
              label={t('aboutUs.achievements.stats.projectsCompleted.label') || 'Projects Completed'}
              description={t('aboutUs.achievements.stats.projectsCompleted.description') || 'Successful energy and logistics projects'}
              delay={0.7}
            />

            {/* Annual Growth */}
            <AchievementCard
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
              endValue={25}
              suffix="%"
              label={t('aboutUs.achievements.stats.annualGrowth.label') || 'Annual Growth'}
              description={t('aboutUs.achievements.stats.annualGrowth.description') || 'Consistent year-over-year expansion'}
              delay={0.9}
            />

            {/* Client Satisfaction */}
            <AchievementCard
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              endValue={98}
              suffix="%"
              label={t('aboutUs.achievements.stats.clientSatisfaction.label') || 'Client Satisfaction'}
              description={t('aboutUs.achievements.stats.clientSatisfaction.description') || 'High satisfaction rate from our clients'}
              delay={1.1}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Purpose Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#EFC132]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-bl from-[#FFD700]/15 to-transparent rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Section Title */}
            <div className="text-center mb-16">
              <div className="relative mb-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#EFC132] to-transparent rounded-full"></div>
                <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-4 relative">
                  {t('aboutUs.purpose.title') || 'Our Purpose'}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
                </h2>
              </div>
            </div>
            
            {/* Enhanced Quote */}
            <div className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm border-l-4 border-[#EFC132] p-8 md:p-12 mb-12 rounded-r-2xl shadow-lg border border-gray-200/50 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-xl flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <blockquote className="font-['Alice:Regular',_sans-serif] text-[20px] md:text-[24px] text-gray-800 italic leading-relaxed">
                    {t('aboutUs.purpose.quote') || 'We believe in building enduring value through operational excellence and trusted partnerships.'}
                  </blockquote>
                </div>
                <cite className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-[#EFC132] font-semibold ml-16 rtl:mr-16 rtl:ml-0">
                  — {t('aboutUs.purpose.attribution') || 'Ebdaa Falcon'}
                </cite>
              </div>
            </div>
            
            {/* Enhanced Description */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200/50 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#EFC132]/10 to-transparent rounded-tr-2xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-[#FFD700]/10 to-transparent rounded-tl-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 leading-relaxed">
                    {t('aboutUs.purpose.description') || 'We serve as a reliable partner in petroleum derivatives, logistics, water technology and alternative energy—connecting world-class capabilities with local insight.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Who We Are Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#EFC132]/5 via-white to-[#FFD700]/5 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#EFC132]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-bl from-[#FFD700]/20 to-transparent rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-tr from-[#EFC132]/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Decorative accent line */}
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-[#EFC132] to-[#FFD700] rounded-full"></div>
              
              <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-8 relative">
                {t('aboutUs.whoWeAre.title') || 'Who We Are'}
                <div className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-full"></div>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 leading-relaxed">
                      {t('aboutUs.whoWeAre.description') || 'We are a Saudi company dedicated to operational excellence, safety and innovation across energy and logistics value chains.'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 leading-relaxed">
                      {t('aboutUs.whoWeAre.mission') || 'Our mission is to deliver reliable, sustainable solutions that empower our clients and communities.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#EFC132] to-[#FFD700] rounded-2xl p-8 md:p-12 text-white shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-tr-2xl"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Image 
                      src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.webp"
                      alt="Ebdaa Falcon Logo"
                      width={80}
                      height={80}
                      className="rounded-xl"
                      priority
                      quality={90}
                    />
                  </div>
                  <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[24px] md:text-[28px] mb-4">
                    {t('aboutUs.whoWeAre.title') || 'Excellence in Energy & Logistics'}
                  </h3>
                  <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] leading-relaxed">
                    {t('aboutUs.whoWeAre.description') || 'Driving sustainable growth across the Middle East and beyond'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced What We Do Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-28 h-28 bg-gradient-to-br from-[#EFC132]/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-bl from-[#FFD700]/15 to-transparent rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="relative mb-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#EFC132] to-transparent rounded-full"></div>
              <h2 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-4 relative">
                {t('aboutUs.whatWeDo.title') || 'What We Do'}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </h2>
            </div>
            <p className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {t('aboutUs.whatWeDo.subtitle') || 'Integrated solutions across petroleum derivatives, logistics, water technology and alternative energy.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Enhanced Petroleum Products */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mr-6 rtl:ml-6 rtl:mr-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132]">
                  {t('aboutUs.whatWeDo.services.petroleumProducts.title') || 'Petroleum Products'}
                </h3>
              </div>
              <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-700 leading-relaxed">
                {t('aboutUs.whatWeDo.services.petroleumProducts.description') || 'Storage, trading and distribution with rigorous quality and safety standards.'}
              </p>
            </div>

            {/* Enhanced Alternative Energy */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mr-6 rtl:ml-6 rtl:mr-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132]">
                  {t('aboutUs.whatWeDo.services.alternativeEnergy.title') || 'Alternative Energy'}
                </h3>
              </div>
              <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-700 leading-relaxed">
                {t('aboutUs.whatWeDo.services.alternativeEnergy.description') || 'Clean energy solutions supporting national sustainability goals.'}
              </p>
            </div>

            {/* Enhanced Water Desalination */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mr-6 rtl:ml-6 rtl:mr-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132]">
                  {t('aboutUs.whatWeDo.services.waterDesalination.title') || 'Water Desalination'}
                </h3>
              </div>
              <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-700 leading-relaxed">
                {t('aboutUs.whatWeDo.services.waterDesalination.description') || 'Advanced technologies for reliable fresh water supply.'}
              </p>
            </div>

            {/* Enhanced Falcon Motor Oils */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mr-6 rtl:ml-6 rtl:mr-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132]">
                  {t('aboutUs.whatWeDo.services.falconMotorOils.title') || 'Falcon Motor Oils'}
                </h3>
              </div>
              <p className="font-['Alice:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-700 leading-relaxed">
                {t('aboutUs.whatWeDo.services.falconMotorOils.description') || 'High-performance lubricants engineered for demanding conditions.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section - 3D Globe */}
      <GlobalPresenceGlobe />

      {/* Enhanced Our Core Values Section */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EFC132]/10 via-transparent to-[#EFC132]/5"></div>
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(113, 97, 6, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)`,
          }}></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div 
            className="text-center mb-20"
            variants={itemVariants}
          >
            <div className="relative mb-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#EFC132] to-transparent rounded-full"></div>
              <motion.h2 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[36px] md:text-[52px] text-[#EFC132] mb-4 relative"
                variants={itemVariants}
              >
                {t('aboutUs.coreValues.title') || 'Our Core Values'}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </motion.h2>
            </div>
            <motion.p 
              className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[22px] text-gray-700 max-w-[900px] mx-auto leading-relaxed"
              variants={itemVariants}
            >
              {t('aboutUs.coreValues.subtitle') || 'The principles that guide our decisions and shape our company culture.'}
            </motion.p>
          </motion.div>

          {/* Enhanced Core Values Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={containerVariants}
          >
            {/* Enhanced Excellence */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </motion.div>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132] mb-4 relative">
                {t('aboutUs.coreValues.excellence.title') || 'Excellence'}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </h3>
              <p className="font-['Alice:Regular',_sans-serif] text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
                {t('aboutUs.coreValues.excellence.description') || 'We strive for the highest levels of excellence in all our operations and services.'}
              </p>
            </motion.div>

            {/* Enhanced Innovation */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </motion.div>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132] mb-4 relative">
                {t('aboutUs.coreValues.innovation.title') || 'Innovation'}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </h3>
              <p className="font-['Alice:Regular',_sans-serif] text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
                {t('aboutUs.coreValues.innovation.description') || 'Embracing innovative solutions to meet evolving industry demands.'}
              </p>
            </motion.div>

            {/* Enhanced Integrity */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132] mb-4 relative">
                {t('aboutUs.coreValues.integrity.title') || 'Integrity'}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </h3>
              <p className="font-['Alice:Regular',_sans-serif] text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
                {t('aboutUs.coreValues.integrity.description') || 'Maintaining the highest standards of integrity in all our business practices.'}
              </p>
            </motion.div>

            {/* Enhanced Partnership */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-[#EFC132] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <h3 className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[22px] md:text-[26px] text-[#EFC132] mb-4 relative">
                {t('aboutUs.coreValues.partnership.title') || 'Partnership'}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#EFC132]/60 to-[#FFD700]/60 rounded-full"></div>
              </h3>
              <p className="font-['Alice:Regular',_sans-serif] text-[15px] md:text-[17px] text-gray-600 leading-relaxed">
                {t('aboutUs.coreValues.partnership.description') || 'Building strong, lasting partnerships with clients and stakeholders.'}
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Call-to-Action Section */}
          <motion.div 
            className="text-center bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl p-10 md:p-16 shadow-lg border border-gray-200/50 relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EFC132]/10 to-transparent rounded-bl-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-tr-2xl"></div>
            
            <div className="relative z-10">
              <motion.h3 
                className="font-['Alfa_Slab_One:Bold',_sans-serif] font-bold text-[28px] md:text-[36px] text-gray-700 mb-6"
                variants={itemVariants}
              >
                {t('aboutUs.coreValues.cta.title') || 'Get to Know Us Better'}
              </motion.h3>
              <motion.p 
                className="font-['Alice:Regular',_sans-serif] text-[18px] md:text-[20px] text-gray-600 mb-8 max-w-[700px] mx-auto leading-relaxed"
                variants={itemVariants}
              >
                {t('aboutUs.coreValues.cta.description') || 'Ready to work with us? Let\'s discuss how we can help achieve your goals.'}
              </motion.p>
              <motion.a
                href="/contact-us"
                className="inline-block bg-gradient-to-r from-[#EFC132] to-[#FFD700] text-white px-10 py-4 rounded-2xl font-['Alice:Regular',_sans-serif] font-semibold text-[16px] md:text-[18px] hover:shadow-xl transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('aboutUs.coreValues.cta.button') || 'Contact Us Today →'}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}

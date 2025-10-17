'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ContactHero } from '@/components/sections/ContactHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { ContactMap } from '@/components/sections/ContactMap';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactUsPage() {
  const { t } = useLanguage();
  
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  return (
    <motion.div 
      className="min-h-screen bg-white"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Navigation */}
      <Navigation currentSection="contact" onNavigate={() => {}} />
      
      {/* Contact Content */}
      <motion.div 
        className="pt-[103px]"
        variants={contentVariants}
      >
        <ContactHero />
        <motion.div 
          className="max-w-[1280px] mx-auto px-4 md:px-8 py-16"
          variants={contentVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <motion.div 
              className="lg:col-span-7"
              variants={contentVariants}
            >
              <ContactForm />
            </motion.div>
            <motion.div 
              className="lg:col-span-5"
              variants={contentVariants}
            >
              <ContactInfo />
            </motion.div>
          </div>
        </motion.div>
        <motion.div variants={contentVariants}>
          <ContactMap />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}



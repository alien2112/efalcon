'use client';

import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function CareersPage() {
  const { language, t } = useLanguage();

  const title = language === 'ar' ? 'الوظائف' : (t('footer.links.careers') || 'Careers');
  const subtitle = language === 'ar' ? 'لا توجد فرص وظيفية متاحة حاليًا — يُرجى التحقق لاحقًا.' : 'No current openings — please check back later.';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fff9e9 0%, #f9f3df 100%)' }}>
      <Navigation currentSection="careers" onNavigate={() => {}} />
      <div className="pt-[103px]">
        <Banner
          title={title}
          subtitle=""
          backgroundImage="/terms and polices banner .webp"
          page="careers"
          useDynamicImages={true}
          isSlider={true}
        />

        <div className="max-w-[980px] mx-auto px-4 md:px-8 py-14 md:py-20">
          <motion.div 
            className="bg-white/85 backdrop-blur-sm rounded-2xl border border-yellow-100 shadow-[0_20px_45px_rgba(0,0,0,0.08)] p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h2 
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-4 ${language === 'ar' ? 'rtl text-right md:text-center' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className={`text-gray-700 ${language === 'ar' ? 'rtl text-right md:text-center' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



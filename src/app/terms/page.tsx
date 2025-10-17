'use client';

import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const { language, t } = useLanguage();

  const ArabicContent = () => (
    <motion.div className="prose prose-gray max-w-none rtl text-right"
      initial={false}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-sm text-gray-500 mb-8">آخر تحديث: 30/09/2025</motion.p>

      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="leading-relaxed text-gray-700">
        مرحبًا بك في إبداع فالكون. من خلال دخولك أو تصفحك أو استخدامك لموقعنا الإلكتروني، أو منتجاتنا أو خدماتنا، فإنك توافق على الالتزام بالشروط والأحكام التالية، وإلا فعليك التوقف عن استخدام الموقع.
      </motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">1. استخدام الموقع</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>يُسمح باستخدام موقعنا الإلكتروني للأغراض المشروعة فقط.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>لا يجوز استخدامه بأي طريقة قد تُسبب ضررًا للموقع أو للمستخدمين أو تُعتبر جريمة جنائية.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>أي استخدام غير مصرح به لهذا الموقع قد يؤدي إلى المطالبة بالتعويضات و/أو اعتباره جريمة جنائية.</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">2. حقوق الملكية الفكرية</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>جميع المحتويات والخدمات والشعارات والتصاميم على هذا الموقع هي ملك لشركة إبداع فالكون أو لجهات مرخّصة.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>لا يجوز لك إعادة إنتاج أو توزيع أي من هذه المحتويات دون إذن كتابي مسبق.</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">3. المنتجات والخدمات</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>جميع المنتجات والخدمات المعروضة خاضعة للتوفر وقد يتم تعديلها أو إيقافها دون إشعار مسبق.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>الأسعار والأوصاف والمواصفات قد يتم تغييرها في أي وقت دون إشعار.</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">4. حدود المسؤولية</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">لا تتحمل إبداع فالكون أي مسؤولية عن الأضرار غير المباشرة أو العرضية أو الخاصة الناتجة عن استخدام موقعنا أو خدماتنا. نحن لا نضمن أن يكون الموقع خاليًا من الأخطاء أو الانقطاعات بشكل مستمر.</motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">5. القانون المعمول به</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">تخضع هذه الشروط والأحكام وتُفسّر وفقًا لقوانين المملكة العربية السعودية. أي نزاع ينشأ يتعلق بهذه الشروط يخضع لاختصاص محاكم المملكة العربية السعودية.</motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">6. التعديلات</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">يجوز لنا تحديث هذه الشروط من وقت لآخر. استمرارك في استخدام موقعنا يعني موافقتك على الشروط المُحدثة.</motion.p>
    </motion.div>
  );

  const EnglishContent = () => (
    <motion.div className="prose prose-gray max-w-none"
      initial={false}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-sm text-gray-500 mb-8">Last updated: 30/09/2025</motion.p>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="leading-relaxed text-gray-700">By accessing or using our website or services, you agree to these terms.</motion.p>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">1. Use of the Website</motion.h3>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pl-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>Use only for lawful purposes.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>Do not harm the site, users, or violate applicable laws.</motion.li>
      </motion.ul>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">2. Intellectual Property</motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">All content is owned by Ebdaa Falcon or licensors. No reproduction without permission.</motion.p>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">3. Products & Services</motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">Offerings may change or be discontinued without notice. Prices/specs may change.</motion.p>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">4. Limitation of Liability</motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">We are not liable for indirect or incidental damages. No uptime/error-free warranty.</motion.p>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">5. Governing Law</motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">These terms are governed by the laws of Saudi Arabia.</motion.p>
      <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-lg font-semibold text-gray-900 mt-6">6. Changes</motion.h3>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">We may update these terms from time to time.</motion.p>
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fff9e9 0%, #f9f3df 100%)' }}>
      <Navigation currentSection="terms" onNavigate={() => {}} />
      <div className="pt-[103px]">
        <Banner
          title={language === 'ar' ? 'الشروط والأحكام' : (t('footer.links.terms') || 'Terms of Service')}
          subtitle=""
          backgroundImage="/terms and polices banner .webp"
          page="terms"
          useDynamicImages={true}
          isSlider={true}
        />

        <div className="max-w-[980px] mx-auto px-4 md:px-8 py-12 md:py-20">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-100 shadow-[0_20px_45px_rgba(0,0,0,0.08)] p-6 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {language === 'ar' ? <ArabicContent /> : <EnglishContent />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}



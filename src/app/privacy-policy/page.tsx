'use client';

import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  const ArabicContent = () => (
    <motion.div className="prose prose-gray max-w-none rtl text-right"
      initial={false}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-sm text-gray-500 mb-8">آخر تحديث: 30/09/2025</motion.p>

      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="leading-relaxed text-gray-700">
        في إبداع فالكون، نحن نُقدّر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية بياناتك.
      </motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">1. المعلومات التي نجمعها</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">قد نقوم بجمع المعلومات التالية عند تفاعلك مع موقعنا أو خدماتنا:</motion.p>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>البيانات الشخصية (مثل الاسم، البريد الإلكتروني، رقم الهاتف).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>المعلومات التقنية (مثل عنوان الـ IP، نوع المتصفح، ومعلومات الجهاز).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>أي معلومات تقدمها طوعًا (على سبيل المثال عبر نماذج التواصل).</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">2. كيفية استخدامنا لمعلوماتك</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>لتقديم وتحسين خدماتنا.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>للتواصل معك بشأن التحديثات والعروض والاستفسارات.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>لتحليل أداء الموقع وسلوك المستخدم بهدف تحسين التجربة.</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">3. مشاركة المعلومات</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pr-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>نحن لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>قد نشارك المعلومات مع مزوّدي خدمات موثوقين لأغراض تشغيلية (مثل الاستضافة أو التحليلات).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>قد نُفصح عن المعلومات إذا طُلب ذلك بموجب القانون.</motion.li>
      </motion.ul>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">4. أمن البيانات</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">نُطبق التدابير التقنية والتنظيمية المناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح.</motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">5. حقوقك</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">لديك الحق في الوصول إلى بياناتك الشخصية أو تصحيحها أو طلب حذفها. لممارسة هذه الحقوق، يُرجى التواصل معنا عبر صفحة تواصل معنا.</motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">6. ملفات تعريف الارتباط (Cookies)</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">قد يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم. يمكنك إدارة أو تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك.</motion.p>

      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">7. التحديثات</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تحديثات في هذه الصفحة مع توضيح تاريخ آخر تعديل.</motion.p>
    </motion.div>
  );

  const EnglishContent = () => (
    <motion.div className="prose prose-gray max-w-none"
      initial={false}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-sm text-gray-500 mb-8">Last updated: 30/09/2025</motion.p>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="leading-relaxed text-gray-700">
        We value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your data.
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">1. Information We Collect</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pl-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>Personal data (name, email, phone).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>Technical data (IP address, browser type, device info).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>Any information you provide (e.g., via contact forms).</motion.li>
      </motion.ul>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">2. How We Use Your Information</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pl-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>To provide and improve our services.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>To contact you about updates, offers, and inquiries.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>To analyze performance and user behavior to enhance experience.</motion.li>
      </motion.ul>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">3. Sharing Information</motion.h2>
      <motion.ul initial={false} viewport={{ once: true }} className="list-disc pl-6 text-gray-700 space-y-1">
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>We do not sell or rent your personal data.</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>We may share with trusted providers for operational purposes (hosting, analytics).</motion.li>
        <motion.li initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>We may disclose information as required by law.</motion.li>
      </motion.ul>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">4. Data Security</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">We apply appropriate technical and organizational measures to protect your data.</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">5. Your Rights</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">You can access, correct, or request deletion of your data. Contact us via the Contact page.</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">6. Cookies</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">We may use cookies to improve the user experience. You can manage them in your browser settings.</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-xl font-bold text-gray-900 mt-8">7. Updates</motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-gray-700">We may update this policy. Changes will be posted here with the latest date.</motion.p>
    </motion.div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fff9e9 0%, #f9f3df 100%)' }}>
      <Navigation currentSection="privacy" onNavigate={() => {}} />
      <div className="pt-[103px]">
        <Banner
          title={language === 'ar' ? 'سياسة الخصوصية' : (t('footer.links.privacyPolicy') || 'Privacy Policy')}
          subtitle={language === 'ar' ? '' : ''}
          backgroundImage="/terms and polices banner .webp"
          page="privacy"
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



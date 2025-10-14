'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          language === 'en' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="text-[#cecfd2]">|</span>
      <button
        onClick={() => setLanguage('ar')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          language === 'ar' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
        }`}
      >
        AR
      </button>
    </div>
  );
}

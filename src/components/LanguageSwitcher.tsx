'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          language === 'en' ? 'text-black' : 'text-gray-600 hover:text-black'
        }`}
      >
        EN
      </button>
      <span className="text-gray-600">|</span>
      <button
        onClick={() => setLanguage('ar')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          language === 'ar' ? 'text-black' : 'text-gray-600 hover:text-black'
        }`}
      >
        AR
      </button>
    </div>
  );
}

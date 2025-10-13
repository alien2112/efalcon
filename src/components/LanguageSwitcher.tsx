'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={switchLanguage('en')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          locale === 'en' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
        }`}
      >
        EN
      </Link>
      <span className="text-[#cecfd2]">|</span>
      <Link
        href={switchLanguage('ar')}
        className={`font-['ADLaM_Display:Regular',_sans-serif] text-[14px] transition-colors ${
          locale === 'ar' ? 'text-white' : 'text-[#cecfd2] hover:text-white'
        }`}
      >
        AR
      </Link>
    </div>
  );
}

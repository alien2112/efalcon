'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {t('notFound.title') || 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('notFound.description') || 'The page you are looking for does not exist.'}
        </p>
        <Link 
          href="/"
          className="bg-[#716106] text-white px-6 py-3 rounded-lg hover:bg-[#5a4d05] transition-colors"
        >
          {t('notFound.goHome') || 'Go Home'}
        </Link>
      </div>
    </div>
  );
}

'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Define the available languages
export const languages = ['en', 'ar'];
export const defaultLanguage = 'en';

// Define the context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  translations: Record<string, unknown>;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
  translations: {},
});

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with the stored language or default
  const [language, setLanguageState] = useState<string>(defaultLanguage);
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Function to change the language
  const setLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguageState(lang);
      Cookies.set('language', lang, { expires: 365 });
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  // Function to get a translation by key
  const t = (key: string): string => {
    if (!translations) return key;

    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }

    return typeof value === 'string' ? value : key;
  };

  // Load translations and initialize language on mount
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Get stored language from cookie or use default
        const storedLanguage = Cookies.get('language') || defaultLanguage;
        
        // Load translations for the language
        const response = await import(`../../messages/${storedLanguage}.json`);
        setTranslations(response.default);
        
        // Set the language
        setLanguageState(storedLanguage);
        
        // Set document direction based on language
        document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = storedLanguage;
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to default language
        const response = await import(`../../messages/${defaultLanguage}.json`);
        setTranslations(response.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      try {
        const response = await import(`../../messages/${language}.json`);
        setTranslations(response.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
      }
    };

    if (!isLoading) {
      updateTranslations();
    }
  }, [language, isLoading]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {!isLoading ? children : null}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

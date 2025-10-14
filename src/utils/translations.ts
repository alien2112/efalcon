// Helper function to get a nested value from an object using a dot-notation path
export const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
  const keys = path.split('.');
  let value = obj;

  for (const key of keys) {
    if (value === undefined || value === null) return undefined;
    value = value[key];
  }

  return value;
};

// Helper function to format a translation with variables
export const formatTranslation = (text: string, variables?: Record<string, string>): string => {
  if (!variables) return text;

  return Object.entries(variables).reduce((result, [key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    return result.replace(regex, value);
  }, text);
};

// Helper function to determine text direction based on language
export const getTextDirection = (language: string): 'rtl' | 'ltr' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Helper function to determine if a language is RTL
export const isRTL = (language: string): boolean => {
  return language === 'ar';
};

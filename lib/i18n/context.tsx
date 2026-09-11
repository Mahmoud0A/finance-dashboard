'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import en from './en.json';
import ar from './ar.json';

const dictionaries = { en, ar } as const;
export type Locale = 'en' | 'ar';

export interface I18nContextValue {
  locale: Locale;
  dictionary: typeof en;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

type DictionaryValue = string | { [key: string]: DictionaryValue };

export function resolveSimplePath(key: string, dict: DictionaryValue): string {
  const parts = key.split('.');
  let val: DictionaryValue = dict;
  for (const p of parts) {
    if (val == null || typeof val !== 'object') return key;
    val = val[p];
  }
  return typeof val === 'string' ? val : key;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be inside I18nProvider');
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const dictionary = dictionaries[locale];
  const t = useCallback(
    (key: string) => resolveSimplePath(key, dictionary),
    [dictionary]
  );

  // Keep <html> language/direction semantics in sync (hydration-safe: runs client-side only)
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, dictionary, setLocale, t }}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </I18nContext.Provider>
  );
}

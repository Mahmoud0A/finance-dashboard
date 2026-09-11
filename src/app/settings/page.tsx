'use client';
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/lib/i18n/context';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Palette, Languages, Layout, RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const { compactMode, setCompactMode, resetLayout } = useDashboardStore();

  return (
    <div className="space-y-8">
      <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">{t('settingsPage.title')}</h1>

      <section className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] divide-y divide-[var(--color-border-subtle)]">
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]"><Palette size={18} strokeWidth={2.5} /></div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-ink)]">{t('settingsPage.theme')}</h3>
              <p className="text-[11.5px] text-[var(--color-ink-muted)]">{t('settingsPage.themeNote')}</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="px-4 py-2 rounded-lg bg-[var(--color-surface-muted)] text-[13px] font-bold text-[var(--color-ink)] hover:bg-[var(--color-border-subtle)] transition-colors border border-[var(--color-border-subtle)]">
            {theme === 'light' ? t('settingsPage.light') : t('settingsPage.dark')}
          </button>
        </div>

        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-positive-subtle)] flex items-center justify-center text-[var(--color-positive)]"><Languages size={18} strokeWidth={2.5} /></div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-ink)]">{t('settingsPage.language')}</h3>
              <p className="text-[11.5px] text-[var(--color-ink-muted)]">{t('settingsPage.languageNote')}</p>
            </div>
          </div>
          <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} className="px-4 py-2 rounded-lg bg-[var(--color-surface-muted)] text-[13px] font-bold text-[var(--color-ink)] hover:bg-[var(--color-border-subtle)] transition-colors border border-[var(--color-border-subtle)]">
            {locale === 'en' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]"><Layout size={18} strokeWidth={2.5} /></div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-ink)]">{t('settingsPage.compactMode')}</h3>
              <p className="text-[11.5px] text-[var(--color-ink-muted)]">{t('settingsPage.compactNote')}</p>
            </div>
          </div>
          <button onClick={() => setCompactMode(!compactMode)} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-colors border ${compactMode ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-[var(--color-surface-muted)] text-[var(--color-ink)] border-[var(--color-border-subtle)] hover:bg-[var(--color-border-subtle)]'}`}>
            {compactMode ? t('common.on') : t('common.off')}
          </button>
        </div>

        <div className="px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-warning-subtle)] flex items-center justify-center text-[var(--color-warning)]"><RotateCcw size={18} strokeWidth={2.5} /></div>
            <div>
              <h3 className="text-[14px] font-bold text-[var(--color-ink)]">{t('settingsPage.resetLayout')}</h3>
              <p className="text-[11.5px] text-[var(--color-ink-muted)]">{t('settingsPage.resetNote')}</p>
            </div>
          </div>
          <button onClick={resetLayout} className="px-4 py-2 rounded-lg bg-[var(--color-negative-subtle)] text-[var(--color-negative)] text-[13px] font-bold hover:opacity-85 transition-opacity border border-[var(--color-negative-subtle)]">
            {t('settingsPage.reset')}
          </button>
        </div>
      </section>
    </div>
  );
}

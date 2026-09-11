'use client';
import { useTheme } from '@/contexts/ThemeContext';
import { useI18n } from '@/lib/i18n/context';
import { Sun, Moon, Globe } from 'lucide-react';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 h-[62px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-[19px] font-bold tracking-tight text-[var(--color-ink)]">{t('nav.dashboard')}</h1>
          <span className="text-[13px] text-[var(--color-ink-muted)] hidden md:inline">{new Date(2025, 7, 1).toLocaleString(locale === 'ar' ? 'ar' : 'en', { month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] text-[13px] font-medium text-[var(--color-ink-secondary)] hover:border-[var(--color-border)] hover:text-[var(--color-ink)] transition-colors bg-[var(--color-surface-elevated)]" aria-label="Toggle language">
            <Globe size={14} strokeWidth={2} />
            <span>{locale === 'en' ? 'EN' : 'ع'}</span>
          </button>
          <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] text-[13px] font-medium text-[var(--color-ink-secondary)] hover:border-[var(--color-border)] hover:text-[var(--color-ink)] transition-colors bg-[var(--color-surface-elevated)]" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}

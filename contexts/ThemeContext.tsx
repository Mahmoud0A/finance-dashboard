'use client';
import { createContext, useContext, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')), []);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { I18nProvider } from '@/lib/i18n/context';
import AppShell from '@/shared/components/AppShell';

export const metadata: Metadata = {
  title: 'FinSight — Personal Finance Dashboard',
  description: 'Modern educational personal finance dashboard demonstrating state architecture.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; background: #f6f7f9; color: #0f172a; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Inter", sans-serif; -webkit-font-smoothing: antialiased; }
          .side-nav { position: fixed; top: 0; left: 0; width: 240px; height: 100vh; background: #0f172a; z-index: 50; padding: 24px; color: white; overflow-y: auto; }
          .side-nav-collapsed { width: 72px; }
          .side-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 8px; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 13.5px; font-weight: 500; transition: all 0.15s; }
          .side-link:hover { color: white; background: rgba(255,255,255,0.06); }
          .side-link.active { color: white; background: rgba(255,255,255,0.12); }
          .main-area { margin-left: 240px; min-height: 100vh; display: flex; flex-direction: column; transition: margin-left 0.3s ease; }
          .main-area-collapsed { margin-left: 72px; }
          .top-bar { position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid #e8ebf0; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
          .card { background: white; border: 1px solid #e8ebf0; border-radius: 16px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
          .hero-card { background: linear-gradient(135deg, #0f172a 0%, #14333a 100%); border-radius: 20px; padding: 32px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.08); position: relative; overflow: hidden; }
          .hero-card::after { content: ''; position: absolute; top: -40px; right: -40px; width: 240px; height: 240px; background: radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%); }
          .badge-positive { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #e6f6f0; color: #0d8a68; }
          .badge-negative { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #fceeea; color: #b23a3a; }
          .table-row { display: flex; align-items: center; gap: 16px; padding: 14px 24px; border-bottom: 1px solid #f1f3f6; transition: background 0.15s; }
          .table-row:hover { background: #f8f9fb; }
          .amount-income { color: #0d8a68; font-weight: 800; }
          .amount-expense { color: #0f172a; font-weight: 700; }
          .chart-bar { fill: #10b981; }
          .chart-bar-expense { fill: #dde1e7; }
          @media(max-width: 768px) { .side-nav { display: none; } .main-area { margin-left: 0; } }
        `}} />
      </head>
      <body>
        <Providers>
          <I18nProvider>
            <ThemeProvider>
              <AppShell>{children}</AppShell>
            </ThemeProvider>
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}

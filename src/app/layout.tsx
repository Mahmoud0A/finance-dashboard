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

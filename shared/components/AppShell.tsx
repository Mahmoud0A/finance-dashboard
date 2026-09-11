'use client';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useI18n } from '@/lib/i18n/context';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useDashboardStore();
  const { locale } = useI18n();
  const mainOffset = sidebarCollapsed ? 'md:ml-[72px] md:mr-0' : 'md:ml-[240px] md:mr-0';
  const rtlMainOffset = sidebarCollapsed ? 'md:mr-[72px] md:ml-0' : 'md:mr-[240px] md:ml-0';

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className={`flex-1 transition-[margin] duration-300 ease-out min-h-screen flex flex-col ml-0 mr-0 ${locale === 'ar' ? rtlMainOffset : mainOffset}`}>
        <TopBar />
        <div className="flex-1 px-6 md:px-8 py-8 max-w-[1280px] mx-auto w-full">
          {children}
        </div>
        <footer className="px-8 py-6 text-[11px] text-[var(--color-ink-muted)] border-t border-[var(--color-border-subtle)] hidden md:block">
          FinSight — Educational Finance Dashboard. Architecture preserved: useState, Lift State Up, Context, Zustand, TanStack Query.
        </footer>
        <MobileNav />
      </main>
    </div>
  );
}

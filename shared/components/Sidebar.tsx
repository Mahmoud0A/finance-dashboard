'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowRightLeft, Wallet, PieChart, Settings, ChevronLeft, Menu } from 'lucide-react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useI18n } from '@/lib/i18n/context';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Transactions', href: '/transactions', icon: ArrowRightLeft },
  { label: 'Accounts', href: '/accounts', icon: Wallet },
  { label: 'Budgets', href: '/budgets', icon: PieChart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();
  const { locale, t } = useI18n();

  const navLabels: Record<string, string> = {
    '/': t('nav.dashboard'),
    '/transactions': t('nav.transactions'),
    '/accounts': t('nav.accounts'),
    '/budgets': t('nav.budgets'),
  };

  return (
    <aside className={`hidden md:block fixed top-0 ${locale === 'ar' ? 'right-0' : 'left-0'} h-screen z-50 bg-[var(--color-sidebar)] text-[var(--color-sidebar-ink)] transition-all duration-300 ease-out ${sidebarCollapsed ? 'w-[72px]' : 'w-[240px]'}`}>
      <div className="flex flex-col h-full px-4 py-6">
        <div className="flex items-center gap-3 mb-10">
          <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Toggle sidebar">
            {sidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
          {!sidebarCollapsed && <span className="text-[17px] font-semibold tracking-tight">FinSight</span>}
        </div>
        <nav className="flex flex-col gap-0.5 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  active ? 'bg-white/12 text-white' : 'text-white/60 hover:text-white hover:bg-white/6'
                }`}
                title={sidebarCollapsed ? navLabels[item.href] || item.label : undefined}
              >
                <Icon size={18} strokeWidth={2} />
                {!sidebarCollapsed && <span>{navLabels[item.href] || item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/8">
          <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${pathname === '/settings' ? 'bg-white/12 text-white' : 'text-white/60 hover:text-white hover:bg-white/6'}`} title={sidebarCollapsed ? t('nav.settings') : undefined}>
            <Settings size={18} strokeWidth={2} />
            {!sidebarCollapsed && <span>{t('nav.settings')}</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowRightLeft, Wallet, PieChart, Settings } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const navItems = [
    { label: t('nav.dashboard'), href: '/', icon: LayoutDashboard },
    { label: t('nav.transactions'), href: '/transactions', icon: ArrowRightLeft },
    { label: t('nav.accounts'), href: '/accounts', icon: Wallet },
    { label: t('nav.budgets'), href: '/budgets', icon: PieChart },
    { label: t('nav.settings'), href: '/settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-sidebar)] border-t border-white/10 text-[var(--color-sidebar-ink)] px-2 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${active ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
              <Icon size={20} strokeWidth={2} />
              <span className="text-[9px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

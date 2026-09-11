'use client';
import { useQuery } from '@tanstack/react-query';
import AccountCard from '@/features/accounts/components/AccountCard';
import { useI18n } from '@/lib/i18n/context';
import type { Account } from '@/lib/mockData';

async function fetchAccounts(): Promise<Account[]> {
  const res = await fetch('/api/accounts');
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
}

const TYPE_KEYS: Record<string, string> = {
  checking: 'accounts.checking',
  savings: 'accounts.savings',
  cash: 'accounts.cash',
  credit: 'accounts.credit',
};

export default function AccountsPage() {
  const { t } = useI18n();
  const { data: accounts = [], isLoading, isError, refetch } = useQuery<Account[]>({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">{t('accounts.title')}</h1>
        <span className="text-[13px] text-[var(--color-ink-muted)]">
          {!isLoading && !isError ? `${accounts.length} ${t('accounts.linked')}` : ''}
        </span>
      </div>
      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xs)] overflow-hidden divide-y divide-[var(--color-border-subtle)]">
        {isLoading && <p className="px-6 py-8 text-center text-sm text-[var(--color-ink-muted)]">{t('common.loading')}</p>}
        {isError && (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-[var(--color-danger)]">{t('common.error')}</p>
            <button onClick={() => refetch()} className="mt-3 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium">
              {t('common.retry')}
            </button>
          </div>
        )}
        {!isLoading && !isError && accounts.map((acc) => (
          <AccountCard key={acc.id} name={acc.name} type={t(TYPE_KEYS[acc.type] ?? acc.type)} balance={acc.balance} currency={acc.currency} />
        ))}
      </div>
    </div>
  );
}

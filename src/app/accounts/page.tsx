import AccountCard from '@/features/accounts/components/AccountCard';

export default function AccountsPage() {
  const accounts = [
    { name: 'Main Checking', type: 'Checking', balance: 8420.5, currency: 'USD' },
    { name: 'Savings Account', type: 'Savings', balance: 15600, currency: 'USD' },
    { name: 'Cash Wallet', type: 'Cash', balance: 320, currency: 'USD' },
    { name: 'Travel Credit', type: 'Credit', balance: -450.75, currency: 'USD' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">Accounts</h1>
        <span className="text-[13px] text-[var(--color-ink-muted)]">4 accounts linked</span>
      </div>
      <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xs)] overflow-hidden divide-y divide-[var(--color-border-subtle)]">
        {accounts.map((acc) => (
          <AccountCard key={acc.name} {...acc} />
        ))}
      </div>
    </div>
  );
}

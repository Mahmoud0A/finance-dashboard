import React from 'react';

export interface AccountCardProps {
  name: string;
  type: string;
  balance: number;
  currency?: string;
}

export default function AccountCard({ name, type, balance, currency = 'USD' }: AccountCardProps) {
  return (
    <a href="#" className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[var(--color-surface-muted)]">
      <div className="min-w-0">
        <div className="truncate text-[15px] font-bold text-[var(--color-ink)]">{name}</div>
        <div className="text-[12.5px] capitalize text-[var(--color-ink-muted)]">
          {type} - {currency}
        </div>
      </div>
      <div className={`shrink-0 text-[18px] font-extrabold tracking-tight ${balance < 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-ink)]'}`}>
        {balance < 0 ? '-' : ''}${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
    </a>
  );
}

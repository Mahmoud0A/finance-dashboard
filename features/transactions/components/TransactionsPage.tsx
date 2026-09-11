'use client';
import React, { useState } from 'react';
import TransactionRow from './TransactionRow';
import TransactionFilters from './TransactionFilters';
import { TransactionFilters as FilterType } from '../types/transaction.types';
import { useI18n } from '@/lib/i18n/context';

function TransactionSummary({ filters }: { filters: FilterType }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3 text-[12.5px] text-[var(--color-ink-muted)]">
      <span>{t('transactions.results')}: <strong className="text-[var(--color-ink)]">5</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.category')}: <strong className="text-[var(--color-ink)]">{filters.category || 'All'}</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.account')}: <strong className="text-[var(--color-ink)]">{filters.account || 'All'}</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.type')}: <strong className="text-[var(--color-ink)]">{filters.type || 'All'}</strong></span>
    </div>
  );
}

const rows = [
  { id: 'tx-1', date: 'Aug 28', description: 'Grocery shopping', category: 'Food', account: 'Main Checking', type: 'expense', amount: 45 },
  { id: 'tx-2', date: 'Aug 01', description: 'Monthly salary', category: 'Salary', account: 'Main Checking', type: 'income', amount: 3200 },
  { id: 'tx-3', date: 'Aug 15', description: 'Metro pass', category: 'Transport', account: 'Savings', type: 'expense', amount: 120 },
  { id: 'tx-4', date: 'Aug 20', description: 'Movie night', category: 'Entertainment', account: 'Cash', type: 'expense', amount: 35 },
  { id: 'tx-5', date: 'Aug 22', description: 'Online order', category: 'Shopping', account: 'Credit', type: 'expense', amount: 89.5 },
] satisfies Array<React.ComponentProps<typeof TransactionRow> & { id: string }>;

export default function TransactionsPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<FilterType>({ search: '', category: '', account: '', type: '', sort: 'date-desc' });
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">{t('transactions.title')}</h1>
      </div>
      <TransactionFilters filters={filters} onChange={setFilters} />
      <TransactionSummary filters={filters} />
      <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xs)] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-[var(--color-surface-muted)] text-[11px] uppercase tracking-[0.06em] font-bold text-[var(--color-ink-muted)]">
            <tr>
              <th className="text-left px-5 py-3.5">{t('common.date')}</th>
              <th className="text-left px-4 py-3.5">{t('common.description')}</th>
              <th className="text-left px-4 py-3.5">{t('common.category')}</th>
              <th className="text-left px-4 py-3.5">{t('common.account')}</th>
              <th className="text-right px-5 py-3.5">{t('common.amount')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            {rows.map((r) => (
              <TransactionRow key={r.id} {...r} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TransactionRow from './TransactionRow';
import TransactionFilters from './TransactionFilters';
import TransactionForm from './TransactionForm';
import { TransactionFilters as FilterType } from '../types/transaction.types';
import { useI18n } from '@/lib/i18n/context';
import type { Transaction } from '@/lib/mockData';

// Fetch from the Next.js API route — demonstrates TanStack Query server-state pattern
async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch('/api/transactions');
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

function TransactionSummary({ filters, count }: { filters: FilterType; count: number }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3 text-[12.5px] text-[var(--color-ink-muted)]">
      <span>{t('transactions.results')}: <strong className="text-[var(--color-ink)]">{count}</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.category')}: <strong className="text-[var(--color-ink)]">{filters.category || 'All'}</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.account')}: <strong className="text-[var(--color-ink)]">{filters.account || 'All'}</strong></span>
      <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
      <span>{t('transactions.type')}: <strong className="text-[var(--color-ink)]">{filters.type || 'All'}</strong></span>
    </div>
  );
}

export default function TransactionsPage() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<FilterType>({ search: '', category: '', account: '', type: '', sort: 'date-desc' });
  const [showForm, setShowForm] = useState(false);

  // TanStack Query: server-state — fetches from the /api/transactions route
  const { data: transactions = [], isLoading, isError } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  // Local filter applied on top of server data (local-state pattern)
  const filtered = transactions.filter((tx) => {
    if (filters.type && tx.type !== filters.type) return false;
    if (filters.category && tx.category !== filters.category) return false;
    if (filters.search && !tx.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const rows = filtered.map((tx) => ({
    id: tx.id,
    date: tx.date,
    description: tx.description,
    category: tx.category,
    account: tx.accountId,
    type: tx.type as 'income' | 'expense',
    amount: tx.amount,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">
          {t('transactions.title')}
        </h1>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showForm ? t('common.cancel') || 'Cancel' : t('transactions.addNew') || '+ Add Transaction'}
        </button>
      </div>

      {showForm && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-[var(--color-ink)] mb-4">{t('transactions.addNew') || 'Add Transaction'}</h2>
          <TransactionForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <TransactionFilters filters={filters} onChange={setFilters} />
      <TransactionSummary filters={filters} count={rows.length} />

      <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-[var(--radius-xl)] shadow-[var(--shadow-xs)] overflow-hidden">
        {isLoading && (
          <div className="px-6 py-8 text-center text-sm text-[var(--color-ink-muted)]">
            {t('common.loading') || 'Loading...'}
          </div>
        )}
        {isError && (
          <div className="px-6 py-8 text-center text-sm text-[var(--color-danger)]">
            {t('common.error') || 'Failed to load transactions.'}
          </div>
        )}
        {!isLoading && !isError && (
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
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center px-5 py-8 text-sm text-[var(--color-ink-muted)]">
                    {t('common.noResults') || 'No transactions found.'}
                  </td>
                </tr>
              ) : (
                rows.map((r) => <TransactionRow key={r.id} {...r} />)
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

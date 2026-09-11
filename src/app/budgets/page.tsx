'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BudgetProgress from '@/features/budgets/components/BudgetProgress';
import { useI18n } from '@/lib/i18n/context';
import { CURRENT_MONTH, getBudgetSpent, type Budget } from '@/lib/mockData';

async function fetchBudgets(): Promise<Budget[]> {
  const res = await fetch('/api/budgets');
  if (!res.ok) throw new Error('Failed to fetch budgets');
  return res.json();
}

export default function BudgetsPage() {
  const { t, locale } = useI18n();
  const { data: budgets = [], isLoading, isError, refetch } = useQuery<Budget[]>({
    queryKey: ['budgets', CURRENT_MONTH],
    queryFn: fetchBudgets,
  });

  const monthLabel = new Date(2025, 7, 1).toLocaleString(locale === 'ar' ? 'ar' : 'en', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">{t('budgets.title')}</h1>
        <span className="text-[13px] text-[var(--color-ink-muted)]">{monthLabel}</span>
      </div>
      {isLoading && <p className="text-sm text-[var(--color-ink-muted)]">{t('common.loading')}</p>}
      {isError && (
        <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center">
          <p className="text-sm text-[var(--color-danger)]">{t('common.error')}</p>
          <button onClick={() => refetch()} className="mt-3 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium">
            {t('common.retry')}
          </button>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((b) => (
            <BudgetProgress
              key={b.id}
              category={t(`budgets.${b.category.toLowerCase()}`)}
              limit={b.limit}
              spent={getBudgetSpent(b.category, CURRENT_MONTH)}
              usedLabel={t('budgets.spent')}
              remainingLabel={t('budgets.remaining')}
              overLabel={t('budgets.over')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

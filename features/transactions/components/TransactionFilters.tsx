'use client';
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { useI18n } from '@/lib/i18n/context';
import { TransactionFilters as FilterType } from '../types/transaction.types';

export default function TransactionFilters({ filters, onChange }: { filters: FilterType; onChange: (f: FilterType) => void }) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const selectClass = "w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[13px] text-[var(--color-ink-secondary)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all";
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] px-4 py-3 shadow-[var(--shadow-xs)]">
      <div className="flex items-center gap-2 mb-3 md:hidden">
        <button onClick={() => setExpanded(!expanded)} className="text-[12px] font-semibold text-[var(--color-ink-secondary)] flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--color-surface-muted)] transition-colors">
          <Filter size={14} strokeWidth={2.5} /> {t('filters.toggle')} {expanded ? '−' : '+'}
        </button>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-2.5 ${expanded ? 'block' : 'hidden md:grid'}`}>
        <Input
          placeholder={t('filters.search')}
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
        <select className={selectClass} value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>
          <option value="">{t('filters.allCategories')}</option>
          <option value="Food">{t('budgets.food')}</option>
          <option value="Transportation">{t('budgets.transportation')}</option>
          <option value="Entertainment">{t('budgets.entertainment')}</option>
          <option value="Shopping">{t('budgets.shopping')}</option>
          <option value="Bills">{t('budgets.bills')}</option>
          <option value="Salary">Salary</option>
        </select>
        <select className={selectClass} value={filters.account} onChange={(e) => onChange({ ...filters, account: e.target.value })}>
          <option value="">{t('filters.allAccounts')}</option>
          <option value="acc-1">Main Checking</option>
          <option value="acc-2">Savings</option>
          <option value="acc-3">Cash</option>
          <option value="acc-4">Credit</option>
        </select>
        <select className={selectClass} value={filters.type} onChange={(e) => onChange({ ...filters, type: e.target.value })}>
          <option value="">{t('filters.allTypes')}</option>
          <option value="income">{t('common.income')}</option>
          <option value="expense">{t('common.expense')}</option>
        </select>
        <select className={selectClass} value={filters.sort} onChange={(e) => onChange({ ...filters, sort: e.target.value })}>
          <option value="date-desc">{t('filters.newest')}</option>
          <option value="date-asc">{t('filters.oldest')}</option>
          <option value="amount-desc">{t('filters.highestAmount')}</option>
          <option value="amount-asc">{t('filters.lowestAmount')}</option>
        </select>
      </div>
    </div>
  );
}

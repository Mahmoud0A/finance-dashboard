'use client';
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/shared/components/Input';
import { TransactionFilters as FilterType } from '../types/transaction.types';

export default function TransactionFilters({ filters, onChange }: { filters: FilterType; onChange: (f: FilterType) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] px-4 py-3 shadow-[var(--shadow-xs)]">
      <div className="flex items-center gap-2 mb-3 md:hidden">
        <button onClick={() => setExpanded(!expanded)} className="text-[12px] font-semibold text-[var(--color-ink-secondary)] flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[var(--color-surface-muted)] transition-colors">
          <Filter size={14} strokeWidth={2.5} /> Filters {expanded ? '−' : '+'}
        </button>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-5 gap-2.5 ${expanded ? 'block' : 'hidden md:grid'}`}>
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
        <select className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[13px] text-[var(--color-ink-secondary)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all" value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>
          <option value="">All categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Salary">Salary</option>
        </select>
        <select className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[13px] text-[var(--color-ink-secondary)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all" value={filters.account} onChange={(e) => onChange({ ...filters, account: e.target.value })}>
          <option value="">All accounts</option>
          <option value="acc-1">Main Checking</option>
          <option value="acc-2">Savings</option>
          <option value="acc-3">Cash</option>
          <option value="acc-4">Credit</option>
        </select>
        <select className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[13px] text-[var(--color-ink-secondary)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all" value={filters.type} onChange={(e) => onChange({ ...filters, type: e.target.value })}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className="w-full px-3 py-2 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[13px] text-[var(--color-ink-secondary)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all" value={filters.sort} onChange={(e) => onChange({ ...filters, sort: e.target.value })}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>
    </div>
  );
}

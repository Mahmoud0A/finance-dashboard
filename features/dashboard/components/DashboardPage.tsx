'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, SlidersHorizontal } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n/context';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { Account, DashboardSummary, Transaction } from '@/lib/mockData';
import { CURRENT_MONTH } from '@/lib/mockData';

async function fetchSummary(): Promise<DashboardSummary> {
  const res = await fetch(`/api/dashboard-summary?month=${CURRENT_MONTH}`);
  if (!res.ok) throw new Error('Failed to fetch dashboard summary');
  return res.json();
}

async function fetchAccounts(): Promise<Account[]> {
  const res = await fetch('/api/accounts');
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
}

function formatUSD(value: number): string {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function monthLabel(month: string, locale: Locale): string {
  const [y, m] = month.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleString(locale === 'ar' ? 'ar' : 'en', { month: 'short' });
}

const WIDGETS = [
  { id: 'balance', labelKey: 'dashboard.totalBalance' },
  { id: 'income', labelKey: 'dashboard.monthlyIncome' },
  { id: 'expenses', labelKey: 'dashboard.monthlyExpenses' },
  { id: 'savings', labelKey: 'dashboard.savings' },
  { id: 'chart', labelKey: 'dashboard.incomeVsExpenses' },
  { id: 'budget', labelKey: 'dashboard.budgetOverview' },
  { id: 'accounts', labelKey: 'dashboard.accountsOverview' },
  { id: 'transactions', labelKey: 'dashboard.recentTransactions' },
] as const;

function ChartCard({ summary, locale, t }: { summary: DashboardSummary; locale: Locale; t: (k: string) => string }) {
  const points = summary.monthlySeries;
  const max = Math.max(...points.map((p) => Math.max(p.income, p.expenses)), 1);
  const W = 620;
  const H = 200;
  const base = 160;
  const top = 24;
  const scale = (base - top) / max;
  const n = points.length;
  const slot = (W - 40) / n;
  const barW = Math.min(26, slot / 2 - 6);
  const latest = points[n - 1];

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)]">{t('dashboard.incomeVsExpenses')}</h2>
          <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{t('dashboard.monthlyTrend')}</p>
        </div>
        <span className="text-[11px] font-semibold text-[var(--color-ink-muted)] bg-[var(--color-surface-muted)] px-3 py-1 rounded-full">
          {monthLabel(summary.month, locale)} 2025
        </span>
      </div>
      <div className="relative h-[220px] w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" role="img" aria-label="Income vs expenses chart">
          {[30, 75, 120, 165].map((y) => (
            <line key={y} x1="40" y1={y} x2={W - 20} y2={y} stroke="var(--color-border-subtle)" strokeWidth="1" />
          ))}
          {points.map((p, i) => {
            const cx = 40 + slot * i + slot / 2;
            const ih = Math.max(p.income * scale, 2);
            const eh = Math.max(p.expenses * scale, 2);
            const isLatest = p.month === latest.month;
            return (
              <g key={p.month}>
                <rect x={cx - barW - 2} y={base - ih} width={barW} height={ih} rx="3" fill="var(--color-primary)" opacity={isLatest ? 1 : 0.75}>
                  <title>{`${monthLabel(p.month, locale)} ${t('common.income')}: $${formatUSD(p.income)}`}</title>
                </rect>
                <rect x={cx + 2} y={base - eh} width={barW} height={eh} rx="3" fill="var(--color-border)">
                  <title>{`${monthLabel(p.month, locale)} ${t('common.expense')}: $${formatUSD(p.expenses)}`}</title>
                </rect>
                {isLatest && (
                  <text x={cx - barW / 2 - 2} y={base - ih - 8} textAnchor="middle" fontSize="9" fill="var(--color-primary)" fontWeight="700">
                    ${(p.income / 1000).toFixed(1)}k
                  </text>
                )}
                <text x={cx} y={182} textAnchor="middle" fontSize="8" fill="var(--color-ink-muted)" fontWeight="600">
                  {monthLabel(p.month, locale)}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex items-center gap-4 mt-3 text-[11px] text-[var(--color-ink-muted)]">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--color-primary)]"></span> {t('common.income')}</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--color-border)]"></span> {t('common.expense')}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const { hiddenWidgets, hideWidget, showWidget, compactMode } = useDashboardStore();
  const [customizing, setCustomizing] = useState(false);

  const summaryQuery = useQuery<DashboardSummary>({ queryKey: ['dashboard-summary', CURRENT_MONTH], queryFn: fetchSummary });
  const accountsQuery = useQuery<Account[]>({ queryKey: ['accounts'], queryFn: fetchAccounts });

  const isHidden = (id: string) => hiddenWidgets.includes(id);
  const spacing = compactMode ? 'space-y-4' : 'space-y-8';

  if (summaryQuery.isLoading || accountsQuery.isLoading) {
    return (
      <div className={`${spacing}`}>
        <div className="h-10 w-48 rounded-lg bg-[var(--color-surface-muted)] animate-pulse" />
        <div className="h-44 rounded-2xl bg-[var(--color-surface-muted)] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-[var(--color-surface-muted)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (summaryQuery.isError || accountsQuery.isError || !summaryQuery.data || !accountsQuery.data) {
    return (
      <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-sm font-semibold text-[var(--color-ink)]">{t('common.error')}</p>
        <button
          onClick={() => { summaryQuery.refetch(); accountsQuery.refetch(); }}
          className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  const summary = summaryQuery.data;
  const accounts = accountsQuery.data;

  const series = summary.monthlySeries;
  const prev = series.length > 1 ? series[series.length - 2] : null;
  const latest = series[series.length - 1];
  const prevNet = prev ? prev.income - prev.expenses : 0;
  const latestNet = latest.income - latest.expenses;
  const mom = prevNet !== 0 ? (latestNet - prevNet) / Math.abs(prevNet) : 0;
  const momLabel = `${mom >= 0 ? '+' : '−'}${Math.abs(mom * 100).toFixed(1)}%`;

  const metricCard = (id: string, label: string, value: string, sub: string, valueClass = 'text-[var(--color-ink)]', badge?: React.ReactNode) => {
    if (isHidden(id)) return null;
    return (
      <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink-muted)]">{label}</span>
          {badge}
        </div>
        <div className={`text-2xl font-extrabold tracking-tight ${valueClass}`}>{value}</div>
        <div className="mt-2 text-sm text-[var(--color-ink-secondary)]">{sub}</div>
      </div>
    );
  };

  return (
    <div className={spacing}>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight">{t('common.overview')}</h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">{t('common.monthlyTrend')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-xs text-[var(--color-ink-muted)]">{t('common.updatedJustNow')}</div>
          <button
            onClick={() => setCustomizing((c) => !c)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border-subtle)] text-[13px] font-medium text-[var(--color-ink-secondary)] hover:border-[var(--color-border)] transition-colors bg-[var(--color-surface-elevated)]"
          >
            <SlidersHorizontal size={14} strokeWidth={2.5} /> {t('common.customize')}
          </button>
        </div>
      </div>

      {customizing && (
        <div className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-4 py-3 shadow-sm">
          <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink-muted)] mb-2">{t('common.widgets')}</div>
          <div className="flex flex-wrap gap-2">
            {WIDGETS.map((w) => (
              <button
                key={w.id}
                onClick={() => (isHidden(w.id) ? showWidget(w.id) : hideWidget(w.id))}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-colors ${
                  isHidden(w.id)
                    ? 'bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] border-[var(--color-border-subtle)]'
                    : 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                }`}
              >
                {t(w.labelKey)}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isHidden('balance') && (
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white px-7 py-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Wallet size={18} strokeWidth={2} className="text-white/70" />
              <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-white/60">{t('dashboard.totalBalance')}</span>
            </div>
            <div className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none">${formatUSD(summary.totalBalance)}</div>
            <div className="mt-3 flex items-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><TrendingUp size={14} strokeWidth={2.5} /> {momLabel} {t('common.fromLastMonth')}</span>
              <span>{accounts.length} {t('common.accountsLinked')}</span>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCard(
          'income',
          t('dashboard.monthlyIncome'),
          `$${formatUSD(summary.monthlyIncome)}`,
          t('common.salaryFreelance'),
          'text-[var(--color-ink)]',
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-positive)] bg-[var(--color-positive-subtle)] px-2 py-0.5 rounded-full"><ArrowUpRight size={12} strokeWidth={3} /> {t('common.vsLastMonth')}</span>,
        )}
        {metricCard(
          'expenses',
          t('dashboard.monthlyExpenses'),
          `$${formatUSD(summary.monthlyExpenses)}`,
          t('common.foodTransportShopping'),
          'text-[var(--color-ink)]',
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-negative)] bg-[var(--color-negative-subtle)] px-2 py-0.5 rounded-full"><ArrowDownRight size={12} strokeWidth={3} /> {t('common.vsLastMonth')}</span>,
        )}
        {metricCard(
          'savings',
          t('dashboard.savings'),
          `$${formatUSD(summary.netCashFlow)}`,
          t('common.netCashFlowNote'),
          'text-[var(--color-positive)]',
          <span className="text-[11px] font-bold text-[var(--color-ink-muted)]">{(summary.savingsRate * 100).toFixed(1)}% {t('common.rate')}</span>,
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {!isHidden('chart') && (
          <div className="lg:col-span-2">
            <ChartCard summary={summary} locale={locale} t={t} />
          </div>
        )}
        {!isHidden('budget') && (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)] mb-1">{t('dashboard.budgetOverview')}</h2>
            <p className="text-xs text-[var(--color-ink-muted)] mb-5">{t('budgets.title')}</p>
            <div className="space-y-4">
              {summary.budgets.map((b) => (
                <div key={b.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-[var(--color-ink)]">{t(`budgets.${b.category.toLowerCase()}`)}</span>
                    <span className="text-[var(--color-ink-muted)]">${formatUSD(b.spent)} / ${formatUSD(b.limit)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--color-background)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${b.spent > b.limit ? 'bg-[var(--color-negative)]' : b.percent >= 0.8 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-primary)]'}`}
                      style={{ width: `${Math.min(Math.round(b.percent * 100), 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {!isHidden('transactions') && (
          <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between border-b border-[var(--color-border-subtle)]">
              <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)]">{t('dashboard.recentTransactions')}</h2>
              <a href="/transactions" className="text-xs font-semibold text-[var(--color-accent)] hover:underline">{t('common.viewAll')}</a>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {summary.recent.length === 0 && (
                <p className="px-6 py-8 text-center text-sm text-[var(--color-ink-muted)]">{t('common.noResults')}</p>
              )}
              {summary.recent.map((tx: Transaction) => (
                <div key={tx.id} className="flex items-center gap-4 px-6 py-3.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${tx.type === 'income' ? 'bg-[var(--color-positive-subtle)] text-[var(--color-positive)]' : 'bg-[var(--color-negative-subtle)] text-[var(--color-negative)]'}`}>
                    {tx.type === 'income' ? '+' : '-'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[var(--color-ink)] truncate">{tx.description}</div>
                    <div className="text-xs text-[var(--color-ink-muted)]">{tx.category} - {tx.date}</div>
                  </div>
                  <div className={`text-sm font-extrabold tracking-tight shrink-0 ${tx.type === 'income' ? 'text-[var(--color-positive)]' : 'text-[var(--color-ink)]'}`}>
                    {tx.type === 'income' ? '+' : '-'}${formatUSD(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isHidden('accounts') && (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)] mb-1">{t('dashboard.accountsOverview')}</h2>
            <p className="text-xs text-[var(--color-ink-muted)] mb-5">{accounts.length} {t('common.accountsLinked')}</p>
            <div className="space-y-3">
              {accounts.map((acc) => (
                <div key={acc.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-elevated)]">
                  <div>
                    <div className="text-sm font-bold text-[var(--color-ink)]">{acc.name}</div>
                    <div className="text-xs text-[var(--color-ink-muted)] capitalize">{acc.type} - {acc.currency}</div>
                  </div>
                  <div className={`text-base font-extrabold tracking-tight ${acc.balance < 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-ink)]'}`}>
                    {acc.balance < 0 ? '-' : ''}${formatUSD(Math.abs(acc.balance))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

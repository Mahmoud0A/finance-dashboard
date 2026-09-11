'use client';
import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function DashboardPage() {
  const { t } = useI18n();
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] leading-tight">{t('common.overview')}</h1>
          <p className="text-sm text-[var(--color-ink-muted)] mt-1">{t('common.monthlyTrend')}</p>
        </div>
        <div className="hidden md:block text-xs text-[var(--color-ink-muted)]">{t('common.updatedJustNow')}</div>
      </div>

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white px-7 py-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} strokeWidth={2} className="text-white/70" />
            <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-white/60">{t('dashboard.totalBalance')}</span>
          </div>
          <div className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-none">$27,890.75</div>
          <div className="mt-3 flex items-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-1.5"><TrendingUp size={14} strokeWidth={2.5} /> +2.4% {t('common.fromLastMonth') || 'from last month'}</span>
            <span>4 {t('common.accountsLinked')}</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink-muted)]">{t('dashboard.monthlyIncome')}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-positive)] bg-[var(--color-positive-subtle)] px-2 py-0.5 rounded-full"><ArrowUpRight size={12} strokeWidth={3} /> +8.2%</span>
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">$3,200.00</div>
          <div className="mt-2 text-sm text-[var(--color-ink-secondary)]">{t('common.salaryFreelance')}</div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink-muted)]">{t('dashboard.monthlyExpenses')}</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-negative)] bg-[var(--color-negative-subtle)] px-2 py-0.5 rounded-full"><ArrowDownRight size={12} strokeWidth={3} /> -12.1%</span>
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">$654.50</div>
          <div className="mt-2 text-sm text-[var(--color-ink-secondary)]">{t('common.foodTransportShopping')}</div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--color-ink-muted)]">{t('dashboard.savings')}</span>
            <span className="text-[11px] font-bold text-[var(--color-ink-muted)]">79.5% rate</span>
          </div>
          <div className="text-2xl font-extrabold tracking-tight text-[var(--color-positive)]">$2,545.50</div>
          <div className="mt-2 text-sm text-[var(--color-ink-secondary)]">Income - Expenses</div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)]">{t('dashboard.incomeVsExpenses')}</h2>
              <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{t('dashboard.monthlyTrend')}</p>
            </div>
            <span className="text-[11px] font-semibold text-[var(--color-ink-muted)] bg-[var(--color-surface-muted)] px-3 py-1 rounded-full">Aug 2025</span>
          </div>
          <div className="relative h-[220px] w-full">
            <svg viewBox="0 0 620 200" className="w-full h-full" aria-label="Income vs expenses chart">
              {/* Grid */}
              <line x1="40" y1="30" x2="580" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="75" x2="580" y2="75" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="120" x2="580" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="165" x2="580" y2="165" stroke="#f1f5f9" strokeWidth="1" />
              {/* Income bars (emerald) */}
              <rect x="55" y="88" width="28" height="72" rx="3" fill="#10b981" />
              <rect x="95" y="78" width="28" height="82" rx="3" fill="#10b981" />
              <rect x="135" y="65" width="28" height="95" rx="3" fill="#10b981" />
              <rect x="175" y="82" width="28" height="78" rx="3" fill="#10b981" />
              <rect x="215" y="58" width="28" height="102" rx="3" fill="#10b981" />
              <rect x="255" y="70" width="28" height="90" rx="3" fill="#10b981" />
              <rect x="295" y="62" width="28" height="98" rx="3" fill="#10b981" />
              <rect x="335" y="85" width="28" height="75" rx="3" fill="#10b981" />
              <rect x="375" y="92" width="28" height="68" rx="3" fill="#10b981" />
              <rect x="415" y="75" width="28" height="85" rx="3" fill="#10b981" />
              <rect x="455" y="68" width="28" height="92" rx="3" fill="#10b981" />
              <rect x="495" y="55" width="28" height="105" rx="3" fill="#10b981" />
              {/* Expense bars (light gray) */}
              <rect x="78" y="125" width="28" height="35" rx="3" fill="#dde1e7" />
              <rect x="118" y="130" width="28" height="30" rx="3" fill="#dde1e7" />
              <rect x="158" y="120" width="28" height="40" rx="3" fill="#dde1e7" />
              <rect x="198" y="135" width="28" height="25" rx="3" fill="#dde1e7" />
              <rect x="238" y="125" width="28" height="35" rx="3" fill="#dde1e7" />
              <rect x="278" y="128" width="28" height="32" rx="3" fill="#dde1e7" />
              <rect x="318" y="132" width="28" height="28" rx="3" fill="#dde1e7" />
              <rect x="358" y="122" width="28" height="38" rx="3" fill="#dde1e7" />
              <rect x="398" y="135" width="28" height="25" rx="3" fill="#dde1e7" />
              <rect x="438" y="128" width="28" height="32" rx="3" fill="#dde1e7" />
              <rect x="478" y="125" width="28" height="35" rx="3" fill="#dde1e7" />
              <rect x="518" y="130" width="28" height="30" rx="3" fill="#dde1e7" />
              {/* Month labels */}
              <text x="69" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Jan</text>
              <text x="109" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Feb</text>
              <text x="149" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Mar</text>
              <text x="189" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Apr</text>
              <text x="229" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">May</text>
              <text x="269" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Jun</text>
              <text x="309" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Jul</text>
              <text x="349" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Aug</text>
              <text x="389" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Sep</text>
              <text x="429" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Oct</text>
              <text x="469" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Nov</text>
              <text x="509" y="185" textAnchor="middle" fontSize="7" fill="#94a3b8" fontWeight="600">Dec</text>
            </svg>
            <div className="flex items-center gap-4 mt-3 text-[11px] text-[var(--color-ink-muted)]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--color-primary)]"></span> {t('common.income')}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--color-border)]"></span> {t('common.expense')}</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)] mb-1">{t('dashboard.budgetOverview')}</h2>
          <p className="text-xs text-[var(--color-ink-muted)] mb-5">{t('budgets.title')}</p>
          <div className="space-y-4">
            {[
              { cat: 'Food', used: 420, limit: 600 },
              { cat: 'Transport', used: 120, limit: 200 },
              { cat: 'Shopping', used: 89, limit: 300 },
              { cat: 'Entertainment', used: 35, limit: 150 },
              { cat: 'Bills', used: 310, limit: 500 },
            ].map((b) => (
              <div key={b.cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-[var(--color-ink)]">{t('budgets.' + (b.cat === 'Transport' ? 'transportation' : b.cat.toLowerCase())) || b.cat}</span>
                  <span className="text-[var(--color-ink-muted)]">${b.used} / ${b.limit}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-background)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.round((b.used / b.limit) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between border-b border-[var(--color-border-subtle)]">
            <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)]">{t('dashboard.recentTransactions')}</h2>
            <a href="/transactions" className="text-xs font-semibold text-[var(--color-accent)] hover:underline">{t('common.viewAll')}</a>
          </div>
          <div className="divide-y divide-[var(--color-border-subtle)]">
            {[
              { desc: 'Grocery shopping', cat: 'Food', date: 'Aug 28', acc: 'Checking', type: 'expense', amt: 45 },
              { desc: 'Monthly salary', cat: 'Salary', date: 'Aug 01', acc: 'Checking', type: 'income', amt: 3200 },
              { desc: 'Metro pass', cat: 'Transport', date: 'Aug 15', acc: 'Savings', type: 'expense', amt: 120 },
              { desc: 'Movie night', cat: 'Entertainment', date: 'Aug 20', acc: 'Cash', type: 'expense', amt: 35 },
              { desc: 'Online order', cat: 'Shopping', date: 'Aug 22', acc: 'Credit', type: 'expense', amt: 89.5 },
            ].map((tx) => (
              <a key={tx.desc + tx.date} href="#" className="flex items-center gap-4 px-6 py-3.5 hover:bg-[var(--color-surface-muted)] transition-colors group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${tx.type === 'income' ? 'bg-[var(--color-positive-subtle)] text-[var(--color-positive)]' : 'bg-[var(--color-negative-subtle)] text-[var(--color-negative)]'}`}>
                  {tx.type === 'income' ? '+' : '-'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[var(--color-ink)] truncate">{tx.desc}</div>
                  <div className="text-xs text-[var(--color-ink-muted)]">{tx.cat} - {tx.acc}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-extrabold tracking-tight ${tx.type === 'income' ? 'text-[var(--color-positive)]' : 'text-[var(--color-ink)]'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-[var(--color-ink-muted)]">{tx.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border-subtle)] rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold tracking-tight text-[var(--color-ink)] mb-1">{t('dashboard.accountsOverview')}</h2>
          <p className="text-xs text-[var(--color-ink-muted)] mb-5">{t('common.accountsLinked')}</p>
          <div className="space-y-3">
            {[
              { name: 'Main Checking', type: 'Checking', balance: 8420.5 },
              { name: 'Savings Account', type: 'Savings', balance: 15600 },
              { name: 'Cash Wallet', type: 'Cash', balance: 320 },
              { name: 'Travel Credit', type: 'Credit', balance: -450.75 },
            ].map((acc) => (
              <a key={acc.name} href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color-surface-muted)] transition-colors group">
                <div>
                  <div className="text-sm font-bold text-[var(--color-ink)]">{acc.name}</div>
                  <div className="text-xs text-[var(--color-ink-muted)] capitalize">{acc.type} - USD</div>
                </div>
                <div className={`text-base font-extrabold tracking-tight ${acc.balance < 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-ink)]'}`}>
                  {acc.balance < 0 ? '-' : ''}${Math.abs(acc.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import BudgetProgress from '@/features/budgets/components/BudgetProgress';

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)] leading-[1.15]">Budgets</h1>
        <span className="text-[13px] text-[var(--color-ink-muted)]">August 2025</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BudgetProgress category="Food" limit={600} spent={420} />
        <BudgetProgress category="Transportation" limit={200} spent={120} />
        <BudgetProgress category="Entertainment" limit={150} spent={35} />
        <BudgetProgress category="Shopping" limit={300} spent={89.5} />
        <BudgetProgress category="Bills" limit={500} spent={310} />
      </div>
    </div>
  );
}

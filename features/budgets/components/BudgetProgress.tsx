import React from 'react';

interface BudgetProgressProps {
  category: string;
  limit: number;
  spent: number;
  usedLabel: string;
  remainingLabel: string;
  overLabel: string;
}

export default function BudgetProgress({ category, limit, spent, usedLabel, remainingLabel, overLabel }: BudgetProgressProps) {
  const pct = limit > 0 ? spent / limit : 0;
  const remaining = limit - spent;
  const statusColor = spent > limit ? 'bg-[var(--color-negative)]' : pct >= 0.8 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-primary)]';

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 space-y-2">
      <div className="flex justify-between text-sm font-medium"><span>{category}</span><span>${spent} / ${limit}</span></div>
      <div className="h-3 w-full bg-[var(--color-background)] rounded-full overflow-hidden">
        <div className={`h-full ${statusColor} rounded-full`} style={{ width: `${Math.min(Math.round(pct * 100), 100)}%` }} />
      </div>
      <div className="text-xs text-[var(--color-muted)]">
        {Math.round(pct * 100)}% {usedLabel} - {remaining >= 0 ? `$${remaining} ${remainingLabel}` : `$${Math.abs(remaining)} ${overLabel}`}
      </div>
    </div>
  );
}

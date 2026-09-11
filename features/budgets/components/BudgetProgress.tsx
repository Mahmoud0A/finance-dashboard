import React from 'react';

export default function BudgetProgress({ category, limit, spent }: { category: string; limit: number; spent: number }) {
  const pct = Math.min(Math.round((spent / limit) * 100), 100);
  const remaining = limit - spent;
  const statusColor = spent > limit ? 'bg-[var(--color-negative)]' : pct >= 80 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-primary)]';

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] p-4 space-y-2">
      <div className="flex justify-between text-sm font-medium"><span>{category}</span><span>${spent} / ${limit}</span></div>
      <div className="h-3 w-full bg-[var(--color-background)] rounded-full overflow-hidden">
        <div className={`h-full ${statusColor} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-[var(--color-muted)]">
        {pct}% used - {remaining >= 0 ? `$${remaining} remaining` : `$${Math.abs(remaining)} over budget`}
      </div>
    </div>
  );
}

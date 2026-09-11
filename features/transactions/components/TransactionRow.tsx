import React from 'react';

export interface TransactionRowProps {
  date: string;
  description: string;
  category: string;
  account: string;
  type: 'income' | 'expense';
  amount: number;
}

export default function TransactionRow({ date, description, category, account, type, amount }: TransactionRowProps) {
  const sign = type === 'income' ? '+' : '-';

  return (
    <tr className="group transition-colors hover:bg-[var(--color-surface-elevated)]">
      <td className="whitespace-nowrap px-5 py-3.5 text-[var(--color-ink-muted)]">{date}</td>
      <td className="px-4 py-3.5">
        <a href="#" className="font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)] hover:underline">
          {description}
        </a>
      </td>
      <td className="px-4 py-3.5 text-[var(--color-ink-muted)]">{category}</td>
      <td className="px-4 py-3.5 text-[var(--color-ink-muted)]">{account}</td>
      <td className={`whitespace-nowrap px-5 py-3.5 text-right font-extrabold tracking-tight ${type === 'income' ? 'text-[var(--color-positive)]' : 'text-[var(--color-ink)]'}`}>
        {sign}${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </td>
    </tr>
  );
}

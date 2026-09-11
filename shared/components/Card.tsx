import React from 'react';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-[var(--color-surface)] rounded-[var(--radius-md)] shadow-sm border border-[var(--color-border)] p-6 ${className}`}>{children}</div>;
}

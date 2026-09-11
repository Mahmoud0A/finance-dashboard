import React from 'react';

export function Button({ children, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'danger' }) {
  const base = 'px-4 py-2 rounded-md font-medium text-sm transition-colors';
  const styles: Record<string, string> = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]',
    outline: 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)]',
    danger: 'bg-[var(--color-danger)] text-white hover:opacity-90',
  };
  return <button className={`${base} ${styles[variant] || styles.primary}`} {...props}>{children}</button>;
}

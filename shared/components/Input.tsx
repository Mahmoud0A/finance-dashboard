import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, id, className = '', ...props }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const messageId = inputId && (error || helperText) ? `${inputId}-message` : undefined;

  return (
    <label className="block space-y-1.5 text-[13px] font-medium text-[var(--color-ink)]" htmlFor={inputId}>
      {label && <span>{label}</span>}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={messageId}
        className={`w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? 'border-[var(--color-danger)]' : 'border-[var(--color-border-subtle)]'
        } ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <span
          id={messageId}
          className={`block text-xs ${error ? 'text-[var(--color-danger)]' : 'text-[var(--color-ink-muted)]'}`}
        >
          {error ?? helperText}
        </span>
      )}
    </label>
  );
}

'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormData } from '../schemas/transactionSchema';
import { useI18n } from '@/lib/i18n/context';
import { CURRENT_MONTH, type Account } from '@/lib/mockData';

interface TransactionFormProps {
  accounts: Account[];
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: (data: TransactionFormData) => void;
}

const inputClass = "w-full px-3 py-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] text-sm";

export default function TransactionForm({ accounts, isSubmitting, submitError, onSubmit }: TransactionFormProps) {
  const { t } = useI18n();
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: '',
      amount: undefined as unknown as number,
      type: 'expense',
      category: 'Food',
      accountId: accounts[0]?.id ?? '',
      date: `${CURRENT_MONTH}-28`,
      note: '',
    },
  });

  const errorFor = (field: 'description' | 'amount' | 'type' | 'category' | 'accountId' | 'date') =>
    errors[field] ? t(`form.errors.${field === 'accountId' ? 'account' : field}`) : null;

  const field = (
    label: string,
    name: 'description' | 'amount' | 'type' | 'category' | 'accountId' | 'date' | 'note',
    control: React.ReactNode,
  ) => (
    <label className="block space-y-1">
      <span className="text-xs font-semibold text-[var(--color-ink-secondary)]">{label}</span>
      {control}
      {name !== 'note' && errorFor(name as 'description') && (
        <p className="text-xs text-[var(--color-danger)]">{errorFor(name as 'description')}</p>
      )}
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field(t('form.type'), 'type', (
          <select {...register('type')} className={inputClass}>
            <option value="expense">{t('common.expense')}</option>
            <option value="income">{t('common.income')}</option>
          </select>
        ))}
        {field(t('form.amount'), 'amount', (
          <input type="number" step="0.01" min="0" {...register('amount', { valueAsNumber: true })} placeholder="0.00" className={inputClass} />
        ))}
      </div>
      {field(t('form.description'), 'description', (
        <input {...register('description')} placeholder={t('form.descriptionPlaceholder')} className={inputClass} />
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field(t('form.category'), 'category', (
          <select {...register('category')} className={inputClass}>
            {['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Salary'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ))}
        {field(t('form.account'), 'accountId', (
          <select {...register('accountId')} className={inputClass}>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {field(t('form.date'), 'date', (
          <input type="date" {...register('date')} className={inputClass} />
        ))}
        {field(t('form.note'), 'note', (
          <input {...register('note')} placeholder={t('form.notePlaceholder')} className={inputClass} />
        ))}
      </div>
      {submitError && <p className="text-xs font-semibold text-[var(--color-danger)]">{submitError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 rounded bg-[var(--color-primary)] text-white text-sm font-medium disabled:opacity-60"
      >
        {isSubmitting ? t('form.saving') : t('form.save')}
      </button>
    </form>
  );
}

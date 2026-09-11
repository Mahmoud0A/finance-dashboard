'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, TransactionFormData } from '../schemas/transactionSchema';

export default function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { description: '', amount: 0, type: 'expense', category: 'Food', accountId: 'acc-1', date: '', note: '' },
  });
  const onSubmit = (data: TransactionFormData) => {
    console.log('Transaction submitted:', data);
    onSuccess?.();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('description')} placeholder="Description" className="w-full px-3 py-2 rounded border border-[var(--color-border)] bg-white text-sm" />
      {errors.description && <p className="text-xs text-[var(--color-danger)]">{errors.description.message}</p>}
      <input type="number" step="0.01" {...register('amount', { valueAsNumber: true })} placeholder="Amount" className="w-full px-3 py-2 rounded border border-[var(--color-border)] bg-white text-sm" />
      <select {...register('type')} className="w-full px-3 py-2 rounded border border-[var(--color-border)] bg-white text-sm"><option value="expense">Expense</option><option value="income">Income</option></select>
      <input {...register('category')} placeholder="Category" className="w-full px-3 py-2 rounded border border-[var(--color-border)] bg-white text-sm" />
      <button type="submit" className="px-4 py-2 rounded bg-[var(--color-primary)] text-white text-sm">Save</button>
    </form>
  );
}

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionForm from '@/features/transactions/components/TransactionForm';
import { I18nProvider } from '@/lib/i18n/context';
import type { Account } from '@/lib/mockData';

const accounts: Account[] = [
  { id: 'acc-1', name: 'Main Checking', type: 'checking', balance: 100, currency: 'USD' },
];

function renderForm(props?: Partial<React.ComponentProps<typeof TransactionForm>>) {
  const onSubmit = vi.fn();
  render(
    <I18nProvider>
      <TransactionForm accounts={accounts} isSubmitting={false} submitError={null} onSubmit={onSubmit} {...props} />
    </I18nProvider>,
  );
  return onSubmit;
}

describe('TransactionForm submission', () => {
  it('submits valid data including date and account', async () => {
    const onSubmit = renderForm();
    fireEvent.change(screen.getByPlaceholderText(/grocery/i), { target: { value: 'Weekly groceries' } });
    fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /save transaction/i }));
    await screen.findByText(/saving|save transaction/i);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      description: 'Weekly groceries',
      amount: 50,
      type: 'expense',
      accountId: 'acc-1',
    });
    expect(onSubmit.mock.calls[0][0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('blocks submission when description is missing', async () => {
    const onSubmit = renderForm();
    fireEvent.change(screen.getByPlaceholderText('0.00'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /save transaction/i }));
    await screen.findByText(/at least 2|حرفين/i);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables submit while a mutation is in flight', () => {
    renderForm({ isSubmitting: true });
    const button = screen.getByRole('button', { name: /saving|جارٍ/i }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('shows server submit errors', () => {
    renderForm({ submitError: 'Could not save.' });
    expect(screen.getByText('Could not save.')).toBeTruthy();
  });
});

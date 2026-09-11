import { describe, it, expect } from 'vitest';
import { transactionSchema } from '@/features/transactions/schemas/transactionSchema';

describe('transactionSchema', () => {
  const validData = {
    description: 'Grocery shopping',
    amount: 45.0,
    type: 'expense' as const,
    category: 'Food',
    accountId: 'acc-1',
    date: '2025-08-28',
    note: 'Weekly groceries',
  };

  it('accepts a valid transaction', () => {
    const result = transactionSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects description shorter than 2 characters', () => {
    const result = transactionSchema.safeParse({ ...validData, description: 'A' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = result.error.issues[0].message;
      expect(msg).toMatch(/at least 2/i);
    }
  });

  it('rejects non-positive amount', () => {
    const result = transactionSchema.safeParse({ ...validData, amount: -10 });
    expect(result.success).toBe(false);
    if (!result.success) {
      const msg = result.error.issues[0].message;
      expect(msg).toMatch(/positive/i);
    }
  });

  it('rejects zero amount', () => {
    const result = transactionSchema.safeParse({ ...validData, amount: 0 });
    expect(result.success).toBe(false);
  });

  it('rejects invalid transaction type', () => {
    const result = transactionSchema.safeParse({ ...validData, type: 'transfer' });
    expect(result.success).toBe(false);
  });

  it('accepts income type', () => {
    const result = transactionSchema.safeParse({ ...validData, type: 'income' });
    expect(result.success).toBe(true);
  });

  it('rejects empty category', () => {
    const result = transactionSchema.safeParse({ ...validData, category: '' });
    expect(result.success).toBe(false);
  });

  it('makes note optional', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { note: _note, ...withoutNote } = validData;
    const result = transactionSchema.safeParse(withoutNote);
    expect(result.success).toBe(true);
  });
});

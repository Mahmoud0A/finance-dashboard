import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(2, 'Description must be at least 2 characters'),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(1, 'Category is required'),
  accountId: z.string().min(1, 'Account is required'),
  date: z.string().min(1, 'Date is required'),
  note: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

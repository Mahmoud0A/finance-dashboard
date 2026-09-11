export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'cash' | 'credit';
  balance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  note?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

export const mockAccounts: Account[] = [
  { id: 'acc-1', name: 'Main Checking', type: 'checking', balance: 8420.5, currency: 'USD' },
  { id: 'acc-2', name: 'Savings Account', type: 'savings', balance: 15600.0, currency: 'USD' },
  { id: 'acc-3', name: 'Cash Wallet', type: 'cash', balance: 320.0, currency: 'USD' },
  { id: 'acc-4', name: 'Travel Credit', type: 'credit', balance: -450.75, currency: 'USD' },
];

export const mockTransactions: Transaction[] = [
  { id: 'tx-1', accountId: 'acc-1', type: 'expense', amount: 45.0, category: 'Food', description: 'Grocery shopping', date: '2025-08-28' },
  { id: 'tx-2', accountId: 'acc-1', type: 'income', amount: 3200.0, category: 'Salary', description: 'Monthly salary', date: '2025-08-01' },
  { id: 'tx-3', accountId: 'acc-2', type: 'expense', amount: 120.0, category: 'Transportation', description: 'Gas and metro', date: '2025-08-15' },
  { id: 'tx-4', accountId: 'acc-3', type: 'expense', amount: 35.0, category: 'Entertainment', description: 'Movie night', date: '2025-08-20' },
  { id: 'tx-5', accountId: 'acc-4', type: 'expense', amount: 89.5, category: 'Shopping', description: 'Online order', date: '2025-08-22' },
];

export const mockBudgets: Budget[] = [
  { id: 'bud-1', category: 'Food', limit: 600, spent: 420, month: '2025-08' },
  { id: 'bud-2', category: 'Transportation', limit: 200, spent: 120, month: '2025-08' },
  { id: 'bud-3', category: 'Entertainment', limit: 150, spent: 35, month: '2025-08' },
  { id: 'bud-4', category: 'Shopping', limit: 300, spent: 89.5, month: '2025-08' },
  { id: 'bud-5', category: 'Bills', limit: 500, spent: 310, month: '2025-08' },
];

export function getDashboardSummary(period: string) {
  const income = mockTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = mockTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = mockAccounts.reduce((s, a) => s + a.balance, 0);
  return { totalBalance: balance, monthlyIncome: income, monthlyExpenses: expenses, savings: balance - expenses, period };
}

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
  month: string;
}

/** The "current" month of the mock world. Dashboard + budgets are scoped to it. */
export const CURRENT_MONTH = '2025-08';

export interface NewTransactionInput {
  accountId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  note?: string;
}

const seedAccounts: Account[] = [
  { id: 'acc-1', name: 'Main Checking', type: 'checking', balance: 8420.5, currency: 'USD' },
  { id: 'acc-2', name: 'Savings Account', type: 'savings', balance: 15600.0, currency: 'USD' },
  { id: 'acc-3', name: 'Cash Wallet', type: 'cash', balance: 320.0, currency: 'USD' },
  { id: 'acc-4', name: 'Travel Credit', type: 'credit', balance: -450.75, currency: 'USD' },
];

const seedBudgets: Budget[] = [
  { id: 'bud-1', category: 'Food', limit: 600, month: '2025-08' },
  { id: 'bud-2', category: 'Transportation', limit: 200, month: '2025-08' },
  { id: 'bud-3', category: 'Entertainment', limit: 150, month: '2025-08' },
  { id: 'bud-4', category: 'Shopping', limit: 300, month: '2025-08' },
  { id: 'bud-5', category: 'Bills', limit: 500, month: '2025-08' },
];

function tx(
  id: string,
  accountId: string,
  type: 'income' | 'expense',
  amount: number,
  category: string,
  description: string,
  date: string,
): Transaction {
  return { id, accountId, type, amount, category, description, date };
}

const seedTransactions: Transaction[] = [
  // ---- 2025-01 ----
  tx('tx-2025-01-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-01-01'),
  tx('tx-2025-01-02', 'acc-1', 'expense', 210.0, 'Food', 'Grocery shopping', '2025-01-05'),
  tx('tx-2025-01-03', 'acc-1', 'expense', 140.0, 'Bills', 'Electricity bill', '2025-01-10'),
  tx('tx-2025-01-04', 'acc-1', 'expense', 90.0, 'Transportation', 'Gas refill', '2025-01-14'),
  tx('tx-2025-01-05', 'acc-3', 'expense', 40.0, 'Entertainment', 'Cinema tickets', '2025-01-20'),
  // ---- 2025-02 ----
  tx('tx-2025-02-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-02-01'),
  tx('tx-2025-02-02', 'acc-1', 'expense', 180.0, 'Food', 'Grocery shopping', '2025-02-06'),
  tx('tx-2025-02-03', 'acc-1', 'expense', 150.0, 'Bills', 'Internet + phone', '2025-02-09'),
  tx('tx-2025-02-04', 'acc-4', 'expense', 220.0, 'Shopping', 'Winter jacket', '2025-02-16'),
  // ---- 2025-03 ----
  tx('tx-2025-03-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-03-01'),
  tx('tx-2025-03-02', 'acc-1', 'expense', 240.0, 'Food', 'Groceries + dining', '2025-03-07'),
  tx('tx-2025-03-03', 'acc-1', 'expense', 160.0, 'Bills', 'Utilities', '2025-03-10'),
  tx('tx-2025-03-04', 'acc-2', 'expense', 75.0, 'Transportation', 'Metro pass', '2025-03-12'),
  // ---- 2025-04 ----
  tx('tx-2025-04-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-04-01'),
  tx('tx-2025-04-02', 'acc-1', 'expense', 195.0, 'Food', 'Grocery shopping', '2025-04-05'),
  tx('tx-2025-04-03', 'acc-1', 'expense', 145.0, 'Bills', 'Electricity bill', '2025-04-11'),
  tx('tx-2025-04-04', 'acc-3', 'expense', 60.0, 'Entertainment', 'Concert ticket', '2025-04-19'),
  // ---- 2025-05 ----
  tx('tx-2025-05-01', 'acc-1', 'income', 3350.0, 'Salary', 'Monthly salary + bonus', '2025-05-01'),
  tx('tx-2025-05-02', 'acc-1', 'expense', 260.0, 'Food', 'Groceries + dining', '2025-05-06'),
  tx('tx-2025-05-03', 'acc-4', 'expense', 310.0, 'Shopping', 'Home essentials', '2025-05-15'),
  tx('tx-2025-05-04', 'acc-1', 'expense', 155.0, 'Bills', 'Utilities', '2025-05-10'),
  // ---- 2025-06 ----
  tx('tx-2025-06-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-06-01'),
  tx('tx-2025-06-02', 'acc-1', 'expense', 230.0, 'Food', 'Grocery shopping', '2025-06-07'),
  tx('tx-2025-06-03', 'acc-2', 'expense', 80.0, 'Transportation', 'Metro pass', '2025-06-09'),
  tx('tx-2025-06-04', 'acc-3', 'expense', 55.0, 'Entertainment', 'Movie night', '2025-06-21'),
  // ---- 2025-07 ----
  tx('tx-2025-07-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-07-01'),
  tx('tx-2025-07-02', 'acc-1', 'expense', 280.0, 'Food', 'Groceries + dining', '2025-07-06'),
  tx('tx-2025-07-03', 'acc-1', 'expense', 165.0, 'Bills', 'Utilities', '2025-07-11'),
  tx('tx-2025-07-04', 'acc-4', 'expense', 140.0, 'Shopping', 'Summer clothes', '2025-07-18'),
  // ---- 2025-08 (current month; category totals match budget "spent") ----
  tx('tx-2025-08-01', 'acc-1', 'income', 3200.0, 'Salary', 'Monthly salary', '2025-08-01'),
  tx('tx-2025-08-02', 'acc-1', 'expense', 45.0, 'Food', 'Grocery shopping', '2025-08-28'),
  tx('tx-2025-08-03', 'acc-1', 'expense', 85.0, 'Food', 'Restaurant dinner', '2025-08-12'),
  tx('tx-2025-08-04', 'acc-1', 'expense', 120.0, 'Food', 'Weekly groceries', '2025-08-19'),
  tx('tx-2025-08-05', 'acc-1', 'expense', 170.0, 'Food', 'Dining out', '2025-08-24'),
  tx('tx-2025-08-06', 'acc-1', 'expense', 70.0, 'Transportation', 'Gas refill', '2025-08-08'),
  tx('tx-2025-08-07', 'acc-2', 'expense', 50.0, 'Transportation', 'Metro pass', '2025-08-15'),
  tx('tx-2025-08-08', 'acc-3', 'expense', 35.0, 'Entertainment', 'Movie night', '2025-08-20'),
  tx('tx-2025-08-09', 'acc-4', 'expense', 89.5, 'Shopping', 'Online order', '2025-08-22'),
  tx('tx-2025-08-10', 'acc-1', 'expense', 140.0, 'Bills', 'Electricity bill', '2025-08-10'),
  tx('tx-2025-08-11', 'acc-1', 'expense', 110.0, 'Bills', 'Internet + phone', '2025-08-11'),
  tx('tx-2025-08-12', 'acc-1', 'expense', 60.0, 'Bills', 'Water bill', '2025-08-13'),
];

// ---- Mutable in-memory stores (mock "database" for the portfolio API) ----
export const mockAccounts: Account[] = seedAccounts.map((a) => ({ ...a }));
export const mockBudgets: Budget[] = seedBudgets.map((b) => ({ ...b }));
export const mockTransactions: Transaction[] = seedTransactions.map((t) => ({ ...t }));

/** Restores seed data. Used by tests to keep cases isolated. */
export function resetMockData(): void {
  mockAccounts.length = 0;
  mockAccounts.push(...seedAccounts.map((a) => ({ ...a })));
  mockBudgets.length = 0;
  mockBudgets.push(...seedBudgets.map((b) => ({ ...b })));
  mockTransactions.length = 0;
  mockTransactions.push(...seedTransactions.map((t) => ({ ...t })));
}

let transactionCounter = 0;

export function addTransaction(input: NewTransactionInput): Transaction {
  const created: Transaction = {
    id: `tx-${Date.now()}-${transactionCounter++}`,
    accountId: input.accountId,
    type: input.type,
    amount: input.amount,
    category: input.category,
    description: input.description,
    date: input.date,
    ...(input.note ? { note: input.note } : {}),
  };
  mockTransactions.push(created);
  const account = mockAccounts.find((a) => a.id === input.accountId);
  if (account) {
    account.balance += input.type === 'income' ? input.amount : -input.amount;
  }
  return created;
}

function inMonth(date: string, month: string): boolean {
  return date.startsWith(month);
}

export interface MonthlyTotals {
  income: number;
  expenses: number;
  net: number;
  savingsRate: number;
}

export function getMonthlyTotals(month: string): MonthlyTotals {
  const income = mockTransactions
    .filter((t) => t.type === 'income' && inMonth(t.date, month))
    .reduce((s, t) => s + t.amount, 0);
  const expenses = mockTransactions
    .filter((t) => t.type === 'expense' && inMonth(t.date, month))
    .reduce((s, t) => s + t.amount, 0);
  const net = income - expenses;
  return { income, expenses, net, savingsRate: income > 0 ? net / income : 0 };
}

export function getTotalBalance(): number {
  return mockAccounts.reduce((s, a) => s + a.balance, 0);
}

export function getCategorySpending(month: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of mockTransactions) {
    if (t.type !== 'expense' || !inMonth(t.date, month)) continue;
    out[t.category] = (out[t.category] ?? 0) + t.amount;
  }
  return out;
}

export function getBudgetSpent(category: string, month: string): number {
  return mockTransactions
    .filter((t) => t.type === 'expense' && t.category === category && inMonth(t.date, month))
    .reduce((s, t) => s + t.amount, 0);
}

export function getRecentTransactions(count: number): Transaction[] {
  return [...mockTransactions].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, count);
}

export interface MonthlyPoint {
  month: string;
  income: number;
  expenses: number;
}

/** Monthly income/expense series across 2025, derived from transactions. */
export function getMonthlySeries(): MonthlyPoint[] {
  const months: string[] = [];
  for (let m = 1; m <= 12; m++) {
    months.push(`2025-${String(m).padStart(2, '0')}`);
  }
  return months
    .map((month) => {
      const { income, expenses } = getMonthlyTotals(month);
      return { month, income, expenses };
    })
    .filter((p) => p.income !== 0 || p.expenses !== 0);
}

export interface DashboardSummary {
  month: string;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netCashFlow: number;
  savingsRate: number;
  monthlySeries: MonthlyPoint[];
  categorySpending: Record<string, number>;
  recent: Transaction[];
  budgets: Array<Budget & { spent: number; remaining: number; percent: number }>;
}

export function getDashboardSummary(month: string = CURRENT_MONTH): DashboardSummary {
  const totals = getMonthlyTotals(month);
  const budgets = mockBudgets
    .filter((b) => b.month === month)
    .map((b) => {
      const spent = getBudgetSpent(b.category, month);
      return { ...b, spent, remaining: b.limit - spent, percent: b.limit > 0 ? spent / b.limit : 0 };
    });
  return {
    month,
    totalBalance: getTotalBalance(),
    monthlyIncome: totals.income,
    monthlyExpenses: totals.expenses,
    netCashFlow: totals.net,
    savingsRate: totals.savingsRate,
    monthlySeries: getMonthlySeries(),
    categorySpending: getCategorySpending(month),
    recent: getRecentTransactions(5),
    budgets,
  };
}

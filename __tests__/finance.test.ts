import { describe, it, expect, beforeEach } from 'vitest';
import {
  resetMockData,
  mockTransactions,
  mockAccounts,
  getMonthlyTotals,
  getTotalBalance,
  getCategorySpending,
  getBudgetSpent,
  getMonthlySeries,
  getRecentTransactions,
  getDashboardSummary,
  addTransaction,
  CURRENT_MONTH,
} from '@/lib/mockData';

beforeEach(() => {
  resetMockData();
});

describe('coherent financial model', () => {
  it('August totals reconcile: income 3200, expenses 974.5, net 2225.5', () => {
    const t = getMonthlyTotals('2025-08');
    expect(t.income).toBeCloseTo(3200, 2);
    expect(t.expenses).toBeCloseTo(974.5, 2);
    expect(t.net).toBeCloseTo(2225.5, 2);
    expect(t.savingsRate).toBeCloseTo(2225.5 / 3200, 4);
  });

  it('total balance equals the sum of account balances', () => {
    expect(getTotalBalance()).toBeCloseTo(8420.5 + 15600 + 320 - 450.75, 2);
  });

  it('category spending matches budget consumption (Food Aug = 420)', () => {
    expect(getCategorySpending('2025-08').Food).toBeCloseTo(420, 2);
    expect(getBudgetSpent('Food', '2025-08')).toBeCloseTo(420, 2);
  });

  it('monthly series covers Jan-Aug 2025 derived from transactions', () => {
    const series = getMonthlySeries();
    expect(series).toHaveLength(8);
    expect(series[0].month).toBe('2025-01');
    expect(series[7].month).toBe('2025-08');
    expect(series[7].income).toBeCloseTo(3200, 2);
  });

  it('recent transactions are sorted newest-first', () => {
    const recent = getRecentTransactions(3);
    expect(recent).toHaveLength(3);
    expect(recent[0].date >= recent[1].date).toBe(true);
  });

  it('dashboard summary uses net cash flow semantics (income - expenses)', () => {
    const s = getDashboardSummary(CURRENT_MONTH);
    expect(s.month).toBe(CURRENT_MONTH);
    expect(s.netCashFlow).toBeCloseTo(s.monthlyIncome - s.monthlyExpenses, 2);
    expect(s.budgets.find((b) => b.category === 'Food')?.spent).toBeCloseTo(420, 2);
  });

  it('addTransaction appends, updates the account balance and budget consumption', () => {
    const before = mockTransactions.length;
    const accBefore = mockAccounts.find((a) => a.id === 'acc-1')!.balance;
    const created = addTransaction({
      accountId: 'acc-1',
      type: 'expense',
      amount: 100,
      category: 'Food',
      description: 'Extra groceries',
      date: '2025-08-29',
    });
    expect(mockTransactions).toHaveLength(before + 1);
    expect(created.id).toBeTruthy();
    expect(mockAccounts.find((a) => a.id === 'acc-1')!.balance).toBeCloseTo(accBefore - 100, 2);
    expect(getBudgetSpent('Food', '2025-08')).toBeCloseTo(520, 2);
    expect(getMonthlyTotals('2025-08').expenses).toBeCloseTo(1074.5, 2);
  });

  it('addTransaction income increases the account balance', () => {
    const accBefore = mockAccounts.find((a) => a.id === 'acc-2')!.balance;
    addTransaction({
      accountId: 'acc-2',
      type: 'income',
      amount: 500,
      category: 'Salary',
      description: 'Bonus',
      date: '2025-08-30',
    });
    expect(mockAccounts.find((a) => a.id === 'acc-2')!.balance).toBeCloseTo(accBefore + 500, 2);
  });
});

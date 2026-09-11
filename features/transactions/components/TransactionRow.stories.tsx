import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TransactionRow from './TransactionRow';

const meta = {
  title: 'Finance/Transactions/TransactionRow',
  component: TransactionRow,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['income', 'expense'],
    },
    amount: {
      control: { type: 'number', min: 0, step: 5 },
    },
  },
  args: {
    date: 'Aug 28',
    description: 'Grocery shopping',
    category: 'Food',
    account: 'Main Checking',
    type: 'expense',
    amount: 45,
  },
  decorators: [
    (Story) => (
      <div className="w-[760px] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-xs)]">
        <table className="w-full text-[13px]">
          <tbody className="divide-y divide-[var(--color-border-subtle)]">
            <Story />
          </tbody>
        </table>
      </div>
    ),
  ],
} satisfies Meta<typeof TransactionRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Expense: Story = {};

export const Income: Story = {
  args: {
    date: 'Aug 01',
    description: 'Monthly salary',
    category: 'Salary',
    account: 'Main Checking',
    type: 'income',
    amount: 3200,
  },
};

export const LongDescription: Story = {
  args: {
    description: 'Annual subscription renewal for accounting software and receipt storage',
    category: 'Business tools',
    account: 'Travel Credit',
    amount: 189.5,
  },
};

export const ArabicRtl: Story = {
  globals: {
    direction: 'rtl',
  },
  args: {
    date: '28 أغسطس',
    description: 'شراء مواد غذائية',
    category: 'الطعام',
    account: 'الحساب الرئيسي',
    type: 'expense',
    amount: 45,
  },
};

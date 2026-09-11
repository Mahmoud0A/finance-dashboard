import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AccountCard from './AccountCard';

const meta = {
  title: 'Finance/Accounts/AccountCard',
  component: AccountCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    balance: {
      control: { type: 'number', step: 100 },
    },
    type: {
      control: 'select',
      options: ['Checking', 'Savings', 'Cash', 'Credit'],
    },
  },
  args: {
    name: 'Main Checking',
    type: 'Checking',
    balance: 8420.5,
    currency: 'USD',
  },
  decorators: [
    (Story) => (
      <div className="w-[380px] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-xs)]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checking: Story = {};

export const Savings: Story = {
  args: {
    name: 'Savings Account',
    type: 'Savings',
    balance: 15600,
  },
};

export const Credit: Story = {
  args: {
    name: 'Travel Credit',
    type: 'Credit',
    balance: -450.75,
  },
};

export const ArabicRtl: Story = {
  globals: {
    direction: 'rtl',
  },
  args: {
    name: 'حساب التوفير',
    type: 'توفير',
    balance: 15600,
    currency: 'USD',
  },
};

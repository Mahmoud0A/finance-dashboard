import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BudgetProgress from './BudgetProgress';

const meta = {
  title: 'Finance/Budgets/BudgetProgress',
  component: BudgetProgress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    category: { control: 'text' },
    spent: { control: { type: 'number', min: 0, step: 10 } },
    limit: { control: { type: 'number', min: 1, step: 10 } },
  },
  args: {
    category: 'Food',
    spent: 420,
    limit: 600,
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BudgetProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Healthy: Story = {};

export const NearLimit: Story = {
  args: {
    category: 'Transport',
    spent: 180,
    limit: 200,
  },
};

export const OverBudget: Story = {
  args: {
    category: 'Entertainment',
    spent: 190,
    limit: 150,
  },
};

export const ArabicRtl: Story = {
  globals: {
    direction: 'rtl',
  },
  args: {
    category: 'الطعام',
    spent: 420,
    limit: 600,
  },
};

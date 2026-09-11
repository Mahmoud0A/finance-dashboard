import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';

const meta = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SimpleContent: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-base font-bold text-[var(--color-ink)]">Monthly summary</h3>
        <p className="text-sm text-[var(--color-ink-muted)]">A reusable surface for grouped finance information.</p>
      </div>
    ),
  },
};

export const MetricCardContent: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">Savings rate</span>
        <div className="text-3xl font-extrabold text-[var(--color-positive)]">79.5%</div>
        <p className="text-sm text-[var(--color-ink-secondary)]">Income minus expenses for August.</p>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-[var(--color-ink)]">Export report</h3>
          <p className="text-sm text-[var(--color-ink-muted)]">Download a snapshot for the selected period.</p>
        </div>
        <div className="flex gap-2">
          <Button>Export</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    ),
  },
};

export const FormContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <Input label="Budget category" placeholder="Food" />
        <Input label="Monthly limit" type="number" placeholder="600" />
        <Button>Save budget</Button>
      </div>
    ),
  },
};

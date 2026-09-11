import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Description',
    placeholder: 'Grocery shopping',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Monthly salary',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'Shown in transaction lists and reports.',
  },
};

export const Error: Story = {
  args: {
    value: '',
    error: 'Description is required.',
  },
};

export const AmountInput: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '45.00',
    helperText: 'Use positive values; choose income or expense separately.',
  },
};

export const ArabicRtl: Story = {
  globals: {
    direction: 'rtl',
  },
  args: {
    label: 'الوصف',
    placeholder: 'شراء مواد غذائية',
    helperText: 'مثال لاختبار اتجاه النص داخل الحقل.',
  },
};

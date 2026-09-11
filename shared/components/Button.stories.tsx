import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'danger'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Add transaction',
    variant: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'View report',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete budget',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Saving...',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

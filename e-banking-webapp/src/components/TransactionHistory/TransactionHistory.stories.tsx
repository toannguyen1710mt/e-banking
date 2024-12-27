// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TransactionHistory } from '@/components';

const meta = {
  title: 'Components/TransactionHistory',
  component: TransactionHistory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof TransactionHistory>;

export default meta;

type Story = StoryObj<typeof TransactionHistory>;

export const Default: Story = {
  args: {},
};

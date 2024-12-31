// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

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
  args: {
    totalTransaction: 24,
    transactionHistory: MOCK_TRANSACTIONS,
  },
};

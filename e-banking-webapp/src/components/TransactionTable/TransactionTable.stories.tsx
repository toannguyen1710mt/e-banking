// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransactionTable } from '@/components';

const meta = {
  title: 'Components/TransactionTable',
  component: TransactionTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof TransactionTable>;

export default meta;

type Story = StoryObj<typeof TransactionTable>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPage: 2,
    totalTransaction: 14,
    transactions: MOCK_TRANSACTIONS,
  },
};

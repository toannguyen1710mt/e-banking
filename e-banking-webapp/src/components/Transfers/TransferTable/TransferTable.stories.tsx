// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransferTable } from '@/components';

const meta = {
  title: 'Components/Transfers/TransferTable',
  tags: ['autodocs'],
  component: TransferTable,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransferTable>;

export default meta;

type Story = StoryObj<typeof TransferTable>;

export const Default: Story = {
  args: {
    transactions: MOCK_TRANSACTIONS,
  },
};

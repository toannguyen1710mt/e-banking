// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Interfaces
import { TransferType } from '@/interfaces';

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
  argTypes: {
    transferType: {
      control: 'radio',
      options: [TransferType.RECEIVED, TransferType.SENT],
      mapping: {
        [TransferType.RECEIVED]: TransferType.RECEIVED,
        [TransferType.SENT]: TransferType.SENT,
      },
    },
  },
} satisfies Meta<typeof TransferTable>;

export default meta;

type Story = StoryObj<typeof TransferTable>;

export const Default: Story = {
  args: {
    transactions: MOCK_TRANSACTIONS,
  },
};

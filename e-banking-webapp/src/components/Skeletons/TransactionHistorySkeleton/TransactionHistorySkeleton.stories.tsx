// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TransactionHistorySkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/TransactionHistorySkeleton',
  component: TransactionHistorySkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof TransactionHistorySkeleton>;

export default meta;

type Story = StoryObj<typeof TransactionHistorySkeleton>;

export const Default: Story = {
  args: {},
};

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BalanceCardListSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/BalanceCardListSkeleton',
  component: BalanceCardListSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BalanceCardListSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

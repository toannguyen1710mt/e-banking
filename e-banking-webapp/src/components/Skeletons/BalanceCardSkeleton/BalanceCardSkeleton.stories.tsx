// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BalanceCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/BalanceCardSkeleton',
  component: BalanceCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BalanceCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

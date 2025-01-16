// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MetricsCardListSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/MetricsCardListSkeleton',
  component: MetricsCardListSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricsCardListSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

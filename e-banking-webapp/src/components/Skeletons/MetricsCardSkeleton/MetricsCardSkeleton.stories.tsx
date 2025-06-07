// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MetricsCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/MetricsCardSkeleton',
  component: MetricsCardSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MetricsCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

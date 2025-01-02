// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AnalyticsCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/AnalyticsCardSkeleton',
  component: AnalyticsCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof AnalyticsCardSkeleton>;

export default meta;

type Story = StoryObj<typeof AnalyticsCardSkeleton>;

export const Default: Story = {
  args: {},
};

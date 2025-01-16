// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AnalyticsPageSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/AnalyticsPageSkeleton',
  component: AnalyticsPageSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalyticsPageSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CardOverviewSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/CardOverviewSkeleton',
  component: CardOverviewSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof CardOverviewSkeleton>;

export default meta;

type Story = StoryObj<typeof CardOverviewSkeleton>;

export const Default: Story = {
  args: {},
};

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ChartsSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/ChartsSkeleton',
  component: ChartsSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ChartsSkeleton>;

export default meta;

type Story = StoryObj<typeof ChartsSkeleton>;

export const Default: Story = {
  args: {},
};

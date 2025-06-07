// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ActionCenterSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/ActionCenterSkeleton',
  component: ActionCenterSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ActionCenterSkeleton>;

export default meta;

type Story = StoryObj<typeof ActionCenterSkeleton>;

export const Default: Story = {
  args: {},
};

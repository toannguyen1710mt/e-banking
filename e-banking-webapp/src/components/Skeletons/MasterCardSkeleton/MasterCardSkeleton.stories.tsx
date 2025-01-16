// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MasterCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/MasterCardSkeleton',
  component: MasterCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof MasterCardSkeleton>;

export default meta;

type Story = StoryObj<typeof MasterCardSkeleton>;

export const Default: Story = {
  args: {},
};

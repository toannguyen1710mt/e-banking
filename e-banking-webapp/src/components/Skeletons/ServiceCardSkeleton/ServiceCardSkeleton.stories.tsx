// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ServiceCardSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/ServiceCardSkeleton',
  component: ServiceCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ServiceCardSkeleton>;

export default meta;

type Story = StoryObj<typeof ServiceCardSkeleton>;

export const Default: Story = {
  args: {},
};

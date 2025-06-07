// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { ServiceCardListSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/ServiceCardListSkeleton',
  component: ServiceCardListSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof ServiceCardListSkeleton>;

export default meta;

type Story = StoryObj<typeof ServiceCardListSkeleton>;

export const Default: Story = {
  args: {},
};

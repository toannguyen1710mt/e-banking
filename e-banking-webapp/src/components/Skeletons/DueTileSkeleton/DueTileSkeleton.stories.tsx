// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DueTileSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/DueTileSkeleton',
  component: DueTileSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DueTileSkeleton>;

export default meta;

type Story = StoryObj<typeof DueTileSkeleton>;

export const Default: Story = {
  args: {},
};

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MyCalenderSkeleton } from '@/components';

const meta = {
  title: 'Components/Skeletons/MyCalenderSkeleton',
  component: MyCalenderSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='h-screen'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MyCalenderSkeleton>;

export default meta;

type Story = StoryObj<typeof MyCalenderSkeleton>;

export const Default: Story = {
  args: {},
};

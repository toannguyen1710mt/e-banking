// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MyCalender } from '@/components';

const meta = {
  title: 'Components/MyCalender',
  component: MyCalender,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof MyCalender>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

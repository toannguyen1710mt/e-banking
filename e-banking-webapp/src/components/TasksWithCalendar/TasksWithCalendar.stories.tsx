// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { TasksWithCalendar } from '@/components';

const meta = {
  title: 'Components/TasksWithCalendar',
  component: TasksWithCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TasksWithCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

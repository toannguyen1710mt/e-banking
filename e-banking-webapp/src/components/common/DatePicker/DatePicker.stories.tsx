// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Component
import { DatePicker } from '@/components';

const meta = {
  title: 'Components/Common/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {},
};

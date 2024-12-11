// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DailyLimit } from '.';

const meta = {
  title: 'Components/Common/DailyLimit',
  component: DailyLimit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `DailyLimit` component displays progress for a daily spending limit with a header, progress bar, and summary details.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DailyLimit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

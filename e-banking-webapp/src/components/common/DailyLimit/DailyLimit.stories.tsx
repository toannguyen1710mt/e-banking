// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DailyLimit } from '@/components';

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
  argTypes: {
    expenses: {
      control: 'text',
      description: 'Amount of money used for the day',
      defaultValue: '50,000',
    },
    limit: {
      control: 'text',
      description: 'Total daily spending limit',
      defaultValue: '183,450',
    },
  },
  args: {
    expenses: '50,000',
    limit: '183,450',
  },
} satisfies Meta<typeof DailyLimit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { AnalyticsCard } from '.';

const meta = {
  title: 'Components/Common/AnalyticsCard',
  component: AnalyticsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Title of the analytics card',
      control: {
        type: 'text',
      },
    },
    subtitle: {
      description: 'Subtitle of the analytics card',
      control: {
        type: 'text',
      },
    },
    isPositive: {
      description: 'If the card represents a positive change (up arrow)',
      control: {
        type: 'boolean',
      },
    },
    amount: {
      description: 'Amount displayed on the card',
      control: {
        type: 'text',
      },
    },
    percentageChange: {
      description: 'Percentage change displayed on the card',
      control: {
        type: 'number',
      },
    },
  },
  args: {
    title: 'Total Income',
    subtitle: 'Last 30 days income',
    isPositive: true,
    amount: '670,000',
    percentageChange: 8,
  },
} satisfies Meta<typeof AnalyticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

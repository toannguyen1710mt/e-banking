// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { MetricsCard } from '.';

const meta = {
  title: 'Components/MetricsCard',
  component: MetricsCard,
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
    totalTransfers: {
      description: 'Total number of transfers',
      control: {
        type: 'number',
      },
    },
    isPositive: {
      description: 'If the card represents a positive change (up arrow)',
      control: {
        type: 'boolean',
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
    title: 'Transfer Request',
    totalTransfers: 54,
    isPositive: true,
    percentageChange: 8,
  },
} satisfies Meta<typeof MetricsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

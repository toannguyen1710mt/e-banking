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
    analyticsCardItems: {
      description:
        'Array of items to display on the analytics card with title, subtitle, and arrow direction.',
      control: {
        type: 'object',
      },
    },
    financialData: {
      description:
        'Array of financial data with amount and percentage change for each card.',
      control: {
        type: 'object',
      },
    },
  },
  args: {
    analyticsCardItems: [
      { title: 'Total Income', subtitle: 'Last 30 days income', arrow: 'up' },
      {
        title: 'Total Expense',
        subtitle: 'Last 30 days expenditure',
        arrow: 'up',
      },
      {
        title: 'Total Investment',
        subtitle: 'Last 30 days investment',
        arrow: 'down',
      },
    ],
    financialData: [
      { amount: '670,000', percentageChange: 8 },
      { amount: '220,000', percentageChange: 8 },
      { amount: '170,000', percentageChange: 8 },
    ],
  },
} satisfies Meta<typeof AnalyticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

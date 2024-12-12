// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_SPENDING_STATISTIC_CHART_DATA } from '@/mocks';

// Components
import { SpendingStatistics } from '@/components';

const meta = {
  title: 'Components/Charts/SpendingStatistics',
  component: SpendingStatistics,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-[460px] shadow-md'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpendingStatistics>;

export default meta;

type Story = StoryObj<typeof SpendingStatistics>;

export const Default: Story = {
  args: {
    ...MOCK_SPENDING_STATISTIC_CHART_DATA,
  },
};

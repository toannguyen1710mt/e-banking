// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_BALANCE_STATISTICS_CHART_DATA } from '@/mocks';

// Components
import { BalanceStatistics } from '@/components';

const meta = {
  title: 'Components/Charts/BalanceStatistics',
  component: BalanceStatistics,
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
} satisfies Meta<typeof BalanceStatistics>;

export default meta;

type Story = StoryObj<typeof BalanceStatistics>;

export const Default: Story = {
  args: {
    ...MOCK_BALANCE_STATISTICS_CHART_DATA,
  },
};

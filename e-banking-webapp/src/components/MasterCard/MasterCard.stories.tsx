// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks data
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Components
import { MasterCard } from '@/components';

const meta = {
  title: 'Components/MasterCard',
  component: MasterCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    series: MASTERCARD_CHART_MOCK,
    totalBalance: createExpenseAnalysisOptions('$540,000'),
  },
} satisfies Meta<typeof MasterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

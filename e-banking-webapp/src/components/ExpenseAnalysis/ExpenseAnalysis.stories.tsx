// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { createExpenseAnalysisOptions, DESCRIPTIONS } from '@/constants';

// Mocks data
import { MOCK_SERIES_EXPENSE_ANALYSIS } from '@/mocks';

// Components
import { ExpenseAnalysis } from '@/components';

const meta = {
  title: 'Components/ExpenseAnalysis',
  component: ExpenseAnalysis,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DESCRIPTIONS.EXPENSE_ANALYSIS,
      },
    },
  },
  tags: ['autodocs'],
  args: {
    series: MOCK_SERIES_EXPENSE_ANALYSIS,
    options: createExpenseAnalysisOptions('220 000'),
  },
} satisfies Meta<typeof ExpenseAnalysis>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    series: MOCK_SERIES_EXPENSE_ANALYSIS,
    options: createExpenseAnalysisOptions('220 000'),
  },
  render: (args) => <ExpenseAnalysis {...args} />,
};

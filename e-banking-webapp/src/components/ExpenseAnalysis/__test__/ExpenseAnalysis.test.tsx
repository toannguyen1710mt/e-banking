import { render } from '@testing-library/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mocks data
import { MOCK_SERIES_EXPENSE_ANALYSIS } from '@/mocks';

// Components
import { ExpenseAnalysis } from '..';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('ExpenseAnalysis component', () => {
  it('Should render snapshot correctly', () => {
    expect(
      render(
        <ExpenseAnalysis
          series={MOCK_SERIES_EXPENSE_ANALYSIS}
          options={createExpenseAnalysisOptions('220 000')}
        />,
      ),
    ).toMatchSnapshot();
  });
});

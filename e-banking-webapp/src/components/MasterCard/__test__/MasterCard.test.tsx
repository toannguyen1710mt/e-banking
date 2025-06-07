// Libs
import { render } from '@testing-library/react';

// Constants
import { createExpenseAnalysisOptions } from '@/constants';

// Mock
import { MASTERCARD_CHART_MOCK } from '@/mocks';

// Components
import { MasterCard } from '@/components';
import { act } from 'react';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

describe('MasterCard component', () => {
  test('should match snapshot for MasterCard', async () => {
    let container;

    await act(async () => {
      container = render(
        <MasterCard
          series={MASTERCARD_CHART_MOCK}
          totalBalance={createExpenseAnalysisOptions('$540,000')}
        />,
      ).container;
    });

    expect(container).toMatchSnapshot();
  });
});

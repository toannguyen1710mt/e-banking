// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_SPENDING_STATISTIC_CHART_DATA } from '@/mocks';

// Componentts
import { SpendingStatistics } from '@/components';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('SpendingStatistic component', () => {
  it('should match snapshot for SpendingStatistic', () => {
    const { container } = render(
      <SpendingStatistics {...MOCK_SPENDING_STATISTIC_CHART_DATA} />,
    );

    expect(container).toMatchSnapshot();
  });
});

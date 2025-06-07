// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_BALANCE_STATISTICS_CHART_DATA } from '@/mocks';

// Components
import { BalanceStatistics } from '@/components';

jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('BalanceStatistics component', () => {
  it('should match snapshot for BalanceStatistics', () => {
    const { container } = render(
      <BalanceStatistics {...MOCK_BALANCE_STATISTICS_CHART_DATA} />,
    );

    expect(container).toMatchSnapshot();
  });
});

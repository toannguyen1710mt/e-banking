import { render } from '@testing-library/react';

// Components
import { BalanceModal } from '..';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/constants/rules', () => ({
  createStepSchema: jest.fn(),
}));

describe('BalanceModal component', () => {
  it('Should render snapshot correctly', () => {
    expect(
      render(
        <BalanceModal
          username='Pheroxios'
          isOpen={true}
          onClose={() => {}}
          currentBalance='90,000'
          totalInvestment='80,000'
        />,
      ),
    ).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';
import { act } from 'react';

// Services
import { getMainCardByUserId } from '@/services';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { CardOverview } from '@/components';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/services', () => ({
  getMainCardByUserId: jest.fn(),
}));

describe('CardOverview component', () => {
  beforeEach(() => {
    (getMainCardByUserId as jest.Mock).mockResolvedValue({
      cardNumber: '1234 5678 9012 3456',
      expireAt: '12/25',
      holderName: 'John Doe',
    });

    jest.clearAllMocks();
  });

  test('should match snapshot for CardOverview', async () => {
    let container;

    await act(async () => {
      container = render(
        <CardOverview session={MOCK_SESSION_DATA} />,
      ).container;
    });

    expect(container).toMatchSnapshot();
  });
});

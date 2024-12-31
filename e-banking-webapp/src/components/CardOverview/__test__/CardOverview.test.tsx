// Libs
import { render } from '@testing-library/react';
import { act } from 'react';

// Context
import { useToastContext } from '@/context';

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

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

describe('CardOverview component', () => {
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useToastContext as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
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

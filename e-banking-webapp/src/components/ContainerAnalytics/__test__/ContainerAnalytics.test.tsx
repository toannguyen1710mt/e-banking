import { render, waitFor } from '@testing-library/react';
import { AuthError } from 'next-auth';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Services
import * as services from '@/services';

// Utils
import * as utils from '@/utils';

// Mocks
import { MOCK_DATA_USER, MOCK_SESSION_DATA } from '@/mocks';

// Component
import { ContainerAnalytics } from '..';

jest.mock('@/services', () => ({
  getTransactionsByUserId: jest.fn(),
  getAccountsByUserId: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatDate: jest.fn(),
  getGreeting: jest.fn(),
  formatNumberWithCommas: jest.fn((number) => number.toString()),
  formatCardNumber: jest.fn(),
}));

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  toastManager: {
    showToast: jest.fn(),
  },
}));

describe('ContainerAnalytics component', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    (services.getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );

    jest.spyOn(services, 'getTransactionsByUserId').mockResolvedValue({
      data: [],
      meta: {
        pagination: {
          total: 5,
          page: 0,
          pageSize: 0,
          pageCount: 0,
        },
      },
    });
    jest.spyOn(utils, 'getGreeting').mockReturnValue('Good Afternoon');
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global.ResizeObserver = undefined as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render snapshot correctly.', () => {
    expect(
      render(<ContainerAnalytics session={MOCK_SESSION_DATA} />),
    ).toMatchSnapshot();
  });

  it('Should handle API error', async () => {
    jest
      .spyOn(services, 'getTransactionsByUserId')
      .mockRejectedValue(new AuthError('API Error'));

    jest
      .spyOn(services, 'getAccountsByUserId')
      .mockRejectedValue(new AuthError('API Error'));

    const mockSession = {
      user: {
        ...MOCK_SESSION_DATA.user,
        username: '',
      },
      expires: MOCK_SESSION_DATA.expires,
    };

    render(<ContainerAnalytics session={mockSession} />);

    await waitFor(() => {
      expect(utils.toastManager.showToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.GET_ERROR,
        'error',
        'top-center',
      );
      expect(services.getTransactionsByUserId).toHaveBeenCalledWith(82);
      expect(services.getAccountsByUserId).toHaveBeenCalledTimes(0);
    });
  });
});

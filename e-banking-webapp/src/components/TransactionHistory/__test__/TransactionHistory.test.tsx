// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_SESSION_DATA, MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransactionHistory } from '@/components/TransactionHistory';

// Services
import { getTransactionsByUserId } from '@/services';

jest.mock('@/services', () => ({
  getTransactionsByUserId: jest.fn(),
}));

const mockProps = {
  currentPage: 1,
  session: MOCK_SESSION_DATA,
};

describe('TransactionHistory component', () => {
  beforeEach(() => {
    const mockGetTransactionsByUserId = getTransactionsByUserId as jest.Mock;

    mockGetTransactionsByUserId.mockResolvedValue({
      data: MOCK_TRANSACTIONS,
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 15,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = render(await TransactionHistory(mockProps));

    expect(container).toBeInTheDocument();
  });
});

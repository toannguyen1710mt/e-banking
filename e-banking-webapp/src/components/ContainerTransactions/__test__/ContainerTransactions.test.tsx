// Libs
import { render, waitFor } from '@testing-library/react';

// API
import { getTransactionsByUserId } from '@/services';

// Mocks
import { MOCK_SESSION_DATA, MOCK_SESSION_DATA_IS_EMPTY } from '@/mocks';

// Components
import { ContainerTransactions } from '../index';

// Mock the service
jest.mock('@/services', () => ({
  getTransactionsByUserId: jest.fn(),
}));

describe('ContainerTransactions Component', () => {
  test('renders correctly with session data', async () => {
    (getTransactionsByUserId as jest.Mock).mockResolvedValue({
      meta: {
        pagination: { total: 5 },
      },
    });

    const { container } = render(
      <ContainerTransactions session={MOCK_SESSION_DATA} currentPage={1} />,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  test('renders correctly with empty session data', async () => {
    (getTransactionsByUserId as jest.Mock).mockResolvedValue({
      meta: {
        pagination: { total: 0 },
      },
    });

    const { container } = render(
      <ContainerTransactions
        session={MOCK_SESSION_DATA_IS_EMPTY}
        currentPage={1}
      />,
    );

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});

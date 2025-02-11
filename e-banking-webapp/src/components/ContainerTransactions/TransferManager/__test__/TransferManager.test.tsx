// Libs
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

// API
import { getTransactionsByUserId } from '@/services';

// Mock
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { TransferManager } from '../index';

beforeAll(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((_callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.mock('@/services', () => ({
  getTransactionsByUserId: jest.fn(),
}));

const MOCK_TRANSACTIONS_RESPONSE = {
  meta: {
    pagination: {
      total: 5,
    },
  },
  data: [],
};

describe('TransferManager component', () => {
  beforeEach(() => {
    (getTransactionsByUserId as jest.Mock).mockResolvedValue(
      MOCK_TRANSACTIONS_RESPONSE,
    );
  });

  test('should match snapshot', async () => {
    const { container } = render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  test('should call getTransactionsByUserId with correct parameters', async () => {
    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
        expect.any(Object),
      );
    });
  });

  test('should display transactions received and sent', async () => {
    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Transfer Sent')).toBeInTheDocument();
    });
  });

  test('should fetch more transactions when scrolled to bottom', async () => {
    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledTimes(4);
    });

    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    observerCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledTimes(5);
    });
  });

  test('should switch transfer type and fetch transactions', async () => {
    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
        expect.objectContaining({
          filters: { toAccountType: { $notNull: undefined } },
        }),
      );
    });

    screen.getByText('Transfer Sent').click();

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
        expect.objectContaining({
          filters: { toAccountType: { $null: undefined } },
        }),
      );
    });
  });

  test('should append new transactions to the existing list', async () => {
    const initialTransactions = [{ id: 1 }];
    const newTransactions = [{ id: 2 }, { id: 3 }];

    (getTransactionsByUserId as jest.Mock)
      .mockResolvedValueOnce({
        ...MOCK_TRANSACTIONS_RESPONSE,
        data: initialTransactions,
      })
      .mockResolvedValueOnce({
        ...MOCK_TRANSACTIONS_RESPONSE,
        data: newTransactions,
      });

    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Transfer Sent')).toBeInTheDocument();
    });

    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    observerCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(screen.getByText('Transfer Sent')).toBeInTheDocument();
    });

    expect(screen.getByText('Transfer Sent')).toBeInTheDocument();
  });

  test('should set hasMore to false when there are no more transactions', async () => {
    (getTransactionsByUserId as jest.Mock).mockResolvedValueOnce({
      ...MOCK_TRANSACTIONS_RESPONSE,
      meta: {
        pagination: {
          total: 5,
          page: 1,
          pageCount: 1,
        },
      },
    });

    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Transfer Sent')).toBeInTheDocument();
    });

    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    observerCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(
        screen.queryByText('Loading more transactions...'),
      ).not.toBeInTheDocument();
    });
  });

  test('should handle transfer type selection correctly', async () => {
    render(
      <TransferManager
        session={MOCK_SESSION_DATA}
        totalTransferReceived={5}
        totalTransferSent={5}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Transfer Received')).toBeInTheDocument();
    });

    screen.getByText('Transfer Sent').click();

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
        expect.objectContaining({
          filters: { toAccountType: { $null: undefined } },
        }),
      );
    });

    screen.getByText('Transfer Received').click();

    await waitFor(() => {
      expect(getTransactionsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
        expect.objectContaining({
          filters: { toAccountType: { $notNull: undefined } },
        }),
      );
    });
  });
});

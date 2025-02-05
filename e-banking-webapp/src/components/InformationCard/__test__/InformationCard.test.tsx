import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getAccountsByUserId, getTotalCardsByUser } from '@/services';
import { MOCK_SESSION_DATA } from '@/mocks';
import { InformationCard } from '..';

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
  getTotalCardsByUser: jest.fn(),
}));

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('InformationCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.ResizeObserver = MockResizeObserver;
    (
      window.SVGElement.prototype as unknown as {
        getBBox: () => { x: number; y: number; width: number; height: number };
      }
    ).getBBox = () => ({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
  });

  test('should match snapshot', () => {
    const { container } = render(
      <InformationCard session={MOCK_SESSION_DATA} />,
    );

    expect(container).toMatchSnapshot();
  });

  test('renders the InformationCard component correctly', async () => {
    (
      getAccountsByUserId as jest.MockedFunction<typeof getAccountsByUserId>
    ).mockResolvedValue([
      {
        id: 1,
        balance: 1000,
        documentId: 'doc123',
        accountNumber: 'acc123',
        type: 'savings',
        currency: 'EUR',
        name: 'John Doe',
      },
    ]);
    (
      getTotalCardsByUser as jest.MockedFunction<typeof getTotalCardsByUser>
    ).mockResolvedValue([
      {
        id: 1,
        ccv: '123',
        accountType: 'credit',
        cardNumber: '1234',
        holderName: 'John Doe',
        expireAt: '12/23',
      },
    ]);

    render(<InformationCard session={MOCK_SESSION_DATA} />);

    await waitFor(() => {
      expect(screen.getByText('My Cards')).toBeInTheDocument();
      expect(screen.getByText('Master Card')).toBeInTheDocument();
      expect(screen.getByText('1234')).toBeInTheDocument();
    });
  });

  test('handles next and previous card buttons', async () => {
    (
      getAccountsByUserId as jest.MockedFunction<typeof getAccountsByUserId>
    ).mockResolvedValue([
      {
        id: 1,
        balance: 1000,
        documentId: 'doc123',
        accountNumber: 'acc123',
        type: 'savings',
        currency: 'EUR',
        name: 'John Doe',
      },
    ]);
    (
      getTotalCardsByUser as jest.MockedFunction<typeof getTotalCardsByUser>
    ).mockResolvedValue([
      {
        id: 1,
        ccv: '123',
        accountType: 'credit',
        cardNumber: '1234',
        holderName: 'John Doe',
        expireAt: '12/23',
      },
      {
        id: 2,
        ccv: '456',
        accountType: 'debit',
        cardNumber: '5678',
        holderName: 'Jane Doe',
        expireAt: '11/24',
      },
    ]);

    render(<InformationCard session={MOCK_SESSION_DATA} />);

    await waitFor(() => {
      expect(screen.getByText('1234')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Next card'));

    await waitFor(() => {
      expect(screen.getByText('5678')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Previous card'));

    await waitFor(() => {
      expect(screen.getByText('1234')).toBeInTheDocument();
    });
  });
});

// Libs
import { render, screen, waitFor } from '@testing-library/react';

// APIs
import { getAccountsByUserId } from '@/services';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Interfaces
import { AccountType } from '@/interfaces';

// Components
import { InformationCard } from '@/components';

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
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
        type: AccountType.SAVINGS,
        currency: 'EUR',
        name: 'John Doe',
      },
    ]);

    render(<InformationCard session={MOCK_SESSION_DATA} />);

    await waitFor(() => {
      expect(screen.getByText('My Cards')).toBeInTheDocument();
      expect(screen.getByText('Master Card')).toBeInTheDocument();
    });
  });

  test('displays error message when getAccountsByUserId throws AuthError', async () => {
    (
      getAccountsByUserId as jest.MockedFunction<typeof getAccountsByUserId>
    ).mockRejectedValue(new Error('An error occurred'));

    render(<InformationCard session={MOCK_SESSION_DATA} />);
  });

  test('displays error message when getTotalCardsByUser throws AuthError', async () => {
    (
      getAccountsByUserId as jest.MockedFunction<typeof getAccountsByUserId>
    ).mockResolvedValue([
      {
        id: 1,
        balance: 1000,
        documentId: 'doc123',
        accountNumber: 'acc123',
        type: AccountType.SAVINGS,
        currency: 'EUR',
        name: 'John Doe',
      },
    ]);

    render(<InformationCard session={MOCK_SESSION_DATA} />);

    await waitFor(() => {
      expect(screen.getByText('--/--')).toBeInTheDocument();
    });
  });
});

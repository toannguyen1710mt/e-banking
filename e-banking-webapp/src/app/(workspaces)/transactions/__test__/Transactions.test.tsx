import { render, screen } from '@testing-library/react';

// Auth
import { auth } from '@/config/auth';

// Page
import TransactionsPage from '../page';

// Components
import { ContainerTransactions } from '@/components';

jest.mock('@/config/auth');
jest.mock('@/components', () => ({
  ContainerTransactions: jest.fn(() => <div>Mocked Transactions</div>),
}));

describe('Transactions Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render ContainerTransactions when session exists', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: '123', email: 'test@example.com' },
    });
    const props = { searchParams: Promise.resolve({ page: '2' }) };

    render(await TransactionsPage(props));

    expect(auth).toHaveBeenCalled();
    expect(await screen.findByText('Mocked Transactions')).toBeInTheDocument();
  });

  it('Should return nothing if session does not exist', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const props = { searchParams: Promise.resolve({}) };
    const result = await TransactionsPage(props);

    expect(result).toBeUndefined();
  });

  it('Should use default page number when searchParams is not provided', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: '123', email: 'test@example.com' },
    });

    const props = { searchParams: Promise.resolve({}) };
    render(await TransactionsPage(props));

    expect(ContainerTransactions).toHaveBeenLastCalledWith(
      expect.objectContaining({
        session: { user: { id: '123', email: 'test@example.com' } },
        currentPage: 1,
      }),
      undefined,
    );
  });
});

// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_TRANSACTION_WIHOUT_CURRENCY, MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransactionTable } from '@/components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/mock-path'),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

const mockProps = {
  currentPage: 1,
  totalPage: 2,
  totalTransaction: 14,
  transactions: MOCK_TRANSACTIONS,
};

describe('TransactionTable component', () => {
  it('should match snapshot', () => {
    const container = render(<TransactionTable {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should render the default currencyUnit', () => {
    const { getByText } = render(
      <TransactionTable
        {...mockProps}
        transactions={MOCK_TRANSACTION_WIHOUT_CURRENCY}
      />,
    );

    // Check specific currency units
    expect(getByText('$120,000')).toBeInTheDocument(); // First transaction
    expect(getByText('$75')).toBeInTheDocument(); // Second transaction
    expect(getByText('$50')).toBeInTheDocument(); // Third transaction
  });
});

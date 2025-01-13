// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransactionHistory } from '@/components';

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

describe('TransactionHistory component', () => {
  test('should match snapshot', () => {
    const container = render(<TransactionHistory {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

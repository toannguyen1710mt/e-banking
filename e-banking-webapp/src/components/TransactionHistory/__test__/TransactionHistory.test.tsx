// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransactionHistory } from '@/components';

describe('TransactionHistory component', () => {
  test('should match snapshot', () => {
    const container = render(
      <TransactionHistory
        totalTransaction={24}
        transactionHistory={MOCK_TRANSACTIONS}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

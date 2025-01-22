import { render } from '@testing-library/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Component
import { TransactionTable } from '..';

describe('TransactionTable component', () => {
  it('Should render snapshot correctly.', () => {
    expect(
      render(<TransactionTable transactions={MOCK_TRANSACTIONS} />),
    ).toMatchSnapshot();
  });
});

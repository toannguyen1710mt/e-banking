// Libs
import { render } from '@testing-library/react';

// Components
import { TransactionHistorySkeleton } from '@/components';

describe('TransactionHistorySkeleton component', () => {
  test('should match snapshot', () => {
    const container = render(<TransactionHistorySkeleton />);

    expect(container).toMatchSnapshot();
  });
});

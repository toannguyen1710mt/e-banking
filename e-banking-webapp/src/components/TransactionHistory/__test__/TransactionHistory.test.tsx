// Libs
import { render } from '@testing-library/react';

// Components
import { TransactionHistory } from '@/components';

describe('TransactionHistory component', () => {
  test('should match snapshot', () => {
    const container = render(<TransactionHistory totalTransaction={24} />);

    expect(container).toMatchSnapshot();
  });
});

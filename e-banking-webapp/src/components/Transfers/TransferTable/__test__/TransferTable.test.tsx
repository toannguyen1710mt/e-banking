// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_TRANSACTIONS } from '@/mocks';

// Components
import { TransferTable } from '@/components';

const mockProps = {
  transactions: MOCK_TRANSACTIONS,
  transferType: 'received' as 'received' | 'sent',
};

describe('TransferTable component', () => {
  it('should match snapshot', () => {
    const { container } = render(<TransferTable {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

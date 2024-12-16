// Libs
import { render } from '@testing-library/react';

// Interfaces
import { AccountType } from '@/interfaces';

// Components
import { InternalTransferSuccess } from '@/components';

const mockProps = {
  amount: 15000,
  fromAccountType: AccountType.MAIN,
  toAccountType: AccountType.SAVINGS,
  onClose: jest.fn(),
};

describe('InternalTransferSuccess component', () => {
  it('should match snapshot for InternalTransferSuccess', () => {
    const { container } = render(<InternalTransferSuccess {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

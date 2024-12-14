// Libs
import { render } from '@testing-library/react';

// Interfaces
import { AccountType } from '@/interfaces';

// Components
import { ConfirmInternalTransfer } from '@/components';

const mockProps = {
  amount: 15000,
  fromAccountType: AccountType.MAIN,
  toAccountType: AccountType.SAVINGS,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
};

describe('ConfirmInternalTransfer component', () => {
  it('should match snapshot for ConfirmInternalTransfer', () => {
    const { container } = render(<ConfirmInternalTransfer {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

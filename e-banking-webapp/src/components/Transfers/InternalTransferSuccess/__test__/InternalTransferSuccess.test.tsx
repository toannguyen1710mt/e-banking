// Libs
import { render } from '@testing-library/react';

// Components
import { InternalTransferSuccess } from '@/components';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn().mockReturnValue({
    form: {
      getValues: jest.fn().mockReturnValue({
        internalTransfer: {
          amount: 100,
          fromAccountType: 'Main',
          toAccountType: 'Savings',
        },
      }),
    },
  }),
}));

const mockProps = {
  onClose: jest.fn(),
};

describe('InternalTransferSuccess component', () => {
  it('should match snapshot for InternalTransferSuccess', () => {
    const { container } = render(<InternalTransferSuccess {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

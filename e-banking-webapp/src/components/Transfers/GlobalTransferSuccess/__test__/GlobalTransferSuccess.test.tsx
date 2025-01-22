// Libs
import { render } from '@testing-library/react';

// Components
import { GlobalTransferSuccess } from '@/components';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn().mockReturnValue({
    form: {
      getValues: jest.fn().mockReturnValue({
        globalTransfer: {
          amount: 100,
        },
        recipientName: 'Testing',
      }),
    },
  }),
}));

const mockProps = {
  onClose: jest.fn(),
};

describe('GlobalTransferSuccess component', () => {
  it('should match snapshot for GlobalTransferSuccess', () => {
    const { container } = render(<GlobalTransferSuccess {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

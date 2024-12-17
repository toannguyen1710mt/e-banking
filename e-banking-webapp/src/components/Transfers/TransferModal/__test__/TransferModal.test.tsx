// Libs
import { render } from '@testing-library/react';

// Components
import { TransferModal } from '@/components/Transfers/TransferModal';

describe('TransferModal component', () => {
  it('should match snapshot for TransferModal', () => {
    const { container } = render(
      <TransferModal isOpen={true} onClose={() => jest.fn()} />,
    );

    expect(container).toMatchSnapshot();
  });
});

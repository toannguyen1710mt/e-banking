// Libs
import { render } from '@testing-library/react';

// Components
import TransferModal from '@/components/Transfers/TransferModal';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

describe('TransferModal component', () => {
  it('should match snapshot for TransferModal', () => {
    const { container } = render(
      <TransferModal
        isOpen={true}
        onClose={jest.fn()}
        session={MOCK_SESSION_DATA}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});

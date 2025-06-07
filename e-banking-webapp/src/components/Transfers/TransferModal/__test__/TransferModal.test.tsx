// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import TransferModal from '@/components/Transfers/TransferModal';

describe('TransferModal component', () => {
  it('should match snapshot', () => {
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

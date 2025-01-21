// Libs
import { render } from '@testing-library/react';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import TransferModal from '@/components/Transfers/TransferModal';

// Contexts
import { ToastProvider } from '@/context';

describe('TransferModal component', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <ToastProvider>
        <TransferModal
          isOpen={true}
          onClose={jest.fn()}
          session={MOCK_SESSION_DATA}
        />
      </ToastProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});

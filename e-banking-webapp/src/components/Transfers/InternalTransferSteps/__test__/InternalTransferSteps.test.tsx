// Libs
import { render } from '@testing-library/react';

// Componennts
import { InternalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Contexts
import { ToastProvider } from '@/context';

describe('InternalTransferSteps component', () => {
  it('should match snapshot for InternalTransferSteps', () => {
    const { container } = render(
      <ToastProvider>
        <InternalTransferSteps
          session={MOCK_SESSION_DATA}
          onClose={jest.fn()}
        />
      </ToastProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});

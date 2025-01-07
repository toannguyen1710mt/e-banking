// Libs
import { render } from '@testing-library/react';

// Componennts
import { GlobalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';
// Contexts
import { ToastProvider } from '@/context';
describe('InternalTransferSteps component', () => {
  it('shout match snapshot for InternalTransferSteps', () => {
    const { container } = render(
      <ToastProvider>
        <GlobalTransferSteps session={MOCK_SESSION_DATA} onClose={jest.fn()} />,
      </ToastProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});

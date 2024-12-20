// Libs
import { render } from '@testing-library/react';

// Componennts
import { InternalTransferSteps } from '@/components';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

describe('InternalTransferSteps component', () => {
  it('shout match snapshot for InternalTransferSteps', () => {
    const { container } = render(
      <InternalTransferSteps session={MOCK_SESSION_DATA} onClose={jest.fn()} />,
    );

    expect(container).toMatchSnapshot();
  });
});

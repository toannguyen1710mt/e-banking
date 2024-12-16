// Libs
import { render } from '@testing-library/react';

// Components
import { InternalTransferForm } from '@/components';

describe('InternalTransferForm component', () => {
  it('should match snapshot for InternalTransferForm', () => {
    const { container } = render(<InternalTransferForm />);

    expect(container).toMatchSnapshot();
  });
});

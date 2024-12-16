// Libs
import { render } from '@testing-library/react';

// Components
import { GlobalTransferForm } from '@/components';

describe('GlobalTransferForm component', () => {
  it('should match snapshot for GlobalTransferForm', () => {
    const { container } = render(<GlobalTransferForm />);

    expect(container).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';

// Components
import { DeleteAccountTab } from '@/components';

describe('DeleteAccountTab component', () => {
  it('should match snapshot for DeleteAccountTab', () => {
    const { container } = render(<DeleteAccountTab />);

    expect(container).toMatchSnapshot();
  });
});

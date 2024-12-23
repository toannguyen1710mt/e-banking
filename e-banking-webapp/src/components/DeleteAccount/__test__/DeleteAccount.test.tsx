// Libs
import { render } from '@testing-library/react';

// Components
import { DeleteAccount } from '@/components';

describe('DeleteAccount component', () => {
  it('should match snapshot for DeleteAccount', () => {
    const { container } = render(<DeleteAccount />);

    expect(container).toMatchSnapshot();
  });
});

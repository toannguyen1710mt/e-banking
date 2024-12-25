// Libs
import { render } from '@testing-library/react';

// Components
import { DeleteTab } from '@/components';

describe('DeleteTab component', () => {
  it('should match snapshot for DeleteTab', () => {
    const { container } = render(<DeleteTab />);

    expect(container).toMatchSnapshot();
  });
});

// Libs
import { render } from '@testing-library/react';

// Components
import { ConnectedAccount } from '@/components';

describe('ConnectedAccount component', () => {
  it('should match snapshot for ConnectedAccount', () => {
    const { container } = render(<ConnectedAccount />);

    expect(container).toMatchSnapshot();
  });
});

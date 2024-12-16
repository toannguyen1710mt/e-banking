// Libs
import { render } from '@testing-library/react';

// Components
import { GlobalTransferSuccess } from '@/components';

const mockProps = {
  amount: 15000,
  userName: 'Yehudi Daud',
  onClose: jest.fn(),
};

describe('GlobalTransferSuccess component', () => {
  it('should match snapshot for GlobalTransferSuccess', () => {
    const { container } = render(<GlobalTransferSuccess {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});

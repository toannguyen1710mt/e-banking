// Libs
import { render } from '@testing-library/react';

// Components
import { HomeIcon, DueTile } from '@/components';

const mockData = {
  icon: <HomeIcon />,
  title: 'Mortgage',
  createAt: 'Aug 21 at 3:00 pm',
};

describe('DueTile component', () => {
  it('should match snapshot for DueTile', () => {
    const { container } = render(<DueTile {...mockData} />);

    expect(container).toMatchSnapshot();
  });
});

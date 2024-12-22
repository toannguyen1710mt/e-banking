// Libs
import { render } from '@testing-library/react';

// Components
import { HouseIcon, ServiceCard } from '@/components';

const mockData = {
  icon: <HouseIcon />,
  title: 'Mortgage',
  amount: 1100,
};

describe('ServiceCard component', () => {
  it('should match snapshot for ServiceCard', () => {
    const { container } = render(<ServiceCard {...mockData} />);

    expect(container).toMatchSnapshot();
  });
});

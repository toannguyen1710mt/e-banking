// Libs
import { render, screen } from '@testing-library/react';

// Components
import { GlobalIcon, TransferTag, UserIcon } from '@/components';

const mockProps = [
  {
    keyTab: 'account',
    title: 'To my Account',
    description: 'Instant transfer between your own accounts',
    icon: <UserIcon width={32} height={32} />,
    content: <p>Account</p>,
  },
  {
    keyTab: 'global',
    title: 'Global Transfer',
    description: 'Transfer Money across the globe',
    icon: <GlobalIcon width={32} height={32} />,
    content: <p>Global</p>,
  },
];

describe('TransferTag Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(<TransferTag tabs={mockProps} />);
    expect(container).toMatchSnapshot();
  });

  test('renders all tabs with correct titles and descriptions', () => {
    render(<TransferTag tabs={mockProps} />);

    // Verify each tab title and description
    mockProps.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});

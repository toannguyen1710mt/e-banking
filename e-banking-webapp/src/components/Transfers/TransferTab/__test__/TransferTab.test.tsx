// Libs
import { render, screen } from '@testing-library/react';

// Components
import { GlobalIcon, Text, TransferTab, UserIcon } from '@/components';

const mockTransferTabs = [
  {
    keyTab: 'account',
    title: 'To my Account',
    description: 'Instant transfer between your own accounts',
    icon: <UserIcon width={32} height={32} />,
    content: <Text>Internal</Text>,
  },
  {
    keyTab: 'global',
    title: 'Global Tranfer',
    description: 'Transfer Money across the globe',
    icon: <GlobalIcon width={32} height={32} />,
    content: <Text>Global</Text>,
  },
];
describe('TransferTab Component', () => {
  test('renders correctly and matches snapshot', () => {
    const { container } = render(
      <TransferTab TransferTabs={mockTransferTabs} />,
    );

    expect(container).toMatchSnapshot();
  });

  test('renders all tabs with correct titles and descriptions', () => {
    render(<TransferTab TransferTabs={mockTransferTabs} />);

    mockTransferTabs.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});

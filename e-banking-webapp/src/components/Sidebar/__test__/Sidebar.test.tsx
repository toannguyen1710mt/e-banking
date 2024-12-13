// Libs
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

// Components
import { Sidebar } from '@/components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockSidebarItems = [
  { label: 'General', href: '/setting/general', icon: <span>Icon1</span> },
  { label: 'Account', href: '/setting/account', icon: <span>Icon2</span> },
];

describe('Sidebar component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with sidebar items', () => {
    (usePathname as jest.Mock).mockReturnValue('/setting/general');

    const { container } = render(<Sidebar sidebarItem={mockSidebarItems} />);

    expect(container).toMatchSnapshot();
  });

  test('renders all sidebar items', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Sidebar sidebarItem={mockSidebarItems} />);

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});

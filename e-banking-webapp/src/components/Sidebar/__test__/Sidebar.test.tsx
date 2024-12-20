// Libs
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Sidebar } from '@/components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Sidebar component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with sidebar items', () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.GENERAL);

    const { container } = render(<Sidebar />);

    expect(container).toMatchSnapshot();
  });

  test('renders all sidebar items', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Sidebar />);

    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
  });
});

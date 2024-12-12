// Libs
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Layouts
import { Header } from '@/layouts';

describe('Header component', () => {
  test('matches the snapshot', () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });

  test('renders the header with logo and menu items', () => {
    render(<Header />);

    // Check for logo
    const logo = screen.getByAltText('Logo EBanking');
    expect(logo).toBeInTheDocument();

    // Check for mobile menu toggle button
    const menuToggle = screen.getByLabelText('Open menu');
    expect(menuToggle).toBeInTheDocument();

    // Check for avatar
    const avatar = screen.getByRole('img', { name: /avatar/i });
    expect(avatar).toBeInTheDocument();

    // Check for menu content
    const navbarItems = screen.getAllByRole('button');
    expect(navbarItems).toHaveLength(3); // Search, Notification, and Avatar
  });

  test('toggles the mobile menu on click', () => {
    render(<Header />);

    // Find menu toggle button
    const menuToggle = screen.getByLabelText('Open menu');

    // Click to open menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-label', 'Close menu');

    // Click again to close menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-label', 'Open menu');
  });

  test('disables search and notification buttons', () => {
    render(<Header />);

    const searchButton = screen.getByRole('button', { name: /search icon/i });
    const notificationButton = screen.getByRole('button', {
      name: /notification icon/i,
    });

    expect(searchButton).toBeDisabled();
    expect(notificationButton).toBeDisabled();
  });
});

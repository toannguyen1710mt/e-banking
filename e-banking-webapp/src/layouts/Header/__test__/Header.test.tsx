import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { redirect, usePathname } from 'next/navigation';

// Context
import { UserProvider } from '@/context';

// Actions
import { signOut } from '@/actions';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Components
import { Header } from '..';
import { toastManager } from '@/utils';

jest.mock('@/actions', () => ({
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(() => '/sign-in'),
}));

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  toastManager: {
    showToast: jest.fn(),
  },
}));

const mockProps = {
  username: 'testebanking',
  email: 'testebanking@example.com',
};

describe('Header component', () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(<UserProvider avatar={''}>{ui}</UserProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  test('matches the snapshot', () => {
    const { container } = renderWithProviders(<Header {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  test('toggles the mobile menu on click', () => {
    renderWithProviders(<Header {...mockProps} />);
    // Find menu toggle button
    const menuToggle = screen.getByLabelText('Open menu');
    // Click to open menu
    fireEvent.click(menuToggle);

    expect(menuToggle).toHaveAttribute('aria-label', 'Close menu');

    // Click again to close menu
    fireEvent.click(menuToggle);
    expect(menuToggle).toHaveAttribute('aria-label', 'Open menu');
  });

  test('should call signOut and redirect on successful sign out', async () => {
    (signOut as jest.Mock).mockResolvedValueOnce(undefined);

    renderWithProviders(<Header {...mockProps} />);

    // Step 1: Open the dropdown menu by clicking the avatar
    const avatarButton = screen.getByRole('img', {
      name: /avatar/i,
    });
    fireEvent.click(avatarButton);

    // Step 2: Query for the "Sign out" button inside the dropdown
    const signOutButton = await screen.findByRole('button', {
      name: /sign out/i,
    });

    // Step 3: Click the "Sign out" button
    fireEvent.click(signOutButton);

    // Step 4: Verify loading state and behavior
    await waitFor(() => expect(signOutButton).toBeDisabled());

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(toastManager.showToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.SIGN_OUT_SUCCESS,
        'success',
        'top-center',
      );
      expect(redirect).toHaveBeenCalledWith('/sign-in');
    });
  });

  test('should handle sign out failure', async () => {
    (signOut as jest.Mock).mockRejectedValueOnce(new Error('Sign out failed'));

    renderWithProviders(<Header {...mockProps} />);

    // Step 1: Open the dropdown menu by clicking the avatar
    const avatarButton = screen.getByRole('img', {
      name: /avatar/i,
    });
    fireEvent.click(avatarButton);

    // Step 2: Query for the "Sign out" button inside the dropdown
    const signOutButton = await screen.findByRole('button', {
      name: /sign out/i,
    });

    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(toastManager.showToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.SIGN_OUT_FAILED,
        'error',
        'top-center',
      );
    });
  });

  test('should apply correct background on Settings page', () => {
    (usePathname as jest.Mock).mockReturnValue('/settings');

    renderWithProviders(<Header {...mockProps} />);

    const header = screen.getByTestId('header-wrapper').querySelector('header');

    expect(header).toHaveClass('bg-background-500');
  });

  test('should close menu when a menu item is clicked', () => {
    renderWithProviders(<Header {...mockProps} />);

    // Open the menu
    const menuToggle = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(menuToggle);

    expect(
      screen.getByRole('button', { name: /close menu/i }),
    ).toBeInTheDocument();

    // Click on a menu link to trigger onPress
    const menuLink = screen.getAllByLabelText('Home')[0];
    fireEvent.click(menuLink);

    // Verify the menu has closed
    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument();
  });
});

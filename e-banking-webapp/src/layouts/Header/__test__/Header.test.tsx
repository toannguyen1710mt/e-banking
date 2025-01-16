import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { redirect, usePathname } from 'next/navigation';

// Context
import { ToastProvider, UserProvider } from '@/context';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Actions
import { signOut } from '@/actions';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Components
import { Header } from '..';

jest.mock('@/actions', () => ({
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(() => '/sign-in'),
}));

const mockShowToast = jest.fn();

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  ToastProvider: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
  useToastContext: () => ({
    showToast: mockShowToast,
  }),
}));

describe('Header component', () => {
  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <UserProvider avatar={''}>
        <ToastProvider>{ui}</ToastProvider>
      </UserProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  test('matches the snapshot', () => {
    const { container } = renderWithProviders(
      <Header session={MOCK_SESSION_DATA} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('toggles the mobile menu on click', () => {
    renderWithProviders(<Header session={MOCK_SESSION_DATA} />);
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

    renderWithProviders(<Header session={MOCK_SESSION_DATA} />);

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
      expect(mockShowToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.SIGN_OUT_SUCCESS,
        'success',
        'top-center',
      );
      expect(redirect).toHaveBeenCalledWith('/sign-in');
    });
  });

  test('should handle sign out failure', async () => {
    (signOut as jest.Mock).mockRejectedValueOnce(new Error('Sign out failed'));

    renderWithProviders(<Header session={MOCK_SESSION_DATA} />);

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
      expect(mockShowToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.SIGN_OUT_FAILED,
        'error',
        'top-center',
      );
    });
  });
});

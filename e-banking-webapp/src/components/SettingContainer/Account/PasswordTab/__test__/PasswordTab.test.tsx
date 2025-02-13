import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDisclosure } from '@nextui-org/react';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Context
import { useToastContext } from '@/context';

// Actions
import { changePassword } from '@/actions';

// Mocks
import { MOCK_SESSION_DATA } from '@/mocks';

// Components
import { PasswordTab } from '..';

const mockClose = jest.fn();
const mockOpen = jest.fn();

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

jest.mock('@/actions', () => ({
  changePassword: jest.fn(),
}));

jest.mock('@nextui-org/react', () => ({
  ...jest.requireActual('@nextui-org/react'),
  useDisclosure: jest.fn().mockImplementation(() => ({
    isOpen: false,
    onClose: mockClose,
    onOpen: mockOpen,
  })),
}));

describe('PasswordTab', () => {
  const mockOnUnsavedChanges = jest.fn();
  const mockShowToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useToastContext as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  it('Should renders snapshot correctly', () => {
    expect(
      render(
        <PasswordTab
          session={MOCK_SESSION_DATA}
          onUnsavedChanges={mockOnUnsavedChanges}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('Should submit form successfully', async () => {
    (changePassword as jest.Mock).mockResolvedValue({ status: 200 });
    render(
      <PasswordTab
        session={MOCK_SESSION_DATA}
        onUnsavedChanges={mockOnUnsavedChanges}
      />,
    );

    fireEvent.change(screen.getByLabelText('Current Password'), {
      target: { value: 'OldPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'NewPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'NewPassword1!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /change password/i }));

    await waitFor(() => {
      expect(changePassword).toHaveBeenCalledWith(
        {
          currentPassword: 'OldPassword1!',
          password: 'NewPassword1!',
          passwordConfirmation: 'NewPassword1!',
        },
        MOCK_SESSION_DATA.user.token,
      );
    });
  });

  it('Should submit form when response error', async () => {
    (changePassword as jest.Mock).mockResolvedValue({ status: 400 });
    render(
      <PasswordTab
        session={MOCK_SESSION_DATA}
        onUnsavedChanges={mockOnUnsavedChanges}
      />,
    );

    fireEvent.change(screen.getByLabelText('Current Password'), {
      target: { value: 'OldPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'NewPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'NewPassword1!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /change password/i }));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        ERROR_MESSAGES.CHANGE_PASSWORD_FAILED,
        'error',
        'top-center',
      );
    });
  });

  it('Should show error when current password is invalid', async () => {
    (changePassword as jest.Mock).mockResolvedValue({
      status: 400,
      message: ERROR_MESSAGES.INVALID_CURRENT_PASSWORD,
    });

    (useDisclosure as jest.Mock).mockImplementation(() => ({
      isOpen: true,
      onClose: mockClose,
      onOpen: mockOpen,
    }));

    render(
      <PasswordTab
        session={MOCK_SESSION_DATA}
        onUnsavedChanges={mockOnUnsavedChanges}
      />,
    );

    fireEvent.change(screen.getByLabelText('Current Password'), {
      target: { value: 'WrongPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'NewPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'NewPassword1!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /change password/i }));

    await waitFor(() => {
      expect(
        screen.getByText(ERROR_MESSAGES.INVALID_CURRENT_PASSWORD),
      ).toBeInTheDocument();
    });
  });

  it('Should show error when new password is same as old password', async () => {
    (changePassword as jest.Mock).mockResolvedValue({
      status: 400,
      message: ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD,
    });

    render(
      <PasswordTab
        session={MOCK_SESSION_DATA}
        onUnsavedChanges={mockOnUnsavedChanges}
      />,
    );

    fireEvent.change(screen.getByLabelText('Current Password'), {
      target: { value: 'OldPassword1!' },
    });
    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'OldPassword1!' }, // New password same as old
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'OldPassword1!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /change password/i }));

    await waitFor(() => {
      expect(
        screen.getByText(ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD),
      ).toBeInTheDocument();
    });
  });
});

// Libs
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Constants
import { ERROR_MESSAGES, ROUTES } from '@/constants';

// Components
import { LoginForm } from '@/components/LoginForm';

// Actions
import { authenticateUser } from '@/actions';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  Controller: ({
    render,
    field,
  }: {
    render: (props: {
      field: {
        name?: string;
        value?: string;
        onChange?: (e: { target: { value: string } }) => void;
      };
      fieldState: { error: string | null };
    }) => JSX.Element;
    field: {
      name?: string;
      value?: string;
      onChange?: (e: { target: { value: string } }) => void;
    };
  }) => {
    // Return a mock for onChange function
    const handleChange = jest.fn();
    return render({
      field: {
        ...field,
        onChange: handleChange, // Mocking the onChange function
      },
      fieldState: { error: null },
    });
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/actions', () => ({
  authenticateUser: jest.fn(),
}));

const fillInput = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText);
  fireEvent.change(input, { target: { value } });
};

describe('LoginForm component', () => {
  const mockHandleSubmit = jest.fn((callback) => callback);
  const mockPush = jest.fn();

  beforeEach(() => {
    (useForm as jest.Mock).mockReturnValue({
      control: {},
      handleSubmit: mockHandleSubmit,
      formState: {
        isDirty: true,
        isValid: true,
        isSubmitting: false,
      },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render snapshot correctly', () => {
    expect(render(<LoginForm />)).toMatchSnapshot();
  });

  it('should clear error message when input values change', () => {
    render(<LoginForm />);

    // Set initial error message
    const errorMessage = ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
    (authenticateUser as jest.Mock).mockResolvedValueOnce(errorMessage);

    // Submit form by clicking Sign In button
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);

    // Wait for error message to appear
    waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Change input values
    fillInput('identifier', 'test@example.com');
    fillInput('password', 'password123');

    // Verify error message is cleared
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it('should handle successful form submission', async () => {
    render(<LoginForm />);

    // Mock successful authentication
    (authenticateUser as jest.Mock).mockResolvedValueOnce(undefined);

    // Fill form
    fillInput('identifier', 'test@example.com');
    fillInput('password', 'password123');

    // Click Sign In button
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);

    // Wait for navigation
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(ROUTES.HOME);
    });
  });

  it('should toggle password visibility when clicking the eye icon', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const eyeIconButton = screen.getByLabelText('show password button');

    // Check initial input type (should be password)
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to reveal password (toggle to text)
    fireEvent.click(eyeIconButton);

    // Check if input type has changed to text
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click again to hide password (toggle back to password)
    fireEvent.click(eyeIconButton);

    // Check if input type has changed back to password
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

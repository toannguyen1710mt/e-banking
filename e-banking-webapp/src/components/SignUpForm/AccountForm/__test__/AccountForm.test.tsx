import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Components
import { AccountForm } from '..';

describe('AccountForm component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<AccountForm />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('validates the email input correctly', async () => {
    const emailInput = container.getByPlaceholderText('Email');

    fireEvent.blur(emailInput);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(
      await container.findByText(ERROR_MESSAGES.EMAIL_INVALID),
    ).toBeInTheDocument();
  });

  it('validates the password input correctly', async () => {
    const passwordInput = container.getByPlaceholderText('Password');

    fireEvent.blur(passwordInput);

    expect(
      await container.findByText(ERROR_MESSAGES.PASSWORD_INVALID),
    ).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'short123' } });
    fireEvent.blur(passwordInput);

    expect(
      await container.findByText(ERROR_MESSAGES.PASSWORD_PATTERN),
    ).toBeInTheDocument();
  });

  it('validates the confirm password input correctly', async () => {
    const passwordInput = container.getByPlaceholderText('Password');
    const confirmPasswordInput =
      container.getByPlaceholderText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'wrongpassword' },
    });
    fireEvent.blur(confirmPasswordInput);

    expect(
      await container.findByText(ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH),
    ).toBeInTheDocument();

    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password@123' },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(
        container.queryByText(ERROR_MESSAGES.PASSWORD_DOES_NOT_MATCH),
      ).not.toBeInTheDocument();
    });
  });

  it('toggles password visibility when icon is clicked', () => {
    const passwordInput = container.getAllByPlaceholderText('Password')[0];
    const toggleButton = container.getAllByLabelText('show password button')[0];

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

// Libs
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';

// Context
import { useToastContext, useWizardFormContext } from '@/context';

// Actions
import { addAccount, addCard, signUp, updateUser } from '@/actions/auth';

// Components
import { SignUpForm } from '..';

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  useFormContext: jest.fn(),
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
    const [value, setValue] = React.useState(field?.value || '');

    return render({
      field: {
        ...field,
        value,
        onChange: (e) => {
          setValue(e.target?.value);
          field?.onChange?.(e);
        },
      },
      fieldState: { error: null },
    });
  },
}));

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
  useWizardFormContext: jest.fn(),
  WizardFormContextProvider: ({ children }: { children: React.ReactNode }) => {
    const contextValue = {
      currentStepIndex: 1,
      onPrevStep: jest.fn(),
    };

    if (React.isValidElement(children)) {
      return (
        <>
          {React.cloneElement(children as React.ReactElement, { contextValue })}
        </>
      );
    } else {
      return children;
    }
  },
}));

jest.mock('@/actions/auth', () => ({
  signUp: jest.fn(),
  updateUser: jest.fn(),
  addAccount: jest.fn(),
  addCard: jest.fn(),
}));

jest.mock('@/components/common/WizardForm', () => ({
  __esModule: true,
  Root: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-wizard-form-root'>{children}</div>
  ),
  Step: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-wizard-form-step'>{children}</div>
  ),
  Footer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-wizard-form-footer'>{children}</div>
  ),
}));

const fillInput = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText);
  fireEvent.change(input, { target: { value } });
};

describe('SignUpForm component', () => {
  const mockShowToast = jest.fn();
  const mockFormData = {
    user: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    },
    contact: {
      phone: '012345678901',
      country: 'United States',
      postal: '12345',
    },
    card: {
      holderName: 'Test User',
      cardNumber: '111111111111',
      expireAt: '12/25',
      ccv: '123',
    },
  };
  let mockHandleSubmit: jest.Mock;

  beforeEach(() => {
    mockHandleSubmit = jest.fn((callback) => async () => {
      await callback(mockFormData);
    });

    (useToastContext as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });

    (useFormContext as jest.Mock).mockReturnValue({
      control: {
        register: jest.fn(),
        setValue: jest.fn(),
        getValues: () => mockFormData,
        formState: {
          errors: {},
          isSubmitting: false,
        },
        values: mockFormData,
      },
    });

    (useWizardFormContext as jest.Mock).mockReturnValue({
      currentStepIndex: 1,
      onPrevStep: jest.fn(),
      form: {
        control: {
          values: mockFormData,
          fields: mockFormData,
        },
        setError: jest.fn(),
        handleSubmit: mockHandleSubmit,
        trigger: jest.fn(),
        formState: {
          errors: {},
          isSubmitting: false,
          isValid: true,
        },
        values: mockFormData,
      },
      validateStep: jest.fn().mockReturnValue(true),
      goToStep: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = render(<SignUpForm />);

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('should handle successful form submission', async () => {
    // Mock successful API responses
    const mockUserId = 'user123';
    const mockAccountId = 'account123';

    (signUp as jest.Mock).mockResolvedValue({
      status: 200,
      data: { user: { id: mockUserId } },
    });

    (updateUser as jest.Mock).mockResolvedValue({
      status: 200,
      data: { id: mockUserId },
    });

    (addAccount as jest.Mock).mockResolvedValue({
      status: 200,
      data: { id: mockAccountId },
    });

    (addCard as jest.Mock).mockResolvedValue({
      status: 200,
      data: { id: 'card123' },
    });

    render(<SignUpForm />);

    // Fill form data
    fillInput('username', mockFormData.user.username);
    fillInput('email', mockFormData.user.email);
    fillInput('password', mockFormData.user.password);
    fillInput('confirm password', mockFormData.user.confirmPassword);

    // Submit first step
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);

    // Fill and submit second step
    fillInput('phone', mockFormData.contact.phone);
    const continueButtonFirst = screen.getAllByRole('button', {
      name: /continue/i,
    })[0];
    fireEvent.click(continueButtonFirst);

    // Fill and submit final step
    fillInput('holderName', mockFormData.card.holderName);
    fillInput('cardNumber', mockFormData.card.cardNumber);
    fireEvent.click(screen.getByPlaceholderText('MM/YY'));
    const yearSelect = screen.getByLabelText('Year:');
    fireEvent.change(yearSelect, { target: { value: '2025' } });
    fillInput('ccv', mockFormData.card.ccv);

    const continueButtonSecond = screen.getAllByRole('button', {
      name: /continue/i,
    })[1];
    fireEvent.click(continueButtonSecond);

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email: mockFormData.user.email,
        password: mockFormData.user.password,
        username: mockFormData.user.username,
      });
      expect(updateUser).toHaveBeenCalledWith(mockUserId, {
        phone: mockFormData.contact.phone,
        country: mockFormData.contact.country,
        postal: mockFormData.contact.postal,
      });
      expect(addAccount).toHaveBeenCalled();
      expect(addCard).toHaveBeenCalled();
    });
  });

  it('should throw error message when API returns status 400', async () => {
    // Mock signUp to return a response with status 400
    (signUp as jest.Mock).mockResolvedValue({
      status: 400,
      message: 'Email or Username are already taken',
    });

    render(<SignUpForm />);

    // Fill form data
    fillInput('username', mockFormData.user.username);
    fillInput('email', mockFormData.user.email);
    fillInput('password', mockFormData.user.password);
    fillInput('confirm password', mockFormData.user.confirmPassword);

    // Submit first step
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);

    // Fill and submit second step
    fillInput('phone', mockFormData.contact.phone);
    const continueButtonFirst = screen.getAllByRole('button', {
      name: /continue/i,
    })[0];
    fireEvent.click(continueButtonFirst);

    // Fill and submit final step
    fillInput('holderName', mockFormData.card.holderName);
    fillInput('cardNumber', mockFormData.card.cardNumber);
    fireEvent.click(screen.getByPlaceholderText('MM/YY'));
    const yearSelect = screen.getByLabelText('Year:');
    fireEvent.change(yearSelect, { target: { value: '2025' } });
    fillInput('ccv', mockFormData.card.ccv);

    const continueButtonSecond = screen.getAllByRole('button', {
      name: /continue/i,
    })[1];
    fireEvent.click(continueButtonSecond);

    await waitFor(() => {
      // Verify signUp was called
      expect(signUp).toHaveBeenCalledWith({
        email: mockFormData.user.email,
        password: mockFormData.user.password,
        username: mockFormData.user.username,
      });

      // Verify that no subsequent API calls were made
      expect(updateUser).not.toHaveBeenCalled();
      expect(addAccount).not.toHaveBeenCalled();
      expect(addCard).not.toHaveBeenCalled();
    });

    // Verify that attempting to continue after the error doesn't trigger more API calls
    const finalContinueButton = screen.getAllByRole('button', {
      name: /continue/i,
    })[1];
    fireEvent.click(finalContinueButton);

    await waitFor(() => {
      expect(updateUser).not.toHaveBeenCalled();
      expect(addAccount).not.toHaveBeenCalled();
      expect(addCard).not.toHaveBeenCalled();
    });
  });
});

// Libs
import { act, render, waitFor } from '@testing-library/react';
import { useWatch } from 'react-hook-form';

// Mocks
import { MOCK_DATA_USER, MOCK_SESSION_DATA } from '@/mocks';

// Components
import { InternalTransferForm } from '@/components/Transfers/InternalTransferForm';

// Contexts
import { useFetchedBalances, useWizardFormContext } from '@/context';

// Services
import { getAccountsByUserId } from '@/services';

jest.mock('react-hook-form', () => ({
  useWatch: jest.fn(),
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

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
  useFetchedBalances: jest.fn(),
}));

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatNumberWithCommas: jest.fn(),
  formatDate: jest.fn(),
  isValidNumber: jest.fn(),
  sanitizeNumber: jest.fn(),
}));

describe('InternalTransferForm component', () => {
  let setFetchedBalancesMock: jest.Mock;
  let setValueMock: jest.Mock;

  beforeEach(() => {
    setValueMock = jest.fn();
    setFetchedBalancesMock = jest.fn();

    if (!MOCK_DATA_USER.accounts) {
      MOCK_DATA_USER.accounts = [];
    }

    // Create a real mock function for setFetchedBalances
    setFetchedBalancesMock = jest.fn((callback) => {
      if (typeof callback === 'function') {
        // Simulate the setState pattern
        const prevState = {};
        return callback(prevState);
      }
      return callback;
    });

    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: {
        control: {},
        setValue: setValueMock,
        getValues: jest.fn().mockReturnValue({}),
      },
      onNextStep: jest.fn(),
      validateStep: jest.fn().mockReturnValue(true),
    });

    (useFetchedBalances as jest.Mock).mockReturnValue({
      fetchedBalances: {},
      setFetchedBalances: setFetchedBalancesMock,
    });

    (getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot for InternalTransferForm', () => {
    const { container } = render(
      <InternalTransferForm session={MOCK_SESSION_DATA} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should fetch balance for sending account when fromAccountTypeValue changes', async () => {
    // Safely find the account
    const mainAccount = (MOCK_DATA_USER.accounts || []).find(
      (account) => account.type === 'Main',
    );

    // Skip test if no account found
    if (!mainAccount) {
      return;
    }

    // Mock useWatch to return 'Main' for fromAccountType
    (useWatch as jest.Mock)
      .mockReturnValueOnce('Main')
      .mockReturnValueOnce(null);

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await act(async () => {
      render(<InternalTransferForm session={MOCK_SESSION_DATA} />);
    });

    await waitFor(() => {
      // Verify getAccountsByUserId was called
      expect(getAccountsByUserId).toHaveBeenCalledTimes(1);
      expect(getAccountsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
      );

      // Verify setValue was called with account details
      expect(setValueMock).toHaveBeenCalledWith(
        'fromAccountId',
        String(mainAccount.documentId),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'fromCardName',
        String(mainAccount.name),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'fromAccountNumber',
        String(mainAccount.accountNumber),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'fromAccountBalance',
        Number(mainAccount.balance),
      );

      // Ensure no unexpected errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('should fetch balance for sending account when toAccountTypeValue changes', async () => {
    // Safely find the account
    const savingsAccount = (MOCK_DATA_USER.accounts || []).find(
      (account) => account.type === 'Savings',
    );

    // Skip test if no account found
    if (!savingsAccount) {
      return;
    }

    // Mock useWatch to return 'Savings' for toAccountType
    (useWatch as jest.Mock)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('Savings');

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await act(async () => {
      render(<InternalTransferForm session={MOCK_SESSION_DATA} />);
    });

    await waitFor(() => {
      // Verify getAccountsByUserId was called
      expect(getAccountsByUserId).toHaveBeenCalledTimes(1);
      expect(getAccountsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
      );

      // Verify setValue was called with account details
      expect(setValueMock).toHaveBeenCalledWith(
        'toAccountId',
        String(savingsAccount.documentId),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'toCardName',
        String(savingsAccount.name),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'toAccountNumber',
        String(savingsAccount.accountNumber),
      );
      expect(setValueMock).toHaveBeenCalledWith(
        'toAccountBalance',
        Number(savingsAccount.balance),
      );

      // Ensure no unexpected errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('should handle case when no matching account is found when selecting account for sending', async () => {
    // Mock useWatch to return an account type that doesn't exist
    (useWatch as jest.Mock)
      .mockReturnValueOnce('NonExistentAccount')
      .mockReturnValueOnce(null);

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await act(async () => {
      render(<InternalTransferForm session={MOCK_SESSION_DATA} />);
    });

    await waitFor(() => {
      // Verify getAccountsByUserId was called
      expect(getAccountsByUserId).toHaveBeenCalledTimes(1);
      expect(getAccountsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
      );

      // Verify no further actions were taken when no account is found
      expect(setFetchedBalancesMock).not.toHaveBeenCalled();
      expect(setValueMock).not.toHaveBeenCalled();

      // Ensure no unexpected errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });

  it('should handle case when no matching account is found when selecting account for receiving', async () => {
    // Mock useWatch to return an account type that doesn't exist
    (useWatch as jest.Mock)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('NonExistentAccount');

    // Spy on console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await act(async () => {
      render(<InternalTransferForm session={MOCK_SESSION_DATA} />);
    });

    await waitFor(() => {
      // Verify getAccountsByUserId was called
      expect(getAccountsByUserId).toHaveBeenCalledTimes(1);
      expect(getAccountsByUserId).toHaveBeenCalledWith(
        MOCK_SESSION_DATA.user.id,
      );

      // Verify no further actions were taken when no account is found
      expect(setFetchedBalancesMock).not.toHaveBeenCalled();
      expect(setValueMock).not.toHaveBeenCalled();

      // Ensure no unexpected errors
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
});

// Libs
import { fireEvent, render, screen } from '@testing-library/react';

// Interfaces
import { AccountType } from '@/interfaces';

// Components
import { ConfirmInternalTransfer } from '@/components/Transfers/ConfirmInternalTransfer';

// Contexts
import { useWizardFormContext } from '@/context';

// Schemas
import { InternalTransferFormSchema } from '@/schemas';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

describe('ConfirmInternalTransfer component', () => {
  const mockFormValues = {
    internalTransfer: {
      fromAccountType: AccountType.MAIN,
      toAccountType: AccountType.SAVINGS,
      amount: '1500',
    },
    fromAccountId: 'acc-123',
    toAccountId: 'acc-456',
    fromCardName: 'Main Account',
    toCardName: 'Savings Account',
    fromAccountNumber: '123456789',
    toAccountNumber: '987654321',
    fromAccountBalance: 2000,
    toAccountBalance: 1000,
  };

  const mockGetValues = jest.fn().mockReturnValue(mockFormValues);
  const mockOnPrevStep = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockSubmitHandler = jest.fn();

  beforeEach(() => {
    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: { getValues: mockGetValues },
      onPrevStep: mockOnPrevStep,
      onNextStep: mockOnNextStep,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <ConfirmInternalTransfer<typeof InternalTransferFormSchema>
        submitHandler={mockSubmitHandler}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call onPrevStep when clicking Cancel button', () => {
    render(
      <ConfirmInternalTransfer<typeof InternalTransferFormSchema>
        submitHandler={mockSubmitHandler}
      />,
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnPrevStep).toHaveBeenCalledTimes(1);
  });

  it('should call submitHandler and onNextStep when Proceed button is clicked', () => {
    render(
      <ConfirmInternalTransfer<typeof InternalTransferFormSchema>
        submitHandler={mockSubmitHandler}
      />,
    );

    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);

    // Verify form submission behavior
    expect(mockGetValues).toHaveBeenCalled();
    expect(mockSubmitHandler).toHaveBeenCalledWith(mockFormValues);
    expect(mockOnNextStep).toHaveBeenCalled();
  });
});

// Libs
import { render, screen, fireEvent } from '@testing-library/react';

// Interfaces
import { AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { ConfirmInternalTransfer } from '@/components';

// Context
import { useWizardFormContext } from '@/context';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

describe('ConfirmInternalTransfer component', () => {
  const mockGetValues = jest.fn();
  const mockPrevStep = jest.fn();
  const mockNextStep = jest.fn();
  const mockSubmitHandler = jest.fn();

  const mockContextValue = {
    form: { getValues: mockGetValues },
    prevStep: mockPrevStep,
    nextStep: mockNextStep,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUseWizardFormContext = useWizardFormContext as jest.Mock;
    mockUseWizardFormContext.mockReturnValue(mockContextValue);
  });

  const mockProps = {
    amount: 15000,
    currencyUnit: '$' as CurrencyUnit,
    fromAccountType: AccountType.MAIN,
    toAccountType: AccountType.SAVINGS,
    submitHandler: mockSubmitHandler,
  };

  it('should match snapshot', () => {
    const { container } = render(<ConfirmInternalTransfer {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call prevStep when clicking Cancel button', () => {
    render(<ConfirmInternalTransfer {...mockProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockPrevStep).toHaveBeenCalled();
  });

  it('should call submitHandler and nextStep when Proceed button is clicked', () => {
    mockGetValues.mockReturnValue({ someField: 'someValue' });

    render(<ConfirmInternalTransfer {...mockProps} />);

    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);

    expect(mockGetValues).toHaveBeenCalled();
    expect(mockSubmitHandler).toHaveBeenCalledWith({ someField: 'someValue' });
    expect(mockNextStep).toHaveBeenCalled();
  });
});

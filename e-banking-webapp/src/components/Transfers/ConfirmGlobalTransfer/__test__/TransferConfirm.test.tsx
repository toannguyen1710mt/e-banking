// Libs
import { render, screen, fireEvent } from '@testing-library/react';

// Interfaces
import { AccountType, CurrencyUnit } from '@/interfaces';

// Components
import { ConfirmGlobalTransfer } from '@/components';

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
    amountInUSD: '15000', 
    currencyUnit: '$' as CurrencyUnit,
    fromAccountType: AccountType.MAIN,
    fromCountryType: 'UK',
    submitHandler: mockSubmitHandler,
  };

  test('should match snapshot', () => {
    const { container } = render(<ConfirmGlobalTransfer {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  test('should call prevStep when clicking Cancel button', () => {
    render(<ConfirmGlobalTransfer {...mockProps} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockPrevStep).toHaveBeenCalled();
  });

  test('should call submitHandler and nextStep when Proceed button is clicked', () => {
    mockGetValues.mockReturnValue({ someField: 'someValue' });

    render(<ConfirmGlobalTransfer {...mockProps} />);

    const proceedButton = screen.getByText('Proceed');
    fireEvent.click(proceedButton);

    expect(mockGetValues).toHaveBeenCalled();
    expect(mockSubmitHandler).toHaveBeenCalledWith({ someField: 'someValue' });
    expect(mockNextStep).toHaveBeenCalled();
  });
});

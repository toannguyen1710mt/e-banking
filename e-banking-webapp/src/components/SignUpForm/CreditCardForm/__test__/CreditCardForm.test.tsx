// Libs
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Components
import { CreditCardForm } from '@/components/SignUpForm/CreditCardForm';

// Contexts
import { useWizardFormContext } from '@/context/WizardContext';

// Schemas
import { CreditCardSchema } from '@/schemas';

// Utils
import { formatCardNumber } from '@/utils/number';

jest.mock('@/utils/number', () => ({
  formatCardNumber: jest.fn(),
}));

jest.mock('@/context/WizardContext', () => ({
  useWizardFormContext: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  Controller: ({
    render,
    field = { value: '', onChange: jest.fn() },
  }: {
    render: (props: {
      field: {
        name?: string;
        value?: string;
        onChange?: (e: { target: { value: string } }) => void;
      };
      fieldState: { error: string | null };
    }) => JSX.Element;
    field?: {
      name?: string;
      value?: string;
      onChange?: (e: { target: { value: string } }) => void;
    };
  }) => {
    return render({
      field,
      fieldState: { error: null },
    });
  },
}));

const fillInput = (labelText: string, value: string): void => {
  const input = screen.getByLabelText(labelText);
  fireEvent.change(input, { target: { value } });
};

describe('CreditCardForm component', () => {
  let container: ReturnType<typeof render>;

  const mockSubmitHandler = jest.fn().mockResolvedValueOnce(undefined);
  const mockHandleSubmit = jest.fn(
    (callback) => async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await callback();
      mockOnNextStep();
    },
  );
  const mockSetError = jest.fn();
  const mockTrigger = jest.fn();
  const mockGoToStep = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockValidateStep = jest.fn().mockReturnValue(true);

  beforeEach(() => {
    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: {
        control: {},
        handleSubmit: mockHandleSubmit,
        setError: mockSetError,
        trigger: mockTrigger,
      },
      goToStep: mockGoToStep,
      onNextStep: mockOnNextStep,
      validateStep: mockValidateStep,
    });

    container = render(
      <CreditCardForm<typeof CreditCardSchema>
        schema={CreditCardSchema}
        submitHandler={mockSubmitHandler}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should format card number when typing card number input', () => {
    const mockFormatCardNumber = formatCardNumber as jest.Mock;

    fillInput('cardNumber', '111111111111');

    expect(mockFormatCardNumber).toHaveBeenCalled();
  });

  it('should call submitHandler on form submit', async () => {
    fillInput('holderName', 'Ebanking test');
    fillInput('cardNumber', '111111111111');

    fireEvent.click(screen.getByPlaceholderText('MM/YY'));

    const yearSelect = screen.getByLabelText('Year:');
    fireEvent.change(yearSelect, { target: { value: '2025' } });

    fillInput('ccv', '111');

    const continueButton = screen.getByRole('button', {
      name: /Continue/i,
    });

    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnNextStep).toHaveBeenCalled();
    });
  });

  it('should handle errors and when submitHandler throws an error', async () => {
    const mockError = new Error('Test error');
    mockSubmitHandler.mockRejectedValueOnce(mockError);

    fillInput('holderName', 'Ebanking test');
    fillInput('cardNumber', '111111111111');

    fireEvent.click(screen.getByPlaceholderText('MM/YY'));

    fireEvent.change(screen.getByLabelText('Year:'), {
      target: { value: '2025' },
    });

    fillInput('ccv', '111');

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalled();
    });
  });
});

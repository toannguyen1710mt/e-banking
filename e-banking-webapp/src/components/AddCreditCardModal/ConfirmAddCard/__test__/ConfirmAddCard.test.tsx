import { fireEvent, render, waitFor } from '@testing-library/react';
import { FieldValues, useFormContext } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Mocks
import { MOCK_DATA_USER } from '@/mocks';

// Components
import { ConfirmAddCard } from '..';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn(),
  Controller: ({
    render,
    field,
  }: {
    render: (props: {
      field: FieldValues;
      fieldState: unknown;
    }) => React.ReactNode;
    field: FieldValues;
  }) => {
    const mockOnChange = jest.fn();

    return render({
      field: {
        ...field,
        onChange: mockOnChange,
      },
      fieldState: { error: null },
    });
  },
}));

describe('ConfirmAddCard Component', () => {
  const mockSetValue = jest.fn();
  const mockValidateStep = jest.fn().mockReturnValue(true);

  beforeEach(() => {
    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: {
        control: {
          fields: [],
          array: jest.fn(),
        },
        getValues: jest.fn(() => ({
          cardInfo: {
            holderName: 'John Doe',
            cardNumber: '123456789012',
            expireAt: '12/60',
          },
        })),
        formState: { isSubmitting: false },
      },
      validateStep: mockValidateStep,
    });

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      register: jest.fn(),
      control: {},
      watch: jest.fn(),
    });
  });

  it('Should renders snapshot correctly', () => {
    expect(render(<ConfirmAddCard isPending={false} />)).toMatchSnapshot();
  });

  it('Should handle on change accounts', () => {
    const { getByRole } = render(
      <ConfirmAddCard isPending={false} accounts={MOCK_DATA_USER.accounts} />,
    );

    const radioButton = getByRole('radio', { name: /checkings/i });

    fireEvent.click(radioButton);

    expect(radioButton).toBeChecked();
  });

  it('Should handle confirm modal.', () => {
    const { getByRole } = render(
      <ConfirmAddCard isPending={false} accounts={MOCK_DATA_USER.accounts} />,
    );

    const radioButton = getByRole('radio', { name: /checkings/i });
    fireEvent.click(radioButton);

    const confirmButton = getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith('formState.isSubmitting', true);
    });
  });
});

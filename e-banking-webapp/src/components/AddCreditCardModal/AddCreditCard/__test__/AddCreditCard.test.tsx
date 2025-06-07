import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Utils
import * as utils from '@/utils';

// Components
import { AddCreditCard } from '..';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatCardNumber: jest.fn(),
  formatDate: jest.fn(),
  formatMonthYear: jest.fn(),
  formatYearMonthToShortDate: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn().mockReturnValue({
    control: {
      array: jest.fn(() => []),
    },
  }),
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
    const mockOnChange = jest.fn((e) => {
      if (e?.target?.value) {
        const formattedValue = utils.formatCardNumber(e.target.value);
        if (field && field.onChange) {
          field.onChange({ target: { value: formattedValue } });
        }
      }
    });

    const mockDateOnChange = jest.fn((e: { target: { value: string } }) => {
      if (field && field.onChange) {
        field.onChange({ target: { value: e.target.value } });
      }
    });

    return render({
      field: {
        name: field?.name,
        value: field?.value || '',
        onChange:
          field?.name === 'cardInfo.expireAt' ? mockDateOnChange : mockOnChange,
      },
      fieldState: { error: null },
    });
  },
}));

describe('AddCreditCard Component', () => {
  const mockOnNextStep = jest.fn();
  const mockTrigger = jest.fn();
  const mockSetValue = jest.fn();
  const mockValidateStep = jest.fn().mockReturnValue(true);

  beforeEach(() => {
    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: {
        control: {
          fields: [
            'cardInfo.holderName',
            'cardInfo.cardNumber',
            'cardInfo.expireAt',
            'cardInfo.ccv',
          ],
        },
        getValues: jest.fn(),
        setValue: jest.fn(),
        trigger: mockTrigger,
      },
      onNextStep: mockOnNextStep,
      validateStep: mockValidateStep,
    });

    (useFormContext as jest.Mock).mockReturnValue({
      setValue: mockSetValue,
      register: jest.fn(),
      control: {},
      watch: jest.fn(),
    });

    jest.spyOn(utils, 'formatCardNumber').mockReturnValue('1234 5678 9876');
  });

  it('Should renders snapshot correctly', () => {
    expect(render(<AddCreditCard />)).toMatchSnapshot();
  });

  it('Should call formatCardNumber and pass formatted value to setValue', () => {
    const { getByLabelText } = render(<AddCreditCard />);

    const input = getByLabelText('cardNumber') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '123456789876' } });

    expect(utils.formatCardNumber).toHaveBeenCalledWith('123456789876');
  });

  it('Input should have correct value with onchange', () => {
    render(<AddCreditCard />);

    const expireInput = screen.getByPlaceholderText(
      'MM/YY',
    ) as HTMLInputElement;

    fireEvent.change(expireInput, { target: { value: '12/26' } });

    waitFor(() => {
      expect(expireInput.value).toHaveBeenCalledWith('12/26');
    });
  });

  it('Should trigger will be called when selecting month', () => {
    render(<AddCreditCard />);

    const expireInput = screen.getByPlaceholderText(
      'MM/YY',
    ) as HTMLInputElement;

    fireEvent.click(expireInput);

    const btnMonth = screen.getByLabelText('month-click-1');

    fireEvent.click(btnMonth);

    waitFor(() => {
      expect(mockTrigger).toHaveBeenCalled();
    });
  });
});

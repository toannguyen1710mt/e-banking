import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';

// Context
import { useWizardFormContext } from '@/context';

// Components
import { ContactForm } from '..';

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn().mockReturnValue({
    control: {
      array: jest.fn(() => []),
    },
    formState: { errors: [] },
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
    return render({
      field: {
        name: field?.name,
        value: field?.value || '',
      },
      fieldState: { error: null },
    });
  },
}));

describe('AccountForm Component', () => {
  const mockOnNextStep = jest.fn();
  const mockSetValue = jest.fn();
  const mockValidateStep = jest.fn().mockReturnValue(true);

  beforeEach(() => {
    (useWizardFormContext as jest.Mock).mockReturnValue({
      form: {
        control: {},
        formState: { errors: [] },
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should renders snapshot correctly', () => {
    expect(render(<ContactForm />)).toMatchSnapshot();
  });

  it('Input should have correct value with onchange', () => {
    render(<ContactForm />);

    const usernameInput = screen.getByPlaceholderText(
      '+2547xxxxx503',
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: '123456789123' } });

    waitFor(() => {
      expect(usernameInput.value).toHaveBeenCalledWith('123456789123');
    });
  });
});

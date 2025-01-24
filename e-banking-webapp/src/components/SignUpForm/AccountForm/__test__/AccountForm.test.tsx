import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';
import { useDisclosure } from '@nextui-org/react';

// Context
import { useWizardFormContext } from '@/context';

// Components
import { AccountForm } from '..';

const mockClose = jest.fn();
const mockOpen = jest.fn();

jest.mock('@nextui-org/react', () => ({
  ...jest.requireActual('@nextui-org/react'),
  useDisclosure: jest.fn().mockImplementation(() => ({
    isOpen: true,
    onClose: mockClose,
    onOpen: mockOpen,
  })),
}));

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
    expect(render(<AccountForm />)).toMatchSnapshot();
  });

  it('Input should have correct value with onchange', () => {
    render(<AccountForm />);

    const usernameInput = screen.getByPlaceholderText(
      'Username',
    ) as HTMLInputElement;

    fireEvent.change(usernameInput, { target: { value: 'Demo' } });

    waitFor(() => {
      expect(usernameInput.value).toHaveBeenCalledWith('Demo');
    });
  });

  it('onClose from useDisclosure will triggered when click HiddenPasswordBtn', () => {
    render(<AccountForm />);

    const showPasswordBtn = screen.getByPlaceholderText(
      'Password',
    ) as HTMLInputElement;

    fireEvent.click(showPasswordBtn);

    waitFor(() => {
      expect(mockClose).toHaveBeenCalled();
    });
  });

  it('onOpen from useDisclosure will triggered when click ShowPasswordBtn', () => {
    (useDisclosure as jest.Mock).mockImplementation(() => ({
      isOpen: false,
      onClose: mockClose,
      onOpen: mockOpen,
    }));

    render(<AccountForm />);

    const showPasswordBtn = screen.getByPlaceholderText(
      'Password',
    ) as HTMLInputElement;

    fireEvent.click(showPasswordBtn);

    waitFor(() => {
      expect(mockOpen).toHaveBeenCalled();
    });
  });
});

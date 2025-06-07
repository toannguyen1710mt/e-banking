// Context
import { useWizardFormContext } from '@/context';

jest.mock('react-hook-form', () => ({
  useWatch: jest.fn().mockReturnValue(null),
}));

jest.mock('@/context', () => ({
  useWizardFormContext: jest.fn(),
}));

jest.mock('@/services', () => ({
  getAccountInfoByAccountType: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatNumberWithCommas: jest.fn(),
  formatDate: jest.fn(),
}));
describe('GlobalTransferForm component', () => {
  const mockSetValue = jest.fn();
  const mockOnNextStep = jest.fn();
  const mockValidateStep = true;
  const mockControl = {};

  const mockContextValue = {
    form: {
      control: mockControl,
      formState: { errors: {} },
      setValue: mockSetValue,
    },
    onNextStep: mockOnNextStep,
    validateStep: mockValidateStep,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUseWizardFormContext = useWizardFormContext as jest.Mock;
    mockUseWizardFormContext.mockReturnValue(mockContextValue);
  });
  test('should match snapshot for GlobalTransferForm', () => {});
});

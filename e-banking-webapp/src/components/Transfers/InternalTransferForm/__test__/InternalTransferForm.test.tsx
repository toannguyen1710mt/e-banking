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
describe('InternalTransferForm component', () => {
  const mockSetValue = jest.fn();
  const mockNextStep = jest.fn();
  const mockIsStepValid = true;
  const mockControl = {};

  const mockContextValue = {
    form: {
      control: mockControl,
      formState: { errors: {} },
      setValue: mockSetValue,
    },
    nextStep: mockNextStep,
    isStepValid: mockIsStepValid,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUseWizardFormContext = useWizardFormContext as jest.Mock;
    mockUseWizardFormContext.mockReturnValue(mockContextValue);
  });
  it('should match snapshot for InternalTransferForm', () => {});
});

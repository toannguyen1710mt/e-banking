// Libs
import { fireEvent, render } from '@testing-library/react';

// Components
import { Toast } from '@/components';

// Hooks
import { useToastContext } from '@/context';

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

describe('Toast Component', () => {
  const mockUseToast = useToastContext as jest.MockedFunction<
    typeof useToastContext
  >;

  let container: ReturnType<typeof render>;

  beforeEach(() => {
    (useToastContext as jest.Mock).mockReturnValue({
      toasts: [
        {
          id: 1,
          message: 'Success Message',
          type: 'success',
          position: 'top-right',
        },
        {
          id: 2,
          message: 'Error Message',
          type: 'error',
          position: 'top-center',
        },
        {
          id: 3,
          message: 'No Type Message',
          position: 'bottom-left',
        },
      ],
      removeToast: jest.fn(),
      showToast: jest.fn(),
    });

    container = render(<Toast />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should use default success background when toast type is undefined', () => {
    const undefinedTypeToast = container.getByLabelText('toast-undefined-3');

    expect(undefinedTypeToast).toHaveClass('bg-success');
  });

  it('should remove toast on click', () => {
    const { removeToast } = mockUseToast();

    const successToast = container.getByLabelText('toast-success-1');
    const errorToast = container.getByLabelText('toast-error-2');

    fireEvent.click(successToast);
    expect(removeToast).toHaveBeenCalledWith(1);

    fireEvent.click(errorToast);
    expect(removeToast).toHaveBeenCalledWith(2);
  });
});

// Libs
import { render } from '@testing-library/react';

// Components
import { Toast } from '@/components';

// Hooks
import { useToastContext } from '@/context/';

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

describe('Toast Component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    (useToastContext as jest.Mock).mockReturnValue({
      toasts: [
        { id: 1, message: 'Success Message', type: 'success' },
        { id: 2, message: 'Error Message', type: 'error' },
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
});

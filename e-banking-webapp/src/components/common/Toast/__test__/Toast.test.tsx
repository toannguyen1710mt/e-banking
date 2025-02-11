// Libs
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Components
import { Toast } from '@/components';
import { toastStore } from '@/utils';

jest.mock('@/context', () => ({
  useToastContext: jest.fn(),
}));

describe('Toast Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = render(<Toast />);

    expect(container).toMatchSnapshot();
  });

  it('should render toast when show event is emitted', async () => {
    render(<Toast />);
    const toastData = {
      id: 1,
      message: 'Success Message',
      type: 'success',
      position: 'top-right',
    };

    toastStore.emit('show', toastData);

    expect(await screen.findByText('Success Message')).toBeInTheDocument();
  });

  it('should remove toast when remove event is emitted', async () => {
    render(<Toast />);
    const toastData = {
      id: 1,
      message: 'Dismiss Me',
      type: 'info',
      position: 'bottom-left',
    };

    toastStore.emit('show', toastData);
    expect(await screen.findByText('Dismiss Me')).toBeInTheDocument();

    toastStore.emit('remove', 1);
    await waitFor(() => {
      expect(screen.queryByText('Dismiss Me')).not.toBeInTheDocument();
    });
  });

  it('should remove toast when clicked', async () => {
    render(<Toast />);
    const toastData = {
      id: 2,
      message: 'Click to Remove',
      type: 'error',
      position: 'top-center',
    };

    toastStore.emit('show', toastData);
    expect(await screen.findByText('Click to Remove')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Click to Remove'));
    await waitFor(() => {
      expect(screen.queryByText('Click to Remove')).not.toBeInTheDocument();
    });
  });
});

// Libs
import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';

// Components
import TransferModal from '@/components/Transfers/TransferModal';

jest.mock('next-auth/react', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({}),
  useSession: jest.fn(),
}));

describe('TransferModal component', () => {
  const mockUseSession = useSession as jest.Mock;
  it('should match snapshot for TransferModal', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: 'admin' },
        expires: '2024-01-01T00:00:00.000Z',
      },
      status: 'authenticated',
    });

    const { container } = render(
      <TransferModal isOpen={true} onClose={() => {}} />,
    );

    expect(container).toMatchSnapshot();
  });
});

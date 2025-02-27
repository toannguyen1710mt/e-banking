import { fireEvent, render, waitFor } from '@testing-library/react';

// Services
import * as services from '@/services';

// Mocks
import { MOCK_DATA_USER, MOCK_SESSION_DATA } from '@/mocks';

// Component
import BalanceModal from '..';

jest.mock('react-apexcharts', () => {
  return {
    __esModule: true,
    default: () => <div>Mock ApexCharts</div>,
  };
});

jest.mock('@/services', () => ({
  getAccountsByUserId: jest.fn(),
}));

describe('BalanceModal component', () => {
  beforeEach(() => {
    (services.getAccountsByUserId as jest.Mock).mockResolvedValue(
      MOCK_DATA_USER.accounts,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render snapshot correctly', () => {
    expect(
      render(
        <BalanceModal
          session={MOCK_SESSION_DATA}
          onClose={jest.fn()}
          isOpen={true}
        />,
      ),
    ).toMatchSnapshot();
  });

  it('Should render snapshot when is open false', () => {
    const { asFragment } = render(
      <BalanceModal session={MOCK_SESSION_DATA} onClose={jest.fn()} />,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it('Should handle select card.', async () => {
    const { getByLabelText } = render(
      <BalanceModal
        session={MOCK_SESSION_DATA}
        onClose={jest.fn()}
        isOpen={true}
      />,
    );

    await waitFor(async () => {
      fireEvent.click(getByLabelText('card-item-1'));
    });

    expect(getByLabelText('card-item-1')).toBeInTheDocument();
  });

  it('Should handle close modal.', async () => {
    const mockOnClose = jest.fn();

    const { getByLabelText } = render(
      <BalanceModal
        session={MOCK_SESSION_DATA}
        onClose={mockOnClose}
        isOpen={true}
      />,
    );

    await waitFor(async () => {
      fireEvent.click(getByLabelText('Close'));
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});

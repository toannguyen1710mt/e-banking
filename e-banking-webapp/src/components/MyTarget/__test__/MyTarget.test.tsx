import { render, fireEvent, screen } from '@testing-library/react';

// Mocks
import { TARGET_LIST } from '@/mocks';

// Utils
import { calculatePercentage } from '@/utils';

// Components
import { MyTarget } from '..';

jest.mock('@/utils', () => ({
  calculatePercentage: jest.fn(),
  formatDate: jest.fn((date) => new Date(date).toLocaleDateString()),
  formatNumberWithCommas: jest.fn((number) => number.toString()),
}));

describe('MyTarget Component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    (calculatePercentage as jest.Mock).mockImplementation(
      (deposit: number, targetAmount: number) => {
        return Math.round((deposit / targetAmount) * 100);
      },
    );

    container = render(<MyTarget />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('disables the "New" button', () => {
    expect(container.getByRole('button', { name: /New/i })).toBeDisabled();
  });

  it('updates the footer when clicking the chevron right icon', () => {
    const nextButton = screen.getByLabelText('chevron-right-button');

    fireEvent.click(nextButton);
    expect(screen.getByLabelText('current-target-title')).toHaveTextContent(
      TARGET_LIST[1].title,
    );
  });

  it('renders the circular progress bar correctly', () => {
    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();
    expect(progressBar.getAttribute('aria-valuenow')).toBe(
      String(
        calculatePercentage(
          TARGET_LIST[0].deposit,
          TARGET_LIST[0].targetAmount,
        ),
      ),
    );
  });
});

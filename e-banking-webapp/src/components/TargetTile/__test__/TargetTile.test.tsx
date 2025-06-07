// Libs
import { render, screen } from '@testing-library/react';

// Components
import { GiftIcon, TargetTile } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

const mockProps = {
  icon: GiftIcon,
  title: 'Self Reward',
  deposit: 45000,
  targetAmount: 100000,
};
describe('TargetTile components', () => {
  it('should match snapshot for TargetTile', () => {
    const { container } = render(<TargetTile {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should display the target amount and deposit correctly formatted with commas', () => {
    render(<TargetTile {...mockProps} currencyUnit='$' />);

    const deposit = screen.getByText(
      `$ ${formatNumberWithCommas(mockProps.deposit)}`,
    );

    const targetAmount = screen.getByText(
      `/$ ${formatNumberWithCommas(mockProps.targetAmount)}`,
    );

    expect(deposit).toBeInTheDocument();
    expect(targetAmount).toBeInTheDocument();
  });

  it('should calculate and display the correct percentage achieved', () => {
    render(<TargetTile {...mockProps} currencyUnit='$' />);

    const percentage = (mockProps.deposit / mockProps.targetAmount) * 100;
    const percentageElement = screen.getByText(`${percentage}%`);

    expect(percentageElement).toBeInTheDocument();
  });
});

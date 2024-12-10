// Libs
import { render, screen } from '@testing-library/react';

// Components
import { GiftIcon, TargetTile } from '@/components';

// Utils
import { formatNumberWithCommas } from '@/utils';

const mockProps = {
  icon: GiftIcon,
  title: 'Self Reward',
  targetAmount: 45000,
  deposit: 100000,
};
describe('TargetTile components', () => {
  it('should match snapshot for TargetTile', () => {
    const { container } = render(<TargetTile {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should display the target amount and deposit correctly formatted with commas', () => {
    render(<TargetTile {...mockProps} currencyUnit='$' />);

    const targetAmount = screen.getByText(
      `$ ${formatNumberWithCommas(mockProps.targetAmount)}`,
    );
    const deposit = screen.getByText(
      `/$ ${formatNumberWithCommas(mockProps.deposit)}`,
    );

    expect(targetAmount).toBeInTheDocument();
    expect(deposit).toBeInTheDocument();
  });

  it('should calculate and display the correct percentage achieved', () => {
    render(<TargetTile {...mockProps} currencyUnit='$' />);

    const percentage = (mockProps.targetAmount / mockProps.deposit) * 100;
    const percentageElement = screen.getByText(`${percentage}%`);

    expect(percentageElement).toBeInTheDocument();
  });
});

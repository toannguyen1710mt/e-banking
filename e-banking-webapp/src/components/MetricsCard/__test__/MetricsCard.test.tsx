import { render, screen } from '@testing-library/react';

// Components
import { MetricsCard } from '..';

describe('MetricsCard component', () => {
  const defaultProps = {
    title: 'Test Title',
    totalTransfers: 1234,
    isPositive: true,
    percentageChange: 12,
    isSelected: false,
  };

  it('renders match snapshot', () => {
    render(<MetricsCard {...defaultProps} />);

    expect(screen).toMatchSnapshot();
  });

  it('applies correct styles when isSelected is true', () => {
    render(<MetricsCard {...defaultProps} isSelected={true} />);

    const card = screen.getByText('Test Title').closest('div');
    expect(card).toHaveClass('bg-[#264653]');
    expect(card).not.toHaveClass('bg-white');

    const text = screen.getByText('Test Title');
    expect(text).toHaveClass('text-white');
  });

  it('applies correct styles when isPositive is false', () => {
    render(<MetricsCard {...defaultProps} isPositive={false} />);

    const chipContent = screen.getByText('12%');
    expect(chipContent).toHaveClass('text-red');

    const chipBase = chipContent.closest('div');
    expect(chipBase).toHaveClass('bg-background-600');
  });

  it('applies correct styles when isPositive is true', () => {
    render(<MetricsCard {...defaultProps} isPositive={true} />);

    const chipContent = screen.getByText('12%');
    expect(chipContent).toHaveClass('text-primary-200');

    const chipBase = chipContent.closest('div');
    expect(chipBase).toHaveClass('bg-primary-200');
    expect(chipBase).toHaveClass('bg-opacity-10');
  });
});

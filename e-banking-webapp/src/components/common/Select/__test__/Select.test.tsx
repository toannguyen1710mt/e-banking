// Libs
import { render, screen } from '@testing-library/react';

// Mocks
import { MOCK_OPTIONS } from '@/mocks';

// Components
import { Select } from '@/components';

describe('Select component', () => {
  it('should match snapshot for Select component', () => {
    const { container } = render(<Select options={MOCK_OPTIONS} />);

    expect(container).toMatchSnapshot();
  });

  it('should display placeholder when no value is selected', () => {
    render(<Select options={MOCK_OPTIONS} placeholder='Select a country' />);

    expect(screen.getByText('Select a country')).toBeInTheDocument();
  });

  it('should display the selected value', () => {
    render(<Select options={MOCK_OPTIONS} value='USA' />);

    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('should apply correct custom classNames', () => {
    render(
      <Select
        options={MOCK_OPTIONS}
        classNames={{ trigger: 'custom-trigger-class' }}
      />,
    );

    expect(screen.getByRole('button')).toHaveClass('custom-trigger-class');
  });
});

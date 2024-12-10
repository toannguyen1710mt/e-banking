// Libs
import { render, screen } from '@testing-library/react';

// Components
import { Select } from '@/components';

const countries = [
  {
    key: 'Kenya',
    label: 'Kenya',
  },
  {
    key: 'USA',
    label: 'USA',
  },
];
describe('Select component', () => {
  it('should match snapshot for Select component', () => {
    const { container } = render(<Select options={countries} />);

    expect(container).toMatchSnapshot();
  });

  it('should display placeholder when no value is selected', () => {
    render(<Select options={countries} placeholder='Select a country' />);

    expect(screen.getByText('Select a country')).toBeInTheDocument();
  });

  it('should display the selected value', () => {
    render(<Select options={countries} value='USA' />);

    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('should apply correct custom classNames', () => {
    render(
      <Select
        options={countries}
        classNames={{ trigger: 'custom-trigger-class' }}
      />,
    );

    expect(screen.getByRole('button')).toHaveClass('custom-trigger-class');
  });
});

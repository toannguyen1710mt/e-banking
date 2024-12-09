// Libs
import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Checkbox } from '@/components';

describe('Checkbox Component test cases', () => {
  test('should match snapshot for Checkbox', () => {
    const { container } = render(<Checkbox>Default Checkbox</Checkbox>);
    expect(container).toMatchSnapshot();
  });

  test('should render with default variants', () => {
    render(<Checkbox>Default Checkbox</Checkbox>);

    const checkboxWrapper = screen
      .getByRole('checkbox', { hidden: true })
      .closest('label')
      ?.querySelector('span[aria-hidden="true"]');

    expect(checkboxWrapper).toHaveClass('w-4 h-4 rounded after:bg-primary-200');
  });

  test('should apply size variant correctly', () => {
    render(<Checkbox size='lg'>Large Checkbox</Checkbox>);

    const checkboxWrapper = screen
      .getByRole('checkbox', { hidden: true })
      .closest('label')
      ?.querySelector('span[aria-hidden="true"]');

    expect(checkboxWrapper).toHaveClass('w-5 h-5');
  });

  test('should apply color variant correctly', () => {
    render(<Checkbox color='primary'>Primary Checkbox</Checkbox>);

    const checkboxWrapper = screen
      .getByRole('checkbox', { hidden: true })
      .closest('label')
      ?.querySelector('span[aria-hidden="true"]');

    expect(checkboxWrapper).toHaveClass('after:bg-primary-200');
  });

  test('should handle click event', () => {
    const onChangeMock = jest.fn();

    render(<Checkbox onChange={onChangeMock}>Clickable Checkbox</Checkbox>);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(onChangeMock).toHaveBeenCalled();

    expect(checkbox).toBeChecked();
  });
});

import { render, fireEvent, screen } from '@testing-library/react';

// Component
import { Input } from '..';

describe('Input component', () => {
  let container: ReturnType<typeof render>;

  beforeEach(() => {
    container = render(<Input aria-label='email' placeholder='Email' />);
  });

  it('renders with custom styles', () => {
    const inputWrapper = document.querySelector('[data-slot="input-wrapper"]');

    expect(inputWrapper).toHaveClass(
      'border',
      'border-primary-200 border group-data-[focus=true]:border-primary-200 data-[hover=true]:border-secondary-200 data-[hover=true]:!bg-inherit',
    );
  });

  it('handles input change', () => {
    const input = container.getByPlaceholderText('Email') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'New value' } });

    expect(input).toHaveValue('New value');
  });

  it('hides label when removeLabel is true', () => {
    expect(container.queryByRole('label')).not.toBeInTheDocument();
  });

  it('shows label when the label is passed', () => {
    const labelText = 'Custom Label';

    render(<Input label={labelText} aria-label='email' />);

    const labelElement = screen.getByText(labelText);

    expect(labelElement).toBeInTheDocument();

    expect(labelElement).toHaveClass('!text-primary-200 text-sm font-medium');
  });
});
